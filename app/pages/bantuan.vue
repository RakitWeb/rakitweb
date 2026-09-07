<script setup lang="ts">
useSeoMeta({
  title: 'Pusat Bantuan - RakitWeb',
  description: 'Jawaban singkat untuk pertanyaan umum tentang layanan dan proyek RakitWeb.',
  ogTitle: 'Pusat Bantuan - RakitWeb',
  ogDescription: 'Jawaban singkat untuk pertanyaan umum tentang layanan dan proyek RakitWeb.',
  ogImage: '/rakitweb.jpeg'
})

const faqs = [
  { question: 'Berapa lama pengerjaan website?', answer: 'Website sederhana biasanya selesai dalam 2–3 minggu. Durasi dapat berubah berdasarkan jumlah halaman, integrasi, dan revisi yang dibutuhkan.' },
  { question: 'Apakah bisa membantu domain dan hosting?', answer: 'Bisa. Kami membantu memilih domain, menyiapkan hosting, deployment, SSL, serta migrasi dari provider lama bila diperlukan.' },
  { question: 'Bagaimana proses memulai proyek?', answer: 'Mulai dengan konsultasi singkat tentang tujuan dan kebutuhan Anda. Setelah ruang lingkup jelas, kami kirimkan estimasi dan rencana pengerjaan.' },
  { question: 'Apakah tersedia dukungan setelah website live?', answer: 'Ya. Paket proyek dapat dilengkapi masa pemeliharaan dan dukungan teknis agar website tetap stabil setelah dirilis.' }
]

const quickLinks = [
  { title: 'Dokumentasi', desc: 'Panduan teknis dan informasi produk.', to: '/docs', icon: 'i-lucide-book-open' },
  { title: 'Harga layanan', desc: 'Lihat pilihan paket dan estimasi biaya.', to: '/pricing', icon: 'i-lucide-credit-card' },
  { title: 'Hubungi tim', desc: 'Bicarakan kebutuhan langsung dengan kami.', to: 'https://wa.me/6283160325595', icon: 'i-lucide-message-circle' }
]
</script>

<template>
  <main class="min-h-screen bg-white text-zinc-900 antialiased dark:bg-black dark:text-zinc-50">
    <section class="px-6 pb-20 pt-32">
      <UContainer>
        <div class="max-w-2xl">
          <p class="mb-6 font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Pusat Bantuan
          </p>
          <h1 class="mb-6 text-4xl font-normal leading-[1.05] tracking-tighter text-black dark:text-white md:text-6xl">
            Temukan jawaban <br>dengan cepat.
          </h1>
          <p class="max-w-lg text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            Jawaban untuk pertanyaan yang sering muncul sebelum, selama, dan setelah proyek digital Anda berjalan.
          </p>
        </div>
      </UContainer>
    </section>

    <div class="border-t border-zinc-200 dark:border-zinc-800" />

    <section class="px-6 py-20">
      <UContainer>
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
          <div>
            <div class="mb-8 border-b border-zinc-200 pb-6 dark:border-zinc-800">
              <h2 class="text-2xl font-normal tracking-tighter text-black dark:text-white">
                Pertanyaan umum
              </h2>
            </div>
            <div class="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
              <details
                v-for="faq in faqs"
                :key="faq.question"
                class="group py-6"
              >
                <summary class="flex cursor-pointer list-none items-center justify-between gap-6 text-sm font-medium text-black dark:text-white">
                  <span>{{ faq.question }}</span><UIcon
                    name="i-lucide-plus"
                    class="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-open:rotate-45"
                  />
                </summary>
                <p class="max-w-2xl pt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {{ faq.answer }}
                </p>
              </details>
            </div>
          </div>
          <aside class="h-fit border border-zinc-200 p-6 dark:border-zinc-800">
            <p class="mb-5 font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Jalur cepat
            </p>
            <div class="space-y-1">
              <NuxtLink
                v-for="link in quickLinks"
                :key="link.title"
                :to="link.to"
                :target="link.to.startsWith('http') ? '_blank' : undefined"
                class="group flex items-start gap-3 p-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
              >
                <UIcon
                  :name="link.icon"
                  class="mt-0.5 h-4 w-4 shrink-0 text-zinc-500"
                />
                <span><span class="block text-sm font-medium text-black dark:text-white">{{ link.title }}</span><span class="mt-1 block text-xs leading-relaxed text-zinc-400 dark:text-zinc-500">{{ link.desc }}</span></span>
              </NuxtLink>
            </div>
          </aside>
        </div>
      </UContainer>
    </section>
  </main>
</template>
