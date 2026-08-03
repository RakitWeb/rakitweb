<script setup lang="ts">
import DarkVeil from '~/components/backgorund/DarkVeil.vue'

const promptValue = ref('')

const quickActions = [
  { icon: 'i-heroicons-envelope', label: 'Contact Form' },
  { icon: 'i-heroicons-photo', label: 'Image Editor' },
  { icon: 'i-heroicons-puzzle-piece', label: 'Mini Game' },
  { icon: 'i-heroicons-chart-bar', label: 'Finance Calculator' },
]

const templateTabs = [
  { icon: 'i-heroicons-squares-2x2', label: 'Company Profile', link: '/template/company-profile' },
  { icon: 'i-heroicons-window', label: 'Landing Pages', link: '/template/landing-pages' },
  { icon: 'i-heroicons-cube', label: 'E-commerce', link: '/template/e-commerce' },
  { icon: 'i-heroicons-chart-bar-square', label: 'Portofolio', link: '/template/portofolio' },
]

const activeTab = ref('Apps and Games')

const templates = [
  {
    title: 'Dashboard Admin',
    author: 'Erga Praditya Nugraha',
    avatar: 'https://github.com/kaichauzen.png',
    image: '/static/dash.png',
    stars: '6.4K',
    likes: '708',
  },
  {
    title: 'Situs Dokumentasi ',
    author: 'Sam Dae',
    avatar: 'https://github.com/davingm.png',
    image: '/static/image.png',
    stars: '14K',
    likes: '2K',
  },
  {
    title: 'Situs Portofolio',
    author: 'H/S',
    avatar: 'https://github.com/nairha.png',
    image: '/static/nairha.png',
    stars: '3.3K',
    likes: '850',
  },
]

function submitPrompt() {
  if (!promptValue.value.trim()) return
  // handle submit
}
</script>

<template>
  <main class="bg-white dark:bg-black">

    <!-- ===== Hero prompt block ===== -->
    <section class="relative border-b border-neutral-200 dark:border-neutral-800 px-6 md:px-12 py-20 md:py-28 overflow-hidden bg-neutral-50/50 dark:bg-black">
      <!-- Dark Veil Background -->
      <div class="absolute inset-0 pointer-events-none z-0">
        <DarkVeil />
      </div>

      <span class="hidden md:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black z-10" />
      <span class="hidden md:block absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black z-10" />

      <div class="relative z-10 max-w-2xl mx-auto text-center">
        <h1 class="text-2xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          Situs Apa Yang Anda Inginkan?
        </h1>

        <!-- Prompt box -->
        <div class="mt-8 text-left rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/75 dark:bg-neutral-950/75 backdrop-blur-xl focus-within:border-neutral-400 dark:focus-within:border-neutral-600 transition-all shadow-lg dark:shadow-2xl">
          <textarea
            v-model="promptValue"
            rows="2"
            placeholder="Katakan pada Kami"
            class="w-full resize-none bg-transparent px-5 pt-5 pb-2 text-sm md:text-base text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none"
            @keydown.enter.exact.prevent="submitPrompt"
          />

          <div class="flex items-center justify-between px-4 pb-3 pt-1">

            <button
              type="button"
              class="flex items-center justify-center w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              @click="submitPrompt"
            >
              <UIcon name="i-heroicons-microphone" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Quick action chips -->
        <div class="mt-5 flex flex-wrap items-center justify-center gap-2">
          <button
            v-for="action in quickActions"
            :key="action.label"
            type="button"
            class="flex items-center gap-1.5 rounded-full border border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <UIcon :name="action.icon" class="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
            {{ action.label }}
          </button>

          <button
            type="button"
            aria-label="Refresh suggestions"
            class="flex items-center justify-center w-7 h-7 rounded-full border border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md text-neutral-400 dark:text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <UIcon name="i-heroicons-arrow-path" class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>

    <!-- ===== Template gallery ===== -->
    <section class="relative px-6 md:px-12 py-20 md:py-28">
      <div class="max-w-6xl mx-auto">

      <span class="hidden md:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" />
      <span class="hidden md:block absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" />


        <!-- Section header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10 md:mb-14">
          <h2 class="text-lg md:text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Mulai Dengan Beberapa Yang Serupa
          </h2>

          <div class="flex flex-wrap items-center gap-2">
            <NuxtLink
              v-for="tab in templateTabs"
              :key="tab.label"
              :to="tab.link"
              type="button"
              class="flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors"
              :class="activeTab === tab.label
                ? 'border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white text-white dark:text-black'
                : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900'"
              @click="activeTab = tab.label"
            >
              <UIcon :name="tab.icon" class="w-3.5 h-3.5" />
              {{ tab.label }}
            </NuxtLink>

            <NuxtLink
              to="/template"
              class="flex items-center gap-1 text-xs font-semibold text-neutral-900 dark:text-white ml-1 hover:opacity-70 transition-opacity"
            >
              Browse all
              <UIcon name="i-heroicons-chevron-right" class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-x-6 md:gap-y-10">
          <article
            v-for="template in templates"
            :key="template.title"
            class="group cursor-pointer"
          >
            <div class="aspect-video rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 overflow-hidden relative">
              <img
                :src="template.image"
                :alt="template.title"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 group-hover:ring-neutral-300 dark:group-hover:ring-neutral-700 transition-all rounded-xl" />
            </div>

            <div class="flex items-center gap-3 mt-4">
              <img
                v-if="template.avatar"
                :src="template.avatar"
                :alt="template.author"
                class="w-7 h-7 rounded-full object-cover"
              >
              <div
                v-else
                class="w-7 h-7 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] font-semibold flex items-center justify-center"
              >
                {{ template.author.slice(0, 3) }}
              </div>

              <div class="min-w-0">
                <h3 class="text-sm font-medium text-neutral-900 dark:text-white truncate">{{ template.title }}</h3>
                <div class="flex items-center gap-3 text-xs text-neutral-400 dark:text-neutral-600 mt-0.5">
                  <span class="flex items-center gap-1">
                    <UIcon name="i-heroicons-user-group" class="w-3.5 h-3.5" />
                    {{ template.stars }}
                  </span>
                  <span class="flex items-center gap-1">
                    <UIcon name="i-heroicons-heart" class="w-3.5 h-3.5" />
                    {{ template.likes }}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <Priace />

  </main>
</template>

<style scoped>
main {
  font-feature-settings: "cv11", "ss01", "cv01";
}
</style>