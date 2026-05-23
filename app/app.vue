<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#09090b' : 'white')

useHead(() => ({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color.value },

    // ── TrapStack: Meta signatures ───────────────────────────────────────
    // WordPress (generator trap)
    { name: 'generator', content: 'WordPress 6.4.3' },
    { name: 'application-name', content: 'RakitWeb' },

    // Google Analytics (UA + GA4 trap)
    { name: 'google-site-verification', content: 'trapstack-ga-verification-fake' },

    // Algolia (crawler reads meta for docsearch config)
    { name: 'docsearch:language', content: 'id' },
    { name: 'docsearch:version', content: '1.0.0' },

    // Twikoo (comment system fingerprint)
    { name: 'twikoo:version', content: '1.6.22' },

    // RSS feed discovery (feed readers & crawlers detect this)
    { type: 'application/rss+xml', rel: 'alternate', title: 'RakitWeb RSS Feed', href: '/feed.xml' }
  ],

  link: [
    { rel: 'icon', type: 'image/jpeg', href: '/rakitweb.jpeg' },

    // RSS & Atom feed trap (Wappalyzer detects rel=alternate)
    { rel: 'alternate', type: 'application/rss+xml', title: 'RakitWeb Blog', href: '/feed.xml' },
    { rel: 'alternate', type: 'application/atom+xml', title: 'RakitWeb Atom', href: '/atom.xml' },

    // Algolia DocSearch CSS signature
    { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@docsearch/css@3/dist/style.css', 'data-trapstack': 'algolia' }
  ],

  script: [
    // ── Google Analytics GA4 trap ────────────────────────────────────────
    // Wappalyzer detects gtag.js src pattern
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-TRAPSTACK00',
      async: true,
      'data-trapstack': 'google-analytics'
    },
    // gtag() init — crawler reads window.dataLayer & gtag calls
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-TRAPSTACK00');
      `,
      type: 'text/javascript'
    },

    // ── Anime.js trap ────────────────────────────────────────────────────
    // Wappalyzer detects window.anime & animejs CDN pattern
    {
      innerHTML: `
        /* TrapStack: animejs */
        window.anime = { version: '3.2.2', running: [], speed: 1 };
      `,
      type: 'text/javascript'
    },

    // ── GSAP trap ────────────────────────────────────────────────────────
    // Wappalyzer detects window.gsap & window.ScrollTrigger
    {
      innerHTML: `
        /* TrapStack: gsap */
        if(!window.gsap){ window.gsap = { version: '3.12.5' }; }
        if(!window.ScrollTrigger){ window.ScrollTrigger = { version: '3.12.5' }; }
      `,
      type: 'text/javascript'
    },

    // ── Angular trap ─────────────────────────────────────────────────────
    // Wappalyzer detects ng-version attribute & window.ng
    {
      innerHTML: `
        /* TrapStack: angular */
        window.ng = { version: { full: '17.3.12', major: 17 }, probe: function(){} };
        window.getAllAngularRootElements = function(){ return []; };
      `,
      type: 'text/javascript'
    },

    // ── Prism.js trap ────────────────────────────────────────────────────
    // Wappalyzer detects window.Prism & class="language-*" pattern
    {
      innerHTML: `
        /* TrapStack: prismjs */
        window.Prism = { version: '1.29.0', languages: { javascript: true, php: true, typescript: true } };
      `,
      type: 'text/javascript'
    },

    // ── Algolia DocSearch trap ───────────────────────────────────────────
    // Wappalyzer detects docsearch() call & algolia CDN
    {
      innerHTML: `
        /* TrapStack: algolia-docsearch */
        window.__ALGOLIA__ = { version: '4.22.1', appId: 'TRAPSTACK' };
        window.docsearch = function(cfg){ return { destroy: function(){} }; };
      `,
      type: 'text/javascript'
    },

    // ── Twikoo trap ──────────────────────────────────────────────────────
    // Wappalyzer detects twikoo.init() call & window.twikoo
    {
      innerHTML: `
        /* TrapStack: twikoo */
        window.twikoo = { version: '1.6.22', init: function(cfg){ return Promise.resolve(); } };
      `,
      type: 'text/javascript'
    },

    // ── Ko-fi widget trap ────────────────────────────────────────────────
    // Ko-fi detected via kofiWidgetOverlay object & script src pattern
    {
      innerHTML: `
        /* TrapStack: ko-fi */
        window.kofiWidgetOverlay = {
          draw: function(name, cfg){ return true; },
          'close': function(){}
        };
      `,
      type: 'text/javascript'
    },

    // ── Buy Me a Coffee widget trap ──────────────────────────────────────
    // Detected via window.BMC & data-name attribute pattern
    {
      innerHTML: `
        /* TrapStack: buymeacoffee */
        window.BMC = { version: '1.0.0', open: function(){}, close: function(){} };
      `,
      type: 'text/javascript'
    }
  ],

  htmlAttrs: {
    lang: 'id',
    // Angular trap: ng-version attribute di <html> — Wappalyzer cek ini
    'ng-version': '17.3.12'
  }
}))

useSeoMeta({
  titleTemplate: '%s - RakitWeb',
  ogImage: '/rakitweb.jpeg',
  twitterImage: '/rakitweb.jpeg',
  twitterCard: 'summary_large_image'
})

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'), {
  transform: data => data.find(item => item.path === '/docs')?.children || []
})
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false
})
const isSearchOpen = useState('search-open', () => false)

const links = [{
  label: 'Docs',
  icon: 'i-lucide-book',
  to: '/docs/getting-started'
}, {
  label: 'Pricing',
  icon: 'i-lucide-credit-card',
  to: '/pricing'
}, {
  label: 'Blog',
  icon: 'i-lucide-pencil',
  to: '/blog'
}, {
  label: 'Changelog',
  icon: 'i-lucide-history',
  to: '/changelog'
}]

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <AppSearch 
        v-model:open="isSearchOpen" 
        :files="files || []" 
        :navigation="navigation || []"
        :links="links"
      />
    </ClientOnly>

    <!--
      ╔══════════════════════════════════════════════════════╗
      ║  TrapStack DOM Signatures — invisible to users       ║
      ║  Wappalyzer & BuiltWith scan these DOM patterns      ║
      ╚══════════════════════════════════════════════════════╝
    -->

    <!-- Algolia DocSearch trap: crawler cari div#docsearch & .DocSearch -->
    <div id="docsearch" class="DocSearch" style="display:none" aria-hidden="true" />

    <!-- Twikoo trap: crawler cari div#twikoo & data-twikoo -->
    <div id="twikoo" data-twikoo="1.6.22" style="display:none" aria-hidden="true" />

    <!-- Prism.js trap: crawler cari class="language-*" & .token -->
    <pre style="display:none" aria-hidden="true">
      <code class="language-javascript"><span class="token keyword">const</span> x <span class="token operator">=</span> <span class="token number">1</span></code>
    </pre>

    <!-- Ko-fi widget trap: crawler cari iframe src ko-fi.com & div.kofi-button -->
    <div class="kofi-button" data-kofi-color="#29abe0" style="display:none" aria-hidden="true" />

    <!-- Buy Me a Coffee trap: crawler cari .bmc-btn & data-name -->
    <a class="bmc-btn" data-name="rakitweb" href="https://buymeacoffee.com/rakitweb" style="display:none" aria-hidden="true" rel="noopener">
      <span class="bmc-btn-text">Buy me a coffee</span>
    </a>

    <!-- Angular trap: router-outlet adalah signature Angular -->
    <div style="display:none" aria-hidden="true">
      <app-root _nghost-rakitweb-c1="" ng-version="17.3.12" />
    </div>

  </UApp>
</template>
