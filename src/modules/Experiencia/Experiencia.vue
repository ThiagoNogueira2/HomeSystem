<template>
  <section class="bg-[#e8e8e8] py-15 pb-40 min-[1200px]:py-45 relative">
    <div class="mx-auto px-4 max-w-6xl relative z-10">
      <h1 class="text-2xl sm:text-4xl lg:text-6xl mb-8 text-[#141414]">
        Our <span class="italic">Expertise</span>
      </h1>
      
      <div class="relative">
        <div 
          v-for="item in items"
          :key="item.id"
          @mouseenter="handleMouseEnter(item.id)"
          @mouseleave="handleMouseLeave"
          class="group relative flex items-center justify-between py-6 px-4 border-b border-[#141414] cursor-pointer will-change-transform"
          :class="{ 'translate-x-2 bg-[#141414]/5': hoveredItem === item.id }"
          style="transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)"
        >
          <div class="flex items-center gap-8 flex-1">
            <span 
              class="text-sm sm:text-base lg:text-lg font-medium text-gray-500 will-change-transform"
              :class="{ 'scale-110': hoveredItem === item.id }"
              style="transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            >
              {{ item.number }}
            </span>
            <span 
              class="text-sm sm:text-base lg:text-lg font-medium text-[#141414] will-change-transform"
              :class="{ 'translate-x-1': hoveredItem === item.id }"
              style="transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)"
            >
              {{ item.title }}
            </span>
          </div>
          
          <button
            @click.stop="openModal(item)"
            class="min-[600px]:hidden p-2 hover:bg-[#141414]/10 active:bg-[#141414]/20 active:scale-95 rounded-full transition-all duration-200 mr-2 will-change-transform"
            aria-label="Ver imagem"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#141414" stroke-width="2" class="transition-transform duration-200">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
          
          <ArrowIcon :is-hovered="hoveredItem === item.id" />
        </div>
      </div>
    </div>

    <div 
      class="absolute top-1/2 right-[30%] -translate-y-1/2 w-[332px] h-[450px] pointer-events-none max-[599px]:hidden drop-shadow-2xl will-change-transform"
      :class="{ 'opacity-0 scale-95': !activeImage, 'opacity-100 scale-100': activeImage }"
      style="transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); backface-visibility: hidden; transform-style: preserve-3d"
    >
      <canvas ref="canvasRef" class="w-full h-full block" style="transform: translateZ(0)" />
    </div>

    <Transition name="modal">
      <div 
        v-if="modalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 min-[600px]:hidden"
        @click="closeModal"
      >
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        
        <div class="relative z-10 w-full max-w-sm" @click.stop>
          <button
            @click="closeModal"
            class="absolute -top-12 right-0 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Fechar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          
          <div class="relative overflow-hidden rounded-lg aspect-[3/4]">
            <canvas 
              ref="modalCanvasRef"
              @touchmove.prevent="handleModalTouchMove"
              class="w-full h-full block touch-none"
            />
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, onUnmounted, nextTick } from 'vue';
import ArrowIcon from './ArrowIcon.vue';
import { useThreeScene } from '../../composables/useThreeScene';
import * as THREE from 'three';
import bg1 from '@/assets/bg-1.jpg';
import bg2 from '@/assets/bg-2.jpg';
import bg3 from '@/assets/bg-3.jpg';
import bg4 from '@/assets/bg-4.jpg';

const items = [
  { id: 1, number: "01", title: "HOMES", image: bg1 },
  { id: 2, number: "02", title: "MULTI RESIDENTIAL", image: bg2 },
  { id: 3, number: "03", title: "EDUCATION", image: bg3 },
  { id: 4, number: "04", title: "COMMERCIAL/PUBLIC", image: bg4 }
];

const hoveredItem = ref<number | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
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

  const canvas = modalCanvasRef.value;
  const rect = canvas.getBoundingClientRect();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, rect.width / rect.height, 0.1, 1000);
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
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
      renderer.dispose();
      geometry.dispose();
    }
  };

  animate();
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
</script>

<style scoped>
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.modal-enter-active, .modal-leave-active { 
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1); 
  will-change: opacity;
}
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active > div > div, .modal-leave-active > div > div { 
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
  will-change: transform;
}
.modal-enter-from > div > div, .modal-leave-to > div > div { 
  transform: scale(0.92) translateZ(0); 
  backface-visibility: hidden;
}

canvas {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}
</style>
