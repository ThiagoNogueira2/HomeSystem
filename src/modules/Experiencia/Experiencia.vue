<template>
   <section class="bg-[#e8e8e8] py-15 pb-40 min-[1200px]:py-45 relative ">

    <div class="mx-auto px-4 max-w-6xl relative z-10 ">
      <h1 class="text-2xl sm:text-4xl lg:text-6xl mb-8 " style="color: #141414">
        Our <span style="font-style: italic">Expertise</span>
      </h1>
      
      <div class="relative">
        <div 
          v-for="item in items"
          :key="item.id"
          @mouseenter="handleMouseEnter(item.id)"
          @mouseleave="handleMouseLeave"
          class="group relative flex items-center justify-between py-6 px-4 border-b border-[#141414] cursor-pointer"
          :style="{
            backgroundColor: hoveredItem === item.id ? 'rgba(20,20,20,0.05)' : 'transparent',
            transition: 'all 0.3s ease-out',
            transform: `translateX(${hoveredItem === item.id ? 8 : 0}px)`
          }"
        >
          <div class="flex items-center gap-8 flex-1">
            <span 
              class="text-sm sm:text-base lg:text-lg font-medium"
              :style="{ 
                color: '#6b7280',
                transform: hoveredItem === item.id ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.3s ease-out'
              }"
            >
              {{ item.number }}
            </span>
            <span 
              class="text-sm sm:text-base lg:text-lg font-medium"
              :style="{ 
                color: '#141414',
                transform: hoveredItem === item.id ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.3s ease-out'
              }"
            >
              {{ item.title }}
            </span>
          </div>
          
          <!-- Ícone para mobile -->
          <button
            @click.stop="openModal(item)"
            class="min-[600px]:hidden p-2 hover:bg-[#141414]/10 rounded-full transition-colors mr-2"
            aria-label="Ver imagem"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#141414" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          
          <ArrowIcon :is-hovered="hoveredItem === item.id" />
        </div>
      </div>
    </div>

    <!-- Canvas para desktop (escondido no mobile) -->
    <div 
      class="absolute pointer-events-none max-[599px]:hidden"
      :style="{
        top: '50%',
        right: '30%',
        transform: 'translateY(-50%)',
        width: '332px',
        height: '450px',
        opacity: activeImage ? 1 : 0,
        zIndex: 0,
        filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.4))',
        transition: 'opacity 0.3s ease-out'
      }"
    >
      <canvas 
        ref="canvasRef"
        :style="{
          width: '100%',
          height: '100%',
          display: 'block'
        }"
      />
    </div>

    <!-- Modal para mobile -->
    <Transition name="modal">
      <div 
        v-if="modalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 min-[600px]:hidden"
        style="will-change: opacity"
        @click="closeModal"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        
        <!-- Conteúdo do modal -->
        <div 
          class="relative z-10 w-full max-w-sm"
          style="will-change: transform"
          @click.stop
        >
          <!-- Botão fechar -->
          <button
            @click="closeModal"
            class="absolute -top-12 right-0 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Fechar"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <!-- Canvas do modal -->
          <div 
            class="relative overflow-hidden rounded-lg"
            :style="{
              width: '100%',
              aspectRatio: '3/4',
              willChange: 'transform'
            }"
          >
            <canvas 
              ref="modalCanvasRef"
              @touchmove.prevent="handleModalTouchMove"
              :style="{
                width: '100%',
                height: '100%',
                display: 'block',
                touchAction: 'none'
              }"
            />
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';
import bg1 from '@/assets/bg-1.jpg';
import bg2 from '@/assets/bg-2.jpg';
import bg3 from '@/assets/bg-3.jpg';
import bg4 from '@/assets/bg-4.jpg';
import ArrowIcon from './ArrowIcon.vue';
import { useThreeScene } from '../../composables/useThreeScene';
import * as THREE from 'three';

interface Item {
  id: number;
  number: string;
  title: string;
  image: string;
}

const hoveredItem = ref<number | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const modalCanvasRef = ref<HTMLCanvasElement | null>(null);
const modalOpen = ref(false);
const currentModalItem = ref<Item | null>(null);
let modalThreeScene: any = null;

const { activeImage, handleMouseMove, updateTexture } = useThreeScene(canvasRef);

const items: Item[] = [
  { id: 1, number: "01", title: "HOMES", image: bg1 },
  { id: 2, number: "02", title: "MULTI RESIDENTIAL", image: bg2 },
  { id: 3, number: "03", title: "EDUCATION", image: bg3 },
  { id: 4, number: "04", title: "COMMERCIAL/PUBLIC", image: bg4 }
];

const handleMouseEnter = (id: number) => {
  activeImage.value = id;
  hoveredItem.value = id;
  const item = items.find(i => i.id === id);
  if (item) {
    updateTexture(item.image);
  }
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

  const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas, 
    alpha: true, 
    antialias: true
  });
  renderer.setSize(rect.width, rect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const geometry = new THREE.PlaneGeometry(2.8, 3.8);
  const material = new THREE.MeshBasicMaterial({ transparent: true });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  // Carrega a textura
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(imageUrl, (texture) => {
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    
    const newMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    plane.material = newMaterial;
  });

  let baseRotation = 0;
  const mousePos = { x: 0, y: 0 };

  const animate = () => {
    if (!modalOpen.value) return;
    
    requestAnimationFrame(animate);
    baseRotation += 0.020;
    
    const targetRotationY = baseRotation + (mousePos.x * 0.15);
    const targetRotationX = (mousePos.y * 0.15);
    
    plane.rotation.y += (targetRotationY - plane.rotation.y) * 0.08;
    plane.rotation.x += (targetRotationX - plane.rotation.x) * 0.08;
    plane.position.y = Math.sin(baseRotation * 2) * 0.05;
    
    renderer.render(scene, camera);
  };

  modalThreeScene = {
    scene,
    renderer,
    camera,
    plane,
    mousePos,
    cleanup: () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    }
  };

  animate();
};

const openModal = async (item: Item) => {
  currentModalItem.value = item;
  modalOpen.value = true;
  document.body.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';
  
  await nextTick();
  requestAnimationFrame(() => {
    initModalCanvas(item.image);
  });
};

const closeModal = () => {
  modalOpen.value = false;
  currentModalItem.value = null;
  document.body.style.overflow = '';
  document.body.style.touchAction = '';
  
  if (modalThreeScene) {
    modalThreeScene.cleanup();
    modalThreeScene = null;
  }
};

const handleModalMouseMove = (e: MouseEvent) => {
  if (!modalThreeScene || !modalCanvasRef.value) return;
  
  const rect = modalCanvasRef.value.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  
  modalThreeScene.mousePos.x = x;
  modalThreeScene.mousePos.y = y;
};

const handleModalTouchMove = (e: TouchEvent) => {
  if (!modalThreeScene || !modalCanvasRef.value || e.touches.length === 0) return;
  
  const rect = modalCanvasRef.value.getBoundingClientRect();
  const touch = e.touches[0];
  const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
  
  modalThreeScene.mousePos.x = x;
  modalThreeScene.mousePos.y = y;
};

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<style scoped>
.modal-enter-active {
  transition: opacity 0.2s ease-out;
}

.modal-leave-active {
  transition: opacity 0.15s ease-in;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div > div,
.modal-leave-active > div > div {
  transition: transform 0.2s ease-out;
}

.modal-enter-from > div > div {
  transform: scale(0.95);
}

.modal-leave-to > div > div {
  transform: scale(0.95);
}
</style>
