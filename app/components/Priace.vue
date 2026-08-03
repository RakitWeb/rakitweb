<script setup lang="ts">
import { link } from '#build/ui';

const plans = [
  {
    title: 'Starter',
    subtitle: 'Untuk Landingpage / Company Profile Profesional',
    price: '50.000 - 100.000',
    frequency: '/bulan',
    billing: '',
    features: ['Perlindungan DDoS', 'Universal SSL', 'Global CDN','Lainya....'],
    button: 'Lihat Starter plan',
    link: '/jasa/starter',
  },
  {
    title: 'Pro',
    subtitle: 'Untuk Webiste Dinamis Dan Penuh Fitur',
    price: '100.000 - 350.000',
    frequency: '/bulan',
    billing: '',
    features: ['Optimasi Gambar', 'Perlindungan Bot', '24/7 Support', 'Lainya....'],
    button: 'Lihat Pro plan',
    link: '/jasa/pro',

  },
  {
    title: 'Business',
    subtitle: 'Untuk Bisnins Kecil Dan Menengah',
    price: '400.000 - 1.500.000',
    frequency: '/mo',
    billing: '',
    features: ['PCI DSS 4.0', '100% uptime SLA', '14/7 Chat support'],
    button: 'Lihat Business plan',
    link: '/jasa/business',

  },
  {
    title: 'Contract',
    subtitle: 'Untuk Bisnis Besar Dan Misi Kritis',
    price: 'Custom',
    frequency: '',
    billing: 'Pas As You Gooo',
    features: ['Network priority', '24/7 support', 'Custom contracts'],
    button: 'Lihat Contract plan',
    link: 'https://cal.com/rakitweb',
  },
]

const trafficItems = ['CDN', 'DDoS', 'SSL', 'WAF', 'Bot']
</script>

<template>
  <section class="relative bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 border-y border-neutral-200 dark:border-neutral-800">

    <!-- ===== Top intro block ===== -->
    <div class="relative border-b border-neutral-200 dark:border-neutral-800 px-6 md:px-12 py-16 md:py-24">
      <!-- corner marks -->
       
      <span class="hidden md:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" />
      <span class="hidden md:block absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" />

      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <h2 class="text-xl md:text-2xl font-semibold tracking-tight">
            Usahakan agar lalu lintas tetap lancar.
          </h2>
          <p class="mt-3 text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed">
            Satu lapisan keamanan dan performa untuk setiap situs — mitigasi DDoS yang sama, CDN global yang sama, jaringan yang sama di setiap tingkatan. Anda hanya membayar sesuai dengan kedalaman yang dibutuhkan situs Anda.
          </p>
        </div>

        <div class="relative border border-neutral-200 dark:border-neutral-800 p-5 md:p-6 bg-neutral-50/50 dark:bg-neutral-950">
          <!-- corner marks -->
          <span class="absolute -top-1 -left-1 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" />
          <span class="absolute -top-1 -right-1 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" />
          <span class="absolute -bottom-1 -left-1 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" />
          <span class="absolute -bottom-1 -right-1 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" />

          <div class="flex items-center justify-between mb-4">
            <span class="text-xs text-neutral-500 dark:text-neutral-500">analisi traffic</span>
            <span class="text-xs font-medium text-orange-500">Situs mu</span>
          </div>

          <div class="grid grid-cols-5 gap-2">
            <div
              v-for="item in trafficItems"
              :key="item"
              class="aspect-square flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-[11px] md:text-xs font-medium text-neutral-700 dark:text-neutral-300"
            >
              {{ item }}
            </div>
          </div>

          <p class="mt-4 text-center text-[11px] text-neutral-400 dark:text-neutral-600">
            Perlindungan yang sama di setiap tingkatan — paket berbayar memberikan perlindungan yang lebih mendalam.
          </p>
        </div>
      </div>
    </div>

    <!-- ===== Pricing grid ===== -->
    <div class="max-w-6xl mx-auto grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800">
      <div
        v-for="plan in plans"
        :key="plan.title"
        class="p-6 md:p-8 flex flex-col"
      >
        <div>
          <h3 class="font-semibold text-sm md:text-base">{{ plan.title }}</h3>
          <p class="text-xs md:text-sm text-neutral-500 dark:text-neutral-500">{{ plan.subtitle }}</p>
        </div>

        <div class="mt-6">
          <span class="text-2xl md:text-3xl font-semibold tracking-tight">{{ plan.price }}</span>
          <span v-if="plan.frequency" class="text-sm text-neutral-500 dark:text-neutral-500 ml-1">{{ plan.frequency }}</span>
        </div>
        <p v-if="plan.billing" class="mt-1 text-xs text-neutral-400 dark:text-neutral-600">
          {{ plan.billing }}
        </p>

        <div class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="feature in plan.features"
            :key="feature"
            class="text-xs rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1 text-neutral-600 dark:text-neutral-400"
          >
            {{ feature }}
          </span>
        </div>

        <div class="mt-8 pt-2">
          <NuxtLink
            :to="plan.link"
            type="button"
            class="cursor-pointer w-full md:w-auto rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            {{ plan.button }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- ===== Bottom dotted strip ===== -->
    <div class="relative h-16 md:h-20 border-t border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <span class="hidden md:block absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" />
      <span class="hidden md:block absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" />
      <div
        class="absolute inset-0"
        style="background-image: radial-gradient(circle, rgb(163 163 163 / 0.35) 1px, transparent 1px); background-size: 16px 16px;"
      />
    </div>
  </section>
</template>

<style scoped>
section {
  font-feature-settings: "cv11", "ss01", "cv01";
}

@media (max-width: 768px) {
  section {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>