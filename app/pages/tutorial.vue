<script setup lang="ts">
useSeoMeta({
  title: 'Tutorial Web Development - RakitWeb',
  description: 'Panduan praktis untuk memahami workflow web development modern bersama RakitWeb.',
  ogTitle: 'Tutorial Web Development - RakitWeb',
  ogDescription: 'Panduan praktis untuk memahami workflow web development modern bersama RakitWeb.',
  ogImage: '/rakitweb.jpeg'
})

const tutorials = [
  { level: 'Dasar', title: 'Memulai proyek Nuxt', desc: 'Struktur folder, routing, dan komponen untuk membangun website pertama.', duration: '12 menit', icon: 'i-simple-icons-nuxtdotjs' },
  { level: 'Menengah', title: 'Deployment ke production', desc: 'Siapkan environment, build aplikasi, dan deploy dengan konfigurasi yang rapi.', duration: '18 menit', icon: 'i-lucide-rocket' },
  { level: 'Menengah', title: 'Membuat API dengan NestJS', desc: 'Kenali module, controller, service, dan pola API yang mudah dikembangkan.', duration: '24 menit', icon: 'i-simple-icons-nestjs' },
  { level: 'Lanjutan', title: 'Optimasi Core Web Vitals', desc: 'Kurangi waktu muat dan ukur pengalaman pengguna dengan pendekatan yang praktis.', duration: '20 menit', icon: 'i-lucide-gauge' }
]
</script>

<template>
  <main class="min-h-screen bg-white text-zinc-900 antialiased dark:bg-black dark:text-zinc-50">
    <section class="px-6 pb-20 pt-32">
      <UContainer>
        <div class="max-w-2xl">
          <p class="mb-6 font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Tutorial
          </p>
          <h1 class="mb-6 text-4xl font-normal leading-[1.05] tracking-tighter text-black dark:text-white md:text-6xl">
            Belajar membangun <br>produk digital.
          </h1>
          <p class="max-w-lg text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            Materi singkat dan langsung praktik untuk developer, pemilik bisnis, dan siapa pun yang ingin memahami teknologi web modern.
          </p>
        </div>
      </UContainer>
    </section>

    <div class="border-t border-zinc-200 dark:border-zinc-800" />

    <section class="px-6 py-20">
      <UContainer>
        <div class="mb-10 flex items-end justify-between gap-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <div>
            <p class="mb-2 font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Koleksi pilihan
            </p>
            <h2 class="text-2xl font-normal tracking-tighter text-black dark:text-white">
              Mulai dari yang Anda butuhkan.
            </h2>
          </div>
          <span class="hidden text-xs text-zinc-400 dark:text-zinc-500 sm:block">{{ tutorials.length }} materi</span>
        </div>
        <div class="grid grid-cols-1 gap-px overflow-hidden border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 md:grid-cols-2">
          <article
            v-for="tutorial in tutorials"
            :key="tutorial.title"
            class="group bg-white p-7 dark:bg-black"
          >
            <div class="mb-12 flex items-center justify-between">
              <div class="flex h-9 w-9 items-center justify-center border border-zinc-200 dark:border-zinc-800">
                <UIcon
                  :name="tutorial.icon"
                  class="h-4 w-4 text-zinc-500 dark:text-zinc-400"
                />
              </div>
              <span class="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{{ tutorial.level }}</span>
            </div>
            <h3 class="text-base font-medium text-black dark:text-white">
              {{ tutorial.title }}
            </h3>
            <p class="mt-2 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {{ tutorial.desc }}
            </p>
            <div class="mt-7 flex items-center justify-between border-t border-zinc-100 pt-4 text-xs dark:border-zinc-900">
              <span class="text-zinc-400 dark:text-zinc-500">{{ tutorial.duration }}</span>
              <span class="font-medium text-zinc-700 transition-colors group-hover:text-black dark:text-zinc-300 dark:group-hover:text-white">Baca tutorial <UIcon
                name="i-lucide-arrow-right"
                class="ml-1 inline h-3 w-3"
              /></span>
            </div>
          </article>
        </div>
      </UContainer>
    </section>
  </main>
</template>
