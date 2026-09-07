<script setup lang="ts">
useSeoMeta({
  title: 'Testimoni Klien - RakitWeb',
  description: 'Cerita dari bisnis dan tim yang membangun solusi digital bersama RakitWeb.',
  ogTitle: 'Testimoni Klien - RakitWeb',
  ogDescription: 'Cerita dari bisnis dan tim yang membangun solusi digital bersama RakitWeb.',
  ogImage: '/rakitweb.jpeg'
})

const testimonials = [
  {
    quote: 'RakitWeb membantu kami memindahkan proses pemesanan ke web yang jauh lebih mudah dipakai. Komunikasinya cepat dan hasilnya rapi.',
    name: 'Dina Pratiwi',
    role: 'Pemilik usaha kuliner',
    project: 'Website bisnis'
  },
  {
    quote: 'Kami butuh landing page yang cepat untuk kampanye baru. Tim RakitWeb memahami brief sejak awal dan menyelesaikannya sesuai jadwal.',
    name: 'Rizky Mahendra',
    role: 'Marketing startup',
    project: 'Landing page'
  },
  {
    quote: 'Setup server dan deployment jadi lebih sederhana. Sekarang tim kami bisa fokus mengembangkan produk tanpa mengurus hal teknis setiap hari.',
    name: 'Fajar Nugroho',
    role: 'Lead developer',
    project: 'Hosting & deployment'
  }
]

const principles = [
  { icon: 'i-lucide-message-circle', title: 'Komunikasi terbuka', desc: 'Update pekerjaan dan keputusan teknis dibagikan dengan jelas.' },
  { icon: 'i-lucide-timer', title: 'Target terukur', desc: 'Setiap proyek dimulai dengan ruang lingkup dan estimasi yang disepakati.' },
  { icon: 'i-lucide-shield-check', title: 'Dukungan berkelanjutan', desc: 'Kami tetap tersedia setelah proyek berjalan di production.' }
]
</script>

<template>
  <main class="min-h-screen bg-white text-zinc-900 antialiased dark:bg-black dark:text-zinc-50">
    <section class="px-6 pb-20 pt-32">
      <UContainer>
        <div class="max-w-2xl">
          <p class="mb-6 font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Testimoni
          </p>
          <h1 class="mb-6 text-4xl font-normal leading-[1.05] tracking-tighter text-black dark:text-white md:text-6xl">
            Hasil kerja yang <br>dirasakan klien.
          </h1>
          <p class="max-w-lg text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            Setiap proyek dimulai dari kebutuhan yang berbeda. Berikut beberapa cerita dari tim yang mempercayakan perjalanan digitalnya kepada RakitWeb.
          </p>
        </div>
      </UContainer>
    </section>

    <div class="border-t border-zinc-200 dark:border-zinc-800" />

    <section class="px-6 py-20">
      <UContainer>
        <div class="grid grid-cols-1 gap-px overflow-hidden border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 md:grid-cols-3">
          <article
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="flex min-h-[300px] flex-col justify-between bg-white p-8 dark:bg-black"
          >
            <div>
              <UIcon
                name="i-lucide-quote"
                class="mb-8 h-6 w-6 text-zinc-300 dark:text-zinc-700"
              />
              <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                “{{ testimonial.quote }}”
              </p>
            </div>
            <div class="mt-10 border-t border-zinc-100 pt-5 dark:border-zinc-900">
              <p class="text-sm font-medium text-black dark:text-white">
                {{ testimonial.name }}
              </p>
              <p class="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                {{ testimonial.role }} · {{ testimonial.project }}
              </p>
            </div>
          </article>
        </div>
      </UContainer>
    </section>

    <div class="border-t border-zinc-200 dark:border-zinc-800" />

    <section class="px-6 py-20">
      <UContainer>
        <div class="mb-12 max-w-xl">
          <p class="mb-4 font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Cara bekerja
          </p>
          <h2 class="text-2xl font-normal tracking-tighter text-black dark:text-white md:text-3xl">
            Ekspektasi yang jelas sejak awal.
          </h2>
        </div>
        <div class="grid grid-cols-1 gap-px overflow-hidden border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 md:grid-cols-3">
          <div
            v-for="principle in principles"
            :key="principle.title"
            class="bg-white p-7 dark:bg-black"
          >
            <UIcon
              :name="principle.icon"
              class="mb-6 h-5 w-5 text-zinc-500 dark:text-zinc-400"
            />
            <h3 class="text-sm font-medium text-black dark:text-white">
              {{ principle.title }}
            </h3>
            <p class="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              {{ principle.desc }}
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="px-6 pb-24 pt-4">
      <UContainer>
        <div class="max-w-xl border-t border-zinc-200 pt-12 dark:border-zinc-800">
          <h2 class="text-2xl font-normal tracking-tighter text-black dark:text-white md:text-3xl">
            Ceritakan kebutuhan proyek Anda.
          </h2>
          <p class="mb-8 mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Konsultasi awal gratis. Kami bantu memetakan langkah teknis dan estimasi yang masuk akal.
          </p>
          <NuxtLink
            to="https://wa.me/6283160325595"
            target="_blank"
            class="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-zinc-50 dark:text-zinc-950"
          >
            <UIcon
              name="i-simple-icons-whatsapp"
              class="h-4 w-4"
            />
            Hubungi Kami
          </NuxtLink>
        </div>
      </UContainer>
    </section>
  </main>
</template>
