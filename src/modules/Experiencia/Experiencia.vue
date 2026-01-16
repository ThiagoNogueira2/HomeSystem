<template>
  <section class="bg-[#e8e8e8] py-24 pt-50 pb-40 relative">
    <div class="container mx-auto px-4 max-w-6xl relative z-10">
      <h1 class="text-4xl lg:text-6xl mb-16" style="color: #141414">
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
          <div class="flex items-center gap-8">
            <span 
              class="text-lg font-medium"
              :style="{ 
                color: '#6b7280',
                transform: hoveredItem === item.id ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.3s ease-out'
              }"
            >
              {{ item.number }}
            </span>
            <span 
              class="text-lg font-medium"
              :style="{ 
                color: '#141414',
                transform: hoveredItem === item.id ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.3s ease-out'
              }"
            >
              {{ item.title }}
            </span>
          </div>
          <ArrowIcon :is-hovered="hoveredItem === item.id" />
        </div>
      </div>
    </div>

    <div 
      class="absolute pointer-events-auto"
      @mousemove="handleMouseMove"
      :style="{
        top: '50%',
        right: '30%',
        transform: 'translateY(-50%)',
        width: '332px',
        height: '450px',
        opacity: activeImage ? 1 : 0,
        pointerEvents: activeImage ? 'auto' : 'none',
        zIndex: 20,
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
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import bg1 from '@/assets/bg-1.jpg';
import bg2 from '@/assets/bg-2.jpg';
import bg3 from '@/assets/bg-3.jpg';
import bg4 from '@/assets/bg-4.jpg';
import ArrowIcon from './ArrowIcon.vue';
import { useThreeScene } from '../../composables/useThreeScene';

interface Item {
  id: number;
  number: string;
  title: string;
  image: string;
}

const hoveredItem = ref<number | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

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
</script>
