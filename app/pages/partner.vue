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
    name: 'Partner 1',
    desc: 'Mitra kolaborasi digital kami dalam pengembangan platform dan layanan teknologi.',
    logo: '/partner/logo-partner1.jpeg',
    fallbackLogo: 'https://ui-avatars.com/api/?name=Partner+1&background=3b82f6&color=fff&size=200&bold=true',
  },
  {
    name: 'Partner 2',
    desc: 'Rekan strategis dalam penyediaan infrastruktur dan solusi cloud.',
    logo: '/partner/logo-partner2.jpeg',
    fallbackLogo: 'https://ui-avatars.com/api/?name=Partner+2&background=10b981&color=fff&size=200&bold=true',
  },
  {
    name: 'Partner 3',
    desc: 'Kolaborator dalam pengembangan aplikasi mobile dan solusi digital inovatif.',
    logo: '/partner/logo-partner3.jpeg',
    fallbackLogo: 'https://ui-avatars.com/api/?name=Partner+3&background=8b5cf6&color=fff&size=200&bold=true',
  },
]

const imgErrors = ref<Record<number, boolean>>({})
const onImgError = (idx: number) => { imgErrors.value[idx] = true }
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#09090b]">
    <section class="pt-32 pb-20 px-6">
      <UContainer>
        <div class="max-w-2xl">
          <p class="text-xs font-mono font-bold uppercase tracking-[0.3em] text-primary-500 mb-6">Partner</p>
          <h1 class="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-6">
            Mitra & kolaborator <br />kami.
          </h1>
          <p class="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
            Kami bekerja sama dengan berbagai mitra terbaik untuk menghadirkan solusi digital yang lengkap dan berkualitas.
          </p>
        </div>
      </UContainer>
    </section>

    <div class="border-t border-gray-100 dark:border-white/5" />

    <section class="py-20 px-6">
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden">
          <div
            v-for="(partner, idx) in partners"
            :key="partner.name"
            class="bg-white dark:bg-[#09090b] p-8 flex flex-col gap-6 hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors duration-300"
          >
            <div class="flex items-start gap-4">
              <div class="relative shrink-0">
                <img
                  :src="imgErrors[idx] ? partner.fallbackLogo : partner.logo"
                  :alt="partner.name"
                  class="w-16 h-16 rounded-2xl object-contain bg-gray-100 dark:bg-white/5 p-2"
                  @error="onImgError(idx)"
                />
                <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-primary-500 rounded-full border-2 border-white dark:border-[#09090b]" />
              </div>
              <div class="flex-1 min-w-0 pt-1">
                <h3 class="text-sm font-bold text-gray-900 dark:text-white truncate">{{ partner.name }}</h3>
              </div>
            </div>

            <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {{ partner.desc }}
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <div class="border-t border-gray-100 dark:border-white/5" />

    <section class="py-20 px-6">
      <UContainer>
        <div class="max-w-xl">
          <h2 class="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
            Tertarik jadi partner?
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Kami selalu terbuka untuk kolaborasi dan kemitraan baru. Hubungi kami untuk membahas peluang kerja sama.
          </p>
          <div class="flex items-center gap-4">
            <NuxtLink
              to="https://wa.me/6283160325595"
              target="_blank"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              <UIcon name="i-simple-icons-whatsapp" class="w-4 h-4" />
              Hubungi Kami
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-xl hover:border-gray-400 dark:hover:border-white/30 transition-colors"
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
