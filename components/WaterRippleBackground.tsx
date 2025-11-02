'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Shader code
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
uniform float mouseActive;
varying vec2 vUv;

const float delta = 1.4;  

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
    float p_left = texture2D(textureA, uv + vec2(-texelSize.x, 0.0)).x;
    float p_up = texture2D(textureA, uv + vec2(0.0, texelSize.y)).x;
    float p_down = texture2D(textureA, uv + vec2(0.0, -texelSize.y)).x;
    
    if (uv.x <= texelSize.x) p_left = p_right;
    if (uv.x >= 1.0 - texelSize.x) p_right = p_left;
    if (uv.y <= texelSize.y) p_down = p_up;
    if (uv.y >= 1.0 - texelSize.y) p_up = p_down;
    
    // Enhanced wave equation matching ShaderToy
    pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;
    pVel += delta * (-2.0 * pressure + p_up + p_down) / 4.0;
    
    pressure += delta * pVel;
    
    pVel -= 0.005 * delta * pressure;
    
    pVel *= 1.0 - 0.002 * delta;
    pressure *= 0.999;
    
    vec2 mouseUV = mouse / resolution;
    if(mouse.x > 0.0) {
        float dist = distance(uv, mouseUV);
        if(dist <= 0.02) {
            pressure += 2.0 * (1.0 - dist / 0.02) * mouseActive;
        }
    }
    
    gl_FragColor = vec4(pressure, pVel, 
        (p_right - p_left) / 2.0, 
        (p_up - p_down) / 2.0);
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
varying vec2 vUv;

void main() {
    vec4 data = texture2D(textureA, vUv);
    
    vec2 distortion = 0.3 * data.zw;
    vec4 color = texture2D(textureB, vUv + distortion);
    
    vec3 normal = normalize(vec3(-data.z * 2.0, 0.5, -data.w * 2.0));
    vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));
    float specular = pow(max(0.0, dot(normal, lightDir)), 60.0) * 1.5;
    
    gl_FragColor = color + vec4(specular);
}
`

export default function WaterRippleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const simScene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    const mouse = new THREE.Vector2()
    let frame = 0
    let lastMouseMoveTime = 0

    const width = container.clientWidth
    const height = container.clientHeight
    const pixelWidth = width * window.devicePixelRatio
    const pixelHeight = height * window.devicePixelRatio
    
    const options = {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
    }
    
    let rtA = new THREE.WebGLRenderTarget(pixelWidth, pixelHeight, options)
    let rtB = new THREE.WebGLRenderTarget(pixelWidth, pixelHeight, options)

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null as THREE.Texture | null },
        mouse: { value: mouse },
        resolution: { value: new THREE.Vector2(pixelWidth, pixelHeight) },
        time: { value: 0 },
        frame: { value: 0 },
        mouseActive: { value: 1.0 },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    })

    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null as THREE.Texture | null },
        textureB: { value: null as THREE.Texture | null },
      },
      vertexShader: renderVertexShader,
      fragmentShader: renderFragmentShader,
      transparent: true,
    })

    const plane = new THREE.PlaneGeometry(2, 2)
    const simQuad = new THREE.Mesh(plane, simMaterial)
    const renderQuad = new THREE.Mesh(plane, renderMaterial)

    simScene.add(simQuad)
    scene.add(renderQuad)

    const canvas = document.createElement('canvas')
    canvas.width = pixelWidth
    canvas.height = pixelHeight
    const ctx = canvas.getContext('2d', { alpha: true })!
    
    // Blue background matching bg-blueSoft (#9ab4c1)
    ctx.fillStyle = "#9ab4c1"
    ctx.fillRect(0, 0, pixelWidth, pixelHeight)

    const textTexture = new THREE.CanvasTexture(canvas)
    textTexture.minFilter = THREE.LinearFilter
    textTexture.magFilter = THREE.LinearFilter
    textTexture.format = THREE.RGBAFormat

    const resize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      
      renderer.setSize(newWidth, newHeight)
      
      const newPixelWidth = newWidth * window.devicePixelRatio
      const newPixelHeight = newHeight * window.devicePixelRatio
      
      rtA.setSize(newPixelWidth, newPixelHeight)
      rtB.setSize(newPixelWidth, newPixelHeight)
      simMaterial.uniforms.resolution.value.set(newPixelWidth, newPixelHeight)

      canvas.width = newPixelWidth
      canvas.height = newPixelHeight
      
      ctx.fillStyle = "#9ab4c1"
      ctx.fillRect(0, 0, newPixelWidth, newPixelHeight)

      textTexture.needsUpdate = true
    }

    container.appendChild(renderer.domElement)
    resize()
    window.addEventListener('resize', resize)

    // Attach mouse events to the parent container
    const parentContainer = container.parentElement
    const handleMouseMove = (e: MouseEvent) => {
      const bounds = container.getBoundingClientRect()
      mouse.x = (e.clientX - bounds.left) * window.devicePixelRatio
      mouse.y = (bounds.height - (e.clientY - bounds.top)) * window.devicePixelRatio
      lastMouseMoveTime = performance.now()
    }

    const handleMouseLeave = () => {
      mouse.set(0, 0)
    }

    if (parentContainer) {
      parentContainer.addEventListener('mousemove', handleMouseMove)
      parentContainer.addEventListener('mouseleave', handleMouseLeave)
    }

    const animate = () => {
      simMaterial.uniforms.frame.value = frame++
      simMaterial.uniforms.time.value = performance.now() / 1000

      // Calculate fade based on time since last mouse movement
      const timeSinceMouseMove = (performance.now() - lastMouseMoveTime) / 1000
      if (mouse.x > 0 && timeSinceMouseMove > 0.5) {
        // Fade out over 0.5 seconds
        const fadeDuration = 0.5
        const fadeProgress = Math.min((timeSinceMouseMove - 0.5) / fadeDuration, 1.0)
        simMaterial.uniforms.mouseActive.value = 1.0 - fadeProgress
      } else {
        simMaterial.uniforms.mouseActive.value = 1.0
      }

      simMaterial.uniforms.textureA.value = rtA.texture
      renderer.setRenderTarget(rtB)
      renderer.render(simScene, camera)

      renderMaterial.uniforms.textureA.value = rtB.texture
      renderMaterial.uniforms.textureB.value = textTexture
      renderer.setRenderTarget(null)
      renderer.render(scene, camera)

      const temp = rtA
      rtA = rtB
      rtB = temp

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize)
      if (parentContainer) {
        parentContainer.removeEventListener('mousemove', handleMouseMove)
        parentContainer.removeEventListener('mouseleave', handleMouseLeave)
      }
      container.removeChild(renderer.domElement)
      renderer.dispose()
      rtA.dispose()
      rtB.dispose()
      simMaterial.dispose()
      renderMaterial.dispose()
      plane.dispose()
      textTexture.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
