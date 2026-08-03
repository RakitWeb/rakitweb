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
    title: 'Landing Page',
    description:
      'Halaman promosi profesional untuk produk, jasa, event, atau kampanye digital dengan performa tinggi dan SEO-friendly.',
    price: 'Mulai Rp3.000.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Company Profile',
    description:
      'Website perusahaan lengkap dengan profil, layanan, tim, kontak, galeri, dan formulir konsultasi.',
    price: 'Mulai Rp3.500.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Personal Portfolio',
    description:
      'Website portofolio modern untuk developer, designer, freelancer, fotografer, maupun kreator digital.',
    price: 'Mulai Rp3.000.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Business Profile',
    description:
      'Website profil bisnis untuk UMKM, toko, startup, restoran, bengkel, salon, klinik, dan berbagai usaha lainnya.',
    price: 'Mulai Rp3.200.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Website Sekolah',
    description:
      'Website sekolah dengan informasi akademik, berita, galeri, PPDB, prestasi, guru, dan halaman jurusan.',
    price: 'Mulai Rp4.000.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Website Kampus',
    description:
      'Website universitas, institut, atau akademi dengan informasi fakultas, program studi, berita, dan penerimaan mahasiswa.',
    price: 'Mulai Rp4.500.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Website Yayasan',
    description:
      'Website organisasi sosial, yayasan, maupun lembaga pendidikan dengan profil, kegiatan, dan publikasi.',
    price: 'Mulai Rp3.500.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Website Organisasi',
    description:
      'Website komunitas, organisasi, himpunan, atau lembaga dengan struktur organisasi, agenda, dan dokumentasi kegiatan.',
    price: 'Mulai Rp3.500.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Website Masjid & Pesantren',
    description:
      'Profil lembaga keagamaan lengkap dengan jadwal kegiatan, artikel, galeri, donasi, dan informasi program.',
    price: 'Mulai Rp3.500.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Blog & News Portal',
    description:
      'Website blog pribadi, media online, majalah digital, maupun portal berita dengan struktur SEO modern.',
    price: 'Mulai Rp3.800.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Product Showcase',
    description:
      'Katalog produk digital tanpa fitur checkout, cocok untuk perusahaan manufaktur, distributor, atau supplier.',
    price: 'Mulai Rp3.500.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Restaurant & Cafe Website',
    description:
      'Website restoran, coffee shop, atau bakery dengan menu digital, galeri, lokasi, reservasi, dan kontak.',
    price: 'Mulai Rp3.800.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Property Showcase',
    description:
      'Website agen properti atau developer untuk menampilkan rumah, apartemen, ruko, maupun proyek pembangunan.',
    price: 'Mulai Rp4.000.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Travel & Tour Website',
    description:
      'Website travel agent dengan paket wisata, destinasi, galeri, testimonial, dan formulir pemesanan.',
    price: 'Mulai Rp4.000.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Event Website',
    description:
      'Website seminar, konser, konferensi, workshop, hingga wedding dengan jadwal acara dan registrasi.',
    price: 'Mulai Rp3.200.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Healthcare Profile',
    description:
      'Website rumah sakit, klinik, apotek, laboratorium, maupun praktik dokter dengan informasi layanan.',
    price: 'Mulai Rp4.200.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Construction & Architecture',
    description:
      'Website kontraktor, arsitek, interior, maupun developer bangunan dengan portofolio proyek.',
    price: 'Mulai Rp3.800.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Automotive Website',
    description:
      'Website dealer mobil, motor, showroom, rental kendaraan, maupun bengkel profesional.',
    price: 'Mulai Rp3.500.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Legal & Consultant',
    description:
      'Website firma hukum, konsultan bisnis, konsultan pajak, maupun jasa profesional lainnya.',
    price: 'Mulai Rp3.500.000',
    cta: 'Pilih',
    href: '#',
  },
  {
    title: 'Custom Static Website',
    description:
      'Website statis yang dirancang khusus sesuai kebutuhan branding, promosi, maupun publikasi organisasi.',
    price: 'Mulai Rp4.500.000',
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
    `*Kategori Paket :* Starter`,
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