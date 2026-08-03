<script setup lang="ts">
const plans = [
  {
    name: 'Regular',
    to: 'https://api.whatsapp.com/send/?phone=6283160325595&text=Halo+Kak%2C+saya+tertarik+dengan+layanan+RakitWeb+dan+ingin+berdiskusi+lebih+lanjut.%0A%0A%2AKategori+Paket+%3A%2A+Pro+-+Regular%0A%2ADeskripsi+%3A%2A+Cocok+Untuk+Kebutuhan+Situs+Pemesanan+Online.+Menjadi+Solusi+untuk+kamu+yang+ingin+punya+sistem+awal%0A%2AEstimasi+Harga+%3A%2A+Mulai+Rp3.500.000+dan+Rp200.000%2Fbulan%0A%0ABoleh+saya+konsultasikan+lebih+lanjut+mengenai+kebutuhan+saya%3F%0ATerima+kasih+sebelumnya%21&type=phone_number&app_absent=0',
    badge: null,
    price: '200k',
    period: '/bulan',
    desc: 'Cocok Untuk Kebutuhan Situs Pemesanan Online. Menjadi Solusi untuk kamu yang ingin punya sistem awal',
    features: [
      { icon: 'i-heroicons-arrow-down-tray', label: 'Zero Configurasi Sistem' },
      { icon: 'i-heroicons-globe-alt', label: 'Domain & gratis (1 tahun)' },
      { icon: 'i-heroicons-shield-check', label: 'SSL certificate otomatis' },
      { icon: 'i-heroicons-bolt', label: 'Cepat Dan Responsif' },
      { icon: 'i-heroicons-photo', label: 'Optimasi gambar otomatis' },
      { icon: 'i-heroicons-circle-stack', label: 'Storage 5GB' },
      { icon: 'i-heroicons-cloud-arrow-down', label: 'Bandwidth 10GB/bulan' },
      { icon: 'i-heroicons-chat-bubble-left-right', label: 'Support 1x24 Jam' },
      { icon: 'i-heroicons-clock', label: 'Uptime SLA' },
    ],
    cta: 'Mulai gratis',
  },
  {
    name: 'Team',
    to: 'https://api.whatsapp.com/send/?phone=6283160325595&text=Halo+Kak%2C+saya+tertarik+dengan+layanan+RakitWeb+dan+ingin+berdiskusi+lebih+lanjut.%0A%0A%2AKategori+Paket+%3A%2A+Pro+-+Team%0A%2ADeskripsi+%3A%2A+Semua+yang+Anda+butuhkan+untuk+membangun+sistem+berbasis+bisnis+kompleks.%0A%2AEstimasi+Harga+%3A%2A+Mulai+Rp3.500.000+-+Rp750.000%2Fbulan%0A%0ABoleh+saya+konsultasikan+lebih+lanjut+mengenai+kebutuhan+saya%3F%0ATerima+kasih+sebelumnya%21&type=phone_number&app_absent=0',
    badge: 'Popular',
    price: '750k',
    period: '/bulan',
    desc: 'Semua yang Anda butuhkan untuk membangun sistem berbasis bisnis.',
    featuresIntro: 'Semua fitur Starter, plus:',
    features: [
      { icon: 'i-heroicons-server-stack', label: 'Backend & database penuh' },
      { icon: 'i-heroicons-code-bracket', label: 'API & integrasi pihak ketiga' },
      { icon: 'i-heroicons-users', label: 'CMS admin & role pengguna' },
      { icon: 'i-heroicons-arrow-path', label: '4x revisi major' },
      { icon: 'i-heroicons-lifebuoy', label: 'Support prioritas' },
    ],
    cta: 'Upgrade sekarang',
  },
  {
    name: 'Business',
    to: '/jasa/business',
    badge: null,
    price: 'Custom',
    period: '',
    desc: 'Keamanan, performa, dan support tingkat lanjut untuk skala besar.',
    featuresIntro: 'Semua fitur Pro, plus:',
    features: [
      { icon: 'i-heroicons-building-office-2', label: 'Multi-region deployment' },
      { icon: 'i-heroicons-shield-exclamation', label: 'Managed WAF rulesets' },
      { icon: 'i-heroicons-clock', label: '99.99% SLA' },
      { icon: 'i-heroicons-identification', label: 'Kontrak & NDA custom' },
      { icon: 'i-heroicons-headset', label: 'Dedicated support 24/7' },
    ],
    cta: 'Hubungi kami',
  },
]

const comparisonGroups = [
  {
    group: 'Infrastruktur',
    rows: [
      { label: 'SSL Certificate', values: [true, true, true] },
      { label: 'Global CDN', values: [true, true, true] },
      { label: 'Auto Backup', values: [false, true, true] },
      { label: 'Private Network', values: [false, true, true] },
      { label: 'Auto Failover', values: [false, false, true] },
    ],
  },
  {
    group: 'Development',
    rows: [
      { label: 'Website Dinamis (SSR)', values: [true, true, true] },
      { label: 'Database', values: [true, true, true] },
      { label: 'Backend Penuh', values: [false, true, true] },
      { label: 'REST/GraphQL API', values: [false, true, true] },
      { label: 'Role & Permission', values: [false, true, true] },
    ],
  },
  {
    group: 'Kapasitas',
    rows: [
      { label: 'Storage', values: ['5 GB', '50 GB', 'Custom'] },
      { label: 'Bandwidth', values: ['10 GB/bulan', 'Unmetered', 'Custom'] },
      { label: 'Uptime SLA', values: ['99%', '99.9%', '99.99%'] },
    ],
  },
]

const planNames = ['Regular', 'Team', 'Business']
</script>

<template>
  <div class="bg-white dark:bg-black text-neutral-900 dark:text-neutral-100">

    <!-- ============================== -->
    <!-- SECTION 1 — Pricing cards -->
    <!-- ============================== -->
    <section class="px-6 md:px-12 py-16 md:py-24">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-semibold tracking-tight max-w-lg">
          Skalakan website Anda, kendalikan biaya Anda
        </h2>

        <div class="mt-10 grid md:grid-cols-3 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800">
          <div
            v-for="plan in plans"
            :key="plan.name"
            class="p-6 md:p-8 flex flex-col bg-white dark:bg-neutral-950"
          >
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-neutral-500 dark:text-neutral-400">{{ plan.name }}</span>
              <span
                v-if="plan.badge"
                class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black"
              >
                {{ plan.badge }}
              </span>
            </div>

            <div class="mt-5 flex items-baseline gap-1">
              <span class="text-4xl md:text-5xl font-semibold tracking-tight">{{ plan.price }}</span>
              <span v-if="plan.period" class="text-sm text-neutral-400 dark:text-neutral-600">{{ plan.period }}</span>
            </div>

            <p class="mt-4 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {{ plan.desc }}
            </p>

            <hr class="my-6 border-neutral-200 dark:border-neutral-800">

            <p v-if="plan.featuresIntro" class="text-xs text-neutral-400 dark:text-neutral-600 mb-3">
              {{ plan.featuresIntro }}
            </p>

            <ul class="space-y-3 flex-1">
              <li
                v-for="feature in plan.features"
                :key="feature.label"
                class="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-300"
              >
                <UIcon :name="feature.icon" class="w-4 h-4 shrink-0 text-neutral-400 dark:text-neutral-500" />
                <span>{{ feature.label }}</span>
              </li>
            </ul>
            <NuxtLink
              :to="plan.to"
              class="mt-8 inline-flex w-full items-center justify-center rounded-lg py-2.5 text-sm font-medium transition-colors"
                          :class="plan.badge
                            ? 'bg-neutral-900 text-white hover:opacity-85 dark:bg-white dark:text-black'
                            : 'border border-neutral-300 text-neutral-900 hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-900'"
                        >
                          {{ plan.cta }}
             </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== -->
    <!-- SECTION 2 — Comparison table -->
    <!-- ============================== -->
    <section class="px-6 md:px-12 pb-16 md:pb-24">
      <div class="max-w-6xl mx-auto border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 md:p-8">

        <div class="flex items-start gap-2.5 mb-6">
          <UIcon name="i-heroicons-squares-2x2" class="w-5 h-5 mt-0.5 text-neutral-400 dark:text-neutral-600" />
          <div>
            <h3 class="text-base font-medium">Perbandingan Fitur Lengkap</h3>
            <p class="text-sm text-neutral-500 dark:text-neutral-400">
              Detail setiap fitur di setiap paket, secara transparan.
            </p>
          </div>
        </div>

        <!-- Column headers -->
        <div class="grid grid-cols-4 gap-4 pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <span class="text-xs text-neutral-400 dark:text-neutral-600" />
          <span
            v-for="name in planNames"
            :key="name"
            class="text-xs font-medium text-center text-neutral-500 dark:text-neutral-400"
          >
            {{ name }}
          </span>
        </div>

        <!-- Groups -->
        <div v-for="group in comparisonGroups" :key="group.group">
          <div class="pt-6 pb-2">
            <span class="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              {{ group.group }}
            </span>
          </div>

          <div
            v-for="row in group.rows"
            :key="row.label"
            class="grid grid-cols-4 gap-4 items-center py-3 border-b border-neutral-100 dark:border-neutral-900 last:border-b-0"
          >
            <span class="text-sm text-neutral-500 dark:text-neutral-400">{{ row.label }}</span>

            <div
              v-for="(value, i) in row.values"
              :key="i"
              class="flex justify-center"
            >
              <UIcon
                v-if="value === true"
                name="i-heroicons-check"
                class="w-4 h-4 text-neutral-400 dark:text-neutral-500"
              />
              <span
                v-else-if="value === false"
                class="text-neutral-200 dark:text-neutral-800 text-sm"
              >
                —
              </span>
              <span
                v-else
                class="text-xs text-neutral-600 dark:text-neutral-400 text-center"
              >
                {{ value }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
section {
  font-feature-settings: "cv11", "ss01", "cv01";
}
</style>