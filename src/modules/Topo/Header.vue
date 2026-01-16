<template>
  <header class="mx-auto relative h-screen w-auto">
    <img
      src="@/assets/home.jpg"
      alt="Imagem de fundo"
      class="absolute h-full w-full object-cover object-center"
    />
    <div class="absolute inset-0 bg-black/40"></div>

    <div class="absolute -bottom-30 left-42 right-0 bg-white p-20 z-10 max-[1199px]:hidden">
      <div class="mx-auto flex gap-12">
        <div class="flex-1">
          <h2 class="text-4xl text-black">Casas personalizadas<br>construídas por humanos,<br>para humanos</h2>
        </div>
        <div class="flex-1">
          <p class="text-black">Trabalhamos arduamente para compreender as suas necessidades e partilhar as suas aspirações, com o objetivo de construir uma relação sólida e de confiança enquanto o orientamos ao longo do processo de conceção e construção. process.</p>
        </div>
      </div>
    </div>

    
    <nav class="absolute w-full">
      <div class="flex items-center justify-end gap-16 text-white max-[1199px]:hidden">
        <ul class="flex items-center gap-24">
          <li><a href="#">Home</a></li>
          <li><a href="#">Pressione</a></li>
          <li><a href="#">Navegar</a></li>
          <li><a href="#">Iniciar</a></li>
        </ul>

        <div class="relative">
          <a href="#" class="bg-[#141414] px-10 py-12 text-white flex items-center gap-2 font-bold">
            Get a Quote
            <Svg />
          </a>
          <div class="absolute top-full left-38 right-0 bg-white h-[750px]">
          </div>
        </div>
      </div>

      <div :class="['min-[1200px]:hidden transition-all duration-300 relative z-50', isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-xl' : '']">
        <div class="flex items-center justify-between px-6 md:px-10 py-5">
          <div class="text-white font-bold text-2xl tracking-widest">PARALLAX</div>
          
          <button
            @click.stop="toggleMenu"
            class="relative w-12 h-12 flex flex-col items-center justify-center gap-2 focus:outline-none group touch-manipulation"
            aria-label="Menu"
          >
            <span :class="[
              'w-7 h-0.5 bg-white transition-all max-[1199px]:duration-200 duration-500 ease-out pointer-events-none',
              menuOpen ? 'rotate-45 translate-y-2.5' : 'group-hover:w-9'
            ]"></span>
            <span :class="[
              'w-7 h-0.5 bg-white transition-all max-[1199px]:duration-200 duration-500 ease-out pointer-events-none',
              menuOpen ? 'opacity-0 scale-0' : 'opacity-100 group-hover:w-9'
            ]"></span>
            <span :class="[
              'w-7 h-0.5 bg-white transition-all max-[1199px]:duration-200 duration-500 ease-out pointer-events-none',
              menuOpen ? '-rotate-45 -translate-y-2.5' : 'group-hover:w-9'
            ]"></span>
          </button>
        </div>
      </div>
    </nav>

    <Transition name="menu-overlay">
      <div 
        v-if="menuOpen" 
        class="min-[1200px]:hidden fixed inset-0 z-40 overflow-y-auto"
        @click.self="closeMenu"
      >
        <div 
          class="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black backdrop-blur-2xl"
          @click.stop="closeMenu"
        ></div>
        
        <div class="relative z-10 min-h-full flex flex-col items-center justify-center px-8 md:px-16 py-20">
          <div class="absolute top-8 left-8 md:left-16 text-white/20 text-xs tracking-[0.3em] uppercase font-light">
            Menu
          </div>
          
          <ul class="space-y-6 md:space-y-10 text-center mb-16 relative z-10">
            <li 
              v-for="(item, index) in menuItems" 
              :key="item.name"
              class="menu-item-animate"
              :style="{ animationDelay: `${index * 50}ms` }"
            >
              <a 
                :href="item.href" 
                class="group relative inline-block text-white text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight py-3 transition-all duration-500 hover:text-white/70"
                @click="closeMenu"
              >
                <span class="relative z-10">{{ item.name }}</span>
                <span class="absolute bottom-2 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-700 ease-out"></span>
              </a>
            </li>
          </ul>

          <div class="menu-item-animate relative z-10" style="animation-delay: 200ms">
            <a 
              href="#" 
              class="group relative px-10 py-5 md:px-14 md:py-6 bg-white text-black flex items-center gap-4 font-bold text-base tracking-wider overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
              @click="closeMenu"
            >
              <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              <span class="relative z-10">Get a Quote</span>
              <Svg class="relative z-10 text-black group-hover:translate-x-2 transition-transform duration-500" />
            </a>
          </div>

          <div class="absolute bottom-8 text-white/30 text-xs tracking-[0.25em] font-light menu-item-animate z-10" style="animation-delay: 250ms">
            CUSTOM HOMES · BUILT WITH PASSION
          </div>

          <div class="absolute top-1/3 -left-20 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div class="absolute bottom-1/4 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
      </div>
    </Transition>

    <!-- Desktop -->
    <div class="absolute inset-0 flex justify-center text-center pt-70 max-md:hidden">
        <div>
            <p class="text-base text-white mb-4 font-public-sans max-[1199px]:text-sm">PARALLAX CUSTOM HOMES</p>
            <h1 class="text-7xl text-white italic mb-8 max-[1199px]:text-5xl max-[1199px]:leading-tight">Você é único. <br>Sua casa também deverá ser.</h1>
            <a href="#" class="bg-[#141414] px-12 py-6 text-white items-center gap-2 inline-flex font-bold">
                Get a Quote
                <Svg />
            </a>
        </div>
    </div>

    
    <div class="absolute inset-0 flex flex-col justify-end text-left px-6 pb-13 hidden max-md:flex">
        <div class="mb-8">
            <p class="text-sm text-white mb-4 font-public-sans">PARALLAX CUSTOM HOMES</p>
            <h1 class="text-3xl text-white italic leading-tight">Você é único. <br>Sua casa também será!</h1>
        </div>
        
        <div>
            <a 
                href="#" 
                class="group w-full flex items-center justify-between px-6 py-4 bg-[#141414] text-white text-xl font-bold tracking-wider transition-all duration-300 border-b-2 border-white hover:border-white/70"
            >
                <span>Get a Quote</span>
                <Svg class="text-white group-hover:translate-x-2 transition-transform duration-300" />
            </a>
        </div>
    </div>
        
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Svg from './Svg.vue'

const menuOpen = ref(false)
const isScrolled = ref(false)

const menuItems = [
  { name: 'Home', href: '#' },
  { name: 'Pressione', href: '#' },
  { name: 'Navegar', href: '#' },
  { name: 'Iniciar', href: '#' }
]

const toggleMenu = () => {
  console.log('Toggle menu chamado. Estado atual:', menuOpen.value)
  menuOpen.value = !menuOpen.value
  
  if (menuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
  
  console.log('Novo estado:', menuOpen.value)
}

const closeMenu = () => {
  console.log('Close menu chamado')
  menuOpen.value = false
  document.body.style.overflow = ''
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.menu-overlay-enter-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.menu-overlay-leave-active {
  transition: all 0.25s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.menu-overlay-enter-from,
.menu-overlay-leave-to {
  opacity: 0;
}

.menu-overlay-enter-from .relative {
  transform: scale(1.1);
}

.menu-overlay-leave-to .relative {
  transform: scale(0.95);
}

@keyframes menu-item-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-item-animate {
  opacity: 0;
  animation: menu-item-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>


