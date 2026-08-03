<script setup lang="ts">
const featureGroups = [
  {
    category: 'Domain & Hosting',
    icon: 'i-heroicons-globe-alt',
    items: [
      'Gratis 1 domain pilihan (.com, .xyz, .top, .id, .my.id, .site)',
      'Hosting SSD dengan bandwidth unmetered',
      'SSL certificate otomatis (HTTPS aktif)',
      'Email bisnis @namadomain.com (3 akun)',
      'Setup DNS & propagasi domain',
    ],
  },
  {
    category: 'Website & Halaman',
    icon: 'i-heroicons-window',
    items: [
      'Website statis (SSG) — loading super cepat',
      'Desain company profile atau portofolio custom',
      'Maksimal 5 halaman (Home, About, Layanan, Portofolio, Kontak)',
      'Responsive di desktop, tablet, dan mobile',
      'Optimasi dasar SEO on-page (meta title, description)',
    ],
  },
  {
    category: 'Konten & Aset',
    icon: 'i-heroicons-photo',
    items: [
      'Bantuan copywriting dasar untuk setiap halaman',
      'Kompresi & optimasi gambar otomatis',
      'Favicon & branding sederhana',
      'Formulir kontak terhubung ke email (statis, tanpa database)',
      'Integrasi peta lokasi (Google Maps embed)',
    ],
  },
  {
    category: 'Dukungan Teknis',
    icon: 'i-heroicons-lifebuoy',
    items: [
      '2x revisi minor selama masa pengerjaan',
      'Garansi bug fix 14 hari setelah live',
      'Panduan pengelolaan domain & hosting',
      'Support via chat/email (jam kerja)',
    ],
  },
]

const notIncluded = [
  'Integrasi API pihak ketiga (payment gateway, CRM, dsb.)',
  'Sistem login, dashboard, atau CMS dinamis',
  'Logic bisnis custom (booking system, e-commerce, dsb.)',
  'Database & backend server',
]
</script>

<template>
  <section class="relative bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 border-y border-neutral-200 dark:border-neutral-800">

    <!-- ===== Header ===== -->
    <div class="relative border-b border-neutral-200 dark:border-neutral-800 px-6 md:px-12 py-16 md:py-20">
      <span class="hidden md:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" />
      <span class="hidden md:block absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" />

      <div class="max-w-2xl mx-auto text-center">
        <span class="inline-block text-xs font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-600 mb-3">
          Paket Starter
        </span>
        <h2 class="text-xl md:text-2xl font-semibold tracking-tight">
          Apa saja yang Anda dapatkan
        </h2>
        <p class="mt-3 text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Cocok untuk company profile & portofolio — website statis (SSG)
          yang ringan dan cepat, tanpa sistem backend atau logic bisnis kompleks.
        </p>
      </div>
    </div>

    <!-- ===== Feature groups ===== -->
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800">
      <div
        v-for="group in featureGroups"
        :key="group.category"
        class="p-6 md:p-10"
      >
        <div class="flex items-center gap-2.5 mb-5">
          <span class="flex items-center justify-center w-8 h-8 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400">
            <UIcon :name="group.icon" class="w-4 h-4" />
          </span>
          <h3 class="text-sm md:text-base font-semibold">{{ group.category }}</h3>
        </div>

        <ul class="space-y-3">
          <li
            v-for="item in group.items"
            :key="item"
            class="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed"
          >
            <UIcon
              name="i-heroicons-check"
              class="w-4 h-4 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-500"
            />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- ===== Not included notice ===== -->
    <div class="relative border-t border-neutral-200 dark:border-neutral-800 px-6 md:px-12 py-10 md:py-12 bg-neutral-50/50 dark:bg-neutral-950">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center gap-2 mb-4">
          <UIcon name="i-heroicons-information-circle" class="w-4 h-4 text-neutral-400 dark:text-neutral-600" />
          <h3 class="text-xs font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
            Tidak termasuk di paket ini
          </h3>
        </div>

        <div class="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
          <div
            v-for="item in notIncluded"
            :key="item"
            class="flex items-start gap-2.5 text-sm text-neutral-500 dark:text-neutral-500"
          >
            <UIcon
              name="i-heroicons-x-mark"
              class="w-4 h-4 mt-0.5 shrink-0 text-neutral-300 dark:text-neutral-700"
            />
            <span>{{ item }}</span>
          </div>
        </div>

        <p class="mt-6 text-xs text-neutral-400 dark:text-neutral-600 leading-relaxed">
          Butuh fitur dinamis seperti sistem booking, integrasi payment, atau dashboard admin?
          Lihat paket
          <NuxtLink to="#pro" class="font-medium text-neutral-600 dark:text-neutral-400 underline underline-offset-2 hover:text-neutral-900 dark:hover:text-white transition-colors">
            Pro
          </NuxtLink>
          atau
          <NuxtLink to="#business" class="font-medium text-neutral-600 dark:text-neutral-400 underline underline-offset-2 hover:text-neutral-900 dark:hover:text-white transition-colors">
            Business
          </NuxtLink>.
        </p>
      </div>
    </div>

  </section>
</template>

<style scoped>
section {
  font-feature-settings: "cv11", "ss01", "cv01";
}
</style>