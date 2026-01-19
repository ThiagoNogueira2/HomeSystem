import { ref, onUnmounted, nextTick } from 'vue';
import { useThreeScene } from '../../composables/useThreeScene';
import * as THREE from 'three';
import bg1 from '@/assets/bg-1.jpg';
import bg2 from '@/assets/bg-2.jpg';
import bg3 from '@/assets/bg-3.jpg';
import bg4 from '@/assets/bg-4.jpg';

export const items = [
  { id: 1, number: "01", title: "HOMES", image: bg1 },
  { id: 2, number: "02", title: "MULTI RESIDENTIAL", image: bg2 },
  { id: 3, number: "03", title: "EDUCATION", image: bg3 },
  { id: 4, number: "04", title: "COMMERCIAL/PUBLIC", image: bg4 }
];

export function useExperiencia(canvasRef: any) {
  const hoveredItem = ref<number | null>(null);
  const modalCanvasRef = ref<HTMLCanvasElement | null>(null);
  const modalOpen = ref(false);
  let modalThreeScene: any = null;

  const { activeImage, updateTexture } = useThreeScene(canvasRef);

  const handleMouseEnter = (id: number) => {
    activeImage.value = id;
    hoveredItem.value = id;
    const item = items.find(i => i.id === id);
    if (item) updateTexture(item.image);
  };

  const handleMouseLeave = () => {
    activeImage.value = null;
    hoveredItem.value = null;
  };

  const initModalCanvas = (imageUrl: string) => {
    if (!modalCanvasRef.value) return;

    try {
      const canvas = modalCanvasRef.value;
      const rect = canvas.getBoundingClientRect();
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, rect.width / rect.height, 0.1, 1000);
      camera.position.z = 6;

      const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        alpha: true, 
        antialias: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false
      });
      
      renderer.setSize(rect.width, rect.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      scene.add(new THREE.AmbientLight(0xffffff, 1));

      const geometry = new THREE.PlaneGeometry(2.8, 3.8);
      const plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ transparent: true }));
      scene.add(plane);

      new THREE.TextureLoader().load(imageUrl, (texture) => {
        texture.minFilter = texture.magFilter = THREE.LinearFilter;
        plane.material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
      });

      let baseRotation = 0;
      const mousePos = { x: 0, y: 0 };

      const animate = () => {
        if (!modalOpen.value) return;
        requestAnimationFrame(animate);
        baseRotation += 0.02;
        
        plane.rotation.y += (baseRotation + mousePos.x * 0.15 - plane.rotation.y) * 0.08;
        plane.rotation.x += (mousePos.y * 0.15 - plane.rotation.x) * 0.08;
        plane.position.y = Math.sin(baseRotation * 2) * 0.05;
        
        renderer.render(scene, camera);
      };

      modalThreeScene = {
        mousePos,
        cleanup: () => {
          geometry.dispose();
          if (plane.material instanceof THREE.MeshBasicMaterial) {
            plane.material.dispose();
          }
          renderer.dispose();
          renderer.forceContextLoss();
        }
      };

      animate();
    } catch {
      if (modalThreeScene) {
        modalThreeScene.cleanup();
        modalThreeScene = null;
      }
    }
  };

  const openModal = (item: typeof items[0]) => {
    requestAnimationFrame(() => {
      modalOpen.value = true;
      Object.assign(document.body.style, { overflow: 'hidden', touchAction: 'none' });
      nextTick(() => {
        requestAnimationFrame(() => initModalCanvas(item.image));
      });
    });
  };

  const closeModal = () => {
    modalOpen.value = false;
    Object.assign(document.body.style, { overflow: '', touchAction: '' });
    if (modalThreeScene) {
      modalThreeScene.cleanup();
      modalThreeScene = null;
    }
  };

  const handleModalTouchMove = (e: TouchEvent) => {
    if (!modalThreeScene?.mousePos || !modalCanvasRef.value || !e.touches.length) return;
    const rect = modalCanvasRef.value.getBoundingClientRect();
    const touch = e.touches[0];
    modalThreeScene.mousePos.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    modalThreeScene.mousePos.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
  };

  onUnmounted(() => document.body.style.overflow = '');

  return {
    items,
    hoveredItem,
    modalCanvasRef,
    modalOpen,
    activeImage,
    handleMouseEnter,
    handleMouseLeave,
    openModal,
    closeModal,
    handleModalTouchMove
  };
}
