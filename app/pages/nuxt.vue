<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt Development - RakitWeb',
  description: 'Solusi website modern berbasis Nuxt dengan performa, SEO, dan pengalaman pengguna yang kuat.',
  ogTitle: 'Nuxt Development - RakitWeb',
  ogDescription: 'Solusi website modern berbasis Nuxt dengan performa, SEO, dan pengalaman pengguna yang kuat.',
  ogImage: '/rakitweb.jpeg'
})

const capabilities = ['Server-side rendering dan static generation', 'Routing dan content management terstruktur', 'Optimasi gambar dan Core Web Vitals', 'Deployment modern dengan environment terpisah']
</script>

<template>
  <main class="min-h-screen bg-white text-zinc-900 antialiased dark:bg-black dark:text-zinc-50">
    <section class="px-6 pb-20 pt-32">
      <UContainer>
        <div class="max-w-3xl">
          <div class="mb-6 flex items-center gap-3">
            <span class="flex h-9 w-9 items-center justify-center rounded border border-zinc-200 text-[#00a98f] dark:border-zinc-800"><UIcon
              name="i-simple-icons-nuxtdotjs"
              class="h-5 w-5"
            /></span><span class="font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Technology service</span>
          </div><h1 class="mb-6 text-4xl font-normal leading-[1.05] tracking-tighter text-black dark:text-white md:text-6xl">
            Website modern <br>dengan Nuxt.
          </h1><p class="max-w-2xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            Kami menggunakan Nuxt untuk membangun website yang cepat, mudah ditemukan mesin pencari, dan siap dikembangkan mengikuti kebutuhan bisnis Anda.
          </p><div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink
              to="/jasa"
              class="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-950"
            >Lihat layanan <UIcon
              name="i-lucide-arrow-right"
              class="h-4 w-4"
            /></NuxtLink><NuxtLink
              to="/template/nuxtjs"
              class="inline-flex items-center gap-2 rounded-md border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"
            >Jelajahi template</NuxtLink>
          </div>
        </div>
      </UContainer>
    </section><div class="border-t border-zinc-200 dark:border-zinc-800" /><section class="px-6 py-20">
      <UContainer>
        <div class="grid grid-cols-1 gap-px overflow-hidden border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 md:grid-cols-2">
          <div class="bg-white p-8 dark:bg-black">
            <p class="mb-4 font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Mengapa Nuxt
            </p><h2 class="text-2xl font-normal tracking-tighter text-black dark:text-white">
              Fondasi yang siap tumbuh.
            </h2><p class="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Dari company profile hingga platform konten, Nuxt memberi struktur yang jelas tanpa mengorbankan kecepatan dan fleksibilitas.
            </p>
          </div><div class="bg-white p-8 dark:bg-black">
            <ul class="space-y-4">
              <li
                v-for="capability in capabilities"
                :key="capability"
                class="flex gap-3 text-sm text-zinc-600 dark:text-zinc-300"
              >
                <UIcon
                  name="i-lucide-check"
                  class="mt-0.5 h-4 w-4 shrink-0 text-zinc-500"
                />{{ capability }}
              </li>
            </ul>
          </div>
        </div>
      </UContainer>
    </section>
  </main>
</template>
