<template>
    <div class="relative text-center bg-gray-100 pt-35 pb-100 ">
        <p class="text-[#141414] text-base font-public-sans">READY TO GET STARTED?</p>
        <h1 class="text-7xl text-[#141414] italic mb-8 pt-4 pb-4">Let's make your dream a reality</h1>
        <a href="#" class="bg-[#141414] px-12 py-6  text-white  items-center gap-2 inline-flex font-bold">
                Get a Quote
                <Svg />
            </a>

        <div class="absolute left-0 bottom-[-90px] w-100 h-[430px] z-10">
            <img 
                src="@/assets/bg-1.jpg" 
                alt="Background" 
                class="w-full h-full object-cover"
            />
        </div>

        <footer class="absolute left-30 right-0 bottom-[-90px] bg-white shadow-lg z-20 px-60 py-24 pb-20">
            <div class="grid grid-cols-4 gap-16 text-left">
          
                <div>
                    <h2 class="text-3xl text-[#141414] italic font-semibold">Parallax</h2>
                </div>

                <div>
                    <h3 class="text-[#141414] font-bold mb-8 text-sm">HELP</h3>
                    <ul class="space-y-4 text-gray-500 text-sm">
                        <li><a href="#" class="hover:text-[#141414]">HOME</a></li>
                        <li><a href="#" class="hover:text-[#141414]">ABOUT</a></li>
                        <li><a href="#" class="hover:text-[#141414]">PRESS</a></li>
                        <li><a href="#" class="hover:text-[#141414]">BLOG</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-[#141414] font-bold mb-8 text-sm">SOCIAL</h3>
                    <ul class="space-y-4 text-gray-500 text-sm">
                        <li><a href="#" class="hover:text-[#141414]">FACEBOOK</a></li>
                        <li><a href="#" class="hover:text-[#141414]">TWITTER</a></li>
                        <li><a href="#" class="hover:text-[#141414]">INSTAGRAM</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-[#141414] font-bold mb-8 text-sm">NEWSLETTER</h3>
                    <div class="flex items-center gap-4">
                        <input 
                            type="email" 
                            placeholder="EMAIL" 
                            class="flex-1 border-b-2 border-gray-300 pb-2 text-sm text-gray-500 bg-transparent focus:border-[#141414] focus:outline-none placeholder:text-gray-400"
                        />
                        <button class="flex items-center gap-2 font-bold text-[#141414] hover:opacity-80 text-sm">
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