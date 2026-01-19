<template>
    <div v-if="!isMobile" class="relative bg-[#141414] pt-20 xl:pt-40 px-8 xl:pl-40">
        <div class="absolute top-0 right-0 w-[30%] h-full bg-white" />

        <div class="relative z-10 mb-8">
            <h1 class="text-3xl xl:text-5xl text-white italic">Prévia dos Projetos</h1>
            <div class="mt-6 w-3/5 h-px bg-white" />
        </div>

        <div ref="scrollArea" class="relative h-[200vh]">
            <div class="sticky top-0 h-screen flex items-center overflow-hidden">
                <div ref="container" class="flex gap-16 transition-transform duration-300 ease-out">
                    <div v-for="projeto in projetos" :key="projeto.id" class="shrink-0">
                        <img :src="projeto.imagem" :alt="projeto.titulo"
                            class="w-[85vw] xl:w-[670px] h-[60vh] xl:h-[70vh] object-cover rounded-lg" />
                        <p ref="textos" class="mt-4 text-xl xl:text-2xl italic transition-colors duration-300"
                            :style="{ color: projeto.id === 3 ? corTexto : '#fff' }">
                            {{ projeto.titulo }}<br>{{ projeto.local }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div v-else class="bg-[#141414] py-16 px-6">
        <h1 class="text-2xl text-white italic mb-2">Prévia dos Projetos</h1>
        <div class="w-full h-px bg-white mb-8" />

        <div ref="emblaRef" class="overflow-hidden">
            <div class="flex gap-6">
                <div v-for="projeto in projetos" :key="projeto.id" class="flex-[0_0_85%]">
                    <img :src="projeto.imagem" :alt="projeto.titulo" class="w-full h-[50vh] object-cover rounded-lg" />
                    <p class="text-white mt-4 text-lg italic">
                        {{ projeto.titulo }}<br>{{ projeto.local }}
                    </p>
                </div>
            </div>
        </div>

        <div class="flex justify-center gap-2 mt-6">
            <button v-for="(_, i) in projetos" :key="i" @click="emblaApi?.scrollTo(i)" :class="['w-2 h-2 rounded-full transition-colors',
                slideAtual === i ? 'bg-white' : 'bg-gray-600']" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import img1 from '../../assets/bg-scroll-1.jpg'
import img2 from '../../assets/bg-scroll-2.jpg'
import img3 from '../../assets/bg-scroll-3.jpg'

const projetos = [
    { id: 1, titulo: 'LE GRAND HOTEL', local: 'BORDEAUX, FRANCE', imagem: img1 },
    { id: 2, titulo: 'CASA DEL SOL', local: 'ALCALÁ DE HENARES, SPAIN', imagem: img2 },
    { id: 3, titulo: 'JESSAMINE', local: 'DHAKA, BANGLADESH', imagem: img3 }
]

const isMobile = ref(window.innerWidth < 768)
const scrollArea = ref<HTMLElement>()
const container = ref<HTMLElement>()
const textos = ref<HTMLElement[]>([])
const corTexto = ref('#fff')

const [emblaRef, emblaApi] = emblaCarouselVue({ loop: false, align: 'start' })
const slideAtual = ref(0)

const handleScroll = () => {
    if (!scrollArea.value || !container.value) return

    const { top } = scrollArea.value.getBoundingClientRect()
    const progress = Math.max(0, -top / window.innerHeight)
    const moveX = Math.min(progress * 1400, 1400)

    container.value.style.transform = `translateX(-${moveX}px)`

    const ultimoTexto = textos.value[2]
    if (ultimoTexto) {
        const whiteStart = window.innerWidth * 0.7
        corTexto.value = ultimoTexto.getBoundingClientRect().left >= whiteStart ? '#666' : '#fff'
    }
}

const handleResize = () => isMobile.value = window.innerWidth < 768

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    handleScroll()

    emblaApi.value?.on('select', () => {
        slideAtual.value = emblaApi.value?.selectedScrollSnap() || 0
    })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
})
</script>