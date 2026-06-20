<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const search = ref('')

const filters = ref({
  categories: [],
  pricing: []
})

const sortBy = ref('latest')

const frameworkMap = {
  'nextjs': 'Next.js',
  'nuxt': 'Nuxt',
  'react': 'React',
  'vue': 'Vue',
  'astro': 'Astro'
}

const currentFramework = computed(() => {
  return route.params.framework ? frameworkMap[route.params.framework] || route.params.framework : null
})

const useCases = [
  'AI', 'Authentication', 'Backend', 'Blog', 'CMS',
  'Documentation', 'Ecommerce', 'Portfolio', 'Dashboard', 'Agency'
]

const frameworks = ['Next.js', 'Nuxt', 'React', 'Vue', 'Astro']

const pricingOptions = ['Free', 'Premium']

const { data: fetchedTemplates } = await useAsyncData('templates', () => queryCollection('templates').all())
const templates = computed(() => fetchedTemplates.value || [])

function toggleFilter(type, value) {
  const arr = filters.value[type]
  const index = arr.indexOf(value)
  if (index > -1) {
    arr.splice(index, 1)
  } else {
    arr.push(value)
  }
}

const filteredTemplates = computed(() => {
  let result = templates.value.filter(template => {
    const matchesSearch =
      template.title.toLowerCase().includes(search.value.toLowerCase()) ||
      template.description.toLowerCase().includes(search.value.toLowerCase())

    const matchesFramework = template.framework === currentFramework.value

    const matchesCategory =
      !filters.value.categories.length ||
      filters.value.categories.includes(template.category)

    const matchesPricing =
      !filters.value.pricing.length ||
      filters.value.pricing.includes(template.pricing)

    return (matchesSearch && matchesFramework && matchesCategory && matchesPricing)
  })

  if (sortBy.value === 'downloads') {
    result = [...result].sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
  }

  return result
})

const checkedCategories = computed(() => filters.value.categories)
const checkedPricing = computed(() => filters.value.pricing)
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white">

    <!-- HEADER -->
    <header class="border-b border-zinc-200 dark:border-zinc-800">
      <div class="mx-auto max-w-[1700px] px-8 py-10">

        <div class="flex items-center gap-4 mb-4">
          <NuxtLink
            to="/template"
            class="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition text-sm"
          >
            ← Back
          </NuxtLink>
          <h1 class="text-4xl font-bold tracking-tight">
            {{ currentFramework }} Templates
          </h1>
        </div>

        <p class="mt-3 max-w-3xl text-zinc-500 dark:text-zinc-400">
          Discover templates and starters built with {{ currentFramework }}
        </p>

        <div class="mt-8">
          <input
            v-model="search"
            type="text"
            placeholder="Search templates..."
            class="h-12 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 text-sm outline-none transition focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-900 dark:text-white placeholder:text-zinc-400"
          />
        </div>

      </div>
    </header>

    <!-- CONTENT -->
    <div class="mx-auto max-w-[1700px] px-8 py-8">

      <div class="grid gap-10 lg:grid-cols-[260px_1fr]">

        <!-- FILTERS -->
        <aside>

          <div class="mb-6">
            <h2 class="font-medium mb-3 text-zinc-900 dark:text-white">
              Frameworks
            </h2>
            <div class="space-y-1">
              <NuxtLink
                v-for="fw in frameworks"
                :key="fw"
                :to="`/template/${fw.toLowerCase().replace('.', '')}`"
                class="block text-sm px-3 py-2 rounded-md transition"
                :class="fw === currentFramework
                  ? 'text-zinc-900 dark:text-white font-semibold bg-zinc-100 dark:bg-zinc-900'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'"
              >
                {{ fw }}
              </NuxtLink>
            </div>
          </div>

          <div class="border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <div class="mb-6 flex items-center justify-between">
              <h2 class="font-medium text-zinc-900 dark:text-white">
                Filters
              </h2>

              <button
                @click="filters = { categories: [], pricing: [] }"
                class="text-sm text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition"
              >
                Clear
              </button>
            </div>

            <div class="space-y-8">

              <!-- CATEGORY -->
              <div>
                <h3 class="mb-3 text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Use Case
                </h3>
                <div class="space-y-1">
                  <label
                    v-for="item in useCases"
                    :key="item"
                    class="flex items-center gap-3 rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      class="accent-zinc-700 dark:accent-zinc-300"
                      @change="toggleFilter('categories', item)"
                    />
                    <span class="text-sm text-zinc-700 dark:text-zinc-300">
                      {{ item }}
                    </span>
                  </label>
                </div>
              </div>

              <!-- PRICING -->
              <div>
                <h3 class="mb-3 text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Pricing
                </h3>
                <div class="space-y-1">
                  <label
                    v-for="item in pricingOptions"
                    :key="item"
                    class="flex items-center gap-3 rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      class="accent-zinc-700 dark:accent-zinc-300"
                      @change="toggleFilter('pricing', item)"
                    />
                    <span class="text-sm text-zinc-700 dark:text-zinc-300">
                      {{ item }}
                    </span>
                  </label>
                </div>
              </div>

            </div>
          </div>

        </aside>

        <!-- CATALOG -->
        <main>

          <!-- SELECTED FILTERS -->
          <div v-if="checkedCategories.length > 0 || checkedPricing.length > 0" class="mb-6 flex flex-wrap gap-2 items-center">

            <span class="text-sm text-zinc-500">Active:</span>

            <button
              v-for="item in checkedCategories"
              :key="`cat-${item}`"
              @click="toggleFilter('categories', item)"
              class="inline-flex items-center gap-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-xs text-zinc-700 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
            >
              <span>{{ item }}</span>
              <span class="text-zinc-400 hover:text-zinc-700 dark:hover:text-white">×</span>
            </button>

            <button
              v-for="item in checkedPricing"
              :key="`price-${item}`"
              @click="toggleFilter('pricing', item)"
              class="inline-flex items-center gap-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-xs text-zinc-700 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
            >
              <span>{{ item }}</span>
              <span class="text-zinc-400 hover:text-zinc-700 dark:hover:text-white">×</span>
            </button>

          </div>

          <!-- TEMPLATES GRID -->
          <div>

            <div class="mb-6 flex items-center justify-between">
              <div class="text-sm text-zinc-500">
                {{ filteredTemplates.length }} templates found
              </div>

              <select
                v-model="sortBy"
                class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition"
              >
                <option value="latest">Latest</option>
                <option value="downloads">Most Downloaded</option>
              </select>
            </div>

            <div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

              <article
                v-for="item in filteredTemplates"
                :key="item.stem"
                class="group overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm dark:shadow-none transition hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md dark:hover:shadow-none"
              >

                <div class="aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div class="p-4">

                  <div class="mb-3 flex gap-2">
                    <span class="rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-2 py-1 text-xs text-zinc-600 dark:text-zinc-300">
                      {{ item.framework }}
                    </span>
                    <span class="rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-2 py-1 text-xs text-zinc-600 dark:text-zinc-300">
                      {{ item.pricing }}
                    </span>
                  </div>

                  <h3 class="font-semibold text-zinc-900 dark:text-white">
                    {{ item.title }}
                  </h3>

                  <p class="mt-2 text-sm text-zinc-500">
                    {{ item.description }}
                  </p>

                  <div class="mt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    <span class="text-xs text-zinc-400">
                      {{ (item.downloads || 0).toLocaleString() }} downloads
                    </span>

                    <NuxtLink
                      :to="`/template/view/${item.stem.split('/').pop()}`"
                      class="text-sm font-medium text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                    >
                      View →
                    </NuxtLink>
                  </div>

                </div>

              </article>

            </div>

            <div v-if="filteredTemplates.length === 0" class="text-center py-16">
              <p class="text-zinc-400">No templates found. Try adjusting your filters.</p>
            </div>

          </div>

        </main>

      </div>

    </div>

  </div>
</template>
