<template>
    <div class="relative pt-12 sm:pt-16 md:pt-32 lg:pt-40 px-4 sm:px-6 md:px-12 lg:px-40 bg-[#141414] max-w-[2000px]">
        <!-- Área branca à direita - responsiva -->
        <div class="absolute top-0 right-0 w-[25%] sm:w-[20%] lg:w-[30%] h-full min-h-screen bg-white z-0"></div>
        
        <!-- Título e linha divisória -->
        <div class="relative z-10">
            <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white italic font-light">
                Prévia dos Projetos
            </h1>
            <div class="mt-4 sm:mt-5 lg:mt-7 w-[70%] sm:w-[60%] md:w-[55%] h-px bg-white"></div>
        </div>

        <!-- Container de scroll - altura responsiva -->
        <div ref="scrollArea" class="relative -mt-6 sm:-mt-8 lg:-mt-12" :style="{ height: scrollHeight }">
            <div class="sticky top-0 h-screen overflow-hidden flex items-center">
                <div 
                    ref="containerRef" 
                    class="flex h-[50%] sm:h-[55%] md:h-[65%] lg:h-[75%] items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 relative z-10 transition-transform duration-300 ease-out" 
                    style="will-change: transform;"
                >
                    <!-- Card 1 -->
                    <div class="flex flex-col shrink-0 h-full">
                        <img 
                            src="../../assets/bg-scroll-1.jpg" 
                            alt="Le Grand Hotel" 
                            class="w-[280px] xs:w-[320px] sm:w-[380px] md:w-[500px] lg:w-[670px] xl:w-[750px] object-cover shrink-0 rounded-lg shadow-2xl" 
                            style="height: 95%;"
                        >
                        <div class="text-white mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-xl lg:text-2xl italic font-light">
                            LE GRAND HOTEL<br>
                            <span class="text-xs sm:text-sm md:text-lg lg:text-xl opacity-80">BORDEAUX, FRANCE</span>
                        </div>
                    </div>

                    <!-- Card 2 -->
                    <div class="flex flex-col shrink-0 h-full">
                        <img 
                            src="../../assets/bg-scroll-2.jpg" 
                            alt="Casa del Sol" 
                            class="w-[280px] xs:w-[320px] sm:w-[380px] md:w-[500px] lg:w-[670px] xl:w-[750px] object-cover shrink-0 rounded-lg shadow-2xl" 
                            style="height: 95%;"
                        >
                        <div class="text-white mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-xl lg:text-2xl italic font-light">
                            CASA DEL SOL<br>
                            <span class="text-xs sm:text-sm md:text-lg lg:text-xl opacity-80">ALCALÁ DE HENARES, SPAIN</span>
                        </div>
                    </div>

                    <!-- Card 3 -->
                    <div class="flex flex-col shrink-0 h-full">
                        <img 
                            src="../../assets/bg-scroll-3.jpg" 
                            alt="Jessamine" 
                            class="w-[280px] xs:w-[320px] sm:w-[380px] md:w-[500px] lg:w-[670px] xl:w-[750px] object-cover shrink-0 rounded-lg shadow-2xl" 
                            style="height: 95%;"
                        >
                        <div 
                            ref="lastText" 
                            class="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-xl lg:text-2xl italic font-light transition-colors duration-500 ease-out" 
                            :style="{ color: textColor }"
                        >
                            JESSAMINE<br>
                            <span class="text-xs sm:text-sm md:text-lg lg:text-xl opacity-80">DHAKA, BANGLADESH</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Indicador de scroll para mobile (opcional, pode remover se não quiser) -->
        <div 
            v-if="showScrollIndicator && !scrollStarted" 
            class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:hidden"
        >
            <div class="flex flex-col items-center gap-2 animate-bounce">
                <div class="text-white/60 text-xs uppercase tracking-wider">Role para explorar</div>
                <svg 
                    class="w-6 h-6 text-white/60" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const scrollArea = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const lastText = ref<HTMLElement | null>(null)
const textColor = ref('#ffffff')
const scrollStarted = ref(false)
const showScrollIndicator = ref(true)

// Altura do scroll área responsiva
const scrollHeight = computed(() => {
    if (typeof window === 'undefined') return '200vh'
    const width = window.innerWidth
    if (width < 640) return '250vh' // Mobile - mais espaço para scroll
    if (width < 768) return '220vh' // Tablet pequeno
    return '200vh' // Desktop
})

// Handler de scroll com cálculos responsivos
const handleScroll = () => {
    if (!scrollArea.value || !containerRef.value) return

    const rect = scrollArea.value.getBoundingClientRect()
    const scrollProgress = Math.max(0, -rect.top / window.innerHeight)
    
    // Marca que o usuário começou a scrollar (para esconder indicador)
    if (scrollProgress > 0.05) {
        scrollStarted.value = true
    }
    
    // Ajusta os valores baseado no tamanho da tela
    const screenWidth = window.innerWidth
    let imageWidth = 670
    let gap = 64
    
    // Responsividade dos tamanhos e gaps
    if (screenWidth >= 1400) {
        imageWidth = 750
        gap = 64
    } else if (screenWidth >= 1024) {
        imageWidth = 670
        gap = 64
    } else if (screenWidth >= 768) {
        imageWidth = 500
        gap = 48
    } else if (screenWidth >= 640) {
        imageWidth = 380
        gap = 32
    } else if (screenWidth >= 375) {
        imageWidth = 320
        gap = 24
    } else {
        imageWidth = 280
        gap = 24
    }
    
    const imagesToMove = 2
    const maxTranslateX = (imageWidth + gap) * imagesToMove
    
    // Ajusta a velocidade do scroll no mobile para ser mais suave
    const speedMultiplier = screenWidth < 768 ? 0.9 : 1
    const translateX = Math.min(scrollProgress * maxTranslateX * speedMultiplier, maxTranslateX)
    
    containerRef.value.style.transform = `translateX(-${translateX}px)`
    
    // Mudança de cor do texto do último card
    if (lastText.value) {
        const textRect = lastText.value.getBoundingClientRect()
        
        // Ajusta o ponto de início da área branca baseado no tamanho da tela
        let whiteAreaStart = screenWidth * 0.7
        if (screenWidth < 640) {
            whiteAreaStart = screenWidth * 0.75
        } else if (screenWidth < 1024) {
            whiteAreaStart = screenWidth * 0.8
        }
        
        // Transição suave e gradual de cor
        const transitionZone = 150 // pixels de zona de transição
        if (textRect.left >= whiteAreaStart - transitionZone) {
            const progress = Math.min(1, (textRect.left - (whiteAreaStart - transitionZone)) / transitionZone)
            
            // Interpolação suave de cor de branco (#ffffff) para cinza escuro (#666666)
            const r = Math.floor(255 - (255 - 102) * progress)
            const g = Math.floor(255 - (255 - 102) * progress)
            const b = Math.floor(255 - (255 - 102) * progress)
            
            textColor.value = `rgb(${r}, ${g}, ${b})`
        } else {
            textColor.value = '#ffffff'
        }
    }
}

// Listener de resize para recalcular em mudanças de orientação/tamanho
let resizeTimeout: number | null = null
const handleResize = () => {
    if (resizeTimeout) clearTimeout(resizeTimeout)
    resizeTimeout = window.setTimeout(() => {
        handleScroll()
    }, 100)
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    handleScroll()
    
    // Esconde o indicador após 3 segundos
    setTimeout(() => {
        showScrollIndicator.value = false
    }, 3000)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
    if (resizeTimeout) clearTimeout(resizeTimeout)
})
</script>

<style scoped>
/* Otimização de performance */
img {
    transition: transform 0.3s ease, filter 0.3s ease;
    backface-visibility: hidden;
    transform: translateZ(0);
}

/* Hover sutil nos cards - apenas desktop */
@media (min-width: 1024px) {
    img:hover {
        transform: scale(1.02) translateZ(0);
        filter: brightness(1.05);
    }
}

/* Suavização do scroll no mobile */
@media (max-width: 767px) {
    * {
        -webkit-overflow-scrolling: touch;
    }
}

/* Animação do indicador */
@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.animate-bounce {
    animation: bounce 2s infinite;
}
</style>
