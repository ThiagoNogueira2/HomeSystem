<template>
  <header class=" mx-auto relative h-screen w-auto">
    <img
      src="@/assets/home.jpg"
      alt="Imagem de fundo"
      class="absolute h-full w-full object-cover object-center"
    />
    <div class="absolute inset-0 bg-black/40"></div>

    <div class="absolute -bottom-30 left-42 right-0 bg-white p-20 z-10">
      <div class="mx-auto flex gap-12">
        <div class="flex-1">
          <h2 class="text-4xl text-black">Casas personalizadas<br>construídas por humanos,<br>para humanos</h2>
        </div>
        <div class="flex-1">
          <p class="text-black">Trabalhamos arduamente para compreender as suas necessidades e partilhar as suas aspirações, com o objetivo de construir uma relação sólida e de confiança enquanto o orientamos ao longo do processo de conceção e construção. process.</p>
        </div>
      </div>
    </div>

    
    <nav class="absolute w-full ">
      <div class="flex  items-center justify-end gap-16  text-white">
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
    </nav>

    <div class="absolute inset-0 flex justify-center text-center pt-70">
        <div>
            <p class="text-base text-white mb-4 font-public-sans">PARALLAX CUSTOM HOMES</p>
            <h1 class="text-7xl text-white italic mb-8">Você é único. <br>Sua casa também deverá ser.</h1>
            <a href="#" class="bg-[#141414] px-12 py-6 text-white  items-center gap-2 inline-flex font-bold">
                Get a Quote
                <Svg />
            </a>
        </div>
    </div>
        
  </header>
</template>

<script setup lang="ts">
import Svg from './Svg.vue'

</script>


