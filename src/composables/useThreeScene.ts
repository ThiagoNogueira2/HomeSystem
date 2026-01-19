import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

export function useThreeScene(canvasRef: any) {
  const activeImage = ref<number | null>(null);
  const mousePos = ref({ x: 0, y: 0 });

  let scene: THREE.Scene | null = null;
  let renderer: THREE.WebGLRenderer | null = null;
  let camera: THREE.PerspectiveCamera | null = null;
  let plane: THREE.Mesh | null = null;
  let animationFrameId: number | null = null;
  let baseRotation = 0;
  const textureCache = new Map<string, THREE.Texture>();

  const isWebGLAvailable = (): boolean => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch { return false; }
  };

  const initThreeScene = () => {
    if (!canvasRef.value || !isWebGLAvailable()) return;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(35, 332 / 450, 0.1, 1000);
      camera.position.z = 6;

      renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.value, 
        alpha: true, 
        antialias: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false
      });
      
      renderer.setSize(332, 450);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      scene.add(new THREE.AmbientLight(0xffffff, 1));

      const geometry = new THREE.PlaneGeometry(2.8, 3.8);
      const material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
      
      plane = new THREE.Mesh(geometry, material);
      scene.add(plane);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        if (plane && renderer && scene && camera) {
          baseRotation += 0.020;
          
          plane.rotation.y += (baseRotation + (mousePos.value.x * 0.15) - plane.rotation.y) * 0.08;
          plane.rotation.x += ((mousePos.value.y * 0.15) - plane.rotation.x) * 0.08;
          plane.position.y = Math.sin(baseRotation * 2) * 0.05;
          
          renderer.render(scene, camera);
        }
      };
      animate();
    } catch {
      cleanup();
    }
  };

  const updateTexture = (imageUrl: string) => {
    if (!plane || !renderer) return;

    if (textureCache.has(imageUrl)) {
      const texture = textureCache.get(imageUrl)!;
      if (plane.material instanceof THREE.MeshBasicMaterial) {
        plane.material.map = texture;
        plane.material.needsUpdate = true;
      }
      return;
    }

    new THREE.TextureLoader().load(imageUrl, (texture) => {
      if (!plane || !renderer) return;

      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      
      textureCache.set(imageUrl, texture);

      const newMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

      if (plane.material instanceof THREE.MeshBasicMaterial) {
        plane.material.dispose();
      }
      
      plane.material = newMaterial;
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!canvasRef.value) return;
    
    const rect = canvasRef.value.getBoundingClientRect();
    mousePos.value = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1
    };
  };

  const cleanup = () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    
    textureCache.forEach(texture => texture.dispose());
    textureCache.clear();

    if (plane) {
      plane.geometry?.dispose();
      if (plane.material instanceof THREE.MeshBasicMaterial) {
        plane.material.dispose();
      }
    }

    scene?.clear();
    
    if (renderer) {
      renderer.dispose();
      renderer.forceContextLoss();
    }

    animationFrameId = null;
    scene = null;
    renderer = null;
    camera = null;
    plane = null;
  };

  onMounted(() => setTimeout(initThreeScene, 100));
  onUnmounted(cleanup);

  return {
    activeImage,
    handleMouseMove,
    updateTexture
  };
}
