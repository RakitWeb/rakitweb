<script setup lang="ts">
import gsap from 'gsap'

// SEO Implementation
useSeoMeta({
  title: 'RakitWeb — Jasa Pembuatan Website & Digital Solution',
  ogTitle: 'RakitWeb — Jasa Pembuatan Website & Digital Solution',
  description: 'RakitWeb menyediakan jasa pembuatan website, setup hosting & domain, pembuatan aplikasi Android, hingga konfigurasi game server dengan harga terjangkau.',
  ogDescription: 'RakitWeb menyediakan jasa pembuatan website, setup hosting & domain, pembuatan aplikasi Android, hingga konfigurasi game server dengan harga terjangkau.',
  ogImage: 'https://rakitweb.site/rakitweb.png',
  ogUrl: 'https://rakitweb.site',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'RakitWeb — Jasa Pembuatan Website & Digital Solution',
  twitterDescription: 'RakitWeb: solusi digital terbaik untuk bisnis Anda — website, hosting, Android, dan game server.',
  twitterImage: 'https://rakitweb.site/rakitweb.png',
})

// Impact Stats Data
const impactStats = [
  { value: '100+', label: 'Klien Puas' },
  { value: '50+', label: 'Website Terbangun' },
  { value: '20+', label: 'Server Aktif' },
  { value: '10+', label: 'Aplikasi Android' },
  { value: '99%', label: 'Uptime Server' },
  { value: '24/7', label: 'Support Teknis' }
]

// Trusted By — Company Logos
// imgSize  : ukuran gambar (h-* class) — ubah bebas tanpa pengaruhi lebar kotak
// invert   : true = logo gelap, dibalik warna di dark mode
// type     : 'image' | 'text'
const companies = [
  {
    type: 'image',
    src: 'https://www.vectorlogo.zone/logos/google/google-ar21.svg',
    alt: 'Google',
    imgSize: 'h-14 md:h-20',
    invert: false,
  },
  {
    type: 'image',
    src: '/company/Vuxi.png',
    alt: 'Vuxi',
    imgSize: 'h-10 md:h-14',
    invert: false,
  },
  {
    type: 'image',
    src: '/company/cafein.webp',
    alt: 'Cafein',
    imgSize: 'h-16 md:h-24',
    invert: false,
  },
  {
    type: 'text',
    text: 'NLFTs',
    alt: 'NLFTs',
    imgSize: '',
    invert: false,
  },
  {
    type: 'image',
    src: '/company/sora.png',
    alt: 'Cafein',
    imgSize: 'h-16 md:h-24',
    invert: false,
  },
  {
    type: 'image',
    src: '/company/os.webp',
    alt: 'Cafein',
    imgSize: 'h-24 md:h-24',
    invert: false,
  },
]

// Content Data
const content = [
  {
    title: 'Wujudkan Website Impian Anda Bersama RakitWeb',
    desc: 'RakitWeb menyediakan jasa pembuatan website dan landing page profesional, modern, dan responsif untuk bisnis Anda — mulai dari company profile hingga toko online.'
  },
  {
    title: 'Jasa Hosting, Domain & Setup Server Lengkap',
    desc: 'Mulai dari setup hosting dan domain, migrasi website, hingga instalasi panel seperti Pterodactyl, cPanel, HestiaCP, CloudPanel, dan lainnya — dikerjakan langsung oleh tim RakitWeb.'
  },
  {
    title: 'Bangun Aplikasi Android & Game Server Tanpa Ribet',
    desc: 'Kami melayani pembuatan aplikasi Android custom serta konfigurasi game server Minecraft, CS:GO, GTA, Terraria, Garry Mod, dan lainnya — lengkap dengan maintenance full.'
  }
]

const subDescription = "Website profesional, hosting andal, aplikasi Android, dan game server — semua bisa di RakitWeb"

const currentIndex = ref(0)
const heroContainer = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const descRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context
let rotationTimer: any

const animateTransition = () => {
  // 1. Fade Out Current
  const words = titleRef.value?.querySelectorAll('.word-span')
  if (!words) return

  const tl = gsap.timeline({
    onComplete: () => {
      // 2. Change Content
      currentIndex.value = (currentIndex.value + 1) % content.length
      
      // 3. Fade In New (Wait for DOM update)
      nextTick(() => {
        const newWords = titleRef.value?.querySelectorAll('.word-span')
        if (!newWords) return
        
        gsap.fromTo(newWords, 
          { y: 40, opacity: 0, rotateX: -90 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.05, duration: 0.8, ease: 'expo.out' }
        )
        gsap.fromTo(descRef.value, 
          { opacity: 0, y: 10 },
          { opacity: 0.7, y: 0, duration: 0.6 }
        )
      })
    }
  })

  tl.to(words, { y: -20, opacity: 0, stagger: 0.02, duration: 0.4, ease: 'power2.in' })
    .to(descRef.value, { opacity: 0, y: -10, duration: 0.3 }, '-=0.3')
}

onMounted(() => {
  // Initial Anim - Optimized for zero-white-flicker
  // Using a very small timeout instead of nextTick for faster response
  setTimeout(() => {
    const initialWords = titleRef.value?.querySelectorAll('.word-span')
    if (initialWords) {
      gsap.from(initialWords, { 
        y: 20, 
        rotateX: -15, 
        stagger: 0.02, 
        duration: 0.6, 
        ease: 'power2.out',
        // No opacity: 0 here to keep text visible
      })
    }
  }, 100)

  // GSAP Context for background effects
  ctx = gsap.context(() => {
    gsap.to('.hero-blob', {
      x: 'random(-80, 80)',
      y: 'random(-80, 80)',
      duration: 'random(8, 15)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 2
    })
  }, heroContainer.value || undefined)

  // Robust Timer
  rotationTimer = setInterval(animateTransition, 5000)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
  if (rotationTimer) clearInterval(rotationTimer)
})
</script>

<template>
  <main>
    <div ref="heroContainer" class="relative overflow-hidden flex flex-col justify-start pt-8 md:pt-12 bg-white dark:bg-black selection:bg-zinc-200/60 dark:selection:bg-zinc-800/60">
      <!-- UNIQUE BACKGROUND: Dynamic Mesh & Floating Glass -->
      <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <!-- Animated Blobs (Aero Style) -->
        <div class="hero-blob absolute top-[-5%] left-[5%] w-[45%] h-[45%] bg-zinc-200/40 dark:bg-zinc-700/20 blur-[130px] rounded-full" />
        <div class="hero-blob absolute top-[0%] right-[5%] w-[35%] h-[35%] bg-zinc-100/50 dark:bg-zinc-800/30 blur-[110px] rounded-full opacity-40" />
        <div class="hero-blob absolute bottom-[0%] left-[25%] w-[40%] h-[40%] bg-zinc-300/20 dark:bg-zinc-700/10 blur-[90px] rounded-full opacity-30" />

        <!-- Flowing Geometric Lines -->
        <svg class="absolute inset-0 w-full h-full opacity-[0.15] dark:opacity-[0.25]" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="currentColor" stop-opacity="0" />
              <stop offset="50%" stop-color="currentColor" stop-opacity="0.8" />
              <stop offset="100%" stop-color="currentColor" stop-opacity="0" />
            </linearGradient>
          </defs>
          <g class="text-zinc-300 dark:text-zinc-700">
            <path v-for="i in 5" :key="i" :d="`M -200 ${200 * i} Q 400 ${200 * i + (i%2 ? 80 : -80)} 1200 ${200 * i}`" fill="none" stroke="url(#flow-grad)" stroke-width="0.5" class="flow-line-anim" :style="{ animationDelay: `${i * -2}s` }" />
          </g>
        </svg>
      </div>

      <!-- Hero Content -->
      <section class="relative z-10 px-8 sm:px-16 py-12 md:py-20 flex flex-col items-center text-center max-w-5xl mx-auto">

        <!-- Main Title (Rotating Characters) -->
        <h1 
          ref="titleRef"
          class="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tighter text-black dark:text-white leading-[1.1] mb-8 perspective-2000 min-h-[4em] md:min-h-[3em] flex flex-wrap justify-center content-center"
        >
          <template v-for="(word, i) in (content[currentIndex]?.title?.split(' ') || [])" :key="`${currentIndex}-${i}`">
            <span class="word-span inline-block origin-center opacity-100">
              {{ word }}
            </span>
            <span class="inline-block w-[0.25em]" v-if="i < (content[currentIndex]?.title?.split(' ')?.length || 0) - 1" aria-hidden="true">&nbsp;</span>
          </template>
        </h1>
        
        <!-- Description -->
        <p 
          ref="descRef"
          class="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed font-normal opacity-70"
        >
          {{ content[currentIndex]?.desc }}
        </p>

        <!-- Actions -->
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink
            to="https://wa.me/6285187153883"
            target="_blank"
            class="px-8 py-3 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 text-sm font-medium rounded-md shadow transition-all hover:opacity-90 active:scale-95"
          >
            Konsultasi Gratis
          </NuxtLink>
          <NuxtLink
            to="/layanan"
            class="flex items-center gap-2 px-8 py-3 text-sm font-medium text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-md transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
          >
            <span>Lihat Layanan</span>
          </NuxtLink>
        </div>
      </section>

      <!-- Branding -->
      <div class="absolute bottom-12 left-12 hidden md:flex items-center gap-4 opacity-30">
        <div class="w-12 h-[1px] bg-zinc-400 dark:bg-zinc-600" />
        <span class="font-mono text-[9px] tracking-widest uppercase text-zinc-500">RakitWeb Digital</span>
      </div>
    </div>

    <!-- TRUSTED BY SECTION -->
    <section class="relative border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
      <!-- corner marks top -->
      <span class="hidden md:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black z-10" />
      <span class="hidden md:block absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black z-10" />
      <!-- corner marks bottom -->
      <span class="hidden md:block absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black z-10" />
      <span class="hidden md:block absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black z-10" />

      <div class="flex flex-col md:flex-row w-full max-w-7xl mx-auto relative group/section">
        <div class="md:w-[280px] shrink-0 p-8 flex flex-col items-center md:items-start justify-center border-r border-zinc-200 dark:border-zinc-800 z-20 bg-white dark:bg-black relative">
          <h2 class="font-mono text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider leading-snug text-center md:text-left">
            Dipercaya Oleh<br />
            <span class="text-zinc-700 dark:text-zinc-300">Klien & Bisnis Kami</span>
          </h2>
          <div class="absolute inset-y-0 -right-20 w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none hidden md:block" />
        </div>

        <div class="flex-grow overflow-hidden relative flex z-10">
          <div class="flex logo-scroll-track items-center h-full">
            <div v-for="n in 2" :key="n" class="flex flex-shrink-0 h-full">
              <div
                v-for="company in companies"
                :key="company.alt"
                class="w-[240px] shrink-0 px-8 py-10 md:py-12 flex items-center justify-center border-r border-zinc-200 dark:border-zinc-800 transition-all duration-700"
              >
                <!-- Text type -->
                <span
                  v-if="company.type === 'text'"
                  class="text-3xl md:text-4xl font-normal tracking-tighter text-zinc-900 dark:text-white"
                >
                  {{ company.text }}
                </span>

                <!-- Image type -->
                <img
                  v-else
                  :src="company.src"
                  :alt="company.alt"
                  :class="[
                    'w-full object-contain pointer-events-none',
                    company.imgSize,
                    company.invert ? 'dark:invert' : ''
                  ]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- IMPACT STATS SECTION -->
    <ImpactStats :stats="impactStats" />

    <!-- PROFILE SECTION -->
    <ProfileSection />

    <!-- WEB SECTION -->
     <WebSection />

     <!-- DOWNLOAD APP SECTION -->
     <MobileSection />

    <!-- BLOG SECTION -->
    <BlogSection />


    <!-- TESTIMONIALS SECTION -->
    <Priace />

    <Faq />
    
  </main>
</template>

<style scoped>
.perspective-2000 {
  perspective: 2000px;
}

.word-span {
  display: inline-block;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.flow-line-anim {
  stroke-dasharray: 400 800;
  stroke-dashoffset: 1200;
  animation: flow 10s linear infinite;
}

.data-flow-track {
  animation: data-move 12s linear infinite;
}

.logo-scroll-track {
  animation: logo-scroll 30s linear infinite;
}

.logo-scroll-track:hover {
  animation-play-state: paused;
}

@keyframes logo-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes data-move {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes flow {
  to { stroke-dashoffset: 0; }
}

::selection {
  background: rgba(0, 193, 106, 0.3);
  color: inherit;
}
</style>
