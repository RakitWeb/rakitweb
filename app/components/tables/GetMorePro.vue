<script setup lang="ts">
interface AddOn {
  title: string
  description: string
  price: string
  cta: string
  href: string
  span?: boolean // full width row (e.g. Workers)
}


const addOns: AddOn[] = [
  {
    title: 'Point of Sales (POS)',
    description:
      'Sistem kasir modern dengan manajemen produk, stok, transaksi, laporan penjualan, barcode, dan dukungan multi-cabang.',
    price: 'Mulai Rp4.500.000 + Rp750.000/bulan',
    cta: 'Pesan Sekarang',
    href: '#',
  },
  {
    title: 'Inventory Management',
    description:
      'Kelola stok barang secara real-time, pembelian, supplier, gudang, mutasi stok, serta notifikasi stok minimum.',
    price: 'Mulai Rp5.000.000 + Rp850.000/bulan',
    cta: 'Pesan Sekarang',
    href: '#',
  },
  {
    title: 'Customer Relationship Management (CRM)',
    description:
      'Kelola data pelanggan, pipeline penjualan, follow-up, aktivitas tim sales, hingga analitik performa.',
    price: 'Mulai Rp6.500.000 + Rp1.200.000/bulan',
    cta: 'Pesan Sekarang',
    href: '#',
  },
  {
    title: 'Human Resource Information System (HRIS)',
    description:
      'Absensi, pengajuan cuti, payroll, data karyawan, penilaian kinerja, dan dashboard administrasi SDM.',
    price: 'Mulai Rp7.000.000 + Rp1.250.000/bulan',
    cta: 'Pesan Sekarang',
    href: '#',
  },
  {
    title: 'Project Management System',
    description:
      'Kelola proyek, tugas, timeline, file, progress, dan kolaborasi tim dalam satu dashboard terpadu.',
    price: 'Mulai Rp5.500.000 + Rp900.000/bulan',
    cta: 'Pesan Sekarang',
    href: '#',
  },
  {
    title: 'Learning Management System (LMS)',
    description:
      'Platform pembelajaran online dengan kelas, materi, video, kuis, sertifikat, dan manajemen peserta.',
    price: 'Mulai Rp8.500.000 + Rp1.500.000/bulan',
    cta: 'Pesan Sekarang',
    href: '#',
  },
  {
    title: 'Booking & Reservation System',
    description:
      'Sistem reservasi untuk hotel, klinik, restoran, atau jasa lainnya lengkap dengan pembayaran online.',
    price: 'Mulai Rp6.000.000 + Rp950.000/bulan',
    cta: 'Pesan Sekarang',
    href: '#',
  },
  {
    title: 'Membership & Subscription Platform',
    description:
      'Kelola anggota, paket langganan, pembayaran otomatis, akses premium, dan laporan keanggotaan.',
    price: 'Mulai Rp7.500.000 + Rp1.350.000/bulan',
    cta: 'Pesan Sekarang',
    href: '#',
  },
  {
    title: 'Enterprise Management System (ERP Lite)',
    description:
      'Integrasi keuangan, inventori, pembelian, penjualan, operasional, dan pelaporan bisnis dalam satu sistem.',
    price: 'Mulai Rp9.000.000 + Rp1.750.000/bulan',
    cta: 'Pesan Sekarang',
    href: '#',
  },
  {
    title: 'Custom Business Application',
    description:
      'Pengembangan aplikasi web khusus sesuai kebutuhan bisnis, workflow perusahaan, API, dashboard, dan automasi proses.',
    price: 'Mulai Rp8.000.000 + Rp1.500.000/bulan',
    cta: 'Konsultasi',
    href: '#',
    span: true,
  },
]

const WA_NUMBER = '6283160325595'

function buildWhatsAppLink(item: AddOn): string {
  const msg = [
    `Halo Kak, saya tertarik dengan layanan RakitWeb dan ingin berdiskusi lebih lanjut. `,
    ``,
    `*Kategori Paket :* Pro`,
    `*Layanan yang Dipilih :* ${item.title}`,
    `*Deskripsi :* ${item.description}`,
    `*Estimasi Harga :* ${item.price}`,
    ``,
    `Boleh saya konsultasikan lebih lanjut mengenai kebutuhan saya?`,
    `Terima kasih sebelumnya! `,
  ].join('\n')

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

</script>

<template>
  <section class="bg-white dark:bg-black py-24 px-6 transition-colors duration-300">
    <div class="mx-auto max-w-6xl">
      <!-- Heading -->
      <div class="text-center mb-14">
        <h2
          class="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white"
        >
        Lebih Banyak Dari Rakitweb
        </h2>
        <p class="mt-4 text-base text-neutral-500 dark:text-neutral-400">
          Rakitweb membantu bisnis Anda tumbuh dengan menyediakan alat dan sumber daya yang Anda butuhkan untuk sukses.
        </p>
      </div>

      <!-- Grid card -->
      <div
        class="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/40 overflow-hidden"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(item, index) in addOns"
            :key="item.title"
            :class="[
              'group relative p-8 flex flex-col justify-between',
              'border-neutral-200 dark:border-neutral-800 border-b',
              item.span
                ? 'sm:col-span-2 lg:col-span-3'
                : [
                    // 2-col breakpoint: right border on odd items only
                    (index + 1) % 2 !== 0 ? 'sm:border-r' : '',
                    // 3-col breakpoint: right border unless last in row, overrides sm rule
                    'lg:border-r-0',
                    (index + 1) % 3 !== 0 ? 'lg:border-r' : '',
                  ],
            ]"
          >
            <div>
              <h3 class="text-[15px] font-semibold text-neutral-900 dark:text-white">
                {{ item.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {{ item.description }}
              </p>
            </div>

            <div class="mt-6 flex items-center justify-between gap-4">
              <span class="text-xs text-neutral-400 dark:text-neutral-500 leading-snug">
                {{ item.price }}
              </span>

              <a
                :href="buildWhatsAppLink(item)"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-sm font-medium text-neutral-900 dark:text-white whitespace-nowrap transition-opacity hover:opacity-60"
              >
                {{ item.cta }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M5 15L15 5M15 5H7M15 5V13"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  font-feature-settings: "cv11", "ss01", "cv01";
}

/* remove border on the very last cell in the grid */
.grid > div:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  section {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
}
</style>