// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    // ── Redirect ─────────────────────────────────────────────────
    '/docs': { redirect: '/docs/getting-started' },

    // ── Semua halaman di-prerender saat build (production only) ───
    // Di dev mode, prerender diabaikan — tidak ada edge compute sama sekali
    // saat production karena semua jadi file HTML statis di Vercel CDN.
    '/': { prerender: true },
    '/pricing': { prerender: true },
    '/pricing-android': { prerender: true },
    '/team': { prerender: true },
    '/partner': { prerender: true },
    '/about': { prerender: true },
    '/privacy-policy': { prerender: true },
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },
    '/docs/**': { prerender: true },
    '/changelog': { prerender: true },
    '/changelog/**': { prerender: true },
    '/jasa': { prerender: true },
    '/jasa/**': { prerender: true },
    '/karir': { prerender: true },
    '/karir/**': { prerender: true },
    '/akademik/**': { prerender: true },
    '/kesiswaan/**': { prerender: true },
    '/template/**': { prerender: true },

    // ── Feeds — di-prerender, cache lama di CDN ───────────────────
    '/rss.xml': {
      prerender: true,
      headers: { 'cache-control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800' }
    },
    '/atom.xml': {
      prerender: true,
      headers: { 'cache-control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800' }
    },
    '/feed.xml': {
      headers: { 'cache-control': 'public, max-age=3600, s-maxage=3600' }
    },

    // ── Halaman auth — tidak prerender ────────────────────────────
    '/login': { prerender: false },
    '/signup': { prerender: false },

    // ── API — no cache, no prerender ─────────────────────────────
    '/api/**': {
      headers: { 'cache-control': 'no-store, no-cache' }
    },

    // ── Global headers untuk semua route ─────────────────────────
    '/**': {
      headers: {
        // Security
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'SAMEORIGIN',
        'referrer-policy': 'strict-origin-when-cross-origin',
        'permissions-policy': 'camera=(), microphone=(), geolocation=()',
        'strict-transport-security': 'max-age=63072000; includeSubDomains; preload',
        // Blokir AI indexer yang mengabaikan robots.txt
        'x-robots-tag': 'noai, noimageai'
      }
    }
  },

  compatibilityDate: '2024-07-11',

  // Exclude TrapStack Angular signature tag from Vue component resolution
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => ['app-root'].includes(tag)
    }
  },

  experimental: {
    // Jangan cache payload di dev mode — mencegah ENOENT error
    // saat direktori .nuxt/cache/nuxt/payload/ belum terbuat
    payloadExtraction: false
  },

  nitro: {
    prerender: {
      // Seed awal — Nitro akan temukan semua route lain lewat crawl
      routes: [
        '/',
        '/blog',
        '/docs/getting-started',
        '/pricing',
        '/pricing-android',
        '/team',
        '/partner',
        '/about',
        '/privacy-policy',
        '/changelog',
        '/jasa',
        '/karir',
        '/akademik/kurikulum',
        '/akademik/jurusan',
        '/akademik/fasilitas',
        '/akademik/prestasi',
        '/kesiswaan/bk',
        '/kesiswaan/bkk',
        '/kesiswaan/ekskul',
        '/rss.xml',
        '/atom.xml',
        '/sitemap.xml'
      ],
      // crawlLinks: true supaya semua /blog/[slug] & /docs/[slug]
      // terdeteksi otomatis dari link yang ada di halaman
      crawlLinks: true,
      // Jangan throw error jika ada route 404 saat crawl
      failOnError: false
    },

    // Kompres semua output HTML/CSS/JS
    compressPublicAssets: { gzip: true, brotli: true }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
