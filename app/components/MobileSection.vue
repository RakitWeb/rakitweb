<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const sectionRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  await nextTick()
  if (!sectionRef.value) return

  const ctx = gsap.context(() => {
    gsap.from('.reveal', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 85%'
      },
      y: 12,
      opacity: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: 'power2.out'
    })
  }, sectionRef.value)

  onUnmounted(() => {
    ctx.revert()
  })
})
</script>

<template>
  <section
    ref="sectionRef"
    class="relative bg-white py-20 md:py-28 dark:bg-black border-t border-gray-200 dark:border-white/5"
  >
  <span class="hidden md:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black z-10" />
  <span class="hidden md:block absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black z-10" />
    

    <div class="absolute inset-0 overflow-hidden">
      <svg class="absolute inset-0 h-full w-full" viewBox="0 0 1400 700" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 1470 0 C 1210 150, 1080 220, 790 260 C 470 310, 280 360, -80 560" fill="none" stroke="rgba(15,23,42,0.08)" stroke-width="1" class="dark:stroke-white/10" />
        <path d="M 1470 40 C 1230 170, 1100 250, 820 290 C 500 340, 320 390, -40 580" fill="none" stroke="rgba(15,23,42,0.08)" stroke-width="1" class="dark:stroke-white/10" />
        <path d="M 1470 80 C 1250 190, 1120 280, 850 320 C 530 370, 360 420, 20 600" fill="none" stroke="rgba(15,23,42,0.08)" stroke-width="1" class="dark:stroke-white/10" />
        <path d="M 1470 120 C 1270 210, 1140 310, 880 350 C 560 400, 400 450, 80 620" fill="none" stroke="rgba(15,23,42,0.08)" stroke-width="1" class="dark:stroke-white/10" />
      </svg>
    </div>

    <UContainer class="relative z-10">
      <div class="mx-auto flex max-w-5xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div class="max-w-xl space-y-5 text-center lg:text-left">

          <div class="reveal space-y-3">
            <h2 class="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Aplikasi Android yang simpel dan siap dipakai.
            </h2>
            <p class="text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
              Fokus pada pengalaman yang jelas, cepat, dan konsisten.
            </p>
          </div>

          <div class="reveal grid grid-cols-2 gap-2 sm:grid-cols-2">
            <div class="rounded-xl border border-gray-200 bg-gray-50/80 px-3 py-2.5 text-gray-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300 sm:px-4 sm:py-3 sm:text-sm">
              <p class="text-[13px] font-medium sm:text-sm">Discovery & Flow</p>
              <p class="mt-1 text-[11px] leading-4 text-gray-500 dark:text-gray-400 sm:text-xs">Bentuk alur fitur dari kebutuhan bisnis.</p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-gray-50/80 px-3 py-2.5 text-gray-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300 sm:px-4 sm:py-3 sm:text-sm">
              <p class="text-[13px] font-medium sm:text-sm">UI & UX</p>
              <p class="mt-1 text-[11px] leading-4 text-gray-500 dark:text-gray-400 sm:text-xs">Tampilan yang rapi dan nyaman dipakai.</p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-gray-50/80 px-3 py-2.5 text-gray-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300 sm:px-4 sm:py-3 sm:text-sm">
              <p class="text-[13px] font-medium sm:text-sm">Integration</p>
              <p class="mt-1 text-[11px] leading-4 text-gray-500 dark:text-gray-400 sm:text-xs">Sambungkan ke API, database, dan sistem.</p>
            </div>
            <div class="rounded-xl border border-gray-200 bg-gray-50/80 px-3 py-2.5 text-gray-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300 sm:px-4 sm:py-3 sm:text-sm">
              <p class="text-[13px] font-medium sm:text-sm">Launch Ready</p>
              <p class="mt-1 text-[11px] leading-4 text-gray-500 dark:text-gray-400 sm:text-xs">Siap dipublikasikan dan dikembangkan lebih jauh.</p>
            </div>
          </div>

          <div class="reveal">
            <NuxtLink
              to="https://wa.me/6285187153883?text=Halo%20RakitWeb%2C%20saya%20ingin%20konsultasi%20pembuatan%20aplikasi%20Android"
              target="_blank"
              class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 dark:border-white/10 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100"
            >
              <UIcon name="i-lucide-message-circle" class="h-4 w-4" />
              Konsultasi
            </NuxtLink>
          </div>
        </div>

        <div class="reveal relative w-full max-w-[300px]">
          <div class="absolute inset-[-22px] z-0 rounded-[2.8rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95),rgba(255,255,255,0.24)_38%,rgba(59,130,246,0.14)_62%,transparent_80%)] opacity-100 blur-[70px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.55),rgba(255,255,255,0.16)_38%,rgba(255,255,255,0.06)_62%,transparent_80%)]" />
          <div class="relative z-10 overflow-visible rounded-[1.85rem] border border-gray-200 bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#121214]">
            <img
              src="https://bwaplatformbucket.sgp1.cdn.digitaloceanspaces.com/assets/thumbnail_tips/Login.png"
              alt="Preview aplikasi"
              class="h-[500px] w-full rounded-[1.35rem] object-cover"
            />
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
</style>



