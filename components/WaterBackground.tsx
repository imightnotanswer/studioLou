'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function WaterBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const sceneCompute = new THREE.Scene()
    
    // Camera
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Render targets for ping-pong simulation
    const size = 512
    const rtA = new THREE.WebGLRenderTarget(size, size, {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter
    })
    const rtB = new THREE.WebGLRenderTarget(size, size, {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter
    })
    
    // Use a ref-like pattern for swapping
    let currentRead = rtA
    let currentWrite = rtB

    // Uniforms
    const uniformsSimulation = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(-1, -1) },
      uMouseVelocity: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(size, size) },
      uTexture: { value: null as THREE.Texture | null }
    }

    const uniformsRender = {
      uTexture: { value: null as THREE.Texture | null },
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) }
    }

    // Shaders
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const fragmentShaderSimulation = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uMouseVelocity;
      uniform vec2 uResolution;
      uniform sampler2D uTexture;

      void main() {
        vec4 prev = texture2D(uTexture, vUv);
        
        vec2 velocity = prev.xy;
        vec2 pos = vUv - velocity * 0.01;
        
        vec4 info = texture2D(uTexture, pos);
        
        // Calculate mouse influence
        vec2 mouseDelta = vUv - (uMouse * 0.5 + 0.5);
        float mouseDist = length(mouseDelta);
        vec2 mouseForce = normalize(mouseDelta) * (1.0 / (1.0 + mouseDist * 5.0));
        
        gl_FragColor = vec4(
          clamp(info.xy + mouseForce * 0.05 + uMouseVelocity * 0.01, -10.0, 10.0),
          0.0,
          1.0
        );
      }
    `

    const fragmentShaderRender = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform vec2 uResolution;

      void main() {
        vec2 uv = vUv;
        vec4 info = texture2D(uTexture, uv);
        
        float dist = length(info.xy);
        float c = dist * 20.0;
        
        float r = 0.603;
        float g = 0.706;
        float b = 0.757;
        
        gl_FragColor = vec4(r, g, b, c * 0.5);
      }
    `

    // Geometry
    const geometry = new THREE.PlaneGeometry(2, 2)

    // Materials
    const materialSimulation = new THREE.ShaderMaterial({
      uniforms: uniformsSimulation,
      vertexShader,
      fragmentShader: fragmentShaderSimulation
    })

    const materialRender = new THREE.ShaderMaterial({
      uniforms: uniformsRender,
      vertexShader,
      fragmentShader: fragmentShaderRender,
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    // Meshes
    const planeCompute = new THREE.Mesh(geometry, materialSimulation)
    sceneCompute.add(planeCompute)

    const planeRender = new THREE.Mesh(geometry, materialRender)
    scene.add(planeRender)

    // Mouse interaction
    const mouse = new THREE.Vector2(-1, -1)
    const mouseVelocity = new THREE.Vector2()
    const previousMouse = new THREE.Vector2()
    
    const handleMouseMove = (e: MouseEvent) => {
      const bounds = container.getBoundingClientRect()
      previousMouse.copy(mouse)
      mouse.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1
      mouse.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1
      mouseVelocity.subVectors(mouse, previousMouse)
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Resize handler
    const resize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      uniformsRender.uResolution.value.set(width, height)
    }
    resize()
    window.addEventListener('resize', resize)

    // Animation
    let frame = 0
    const animate = () => {
      frame++
      
      uniformsSimulation.uTime.value = frame * 0.01
      uniformsRender.uTime.value = frame * 0.01
      
      uniformsSimulation.uMouse.value.lerp(mouse, 0.1)
      uniformsSimulation.uMouseVelocity.value.lerp(mouseVelocity, 0.15)
      
      // Fade mouse velocity
      mouseVelocity.multiplyScalar(0.9)
      
      // Compute simulation
      uniformsSimulation.uTexture.value = currentRead.texture
      materialSimulation.uniforms.uTexture.value = currentRead.texture
      
      renderer.setRenderTarget(currentWrite)
      renderer.render(sceneCompute, camera)
      
      // Render to screen
      materialRender.uniforms.uTexture.value = currentWrite.texture
      renderer.setRenderTarget(null)
      renderer.render(scene, camera)
      
      // Swap render targets
      const temp = currentRead
      currentRead = currentWrite
      currentWrite = temp
      
      requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      container.removeChild(renderer.domElement)
      renderer.dispose()
      rtA.dispose()
      rtB.dispose()
      materialSimulation.dispose()
      materialRender.dispose()
      geometry.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ background: 'rgb(154, 180, 193)' }}
    />
  )
}

