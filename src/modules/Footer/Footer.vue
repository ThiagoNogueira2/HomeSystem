<template>
    <div class="relative text-center bg-gray-100 pt-12 pb-100 md:pt-20 md:pb-60 lg:pt-35 lg:pb-100">
        <p class="text-[#141414] text-sm md:text-base font-public-sans px-4">READY TO GET STARTED?</p>
        <h1 class="text-3xl md:text-5xl lg:text-7xl text-[#141414] italic mb-6 md:mb-8 pt-3 pb-3 md:pt-4 md:pb-4 px-4">Let's make your dream a reality</h1>
        <a href="#" class="bg-[#141414] px-8 py-4 md:px-12 md:py-6 text-white items-center gap-2 inline-flex font-bold text-sm md:text-base">
                Get a Quote
                <Svg />
            </a>

        <div class="absolute left-0 bottom-[-80px] md:bottom-[-190px] lg:bottom-[-130px] w-full h-[390px] md:h-[380px] lg:h-[460px] z-10">
            <img 
                src="@/assets/bg-4.jpg" 
                alt="Background" 
                class="w-full md:w-[450px] lg:w-[550px] xl:w-100 h-full object-cover"
            />
        </div>

       
        <footer class="absolute left-4 right-4 md:left-8 md:right-4 lg:left-[280px] xl:left-30 lg:right-0 bottom-[-80px] md:bottom-[-190px] lg:bottom-[-130px] bg-white shadow-lg z-20 px-6 py-2 md:px-10 md:py-12 lg:px-40 xl:px-60 lg:py-24 lg:pb-20">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-16 text-left">
          
                
                <div class="col-span-2 md:col-span-4 lg:col-span-1 text-center md:text-left">
                    <h2 class="text-2xl md:text-3xl text-[#141414] italic font-semibold mb-6 md:mb-0">Parallax</h2>
                    
                </div>

              
                <div class="text-center md:text-left">
                    <h3 class="text-[#141414] font-bold mb-4 md:mb-6 lg:mb-8 text-sm">HELP</h3>
                    <ul class="space-y-2 md:space-y-3 lg:space-y-4 text-gray-500 text-sm">
                        <li><a href="#" class="hover:text-[#141414]">HOME</a></li>
                        <li><a href="#" class="hover:text-[#141414]">ABOUT</a></li>
                        <li><a href="#" class="hover:text-[#141414]">PRESS</a></li>
                        <li><a href="#" class="hover:text-[#141414]">BLOG</a></li>
                    </ul>
                </div>

              
                <div class="text-center md:text-left">
                    <h3 class="text-[#141414] font-bold mb-4 md:mb-6 lg:mb-8 text-sm">SOCIAL</h3>
                    <ul class="space-y-2 md:space-y-3 lg:space-y-4 text-gray-500 text-sm">
                        <li><a href="#" class="hover:text-[#141414]">FACEBOOK</a></li>
                        <li><a href="#" class="hover:text-[#141414]">TWITTER</a></li>
                        <li><a href="#" class="hover:text-[#141414]">INSTAGRAM</a></li>
                    </ul>
                </div>

               
                <div class="col-span-2 md:col-span-2 lg:col-span-1 text-center md:text-left">
                    <h3 class="text-[#141414] font-bold mb-4 md:mb-6 lg:mb-8 text-sm">NEWSLETTER</h3>
                    <div class="flex flex-col sm:flex-row items-center gap-4">
                        <input 
                            type="email" 
                            placeholder="EMAIL" 
                            class="w-full sm:flex-1 border-b-2 border-gray-300 pb-2 text-sm text-gray-500 bg-transparent focus:border-[#141414] focus:outline-none placeholder:text-gray-400 text-center sm:text-left"
                        />
                        <button class="flex items-center gap-2 font-bold text-[#141414] hover:opacity-80 text-sm whitespace-nowrap">
                            SUBMIT
                            <Svg />
                        </button>
                    </div>
                </div>
            </div>
        </footer>   
    </div>
</template>


<script setup lang="ts">
import Svg from '../Topo/Svg.vue'
</script>