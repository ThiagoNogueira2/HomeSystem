<template>
  <svg 
    width="28" 
    height="28" 
    viewBox="0 0 28 28" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    :style="{
      transform: isHovered ? 'translate(2px, -2px)' : 'translate(0, 0)',
      transition: 'transform 0.3s ease-out'
    }"
  >
    <path 
      d="M21.4493 10.2226L4.37909 27.2928L0.706947 23.618L17.7711 6.55071L18.6244 5.69719H17.4175H0.56981V0.5H27.5V27.4302H22.3028V10.5762V9.36905L21.4493 10.2226Z" 
      stroke="#141414" 
      :fill="isHovered ? '#141414' : 'none'"
      :style="{
        transition: 'fill 0.3s ease-out'
      }"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  isHovered: boolean
}>();
</script>
