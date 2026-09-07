<script setup lang="ts">
useSeoMeta({
  title: 'Events - RakitWeb',
  description: 'Agenda kegiatan, promo, dan sesi berbagi dari RakitWeb.',
  ogTitle: 'Events - RakitWeb',
  ogDescription: 'Agenda kegiatan, promo, dan sesi berbagi dari RakitWeb.',
  ogImage: '/rakitweb.jpeg'
})

const events = [
  { date: '01 JUN 2026', title: 'Promo Website Starter', desc: 'Mulai membangun website bisnis dengan paket yang ringkas dan transparan.', tag: 'Promo', icon: 'i-lucide-sparkles' },
  { date: '15 JUN 2026', title: 'Diskon Setup Hosting', desc: 'Dapatkan bantuan setup dan migrasi hosting untuk proyek yang sudah berjalan.', tag: 'Layanan', icon: 'i-lucide-server' },
  { date: '10 JUL 2026', title: 'Workshop Web Development', desc: 'Sesi online untuk mengenal workflow membangun website modern dari awal.', tag: 'Workshop', icon: 'i-lucide-presentation' }
]
</script>

<template>
  <main class="min-h-screen bg-white text-zinc-900 antialiased dark:bg-black dark:text-zinc-50">
    <section class="px-6 pb-20 pt-32">
      <UContainer>
        <div class="max-w-2xl">
          <p class="mb-6 font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Events
          </p><h1 class="mb-6 text-4xl font-normal leading-[1.05] tracking-tighter text-black dark:text-white md:text-6xl">
            Bertemu, belajar, <br>dan bertumbuh.
          </h1><p class="max-w-lg text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            Ikuti agenda RakitWeb untuk mendapatkan insight, penawaran, dan kesempatan berdiskusi tentang produk digital.
          </p>
        </div>
      </UContainer>
    </section>
    <div class="border-t border-zinc-200 dark:border-zinc-800" />
    <section class="px-6 py-20">
      <UContainer>
        <div class="mb-10 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <h2 class="text-2xl font-normal tracking-tighter text-black dark:text-white">
            Agenda mendatang
          </h2><p class="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Simpan tanggalnya dan ikuti pembaruan melalui kanal kami.
          </p>
        </div><div class="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          <article
            v-for="event in events"
            :key="event.title"
            class="grid gap-6 py-8 md:grid-cols-[130px_1fr_auto] md:items-center"
          >
            <time class="font-mono text-xs text-zinc-400 dark:text-zinc-500">{{ event.date }}</time><div>
              <div class="mb-2 flex items-center gap-2">
                <UIcon
                  :name="event.icon"
                  class="h-4 w-4 text-zinc-500"
                /><span class="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{{ event.tag }}</span>
              </div><h3 class="text-base font-medium text-black dark:text-white">
                {{ event.title }}
              </h3><p class="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {{ event.desc }}
              </p>
            </div><NuxtLink
              to="https://wa.me/6283160325595"
              target="_blank"
              class="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            >Tanya detail <UIcon
              name="i-lucide-arrow-up-right"
              class="h-3.5 w-3.5"
            /></NuxtLink>
          </article>
        </div>
      </UContainer>
    </section>
  </main>
</template>
