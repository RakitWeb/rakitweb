<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const sectionRef = ref<HTMLElement | null>(null)
const activeFeatureIndex = ref(0)

const features: Array<{ title: string; description: string; image: string }> = [
  {
    title: 'Global Delivery',
    description: 'Deploy ke edge network global secara instan dengan performa latensi rendah di seluruh dunia.',
    image: '/images/developer.png'
  },
  {
    title: 'Deployment Environments',
    description: 'Preview URL otomatis untuk setiap branch git guna mempermudah kolaborasi tim.',
    image: '/images/developer.png'
  },
  {
    title: 'Serverless Functions',
    description: 'Skalabilitas otomatis tanpa server yang berjalan instan tanpa perlu manajemen infrastruktur.',
    image: '/images/developer.png'
  },
  {
    title: 'Web Application Firewall',
    description: 'Perlindungan tingkat enterprise terhadap ancaman keamanan dan bot berbahaya secara real-time.',
    image: '/images/developer.png'
  }
]

const activeFeature = computed(() => {
  const fallbackFeature: { title: string; description: string; image: string } = {
    title: features[0]?.title ?? 'Global Delivery',
    description: features[0]?.description ?? 'Deploy ke edge network global secara instan.',
    image: features[0]?.image ?? '/images/features/global-delivery.png'
  }
  const currentFeature = features[activeFeatureIndex.value] ?? fallbackFeature

  return currentFeature
})

const activeFeatureImage = computed(() => activeFeature.value.image)
const activeFeatureTitle = computed(() => activeFeature.value.title)

onMounted(async () => {
  await nextTick()
  if (!sectionRef.value) return

  const ctx = gsap.context(() => {
    gsap.from(".vercel-reveal", {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out"
    })
  }, sectionRef.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <section 
    ref="sectionRef"
    class="relative py-28 bg-white dark:bg-black text-gray-900 dark:text-white border-t border-gray-200 dark:border-white/5 transition-colors duration-500"
  >
    <!-- corner marks top -->
    <span class="hidden md:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black z-10" />
    <span class="hidden md:block absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black z-10" />
    <UContainer>
      <!-- Main Heading Header -->
      <div class="vercel-reveal max-w-3xl mb-20 space-y-4">
        <h2 class="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
          Luncurkan aplikasi yang dapat berkembang dari nol
        </h2>
      </div>

      <!-- Content Grid: Left Interactive List & Right Preview Box -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        
        <!-- Left Column: Stats & Feature List -->
        <div class="lg:col-span-5 space-y-10 vercel-reveal">
          
          <!-- Stat Callout -->
          <div class="space-y-2 pb-6 border-b border-gray-200 dark:border-white/10">
            <h3 class="text-xl md:text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
              Rakitweb Melayani lebih dari<span class="text-gray-500 dark:text-gray-400"> 100 juta</span> kunjungan di seluruh dunia.
            </h3>
          </div>

          <!-- Interactive Feature Switcher -->
          <div class="space-y-4">
            <span class="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Features
            </span>
            
            <div class="flex flex-col space-y-1">
              <button 
                v-for="(feature, index) in features" 
                :key="index"
                @click="activeFeatureIndex = index"
                class="text-left py-3 px-4 rounded-lg transition-all duration-300 group flex flex-col space-y-1 relative"
                :class="activeFeatureIndex === index ? 'bg-gray-100 dark:bg-white/[0.06] text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/[0.02]'"
              >
                <!-- Active Indicator Line on Left -->
                <div 
                  v-if="activeFeatureIndex === index" 
                  class="absolute left-0 top-3 bottom-3 w-1 bg-gray-900 dark:bg-white rounded-r"
                ></div>

                <span class="text-base font-medium tracking-tight pl-2">
                  {{ feature.title }}
                </span>
                
                <!-- Description appears when active -->
                <p 
                  v-if="activeFeatureIndex === index" 
                  class="text-xs text-gray-500 dark:text-gray-400 pl-2 leading-relaxed font-normal animate-fadeIn"
                >
                  {{ feature.description }}
                </p>
              </button>
            </div>
          </div>

        </div>

        <!-- Right Column: Product UI Mockup Frame -->
        <div class="lg:col-span-7 vercel-reveal">
          <div class="relative mx-auto max-w-3xl">
            <div class="absolute inset-x-6 inset-y-4 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.82),_rgba(255,255,255,0)_60%)] opacity-80 blur-3xl dark:opacity-60"></div>
            <div class="relative rounded-[28px] border border-gray-200/80 bg-white/70 p-3 shadow-[0_30px_120px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0b0b0d]/80">
              <div class="flex items-center gap-2 rounded-[18px] border border-gray-200/70 bg-white/80 px-3 py-2 dark:border-white/10 dark:bg-[#121214]/90">
                <div class="flex gap-1.5">
                  <div class="h-3 w-3 rounded-full bg-red-500"></div>
                  <div class="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div class="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
              </div>

              <div class="relative mt-3 overflow-hidden rounded-[24px] border border-gray-200/70 bg-gray-100 dark:border-white/10 dark:bg-[#06070a]">
                <div class="light-orbit absolute inset-0"></div>
                <div class="relative aspect-[16/10] overflow-hidden">
                  <img
                    :src="activeFeatureImage"
                    :alt="activeFeatureTitle"
                    class="absolute inset-0 h-full w-full object-cover transition-all duration-700 pointer-events-none"
                    @error="$event.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </UContainer>
  </section>
</template>

<style scoped>
section {
  font-feature-settings: "cv11", "ss01", "cv01";
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes rotateGlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}

.light-orbit {
  background: conic-gradient(from 180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0) 45%, rgba(255,255,255,0.2) 70%, rgba(255,255,255,0.95) 100%);
  filter: blur(70px);
  opacity: 0.72;
  animation: rotateGlow 20s linear infinite;
  transform-origin: center;
}
</style>