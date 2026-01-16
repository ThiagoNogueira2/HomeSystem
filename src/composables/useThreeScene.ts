import { ref, watch, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

export function useThreeScene(canvasRef: any) {
  const activeImage = ref<number | null>(null);
  const mousePos = ref({ x: 0, y: 0 });

  let scene: THREE.Scene | null = null;
  let renderer: THREE.WebGLRenderer | null = null;
  let camera: THREE.PerspectiveCamera | null = null;
  let plane: THREE.Mesh | null = null;
  let currentTexture: THREE.Texture | null = null;
  let animationFrameId: number | null = null;
  let baseRotation = 0;

  const initThreeScene = () => {
    if (!canvasRef.value) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(35, 332 / 450, 0.1, 1000);
    camera.position.z = 6;

    renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.value, 
      alpha: true, 
      antialias: true
    });
    renderer.setSize(332, 450);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const geometry = new THREE.PlaneGeometry(2.8, 3.8);
    const material = new THREE.MeshBasicMaterial({ 
      transparent: true,
      opacity: 0
    });
    
    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      if (plane && renderer && scene && camera) {
        baseRotation += 0.020;
        
        const targetRotationY = baseRotation + (mousePos.value.x * 0.15);
        const targetRotationX = (mousePos.value.y * 0.15);
        
        plane.rotation.y += (targetRotationY - plane.rotation.y) * 0.08;
        plane.rotation.x += (targetRotationX - plane.rotation.x) * 0.08;
        plane.position.y = Math.sin(baseRotation * 2) * 0.05;
        
        renderer.render(scene, camera);
      }
    };
    animate();
  };

  const updateTexture = (imageUrl: string) => {
    if (!plane || !renderer) return;

    if (currentTexture) {
      currentTexture.dispose();
    }

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      if (!plane) return;

      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = renderer!.capabilities.getMaxAnisotropy();
      
      const newMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
      });

      if (plane.material instanceof THREE.MeshBasicMaterial) {
        if (plane.material.map) {
          plane.material.map.dispose();
        }
        plane.material.dispose();
      }
      
      plane.material = newMaterial;
      currentTexture = texture;
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!canvasRef.value) return;
    
    const rect = canvasRef.value.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    
    mousePos.value = { x, y };
  };

  const cleanup = () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
    if (renderer) {
      renderer.dispose();
    }
    if (plane) {
      if (plane.geometry) plane.geometry.dispose();
      if (plane.material instanceof THREE.MeshBasicMaterial) {
        if (plane.material.map) {
          plane.material.map.dispose();
        }
        plane.material.dispose();
      }
    }
    if (currentTexture) {
      currentTexture.dispose();
    }
  };

  onMounted(() => {
    initThreeScene();
  });

  onUnmounted(() => {
    cleanup();
  });

  return {
    activeImage,
    handleMouseMove,
    updateTexture
  };
}

