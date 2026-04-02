<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const sectionRef = ref<HTMLElement | null>(null)

const features = [
  {
    title: 'Lokasi Strategis',
    desc: 'Terintegrasi di pusat kawasan industri Bandung untuk mempermudah kolaborasi dunia usaha.',
    icon: 'i-lucide-map-pin'
  },
  {
    title: 'Kurikulum Vokatif',
    desc: 'Sinkronisasi penuh dengan standar industri global guna mencetak talenta siap kerja.',
    icon: 'i-lucide-book-open'
  },
  {
    title: 'Sertifikasi Global',
    desc: 'Validasi kompetensi siswa melalui sertifikasi resmi dari partner teknologi internasional.',
    icon: 'i-lucide-award'
  }
]

const socials = [
  { icon: 'i-simple-icons-tiktok', link: '#' },
  { icon: 'i-simple-icons-instagram', link: '#' },
  { icon: 'i-simple-icons-youtube', link: '#' },
  { icon: 'i-simple-icons-x', link: '#' }
]

onMounted(async () => {
  await nextTick()
  if (!sectionRef.value) return

  const ctx = gsap.context(() => {
    // Elegant reveal without the "pop"
    gsap.from(".reveal", {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      y: 10,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power1.out"
    })

    // Minimalist divider animation
    gsap.from(".divider", {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 85%",
      },
      scaleX: 0,
      duration: 1.5,
      transformOrigin: "left",
      ease: "expo.out"
    })
  }, sectionRef.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <section 
    ref="sectionRef" 
    class="py-32 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#020617] overflow-hidden"
  >
    <div class="max-w-7xl mx-auto px-8">
      <!-- Minimalist Editorial Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        <!-- Pillar 1: Narrative -->
        <div class="lg:col-span-5 space-y-8">
          <div class="reveal flex flex-col space-y-4">
            <span class="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-500">Identity</span>
            <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              Membentuk Masa Depan <br class="hidden md:block"/> Talenta Industri.
            </h2>
          </div>
          
          <div class="reveal divider h-[1px] w-full bg-gray-100 dark:bg-white/5" />

          <div class="reveal space-y-6">
            <p class="text-base text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              SMK Assalaan Bandung hadir sebagai jembatan strategis antara pendidikan vokatif formal dan tuntutan dinamis industri global masa kini.
            </p>
            
            <div class="pt-4 flex items-center justify-between">
              <NuxtLink to="#" class="group flex items-center gap-3 text-sm font-bold text-gray-900 dark:text-white transition-all hover:text-primary-500">
                <span>Profil Video</span>
                <div class="w-8 h-8 rounded-full border border-gray-100 dark:border-white/10 flex items-center justify-center transition-all group-hover:border-primary-500 group-hover:bg-primary-500 group-hover:text-white">
                  <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5" />
                </div>
              </NuxtLink>

              <!-- Social Links -->
              <div class="flex items-center gap-5">
                <NuxtLink v-for="social in socials" :key="social.icon" :to="social.link" class="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                  <UIcon :name="social.icon" class="w-4 h-4" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Pillar 2: Core Features -->
        <div class="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          <div v-for="item in features" :key="item.title" class="reveal group flex flex-col">
            <div class="mb-6">
              <UIcon :name="item.icon" class="w-5 h-5 text-gray-400 dark:text-white/30 group-hover:text-primary-500 transition-colors duration-500" />
            </div>
            <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 border-l-2 border-transparent group-hover:border-primary-500 pl-0 group-hover:pl-4 transition-all duration-500">
              {{ item.title }}
            </h4>
            <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal opacity-80">
              {{ item.desc }}
            </p>
          </div>
          
          <!-- Contact or CTA minimalist card -->
          <div class="reveal group p-8 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-sm flex flex-col justify-between hover:bg-white dark:hover:bg-white/[0.05] transition-all duration-700">
            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Mari Berkolaborasi</h4>
            <div class="flex items-center justify-between">
              <p class="text-sm font-bold text-gray-900 dark:text-white">Hubungi Tim Kami</p>
              <UIcon name="i-lucide-external-link" class="w-4 h-4 text-primary-500 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Focus on refined clarity */
section {
  font-feature-settings: "cv11", "ss01", "cv01";
}
</style>
