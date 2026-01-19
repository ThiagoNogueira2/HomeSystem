<template>
  <section class="bg-[#e8e8e8] pb-20 pt-10 pb-10 min-[1200px]:pt-52 min-[1200px]:pb-32 relative ">
    <div class="mx-auto px-4 max-w-6xl relative z-10">
      <h1 class="text-4xl sm:text-3xl lg:text-4xl mb-8 text-[#141414]">
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
import { ref } from 'vue';
import ArrowIcon from './ArrowIcon.vue';
import { useExperiencia } from './useExperiencia';

const canvasRef = ref<HTMLCanvasElement | null>(null);

const {
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
} = useExperiencia(canvasRef);
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
