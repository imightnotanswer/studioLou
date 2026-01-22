'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const simulationVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const simulationFragmentShader = `
uniform sampler2D textureA;
uniform vec2 mouse;
uniform vec2 resolution;
uniform float time;
uniform int frame;

uniform float uBrushRadius;   // pixels
uniform float uWaveSpeed;     // multiplier

varying vec2 vUv;

const float baseDelta = 1.4;

void main() {
  vec2 uv = vUv;

  if (frame == 0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec4 data = texture2D(textureA, uv);
  float pressure = data.x;
  float pVel = data.y;

  vec2 texelSize = 1.0 / resolution;

  float p_right = texture2D(textureA, uv + vec2(texelSize.x, 0.0)).x;
  float p_left  = texture2D(textureA, uv + vec2(-texelSize.x, 0.0)).x;
  float p_up    = texture2D(textureA, uv + vec2(0.0, texelSize.y)).x;
  float p_down  = texture2D(textureA, uv + vec2(0.0, -texelSize.y)).x;

  if (uv.x <= texelSize.x) p_left = p_right;
  if (uv.x >= 1.0 - texelSize.x) p_right = p_left;
  if (uv.y <= texelSize.y) p_down = p_up;
  if (uv.y >= 1.0 - texelSize.y) p_up = p_down;

  float delta = baseDelta * uWaveSpeed;

  pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;
  pVel += delta * (-2.0 * pressure + p_up + p_down) / 4.0;

  pressure += delta * pVel;

  pVel -= 0.005 * delta * pressure;

  pVel *= 1.0 - 0.002 * delta;
  pressure *= 0.999;

  vec2 mouseUV = mouse / resolution;

  // Convert brush radius from pixels -> UV distance
  float minRes = min(resolution.x, resolution.y);
  float radius = uBrushRadius / minRes;

  if (mouse.x > 0.0) {
    float dist = distance(uv, mouseUV);
    if (dist <= radius) {
      float strength = 1.0 - (dist / radius);
      pressure += 2.0 * strength;
    }
  }

  gl_FragColor = vec4(
    pressure,
    pVel,
    (p_right - p_left) / 2.0,
    (p_up - p_down) / 2.0
  );
}
`

const renderVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const renderFragmentShader = `
uniform sampler2D textureA;
uniform sampler2D textureB;

uniform float uImageAspect;
uniform float uPlaneAspect;
uniform vec2 uFocus; // [0..1] like object-position
uniform float uDistortionStrength;

varying vec2 vUv;

vec2 coverUv(vec2 uv, float imageAspect, float planeAspect, vec2 focus) {
  vec2 outUv = uv;

  if (planeAspect > imageAspect) {
    float scale = planeAspect / imageAspect;
    outUv.y = outUv.y / scale + (1.0 - 1.0 / scale) * focus.y;
  } else {
    float scale = imageAspect / planeAspect;
    outUv.x = outUv.x / scale + (1.0 - 1.0 / scale) * focus.x;
  }

  return outUv;
}

void main() {
  vec4 data = texture2D(textureA, vUv);

  vec2 distortion = uDistortionStrength * data.zw;

  vec2 uv = coverUv(vUv, uImageAspect, uPlaneAspect, uFocus);
  uv = clamp(uv, 0.0, 1.0);

  vec4 color = texture2D(textureB, uv + distortion);

  vec3 normal = normalize(vec3(-data.z * 2.0, 0.5, -data.w * 2.0));
  vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));
  float specular = pow(max(0.0, dot(normal, lightDir)), 60.0) * 1.5;

  gl_FragColor = color + vec4(specular);
}
`

type Props = {
  imageSrc: string
  className?: string

  focusY?: number
  focusX?: number

  distortionStrength?: number
  brushRadius?: number
  waveSpeed?: number
}

export default function WaterRippleBackground({
  imageSrc,
  className,
  focusY = 0.65,
  focusX = 0.5,
  distortionStrength = 0.28,
  brushRadius = 56,
  waveSpeed = 1.0,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const simScene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: false,
    })

    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.inset = '0'

    container.appendChild(renderer.domElement)

    const mouse = new THREE.Vector2(0, 0)
    let frame = 0
    let raf = 0

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null as THREE.Texture | null },
        mouse: { value: mouse },
        resolution: { value: new THREE.Vector2(1, 1) },
        time: { value: 0 },
        frame: { value: 0 },
        uBrushRadius: { value: brushRadius },
        uWaveSpeed: { value: waveSpeed },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    })

    const imageTexture = new THREE.TextureLoader().load(imageSrc)
    imageTexture.minFilter = THREE.LinearFilter
    imageTexture.magFilter = THREE.LinearFilter
    imageTexture.generateMipmaps = true
    imageTexture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
    imageTexture.wrapS = THREE.ClampToEdgeWrapping
    imageTexture.wrapT = THREE.ClampToEdgeWrapping

    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null as THREE.Texture | null },
        textureB: { value: imageTexture },
        uImageAspect: { value: 1.0 },
        uPlaneAspect: { value: 1.0 },
        uFocus: { value: new THREE.Vector2(focusX, focusY) },
        uDistortionStrength: { value: distortionStrength },
      },
      vertexShader: renderVertexShader,
      fragmentShader: renderFragmentShader,
      transparent: true,
    })

    const imgEl = imageTexture.image as HTMLImageElement | undefined
    if (imgEl && imgEl.naturalWidth && imgEl.naturalHeight) {
      renderMaterial.uniforms.uImageAspect.value = imgEl.naturalWidth / imgEl.naturalHeight
    } else {
      imageTexture.onUpdate = () => {
        const i = imageTexture.image as HTMLImageElement | undefined
        if (i?.naturalWidth && i?.naturalHeight) {
          renderMaterial.uniforms.uImageAspect.value = i.naturalWidth / i.naturalHeight
        }
      }
    }

    const plane = new THREE.PlaneGeometry(2, 2)
    const simQuad = new THREE.Mesh(plane, simMaterial)
    const renderQuad = new THREE.Mesh(plane, renderMaterial)
    simScene.add(simQuad)
    scene.add(renderQuad)

    const options: THREE.RenderTargetOptions = {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
    }

    let rtA = new THREE.WebGLRenderTarget(1, 1, options)
    let rtB = new THREE.WebGLRenderTarget(1, 1, options)

    const setSizes = () => {
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      const w = Math.max(1, Math.round(rect.width * dpr))
      const h = Math.max(1, Math.round(rect.height * dpr))

      renderer.setPixelRatio(dpr)
      renderer.setSize(rect.width, rect.height, false)

      rtA.setSize(w, h)
      rtB.setSize(w, h)

      simMaterial.uniforms.resolution.value.set(w, h)
      renderMaterial.uniforms.uPlaneAspect.value = rect.width / rect.height

      // keep uniforms in sync if props changed
      renderMaterial.uniforms.uFocus.value.set(focusX, focusY)
      renderMaterial.uniforms.uDistortionStrength.value = distortionStrength
      simMaterial.uniforms.uBrushRadius.value = brushRadius
      simMaterial.uniforms.uWaveSpeed.value = waveSpeed
    }

    setSizes()

    const ro = new ResizeObserver(() => setSizes())
    ro.observe(container)

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      const localX = e.clientX - rect.left
      const localY = e.clientY - rect.top

      mouse.x = localX * dpr
      mouse.y = (rect.height - localY) * dpr
    }

    const onPointerLeave = () => {
      mouse.set(0, 0)
    }

    container.addEventListener('pointermove', onPointerMove, { passive: true })
    container.addEventListener('pointerleave', onPointerLeave, { passive: true })

    const animate = () => {
      simMaterial.uniforms.frame.value = frame++
      simMaterial.uniforms.time.value = performance.now() / 1000

      simMaterial.uniforms.textureA.value = rtA.texture
      renderer.setRenderTarget(rtB)
      renderer.render(simScene, camera)

      renderMaterial.uniforms.textureA.value = rtB.texture
      renderer.setRenderTarget(null)
      renderer.render(scene, camera)

      const temp = rtA
      rtA = rtB
      rtB = temp

      raf = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(raf)

      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerleave', onPointerLeave)

      ro.disconnect()

      plane.dispose()
      simMaterial.dispose()
      renderMaterial.dispose()
      imageTexture.dispose()
      rtA.dispose()
      rtB.dispose()
      renderer.dispose()

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [imageSrc, focusX, focusY, distortionStrength, brushRadius, waveSpeed])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        borderRadius: 0,
        pointerEvents: 'auto',
      }}
    />
  )
}




