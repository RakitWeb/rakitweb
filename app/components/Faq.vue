<script setup lang="ts">
const faqs = [
  {
    question: 'Berapa lama proses pembuatan website?',
    answer:
      'Rata-rata pengerjaan memakan waktu 7–14 hari kerja untuk website company profile atau landing page, dan 2–4 minggu untuk website dengan sistem custom seperti e-commerce atau dashboard admin. Timeline final tergantung kompleksitas fitur dan kecepatan proses review dari klien.',
  },
  {
    question: 'Apakah harga sudah termasuk domain dan hosting?',
    answer:
      'Tergantung paket yang dipilih. Beberapa paket sudah termasuk domain dan hosting selama 1 tahun pertama, sementara paket lain hanya mencakup pengerjaan website saja. Detail lengkap bisa dilihat di halaman harga atau tanyakan langsung ke tim kami sebelum deal.',
  },
  {
    question: 'Apakah website yang dibuat bisa dikelola sendiri tanpa coding?',
    answer:
      'Bisa. Kami membangun website menggunakan CMS (Content Management System) sehingga kamu bisa mengubah teks, gambar, dan konten lain dari dashboard admin tanpa perlu menyentuh kode sama sekali.',
  },
  {
    question: 'Apakah ada garansi revisi setelah website selesai?',
    answer:
      'Ya, setiap paket sudah termasuk sesi revisi terbatas (biasanya 2–3 kali revisi minor) selama masa pengerjaan. Revisi besar di luar scope awal atau setelah website live akan dikenakan biaya tambahan sesuai kesepakatan.',
  },
  {
    question: 'Apakah website akan responsive di HP dan tablet?',
    answer:
      'Semua website yang kami buat sudah responsive by default, artinya tampilan akan otomatis menyesuaikan di berbagai ukuran layar mulai dari desktop, tablet, hingga smartphone tanpa perlu pengaturan tambahan.',
  },
  {
    question: 'Bagaimana sistem pembayarannya?',
    answer:
      'Pembayaran umumnya dibagi dua tahap: DP (down payment) 50% di awal sebelum pengerjaan dimulai, dan pelunasan 50% sisanya setelah website selesai dan disetujui klien sebelum go-live.',
  },
  {
    question: 'Apakah bisa request desain custom sesuai brand sendiri?',
    answer:
      'Tentu. Kami akan menyesuaikan desain dengan brand guideline kamu, mulai dari warna, logo, tipografi, hingga gaya visual, agar website terasa konsisten dengan identitas bisnis kamu.',
  },
  {
    question: 'Apakah ada layanan maintenance setelah website live?',
    answer:
      'Tersedia paket maintenance bulanan opsional yang mencakup update konten, backup berkala, monitoring keamanan, dan perbaikan bug ringan. Paket ini bisa diambil terpisah sesuai kebutuhan setelah website launching.',
  },
]

const openIndex = ref<number | null>(0)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section class="relative bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800" id="faq">

    <!-- ===== Header ===== -->
    <div class="relative border-b border-neutral-200 dark:border-neutral-800 px-6 md:px-12 py-16 md:py-20">
      <span class="hidden md:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" />
      <span class="hidden md:block absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" />

      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-xl md:text-2xl font-semibold tracking-tight">
          Pertanyaan yang sering diajukan
        </h2>
        <p class="mt-3 text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Belum menemukan jawaban yang kamu cari? Hubungi tim kami langsung,
          kami siap bantu jelaskan lebih detail.
        </p>
      </div>
    </div>

    <!-- ===== FAQ list ===== -->
    <div class="max-w-3xl mx-auto divide-y divide-neutral-200 dark:divide-neutral-800">
      <div
        v-for="(faq, index) in faqs"
        :key="faq.question"
        class="px-6 md:px-0"
      >
        <button
          type="button"
          class="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left"
          @click="toggle(index)"
        >
          <span class="text-sm md:text-base font-medium text-neutral-900 dark:text-neutral-100">
            {{ faq.question }}
          </span>

          <span
            class="shrink-0 flex items-center justify-center w-6 h-6 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 transition-transform duration-200"
            :class="openIndex === index ? 'rotate-45' : 'rotate-0'"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1V11M1 6H11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
            </svg>
          </span>
        </button>

        <div
          class="grid overflow-hidden transition-all duration-300 ease-in-out"
          :class="openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
        >
          <div class="overflow-hidden">
            <p class="pb-5 md:pb-6 pr-8 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== Bottom dotted strip ===== -->
    <div class="relative h-16 md:h-20 border-t border-neutral-200 dark:border-neutral-800 overflow-hidden mt-4">
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