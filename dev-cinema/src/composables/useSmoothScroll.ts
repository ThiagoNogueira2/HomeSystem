import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export function useSmoothScroll() {
  let lenis: Lenis | null = null

  onMounted(() => {
   
    lenis = new Lenis({
      duration: 1.8, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, 
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    })

    
    function raf(time: number) {
      lenis?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  onUnmounted(() => {
    lenis?.destroy()
  })

  return {
    lenis
  }
}

