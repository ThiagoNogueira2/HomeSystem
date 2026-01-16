<template>
    <div class="relative pt-40 pl-40 bg-[#141414] max-w-[2000px]">
        <div class="absolute top-0 right-0 w-[30%] h-full min-h-screen bg-white z-0"></div>
        
        <div class="relative z-10">
            <h1 class="text-4xl lg:text-5xl text-white italic">Prévia dos Projetos</h1>
            <div class="mt-7 w-[60%] h-px bg-white"></div>
        </div>

        <div ref="scrollArea" class="relative -mt-12" style="height: 200vh;">
            <div class="sticky top-0 h-screen overflow-hidden flex items-center">
                <div ref="containerRef" class="flex h-[75%] items-center gap-16 relative z-10 transition-transform duration-300 ease-out" style="will-change: transform;">
                    <div class="flex flex-col shrink-0 h-full">
                        <img src="../../assets/bg-scroll-1.jpg" alt="Projeto 1" class="w-[670px] object-cover shrink-0 rounded-lg" style="height: 95%;">
                        <div class="text-white mt-4 text-2xl italic">LE GRAND HOTEL<br>BORDEAUX, FRANCE</div>
                    </div>
                    <div class="flex flex-col shrink-0 h-full">
                        <img src="../../assets/bg-scroll-2.jpg" alt="Projeto 2" class="w-[670px] object-cover shrink-0 rounded-lg" style="height: 95%;">
                        <div class="text-white mt-4 text-2xl italic">CASA DEL SOL<br>ALCALÁ DE HENARES, SPAIN</div>
                    </div>
                    <div class="flex flex-col shrink-0 h-full">
                        <img src="../../assets/bg-scroll-3.jpg" alt="Projeto 3" class="w-[670px] object-cover shrink-0 rounded-lg" style="height: 95%;">
                        <div ref="lastText" class="mt-4 text-2xl italic" :style="{ color: textColor }">JESSAMINE<br>DHAKA, BANGLADESH</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrollArea = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const lastText = ref<HTMLElement | null>(null)
const textColor = ref('#ffffff')

const handleScroll = () => {
    if (!scrollArea.value || !containerRef.value) return

    const rect = scrollArea.value.getBoundingClientRect()
    const scrollProgress = Math.max(0, -rect.top / window.innerHeight)
    
    const imageWidth = 600
    const gap = 64
    const imagesToMove = 2
    const maxTranslateX = (imageWidth + gap) * imagesToMove
    
    const translateX = Math.min(scrollProgress * maxTranslateX, maxTranslateX)
    containerRef.value.style.transform = `translateX(-${translateX}px)`
    
    if (lastText.value) {
        const rect = lastText.value.getBoundingClientRect()
        const whiteAreaStart = window.innerWidth * 0.7
        textColor.value = rect.left >= whiteAreaStart ? '#666666' : '#ffffff'
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>