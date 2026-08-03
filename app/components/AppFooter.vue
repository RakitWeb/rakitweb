<script setup lang="ts">
const columns = [
  {
    label: 'Layanan',
    children: [
      { label: 'Layanan Pembuatan Situs', to: '/jasa' },
      { label: 'Paket Android', to: '/pricing-android' },
      { label: 'Template Starter', to:'/template' }
    ],
  },
  {
    label: 'Paket & Sumber Daya',
    children: [
      { label: 'Paket Starter', to: '/jasa/starter' },
      { label: 'Paket Pro', to: '/jasa/pro' },
      { label: 'Paket Bisnis', to: '/jasa/business' },
      { label: 'Setup Hosting', to:'/jasa/hosting' },
    ],
  },
  {
    label: 'Perusahaan',
    children: [
      { label: 'Tentang Kami', to: '/about' },
      { label: 'Blog & Info', to: '/blog' },
      { label: 'Karir', to:'karir' },
      { label: 'Testimoni', to: '/testimoni' },
      { label: 'Dokumentasi', to: '/docs' },
      { label: 'Komunitas', to: 'https://nlfts.dev' },
      { label: 'Changelog', to: '/changelog' },
      { label: 'Partner', to: '/partner' },
      { label: 'Team', to: '/team' }
    ],
  },
  {
    label: 'Legal',
    children: [
      { label: 'Kebijakan Privasi', to: '/docs/getting-started/kebijakan-dan-privasi' },
      { label: 'Syarat & Ketentuan', to: '/docs/getting-started/tos' },
      { label: 'FAQ', to: '/#faq' },
      { label: 'Dukungan' },
    ],
  },
]

const contactInfo = [
  { label: 'Email', value: 'go@rakitweb.site' },
  { label: 'WhatsApp', value: '+62 831-6032-5595' },
  { label: 'Alamat', value: 'Bandung . Indonesia' },
]

const socialLinks = [
  { icon: 'i-simple-icons-github', to: 'https://github.com/RakitWeb', label: 'GitHub' },
  { icon: 'i-simple-icons-instagram', to: 'https://www.instagram.com/rakitweb.site', label: 'Instagram' },
  { icon: 'i-simple-icons-whatsapp', to: 'https://wa.me/6283160325595', label: 'WhatsApp' },
  { icon: 'i-simple-icons-tiktok', to: 'https://www.tiktok.com/@rakitweb.site', label: 'TikTok' },
]

const legalLinks = [
  { label: 'Kebijakan Privasi', to: '/docs/getting-started/kebijakan-dan-privasi' },
  { label: 'Syarat & Ketentuan', to: '/docs/getting-started/tos' },
  { label: 'Sitemap', to: '/sitemap.xml', external: true },
]
</script>

<template>
  <footer class="relative bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 border-t border-neutral-200 dark:border-neutral-800">

    <!-- corner marks -->
    <span class="hidden md:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" />
    <span class="hidden md:block absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" />

    <UContainer>
      <!-- ===== TOP: brand + nav columns ===== -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 py-16 md:py-20">

        <!-- Brand & contact -->
        <div class="lg:col-span-4 space-y-6">
          <span class="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            Rakit<span class="text-blue-500">Web</span>
          </span>

          <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs">
            Solusi digital untuk bisnis Anda — website, hosting, aplikasi, dan
            server, dikerjakan oleh tim yang berpengalaman.
          </p>

          <ul class="space-y-2 text-sm">
            <li
              v-for="item in contactInfo"
              :key="item.label"
              class="flex items-center gap-2 text-neutral-500 dark:text-neutral-400"
            >
              <span class="text-neutral-400 dark:text-neutral-600 w-16 shrink-0">{{ item.label }}</span>
              <span class="text-neutral-700 dark:text-neutral-300">{{ item.value }}</span>
            </li>
          </ul>

          <div class="flex items-center gap-3 pt-2">
            <NuxtLink
              v-for="social in socialLinks"
              :key="social.label"
              :to="social.to"
              target="_blank"
              :aria-label="social.label"
              class="flex items-center justify-center w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-white hover:bg-neutral-900 dark:hover:bg-white dark:hover:text-black hover:border-neutral-900 dark:hover:border-white transition-colors"
            >
              <UIcon :name="social.icon" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>

        <!-- Nav columns -->
        <div class="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div v-for="col in columns" :key="col.label">
            <h3 class="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-600 mb-4">
              {{ col.label }}
            </h3>
            <ul class="space-y-3">
              <li v-for="link in col.children" :key="link.label">
                <NuxtLink
                  :to="link.to || '#'"
                  class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- ===== BOTTOM: copyright + legal ===== -->
      <div class="border-t border-neutral-200 dark:border-neutral-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400 dark:text-neutral-600">
        <span>© {{ new Date().getFullYear() }} RakitWeb. Seluruh hak cipta dilindungi.</span>

        <div class="flex items-center gap-6">
          <template v-for="link in legalLinks" :key="link.label">
            <NuxtLink
              v-if="!link.external"
              :to="link.to"
              class="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              {{ link.label }}
            </NuxtLink>

            <a
              v-else
              :href="link.to"
              class="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              {{ link.label }}
            </a>
          </template>
          
          <UColorModeButton size="sm" class="cursor-pointer text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 border-none shadow-none" />
        
        </div>
      </div>
    </UContainer>
  </footer>
</template>

<style scoped>
footer {
  font-feature-settings: "cv11", "ss01", "cv01";
}
</style>