<template>
  <Header />
  <Experiencia />
  <Projetos />
  <Footer />
</template>

<script setup lang="ts">
import Header from './modules/Topo/Header.vue';
import Experiencia from './modules/Experiencia/Experiencia.vue';
import { useSmoothScroll } from './composables/useSmoothScroll';
import Projetos from './modules/Projetos/Projeto.vue';
import Footer from './modules/Footer/Footer.vue';


useSmoothScroll();
</script>