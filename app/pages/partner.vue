<script setup lang="ts">
useSeoMeta({
  title: 'Partner Kami - RakitWeb',
  description: 'Mitra dan kolaborator RakitWeb dalam membangun solusi digital terbaik.',
  ogTitle: 'Partner Kami - RakitWeb',
  ogDescription: 'Mitra dan kolaborator RakitWeb dalam membangun solusi digital terbaik.',
  ogImage: '/rakitweb.jpeg'
})

const partners = [
  {
    name: 'NLFTs Community',
    desc: 'Komunitas Open Souce Indonesia yang berfokus pada Pengembangan Perangkat Lunak Mutakhir.',
    logo: 'https://github.com/nlfts.png',
    fallbackLogo: 'https://ui-avatars.com/api/?name=Partner+1&background=3b82f6&color=fff&size=200&bold=true',
  },
  {
    name: 'Hostingmu',
    desc: 'Rekan strategis dalam penyediaan infrastruktur dan solusi cloud.',
    logo: 'https://st2.depositphotos.com/1024516/7326/v/450/depositphotos_73262531-stock-illustration-vector-logo-for-letter-h.jpg',
    fallbackLogo: 'https://ui-avatars.com/api/?name=Partner+2&background=10b981&color=fff&size=200&bold=true',
  },
  {
    name: 'YumeArchive',
    desc: 'Kolaborator dalam pengembangan aplikasi mobile dan solusi digital inovatif.',
    logo: 'https://github.com/Kagebunko.png',
    fallbackLogo: 'https://ui-avatars.com/api/?name=Partner+3&background=8b5cf6&color=fff&size=200&bold=true',
  },
]

const imgErrors = ref<Record<number, boolean>>({})
const onImgError = (idx: number) => { imgErrors.value[idx] = true }
</script>

<template>
  <div class="min-h-screen bg-white text-zinc-900 antialiased dark:bg-black dark:text-zinc-50">
    <section class="pt-32 pb-20 px-6">
      <UContainer>
        <div class="max-w-2xl">
          <p class="font-mono text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-6">Partner</p>
          <h1 class="text-4xl md:text-6xl font-normal tracking-tighter text-black dark:text-white leading-[1.05] mb-6">
            Mitra & kolaborator <br />kami.
          </h1>
          <p class="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg">
            Kami bekerja sama dengan berbagai mitra terbaik untuk menghadirkan solusi digital yang lengkap dan berkualitas.
          </p>
        </div>
      </UContainer>
    </section>

    <div class="border-t border-zinc-200 dark:border-zinc-800" />

    <section class="py-20 px-6">
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div
            v-for="(partner, idx) in partners"
            :key="partner.name"
            class="bg-white dark:bg-black p-8 flex flex-col gap-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors duration-300"
          >
            <div class="flex items-start gap-4">
              <div class="relative shrink-0">
                <img
                  :src="imgErrors[idx] ? partner.fallbackLogo : partner.logo"
                  :alt="partner.name"
                  class="w-16 h-16 object-contain bg-zinc-100 dark:bg-zinc-900 p-2"
                  @error="onImgError(idx)"
                />
              </div>
              <div class="flex-1 min-w-0 pt-1">
                <h3 class="text-sm font-medium text-black dark:text-white truncate">{{ partner.name }}</h3>
              </div>
            </div>

            <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {{ partner.desc }}
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <div class="border-t border-zinc-200 dark:border-zinc-800" />

    <section class="py-20 px-6">
      <UContainer>
        <div class="max-w-xl">
          <h2 class="text-2xl md:text-3xl font-normal tracking-tighter text-black dark:text-white mb-4">
            Tertarik jadi partner?
          </h2>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
            Kami selalu terbuka untuk kolaborasi dan kemitraan baru. Hubungi kami untuk membahas peluang kerja sama.
          </p>
          <div class="flex items-center gap-4">
            <NuxtLink
              to="https://wa.me/6283160325595"
              target="_blank"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
            >
              <UIcon name="i-simple-icons-whatsapp" class="w-4 h-4" />
              Hubungi Kami
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium rounded-md hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              Tentang Kami
              <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
