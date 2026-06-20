<script setup lang="ts">
const route = useRoute()

const { data: template } = await useAsyncData(route.path, () => queryCollection('templates')
  .where('stem', 'LIKE', `%${route.params.slug as string}`)
  .first())

if (!template.value) {
  throw createError({ statusCode: 404, statusMessage: 'Template not found', fatal: true })
}

const title = template.value.title
const description = template.value.description

useSeoMeta({
  title: `${title} - Website Template`,
  description
})

const frameworkLogos: Record<string, { svg: string }> = {
  'Next.js': {
    svg: `<svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_408_134" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180"><circle cx="90" cy="90" r="90" fill="black"/></mask><g mask="url(#mask0_408_134)"><circle cx="90" cy="90" r="90" fill="black"/><path d="M149.508 157.52L69.142 54H54V125.97H66.1V69.438L139.999 164.645C143.333 162.614 146.509 160.402 149.508 157.52Z" fill="url(#paint0_linear_408_134)"/><rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_134)"/></g><defs><linearGradient id="paint0_linear_408_134" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><linearGradient id="paint1_linear_408_134" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>`
  },
  'Nuxt': {
    svg: `<svg viewBox="0 0 221 171" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M82.4001 126.3H21.2001C19.5819 126.3 17.9932 125.875 16.5946 125.066C15.196 124.257 14.0358 123.094 13.2301 121.695C12.4244 120.295 12.0013 118.707 12.0001 117.089C11.9989 115.47 12.4196 113.881 13.2231 112.48L58.2231 34.48C59.0282 33.0796 60.1883 31.9161 61.5872 31.1069C62.9861 30.2978 64.5754 29.872 66.1951 29.872C67.8147 29.872 69.404 30.2978 70.8029 31.1069C72.2018 31.9161 73.3619 33.0796 74.167 34.48L82.4001 48.54L90.0001 34.48C90.8073 33.0811 91.9681 31.9186 93.3664 31.1102C94.7647 30.3019 96.3527 29.8761 97.9711 29.8761C99.5895 29.8761 101.177 30.3019 102.576 31.1102C103.974 31.9186 105.135 33.0811 105.942 34.48L208.942 212.48C209.748 213.879 210.172 215.469 210.172 217.089C210.172 218.709 209.748 220.299 208.942 221.698C208.136 223.097 206.975 224.261 205.576 225.071C204.177 225.88 202.587 226.305 200.967 226.305H152.167C138.967 226.305 129.167 221.205 122.667 211.305L97.7981 170.405L74.667 211.205C68.2001 221.205 58.2001 226.305 45.2001 226.305H11.2001C9.58178 226.305 7.9932 225.879 6.59441 225.07C5.19562 224.261 4.03529 223.097 3.22955 221.697C2.42382 220.297 2.00082 218.707 2.00001 217.088C1.99921 215.469 2.42063 213.879 3.22501 212.477L82.4001 126.3Z" fill="#00DC82"/></svg>`
  },
  'React': {
    svg: `<svg viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg"><circle cx="0" cy="0" r="2.05" fill="#61dafb"/><g stroke="#61dafb" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`
  },
  'Vue': {
    svg: `<svg viewBox="0 0 261.76 226.69" xmlns="http://www.w3.org/2000/svg"><path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/><path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/></svg>`
  },
  'Astro': {
    svg: `<svg viewBox="0 0 85 107" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27.5725 88.5023C23.2382 83.5057 21.9238 77.6393 23.1264 70.7893L23.2629 69.9566L33.8374 73.0558C33.5591 74.7424 33.673 76.4724 34.1671 78.1075C34.9978 80.7991 36.7087 83.12 39.0349 84.6897C41.361 86.2594 44.1547 86.981 46.9527 86.7366C49.7507 86.4922 52.3773 85.2974 54.3896 83.3564C56.4019 81.4153 57.6762 78.8406 57.9958 76.0607C58.1219 74.8774 58.0319 73.6819 57.7305 72.5326L57.4744 71.8047L68.4963 74.6534L68.683 75.5397C69.5419 79.638 69.0455 83.9094 67.2693 87.7018C65.4931 91.4942 62.5249 94.6147 58.8132 96.5961C55.1015 98.5775 50.8441 99.3119 46.6902 98.6889C42.5363 98.0659 38.7044 96.1195 35.7544 93.1539C32.6693 90.0501 30.3783 87.4601 27.5725 88.5023Z" fill="#FF5D01"/><path fill-rule="evenodd" clip-rule="evenodd" d="M41.1793 0.255493C41.1793 0.255493 28.5399 25.8503 28.5399 52.131C28.5399 66.6095 31.4882 79.6154 42.4448 86.3248C42.6568 86.4483 42.8726 86.5665 43.0921 86.6793C44.7095 87.4893 46.4956 87.9196 48.3111 87.9353C50.1266 87.951 51.9194 87.5518 53.5503 86.7699L53.7979 86.6415L55.5299 85.6397C64.3765 79.9636 67.7213 68.2258 67.7213 52.131C67.7213 25.8503 55.0818 0.255493 55.0818 0.255493C55.0818 0.255493 51.4474 10.3017 48.1306 10.3017C44.8137 10.3017 41.1793 0.255493 41.1793 0.255493Z" fill="#FF5D01"/></svg>`
  }
}

const currentLogo = computed(() => {
  if (!template.value) return null
  return frameworkLogos[template.value.framework] || null
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white">
    <div class="pt-8 pb-16 px-4 max-w-[1400px] mx-auto">
      <UContainer v-if="template">

        <!-- Back button -->
        <NuxtLink
          to="/template"
          class="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition mb-10"
        >
          ← Back to Templates
        </NuxtLink>

        <!-- Hero section with framework logo -->
        <div class="flex items-start justify-between mb-8 gap-6">
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap gap-2 mb-3">
              <span class="rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                {{ template.framework }}
              </span>
              <span class="rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                {{ template.category }}
              </span>
              <span
                class="rounded-md border px-2.5 py-1 text-xs font-medium"
                :class="template.pricing === 'Free'
                  ? 'border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400'
                  : 'border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400'"
              >
                {{ template.pricing }}
              </span>
            </div>
            <h1 class="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {{ template.title }}
            </h1>
            <p class="text-zinc-500 dark:text-zinc-400 text-lg mt-3">
              {{ template.description }}
            </p>
          </div>

          <!-- Framework Logo -->
          <div
            v-if="currentLogo"
            class="shrink-0 w-20 h-20 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4 shadow-sm dark:shadow-lg"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="w-full h-full" v-html="currentLogo.svg" />
          </div>
        </div>

        <div class="grid gap-8 lg:grid-cols-[1fr_320px] items-start">

          <!-- Main Content -->
          <div>
            <div class="aspect-[16/9] w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 mb-8">
              <img
                v-if="template.image"
                :src="template.image"
                :alt="template.title"
                class="h-full w-full object-cover"
              />
            </div>

            <div class="border-t border-zinc-200 dark:border-zinc-800 pt-8 prose prose-zinc dark:prose-invert max-w-none">
              <ContentRenderer :value="template" />
            </div>
          </div>

          <!-- Sidebar / Details Card -->
          <aside>
            <div class="sticky top-[90px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-6 space-y-6 shadow-sm dark:shadow-none">
              <h3 class="font-semibold text-lg border-b border-zinc-200 dark:border-zinc-800 pb-3 text-zinc-900 dark:text-white">
                Template Details
              </h3>

              <div class="space-y-4">
                <div class="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-900">
                  <span class="text-sm text-zinc-500">Framework</span>
                  <div class="flex items-center gap-2">
                    <div
                      v-if="currentLogo"
                      class="w-5 h-5 flex-shrink-0"
                      v-html="currentLogo.svg"
                    />
                    <span class="rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      {{ template.framework }}
                    </span>
                  </div>
                </div>

                <div class="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-900">
                  <span class="text-sm text-zinc-500">Category</span>
                  <span class="text-sm text-zinc-800 dark:text-white font-medium">
                    {{ template.category }}
                  </span>
                </div>

                <div class="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-900">
                  <span class="text-sm text-zinc-500">Pricing</span>
                  <span
                    class="rounded-md border px-2.5 py-1 text-xs font-medium"
                    :class="template.pricing === 'Free'
                      ? 'border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400'
                      : 'border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400'"
                  >
                    {{ template.pricing }}
                  </span>
                </div>

                <div class="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-900">
                  <span class="text-sm text-zinc-500">Downloads</span>
                  <span class="text-sm text-zinc-800 dark:text-white font-medium">
                    {{ (template.downloads || 0).toLocaleString() }}
                  </span>
                </div>
              </div>

              <div v-if="template.github" class="pt-2">
                <NuxtLink
                  :to="template.github"
                  target="_blank"
                  class="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-white px-4 py-3 text-sm font-semibold text-white dark:text-black hover:bg-zinc-700 dark:hover:bg-zinc-200 transition"
                >
                  <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  View Repository
                </NuxtLink>
              </div>
            </div>
          </aside>

        </div>
      </UContainer>
    </div>
  </div>
</template>
