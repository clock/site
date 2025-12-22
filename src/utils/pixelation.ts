import * as THREE from 'three'

export function createPixelationPass(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  resolution: { width: number; height: number }
) {
  const { width, height } = resolution
  
  // Create render target at low resolution
  const renderTarget = new THREE.WebGLRenderTarget(width, height, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
  })

  // Create fullscreen quad for post-processing
  const geometry = new THREE.PlaneGeometry(2, 2)
  const material = new THREE.ShaderMaterial({
    uniforms: {
      tDiffuse: { value: null },
      uResolution: { value: new THREE.Vector2(width, height) },
      uScreenResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTime: { value: 0 },
      uChromaticAberration: { value: 0.003 },
      uNoise: { value: 0.02 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform vec2 uResolution;
      uniform vec2 uScreenResolution;
      uniform float uTime;
      uniform float uChromaticAberration;
      uniform float uNoise;
      
      varying vec2 vUv;
      
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      void main() {
        vec2 uv = vUv;
        
        // Chromatic aberration
        float r = texture2D(tDiffuse, uv + vec2(uChromaticAberration, 0.0)).r;
        float g = texture2D(tDiffuse, uv).g;
        float b = texture2D(tDiffuse, uv - vec2(uChromaticAberration, 0.0)).b;
        
        // Subtle noise/dither
        float noise = random(uv + uTime) * uNoise;
        
        // Combine
        vec3 color = vec3(r, g, b) + noise;
        
        // Subtle scanline effect
        float scanline = sin(uv.y * uScreenResolution.y * 0.5) * 0.02 + 0.98;
        color *= scanline;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  })

  const quad = new THREE.Mesh(geometry, material)
  const postScene = new THREE.Scene()
  postScene.add(quad)

  return {
    renderTarget,
    postScene,
    material,
    render: (time: number) => {
      // Render to low-res target
      renderer.setRenderTarget(renderTarget)
      renderer.render(scene, camera)
      
      // Update shader uniforms
      material.uniforms.tDiffuse.value = renderTarget.texture
      material.uniforms.uTime.value = time
      
      // Render post-process to screen
      renderer.setRenderTarget(null)
      renderer.render(postScene, new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1))
    },
    dispose: () => {
      renderTarget.dispose()
      material.dispose()
      geometry.dispose()
    },
  }
}

export function getResolutionForLevel(level: '240p' | '360p' | '720p'): { width: number; height: number } {
  const aspect = window.innerWidth / window.innerHeight
  switch (level) {
    case '240p':
      return { width: 320, height: 180 }
    case '360p':
      return { width: 480, height: 270 }
    case '720p':
      return { width: 640, height: 360 }
    default:
      return { width: 480, height: 270 }
  }
}

