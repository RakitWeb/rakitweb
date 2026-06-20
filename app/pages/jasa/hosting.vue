<template>
  <main class="min-h-screen bg-zinc-50 dark:bg-zinc-950">

    <!-- Hero -->
    <section class="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-20">
      <div class="mx-auto max-w-6xl px-6">
        <h1 class=" text-5xl font-normal tracking-tighter text-zinc-950 dark:text-white md:text-6xl leading-tight">
          Pilih Platform<br />Deployment Anda.
        </h1>
        <p class="mt-5 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Kami Menyediakan Jasa Layanan DevOps dan hosting yang bisa anda pilih sesuai kebutuhan sistem dan bisnis secara pribadi maupun perusahaan
        </p>
        <div class="mt-10 flex flex-wrap gap-8">
          <div v-for="stat in stats" :key="stat.label" class="flex flex-col">
            <span class="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">{{ stat.value }}</span>
            <span class="text-xs text-zinc-400 font-mono mt-0.5">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-6xl px-6 py-16">

      <!-- Filter & View Toggle -->
      <div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="activeCategory = cat.id"
            :class="[
              'px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-all border',
              activeCategory === cat.id
                ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700'
                : 'bg-transparent text-zinc-500 dark:text-zinc-400 border-zinc-200 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500'
            ]"
          >
            {{ cat.label }}
            <span class="ml-1.5 opacity-50">{{ cat.count }}</span>
          </button>
        </div>
        <div class="flex gap-2">
          <button
            v-for="view in ['list', 'grid']"
            :key="view"
            @click="viewMode = view"
            :class="[
              'p-2 border transition-colors',
              viewMode === view
                ? 'bg-zinc-100 border-zinc-300 text-zinc-700 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200'
                : 'border-zinc-200 text-zinc-400 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-500 dark:hover:border-zinc-600'
            ]"
          >
            <svg v-if="view === 'list'" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
            </svg>
            <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Provider Cards — Grid Mode -->
      <div v-if="viewMode === 'list'" class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div
          v-for="provider in filteredProviders"
          :key="provider.name"
          class="relative"
        >
          <!-- Corner decorations -->
          <div class="absolute -top-[10px] -left-[10px] z-20 flex h-[21px] w-[21px] items-center justify-center select-none pointer-events-none">
            <div class="absolute h-full w-[2px] bg-zinc-300 dark:bg-zinc-700"></div>
            <div class="absolute h-[2px] w-full bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
          <div class="absolute -bottom-[10px] -right-[10px] z-20 flex h-[21px] w-[21px] items-center justify-center select-none pointer-events-none">
            <div class="absolute h-full w-[2px] bg-zinc-300 dark:bg-zinc-700"></div>
            <div class="absolute h-[2px] w-full bg-zinc-300 dark:bg-zinc-700"></div>
          </div>

          <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 h-full flex flex-col">
            <!-- Card Header -->
            <div class="px-6 pt-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    :style="{ backgroundColor: provider.color + '1a' }"
                  >
                    <img :src="getProviderLogo(provider.name)" :alt="provider.name" class="w-6 h-6 object-contain" :class="{ 'dark:invert': provider.name === 'Vercel' }" />
                  </div>
                  <div>
                    <h3 class="text-base font-semibold text-zinc-950 dark:text-white leading-tight">{{ provider.name }}</h3>
                    <p class="text-xs text-zinc-400 mt-0.5">{{ provider.company }}</p>
                  </div>
                </div>
                <div class="flex flex-col items-end gap-1 flex-shrink-0">
                  <span
                    class="px-2.5 py-0.5 text-[10px] font-mono uppercase font-medium"
                    :class="typeBadgeClass(provider.type)"
                  >
                    {{ provider.type }}
                  </span>
                  <span v-if="provider.freeAvailable" class="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">✓ Free Plan</span>
                </div>
              </div>
              <p class="mt-3 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{{ provider.desc }}</p>

              <!-- Rating & Tags -->
              <div class="mt-3 flex flex-wrap items-center gap-2">
                <div class="flex items-center gap-1">
                  <span class="text-amber-400 text-sm">★</span>
                  <span class="text-xs font-medium text-zinc-700 dark:text-zinc-300">{{ provider.rating }}</span>
                  <span class="text-xs text-zinc-400">/5</span>
                </div>
                <span class="text-zinc-300 dark:text-zinc-700">·</span>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="tag in provider.tags"
                    :key="tag"
                    class="px-2 py-0.5 text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded font-mono"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Pricing Plans -->
            <div class="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <h4 class="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-3">Harga Plan (Data Resmi Jun 2026)</h4>
              <div class="space-y-2">
                <div
                  v-for="plan in provider.plans"
                  :key="plan.name"
                  class="flex items-start justify-between gap-4 py-2 border-b border-dashed border-zinc-100 dark:border-zinc-800 last:border-0"
                >
                  <div class="flex items-start gap-2 min-w-0">
                    <span
                      class="mt-0.5 w-2 h-2 rounded-full flex-shrink-0"
                      :class="plan.popular ? 'bg-blue-500' : 'bg-zinc-300 dark:bg-zinc-600'"
                    ></span>
                    <div class="min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-medium text-zinc-800 dark:text-zinc-200">{{ plan.name }}</span>
                        <span v-if="plan.popular" class="text-[9px] font-mono bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-1.5 py-0.5 rounded uppercase tracking-wider">Populer</span>
                      </div>
                      <p class="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 leading-relaxed">{{ plan.highlight }}</p>
                    </div>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <div class="text-sm font-semibold text-zinc-950 dark:text-white whitespace-nowrap">{{ plan.price }}</div>
                    <div v-if="plan.priceNote" class="text-[10px] text-zinc-400 whitespace-nowrap">{{ plan.priceNote }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Technical Specs -->
            <div class="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <h4 class="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-3">Spesifikasi Teknis</h4>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="spec in provider.specs"
                  :key="spec.label"
                  class="bg-zinc-50 dark:bg-zinc-800/50 p-3"
                >
                  <div class="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">{{ spec.label }}</div>
                  <div class="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-1 leading-tight">{{ spec.value }}</div>
                </div>
              </div>
            </div>

            <!-- Pros & Cons -->
            <div class="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <h4 class="text-[11px] font-mono uppercase tracking-widest text-emerald-500 mb-2">Kelebihan</h4>
                  <ul class="space-y-1">
                    <li v-for="pro in provider.pros" :key="pro" class="flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                      <span class="text-emerald-500 mt-0.5 flex-shrink-0">+</span>
                      <span>{{ pro }}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-[11px] font-mono uppercase tracking-widest text-red-400 mb-2">Kekurangan</h4>
                  <ul class="space-y-1">
                    <li v-for="con in provider.cons" :key="con" class="flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                      <span class="text-red-400 mt-0.5 flex-shrink-0">−</span>
                      <span>{{ con }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Best For & Warning -->
            <div class="px-6 py-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 class="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-2">Terbaik Untuk</h4>
                <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">{{ provider.bestFor }}</p>
                <div v-if="provider.warning" class="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 p-3">
                  <span class="text-amber-500 text-sm flex-shrink-0 mt-0.5">⚠</span>
                  <p class="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">{{ provider.warning }}</p>
                </div>
              </div>
              <a :href="'#' + provider.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')" class="mt-6 w-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-950 py-2.5 px-4 text-xs font-mono uppercase tracking-wider transition-colors font-medium text-center block">
                Pilih Platform
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Provider Cards — List Mode -->
      <div v-else class="relative border border-zinc-200 dark:border-zinc-800 overflow-visible">
        <!-- Corner decorations -->
        <div class="absolute -top-[10px] -left-[10px] z-20 flex h-[21px] w-[21px] items-center justify-center select-none pointer-events-none">
          <div class="absolute h-full w-[2px] bg-zinc-300 dark:bg-zinc-700"></div>
          <div class="absolute h-[2px] w-full bg-zinc-300 dark:bg-zinc-700"></div>
        </div>
        <div class="absolute -bottom-[10px] -right-[10px] z-20 flex h-[21px] w-[21px] items-center justify-center select-none pointer-events-none">
          <div class="absolute h-full w-[2px] bg-zinc-300 dark:bg-zinc-700"></div>
          <div class="absolute h-[2px] w-full bg-zinc-300 dark:bg-zinc-700"></div>
        </div>

        <div class="overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800">
          <div
            v-for="provider in filteredProviders"
            :key="provider.name"
            class="bg-white dark:bg-zinc-900"
          >
            <!-- List Header -->
            <button
              class="w-full text-left px-6 py-5 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              @click="toggleExpanded(provider.name)"
            >
              <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-4 min-w-0">
                  <div
                    class="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    :style="{ backgroundColor: provider.color + '1a' }"
                  >
                    <img :src="getProviderLogo(provider.name)" :alt="provider.name" class="w-5 h-5 object-contain" :class="{ 'dark:invert': provider.name === 'Vercel' }" />
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="font-semibold text-zinc-950 dark:text-white">{{ provider.name }}</span>
                      <span
                        class="px-2 py-0.5 text-[10px] font-mono uppercase rounded"
                        :class="typeBadgeClass(provider.type)"
                      >{{ provider.type }}</span>
                      <span v-if="provider.freeAvailable" class="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">✓ Free</span>
                    </div>
                    <p class="text-xs text-zinc-400 mt-0.5 truncate">{{ provider.desc }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-6 flex-shrink-0">
                  <div class="hidden sm:block text-right">
                    <div class="text-xs text-zinc-400 font-mono">MULAI DARI</div>
                    <div class="text-sm font-semibold text-zinc-950 dark:text-white">{{ provider.startingPrice }}</div>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-amber-400 text-sm">★</span>
                    <span class="text-sm font-medium text-zinc-700 dark:text-zinc-300">{{ provider.rating }}</span>
                  </div>
                  <svg
                    class="w-4 h-4 text-zinc-400 transition-transform flex-shrink-0"
                    :class="expandedProviders.includes(provider.name) ? 'rotate-180' : ''"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </button>
 
            <!-- Expanded Content -->
            <div v-if="expandedProviders.includes(provider.name)" class="border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/60">
              <div class="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Plans -->
                <div>
                  <h4 class="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-3">Harga Plan</h4>
                  <div class="space-y-2">
                    <div v-for="plan in provider.plans" :key="plan.name" class="flex justify-between items-start gap-2">
                      <div>
                        <span class="text-sm font-medium text-zinc-800 dark:text-zinc-200">{{ plan.name }}</span>
                        <p class="text-xs text-zinc-400 dark:text-zinc-500 leading-snug">{{ plan.highlight }}</p>
                      </div>
                      <span class="text-sm font-semibold text-zinc-950 dark:text-white whitespace-nowrap">{{ plan.price }}</span>
                    </div>
                  </div>
                </div>

                <!-- Specs -->
                <div>
                  <h4 class="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-3">Spesifikasi</h4>
                  <div class="space-y-2">
                    <div v-for="spec in provider.specs" :key="spec.label" class="flex justify-between gap-2">
                      <span class="text-xs text-zinc-400">{{ spec.label }}</span>
                      <span class="text-xs font-medium text-zinc-700 dark:text-zinc-300 text-right">{{ spec.value }}</span>
                    </div>
                  </div>
                </div>

                <!-- Best For + Warning -->
                <div class="flex flex-col justify-between h-full">
                  <div>
                    <h4 class="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-2">Terbaik Untuk</h4>
                    <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{{ provider.bestFor }}</p>
                    <div v-if="provider.warning" class="mt-3 flex items-start gap-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-lg p-3">
                      <span class="text-amber-500 flex-shrink-0">⚠</span>
                      <p class="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">{{ provider.warning }}</p>
                    </div>
                  </div>
                  <a :href="'#' + provider.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')" class="mt-4 w-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-950 py-2 px-4 text-xs font-mono uppercase tracking-wider transition-colors font-medium text-center block">
                    Pilih Platform
                  </a>
                </div>
              </div>

              <!-- Pros & Cons Footer -->
              <div class="border-t border-zinc-100 dark:border-zinc-800 px-6 py-4 grid grid-cols-2 gap-6">
                <div>
                  <h4 class="text-[10px] font-mono uppercase tracking-widest text-emerald-500 mb-2">Kelebihan</h4>
                  <ul class="space-y-1">
                    <li v-for="pro in provider.pros" :key="pro" class="flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                      <span class="text-emerald-500">+</span><span>{{ pro }}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-[10px] font-mono uppercase tracking-widest text-red-400 mb-2">Kekurangan</h4>
                  <ul class="space-y-1">
                    <li v-for="con in provider.cons" :key="con" class="flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                      <span class="text-red-400">−</span><span>{{ con }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabel Perbandingan -->
<section class="mt-16">

  <div class="mb-12 border-b border-zinc-200 pb-6 dark:border-zinc-800">
    <h2 class="text-2xl font-medium tracking-tight text-black dark:text-white">
      Semua Platform Sekilas
    </h2>
    <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
      Ringkasan seluruh platform deployment dalam satu tampilan.
    </p>
  </div>

  <div class="relative isolate border border-zinc-200 dark:border-zinc-800">

    <!-- Corner -->
    <div
      class="absolute -top-[10px] -left-[10px] z-20 flex h-[21px] w-[21px] items-center justify-center pointer-events-none"
    >
      <div class="absolute h-full w-[2px] bg-zinc-300 dark:bg-zinc-700"></div>
      <div class="absolute h-[2px] w-full bg-zinc-300 dark:bg-zinc-700"></div>
    </div>

    <div
      class="absolute -bottom-[10px] -right-[10px] z-20 flex h-[21px] w-[21px] items-center justify-center pointer-events-none"
    >
      <div class="absolute h-full w-[2px] bg-zinc-300 dark:bg-zinc-700"></div>
      <div class="absolute h-[2px] w-full bg-zinc-300 dark:bg-zinc-700"></div>
    </div>

    <div class="overflow-x-auto">

      <table class="w-full table-fixed border-collapse">

        <colgroup>
          <col class="w-[18%]" />
          <col class="w-[10%]" />
          <col class="w-[18%]" />
          <col class="w-[8%]" />
          <col class="w-[21%]" />
          <col class="w-[25%]" />
        </colgroup>

        <thead>
          <tr class="border-b border-zinc-200 dark:border-zinc-800">

            <th
              class="border-r border-zinc-200 px-4 py-4 text-left text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:border-zinc-800"
            >
              Platform
            </th>

            <th
              class="border-r border-zinc-200 px-4 py-4 text-left text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:border-zinc-800"
            >
              Tipe
            </th>

            <th
              class="border-r border-zinc-200 px-4 py-4 text-left text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:border-zinc-800"
            >
              Harga
            </th>

            <th
              class="border-r border-zinc-200 px-4 py-4 text-left text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:border-zinc-800"
            >
              Free
            </th>

            <th
              class="border-r border-zinc-200 px-4 py-4 text-left text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:border-zinc-800"
            >
              Bandwidth
            </th>

            <th
              class="px-4 py-4 text-left text-[10px] font-mono uppercase tracking-widest text-zinc-500"
            >
              Cocok Untuk
            </th>

          </tr>
        </thead>

        <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800">

          <tr
            v-for="provider in providers"
            :key="provider.name"
            class="transition-colors duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/20"
          >

            <td
              class="border-r border-zinc-200 px-4 py-4 dark:border-zinc-800"
            >
              <div class="flex flex-col">
                <span class="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {{ provider.name }}
                </span>
                <span class="mt-1 text-[10px] text-zinc-400">
                  {{ provider.company }}
                </span>
              </div>
            </td>

            <td
              class="border-r border-zinc-200 px-4 py-4 dark:border-zinc-800"
            >
              <span
                class="text-[10px] font-mono uppercase text-zinc-500"
              >
                {{ provider.type }}
              </span>
            </td>

            <td
              class="border-r border-zinc-200 px-4 py-4 dark:border-zinc-800"
            >
              <span
                class="text-xs font-medium text-zinc-700 dark:text-zinc-300"
              >
                {{ provider.startingPrice }}
              </span>
            </td>

            <td
              class="border-r border-zinc-200 px-4 py-4 dark:border-zinc-800"
            >
              <span
                v-if="provider.freeAvailable"
                class="font-mono text-sm text-zinc-900 dark:text-zinc-100"
              >
                ●
              </span>

              <span
                v-else
                class="font-mono text-sm text-zinc-300 dark:text-zinc-700"
              >
                ○
              </span>
            </td>

            <td
              class="border-r border-zinc-200 px-4 py-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
            >
              {{ provider.tableData.bandwidth }}
            </td>

            <td
              class="px-4 py-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400"
            >
              {{ provider.tableData.suitableFor }}
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>

  <p class="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
    * Data diperbarui Juni 2026 dan dapat berubah sewaktu-waktu mengikuti kebijakan masing-masing provider.
  </p>

</section>

      <!-- Footer note -->
      <div class="mt-12 py-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p class="text-xs text-zinc-400 font-mono">Data harga terverifikasi dari sumber resmi masing-masing platform · Juni 2026</p>
        <p class="text-xs text-zinc-400">Harga ditampilkan dalam USD · Semua harga bisa berubah · Cek halaman resmi sebelum memutuskan</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

const viewMode = ref('grid')
const activeCategory = ref('all')
const expandedProviders = ref([])

// Accent colors for guide timeline items
const guideAccents = [
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#f59e0b',
  '#10b981',
  '#3b82f6',
  '#f97316',
  '#14b8a6',
]

// Brand SVG logos for each provider
function getProviderLogo(name) {
  const logos = {
    'Vercel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
    'AWS Amplify': '/company/aws.png',
    'Cloudflare': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg',
    'DigitalOcean': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg',
    'Netlify': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg',
    'Zeabur': 'https://zeabur.com/favicon-32x32.png',
    'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg',
    'Render': '/company/render.png',
    'Koyeb': '/company/koyeb.jpeg',
    'Azure App Service': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    'Cleavr': 'https://ipx.nuxt.com/s_80x80/assets/integrations/cleavr.svg',
    'Clever Cloud': 'https://ipx.nuxt.com/s_80x80/assets/integrations/clever-cloud.svg',
    'Deno Deploy': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/denojs/denojs-original.svg',
    'Firebase Hosting': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg',
    'Flightcontrol': 'https://ipx.nuxt.com/s_80x80/assets/integrations/flightcontrol.webp',
    'GitHub Pages': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'GitLab Pages': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
    'Heroku': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg',
    'Hostinger': 'https://ipx.nuxt.com/s_80x80/assets/integrations/hostinger.svg',
    'IIS (Internet Information Services)': 'https://ipx.nuxt.com/s_80x80/assets/integrations/microsoft.webp',
    'Northflank': 'https://northflank.com/favicon.ico',
    'SST': 'https://sst.dev/favicon.ico',
    'Stormkit': 'https://www.stormkit.io/stormkit-logo.png',
    'Zerops': 'https://zerops.io/favicon.ico',
  }
  return logos[name] || ''
}

const stats = computed(() => {
  const types = new Set(providers.map(p => p.type)).size
  return [
    { value: providers.length.toString(), label: 'Platform Diulas' },
    { value: types.toString(), label: 'Kategori Tipe' },
    { value: '$0–$1000+', label: 'Rentang Harga/Bulan' },
    { value: 'Jun 2026', label: 'Data Diperbarui' },
  ]
})

const categories = computed(() => {
  const counts = {}
  providers.forEach(p => {
    counts[p.type] = (counts[p.type] || 0) + 1
  })
  const cats = [{ id: 'all', label: 'Semua', count: providers.length }]
  Object.keys(counts).sort().forEach(type => {
    cats.push({ id: type, label: type, count: counts[type] })
  })
  return cats
})

function toggleExpanded(name) {
  const idx = expandedProviders.value.indexOf(name)
  if (idx > -1) {
    expandedProviders.value.splice(idx, 1)
  } else {
    expandedProviders.value.push(name)
  }
}

function typeBadgeClass(type) {
  return {
    'Edge': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
    'Cloud': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'PaaS': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    'VPS': 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
    'Server Management': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
'Static Hosting': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Web Server': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
    'IaC': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'Shared Hosting': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    'BaaS': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  }[type] || 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
}

const providers = [
  {
    name: 'Vercel',
    company: 'Vercel Inc.',
    type: 'Edge',
    color: '#000000',
    rating: '4.7',
    freeAvailable: true,
    startingPrice: 'Gratis / $20/user',
    desc: 'Platform deployment frontend paling populer untuk Next.js dan framework modern. Memiliki jaringan edge global dan integrasi CI/CD otomatis langsung dari Git.',
    plans: [
      {
        name: 'Hobby',
        price: 'Gratis',
        popular: false,
        highlight: 'Untuk proyek personal saja (non-komersial). Termasuk CI/CD otomatis, serverless compute, 100GB bandwidth, DDoS mitigation, community support.'
      },
      {
        name: 'Pro',
        price: '$20/user/bln',
        popular: true,
        priceNote: 'Bayar bulanan, tanpa diskon tahunan',
        highlight: 'Tim profesional. Termasuk $20 monthly usage credit (sejak Sep 2025), 12 concurrent builds, fungsi serverless hingga 60 detik, SAML SSO, spend management, email support.'
      },
      {
        name: 'Enterprise',
        price: 'Custom (>$20K/thn)',
        popular: false,
        highlight: 'Kontrak minimum ±$20–25K/tahun. Managed WAF, SCIM, SLA khusus, dedicated support, compliance HIPAA tersedia.'
      },
    ],
    specs: [
      { label: 'Bandwidth Free', value: '100 GB/bulan' },
      { label: 'Concurrent Builds', value: '12 (Pro)' },
      { label: 'Edge Requests Overage', value: '$2/juta request' },
      { label: 'Bandwidth Overage', value: '$0.15/GB' },
      { label: 'Fungsi Serverless Max', value: '60 detik (Pro)' },
      { label: 'Optimasi Gambar', value: '5.000 src/bln (Pro)' },
    ],
    pros: [
      'Integrasi Next.js terbaik di kelasnya',
      'Deploy dari GitHub hanya butuh menit',
      'Preview URL otomatis per Pull Request',
      'Edge runtime global (serverless dekat pengguna)',
      'Analitik dan observabilitas built-in (Pro)',
    ],
    cons: [
      'Hobby plan hanya untuk non-komersial',
      'Overage bisa mahal: bandwidth $0.15/GB, edge request $2/juta',
      'Lompatan harga ke Enterprise sangat curam (>$20K/tahun)',
      'ISR dan Image Optimization dihitung terpisah',
    ],
    bestFor: 'Tim frontend yang membangun Next.js, React, atau Nuxt. Cocok untuk startup hingga perusahaan menengah yang mengutamakan kecepatan developer dan performa edge.',
    warning: 'Hati-hati dengan overage cost. Proyek yang viral bisa langsung kena biaya tak terduga karena plan Hobby tidak bisa scale — harus upgrade ke Pro terlebih dahulu.',
    tableData: {
      bandwidth: '100 GB (Free) / $0.15/GB overage',
      autoDeploy: true,
      suitableFor: 'Frontend, Next.js, JAMstack',
    },
  },
  {
    name: 'AWS Amplify',
    company: 'Amazon Web Services',
    type: 'Cloud',
    color: '#FF9900',
    rating: '4.3',
    freeAvailable: true,
    startingPrice: 'Gratis (12 bln) / Pay-as-go',
    desc: 'Solusi full-stack dari ekosistem AWS. Menghubungkan frontend deployment dengan backend AWS (DynamoDB, AppSync, Cognito). Cocok untuk tim yang sudah berada di dalam ekosistem AWS.',
    plans: [
      {
        name: 'Free Tier (12 bln)',
        price: 'Gratis',
        popular: false,
        highlight: 'Tersedia 12 bulan pertama. 5GB storage, 1.000 build minutes/bulan. Mulai Jul 2025, akun baru mendapat $200 kredit AWS.'
      },
      {
        name: 'Pay-as-You-Go',
        price: '$0.01/menit build',
        popular: true,
        priceNote: '$0.023/GB storage/bln',
        highlight: 'Harga per penggunaan. Build dikenakan $0.01/menit. Storage $0.023/GB/bulan. Bandwidth hosting $0.01/GB — jauh lebih murah dibanding Firebase Hosting ($0.15/GB).'
      },
      {
        name: 'Enterprise',
        price: 'Custom via AWS',
        popular: false,
        highlight: 'Negosiasi langsung dengan AWS Enterprise Support. SLA, compliance, dan dedicated account manager tersedia.'
      },
    ],
    specs: [
      { label: 'Build Minute (Free)', value: '1.000/bulan' },
      { label: 'Harga Build', value: '$0.01/menit' },
      { label: 'Storage', value: '$0.023/GB/bln' },
      { label: 'Bandwidth Hosting', value: '$0.01/GB served' },
      { label: 'Integrasi Backend', value: 'DynamoDB, AppSync, Cognito' },
      { label: 'Seat Pricing', value: 'Tidak ada (gratis per anggota)' },
    ],
    pros: [
      'Terintegrasi penuh dengan 200+ layanan AWS',
      'Harga bandwidth hosting termurah ($0.01/GB)',
      'Tidak ada biaya per-seat untuk kolaborasi tim',
      'Auth kuat via AWS Cognito',
      'CI/CD pipeline otomatis dari GitHub/Bitbucket/GitLab',
    ],
    cons: [
      'Kurva belajar lebih curam dari Vercel/Netlify',
      'UI console AWS terasa kompleks untuk developer baru',
      'Ekosistem lebih cocok jika sudah pakai AWS',
      'Build minutes habis cepat pada Free Tier',
    ],
    bestFor: 'Tim yang sudah bekerja dalam ekosistem AWS, project full-stack dengan kebutuhan backend kompleks (GraphQL, auth, database), atau enterprise yang ingin konsolidasi dalam satu cloud provider.',
    warning: 'Jika tidak memantau penggunaan build minutes, biaya bisa muncul di luar dugaan setelah masa Free Tier 12 bulan berakhir. Set up billing alert di AWS Cost Explorer.',
    tableData: {
      bandwidth: '$0.01/GB (sangat murah)',
      autoDeploy: true,
      suitableFor: 'Full-stack, ekosistem AWS, enterprise',
    },
  },
  {
    name: 'Cloudflare',
    company: 'Cloudflare Inc.',
    type: 'Edge',
    color: '#F48120',
    rating: '4.6',
    freeAvailable: true,
    startingPrice: 'Gratis / $5–$25/bln',
    desc: 'Jaringan CDN global terbesar dengan 334 lokasi data center. Menawarkan Pages untuk hosting statis, Workers untuk edge computing serverless, dan KV storage. Bandwidth unlimited di semua tier Pages.',
    plans: [
      {
        name: 'Free (Pages + Workers)',
        price: 'Gratis',
        popular: false,
        highlight: 'Pages: static hosting unlimited bandwidth. Workers Free: 100.000 request/hari, CPU time 10ms/invocation. KV storage terbatas.'
      },
      {
        name: 'Workers Paid',
        price: '$5/bulan',
        popular: true,
        highlight: '10 juta request/bulan, CPU time hingga 50ms. Termasuk KV storage, Durable Objects, D1 database. Overage $0.50/juta request tambahan.'
      },
      {
        name: 'Pro (Zone plan)',
        price: '$20/bln (annual) / $25/bln',
        popular: false,
        highlight: 'WAF rules lebih banyak, Page Rules lebih, bot management dasar. Terpisah dari Workers Paid — dua produk berbeda.'
      },
      {
        name: 'Business',
        price: '$200/bln (annual) / $250/bln',
        popular: false,
        highlight: 'Bot management penuh, Web Analytics lebih detail, SLA 100% uptime, prioritas support.'
      },
      {
        name: 'Enterprise',
        price: 'Custom (via sales)',
        popular: false,
        highlight: 'SLA kustom, dedicated support, advanced security.'
      },
    ],
    specs: [
      { label: 'Jumlah PoP (Data Center)', value: '334 lokasi global' },
      { label: 'Bandwidth Pages', value: 'Unlimited (semua tier)' },
      { label: 'Workers Free Request/hari', value: '100.000 request' },
      { label: 'Workers Paid Request/bln', value: '10 juta (inkl.)' },
      { label: 'Billing Durable Objects', value: 'Aktif Jan 2026 (SQLite)' },
      { label: 'D1 Database', value: 'SQLite serverless (termasuk)' },
    ],
    pros: [
      'Bandwidth Pages unlimited di semua plan — tidak ada overage bandwidth',
      'Jaringan terbesar dan tercepat untuk edge computing',
      'Workers Paid sangat murah untuk API workload (<100 juta request/bln)',
      'Tidak ada biaya API Gateway terpisah (berbeda dari AWS Lambda)',
      'D1, KV, Durable Objects — ekosistem data terintegrasi',
    ],
    cons: [
      'Workers Free dan zone plan (Pro/Business) adalah produk terpisah — bisa membingungkan',
      'Durable Objects SQLite baru mulai dikenakan biaya Jan 2026',
      'Bukan pilihan terbaik untuk SSR heavy (Next.js ISR lebih baik di Vercel)',
      'CPU time Workers terbatas (10ms Free, 50ms Paid)',
    ],
    bestFor: 'Hosting aset statis, API ringan dengan traffic besar, fungsi edge serverless global. Sangat cost-efficient untuk bandwidth tinggi karena unlimited Pages bandwidth.',
    warning: 'Jangan bingungkan zona plan (Pro/Business untuk CDN) dengan Workers Paid plan untuk fungsi serverless — keduanya adalah produk terpisah dengan tagihan berbeda.',
    tableData: {
      bandwidth: 'Unlimited (Pages) / Paid per request (Workers)',
      autoDeploy: true,
      suitableFor: 'Static, Edge API, global CDN',
    },
  },
  {
    name: 'DigitalOcean',
    company: 'DigitalOcean LLC',
    type: 'VPS',
    color: '#0080FF',
    rating: '4.8',
    freeAvailable: true,
    startingPrice: '$4/bulan (Droplet)',
    desc: 'Cloud infrastructure platform yang berfokus pada developer. Menawarkan VPS (Droplets), App Platform terkelola, Managed Database, dan Kubernetes. Dikenal dengan harga transparan dan antarmuka yang bersih.',
    plans: [
      {
        name: 'Basic Droplet (512MB)',
        price: '$4/bulan',
        popular: false,
        highlight: '1 vCPU, 512MB RAM, 10GB SSD, 500GB transfer. Cocok untuk dev server atau belajar.'
      },
      {
        name: 'Basic Droplet (1GB)',
        price: '$6/bulan',
        popular: false,
        highlight: '1 vCPU, 1GB RAM, 25GB SSD, 1TB transfer. Entry level untuk website ringan.'
      },
      {
        name: 'Premium Intel (2vCPU/4GB)',
        price: '$24/bulan',
        popular: true,
        highlight: 'Paling populer. 2 vCPU, 4GB RAM, NVMe SSD. Hemat ~$10 vs AWS t3.medium setara. Per-second billing sejak Jan 2026.'
      },
      {
        name: 'App Platform (Static)',
        price: 'Gratis (3 sites)',
        popular: false,
        highlight: '3 static site gratis, 1 GiB transfer/app/bulan, HTTPS otomatis, CDN global, unlimited team members.'
      },
      {
        name: 'App Platform (Dynamic)',
        price: 'Mulai $5/bulan',
        popular: false,
        highlight: 'Dynamic app (Node.js, Python, Go, dst.). CI/CD Git otomatis. Managed scaling.'
      },
      {
        name: 'Managed Postgres',
        price: 'Mulai $15/bulan',
        popular: false,
        highlight: 'Single node. High Availability (2 node) $60/bulan.'
      },
    ],
    specs: [
      { label: 'Billing Model', value: 'Per-detik sejak Jan 2026 (min 60 detik)' },
      { label: 'Bandwidth Overage', value: '$0.01/GiB (9x lebih murah dari AWS)' },
      { label: 'Backup Otomatis', value: '+20% biaya Droplet/bulan' },
      { label: 'Load Balancer', value: '$12/bulan' },
      { label: 'Block Storage', value: '$10/bulan minimum' },
      { label: 'Kredit Baru', value: '$200 kredit gratis 60 hari' },
    ],
    pros: [
      'Harga transparan dan predictable, tidak ada biaya tersembunyi',
      'Bandwidth 9x lebih murah dari AWS ($0.01/GiB vs $0.09/GB)',
      'UI yang bersih dan mudah dipahami developer',
      'Billing per-detik sejak Jan 2026 — lebih efisien',
      'Dokumentasi dan tutorial berkualitas tinggi',
    ],
    cons: [
      'Droplet yang dimatikan (power off) tetap ditagih — harus destroy untuk berhenti billing',
      'Tidak ada volume discount untuk pengguna besar',
      'Fitur compliance lebih terbatas dibanding AWS/GCP untuk enterprise',
      'Semua data center di luar negeri (tidak ada di Indonesia/Asia Tenggara)',
    ],
    bestFor: 'Developer dan startup yang butuh kontrol penuh atas server tanpa kompleksitas AWS/GCP. Cocok untuk web app, API, database, dan workload yang butuh performa prediktabel.',
    warning: 'Droplet yang di-power off tetap ditagih karena resource tetap dialokasikan. Untuk benar-benar stop billing, Anda harus destroy Droplet atau ambil snapshot lalu delete.',
    tableData: {
      bandwidth: 'Pool teragregasi, overage $0.01/GiB',
      autoDeploy: true,
      suitableFor: 'VPS, full-stack, database, microservices',
    },
  },
  {
    name: 'Netlify',
    company: 'Netlify Inc.',
    type: 'PaaS',
    color: '#00C7B7',
    rating: '4.5',
    freeAvailable: true,
    startingPrice: 'Gratis / $9–$20/bln',
    desc: 'Pioneer platform JAMstack dengan fitur CI/CD otomatis, form handling, identity, dan edge functions. Pindah ke model credit-based pada Sep 2025. Pro plan kini flat-fee tanpa biaya per-seat sejak April 2026.',
    plans: [
      {
        name: 'Free',
        price: 'Gratis',
        popular: false,
        highlight: 'Akun baru (sejak Sep 2025): 300 kredit/bulan. 100GB bandwidth, 300 build minutes, 125K serverless invocations. Cocok untuk proyek personal dan percobaan.'
      },
      {
        name: 'Personal',
        price: '$9/bulan',
        popular: false,
        highlight: 'Lebih banyak kredit untuk developer individu. Lebih banyak bandwidth dan build minutes dari Free plan.'
      },
      {
        name: 'Pro',
        price: '$20/bulan (flat, unlimited member)',
        popular: true,
        priceNote: 'Flat fee sejak April 14, 2026 — bukan per-user lagi',
        highlight: '3.000 kredit/bulan. Unlimited team members. Concurrent builds add-on $40. Form submissions gratis. Sangat value untuk tim kecil-menengah.'
      },
      {
        name: 'Enterprise',
        price: 'Custom (via sales)',
        popular: false,
        highlight: 'Compliance requirements, audit logs, dedicated support, SLA kustom.'
      },
    ],
    specs: [
      { label: 'Model Billing', value: 'Credit-based (sejak Sep 2025)' },
      { label: 'Kredit Free', value: '300 kredit/bulan' },
      { label: 'Kredit Pro', value: '3.000 kredit/bulan' },
      { label: 'Biaya Deploy', value: '15 kredit/deploy' },
      { label: 'Biaya Bandwidth', value: '20 kredit/GB (sejak Apr 2026)' },
      { label: 'Web Requests', value: '2 kredit/10.000 request' },
    ],
    pros: [
      'Pro plan unlimited team member dengan harga flat $20/bulan sangat terjangkau',
      'Form handling built-in tanpa backend tambahan',
      'Deploy preview otomatis per branch/PR',
      'Edge functions untuk server-side logic ringan',
      'Identity management dan auth bawaan',
    ],
    cons: [
      'Model credit-based membuat prediksi biaya cukup rumit',
      'Bandwidth jauh lebih mahal dibanding VPS (Hetzner 1000x lebih murah per TB)',
      'Downgrade dari plan berbayar dilaporkan sulit (UI memblokir tanpa solusi jelas)',
      'Median kontrak enterprise mencapai $16.500/tahun',
    ],
    bestFor: 'Tim frontend yang membangun JAMstack, Gatsby, Hugo, Astro. Sangat baik untuk proyek yang butuh form handling, identity, dan preview deployment per branch.',
    warning: 'Model credit-based baru (Sep 2025) membuat prediksi biaya memerlukan perhitungan teliti. Gunakan kalkulator kredit Netlify sebelum memilih plan untuk menghindari overcharge.',
    tableData: {
      bandwidth: '100GB Free / ~$55 per 100GB overage',
      autoDeploy: true,
      suitableFor: 'JAMstack, Gatsby, Hugo, Astro, Hugo',
    },
  },
  {
    name: 'Zeabur',
    company: 'Zeabur Inc.',
    type: 'PaaS',
    color: '#8B5CF6',
    rating: '4.5',
    freeAvailable: true,
    startingPrice: 'Gratis ($5 kredit) / Pay-as-go',
    desc: 'Platform deployment modern yang fokus pada simplisitas. Deploy aplikasi dari Git tanpa perlu konfigurasi server. Populer di kalangan developer Asia. Dinobatkan sebagai "Top Pick 2026" untuk kemudahan deployment.',
    plans: [
      {
        name: 'Free',
        price: '$5 kredit/bulan',
        popular: false,
        highlight: 'Tidak perlu kartu kredit. $5 kredit bulanan. Tidak ada sleep policy (aplikasi tetap berjalan). Ideal untuk side project dan percobaan.'
      },
      {
        name: 'Developer',
        price: 'Pay-as-you-go',
        popular: true,
        highlight: 'Bayar sesuai resource yang digunakan. Billed per CPU/memory consumption. Cocok untuk proyek yang berkembang.'
      },
      {
        name: 'Team',
        price: 'Custom',
        popular: false,
        highlight: 'Untuk tim dan organisasi. Kolaborasi multi-anggota, lebih banyak resource.'
      },
    ],
    specs: [
      { label: 'Sleep Policy', value: 'Tidak ada — aplikasi selalu aktif' },
      { label: 'Kredit Free', value: '$5/bulan (tanpa kartu kredit)' },
      { label: 'Runtime Support', value: 'Node.js, Python, Go, Ruby, PHP, Java' },
      { label: 'Database', value: 'PostgreSQL, MySQL, MongoDB, Redis' },
      { label: 'Deploy Source', value: 'GitHub, GitLab, Docker Hub' },
      { label: 'Custom Domain', value: 'Tersedia (free dan berbayar)' },
    ],
    pros: [
      'Tidak ada sleep/idle policy — aplikasi tidak tidur seperti Render free',
      'Tidak perlu kartu kredit untuk free plan',
      'Antarmuka bersih dan proses deploy sangat sederhana',
      'Support database bawaan (Postgres, MySQL, Redis, MongoDB)',
      'Dikenal mudah digunakan dan cepat untuk prototyping',
    ],
    cons: [
      'Ekosistem dan komunitas lebih kecil dari Vercel/Netlify',
      'Dokumentasi terbatas terutama dalam Bahasa Indonesia',
      'Fitur enterprise masih berkembang',
      'SLA dan uptime guarantee belum setara platform besar',
    ],
    bestFor: 'Developer solo atau tim kecil yang butuh deployment cepat tanpa kerumitan konfigurasi. Sangat cocok untuk side project, prototyping, dan aplikasi full-stack sederhana.',
    warning: 'Untuk production scale besar, platform ini masih dalam tahap pertumbuhan. Pertimbangkan untuk evaluasi keandalan dan SLA sebelum deploy aplikasi kritis.',
    tableData: {
      bandwidth: 'Tidak tertera secara publik',
      autoDeploy: true,
      suitableFor: 'Prototyping, side project, full-stack sederhana',
    },
  },
  {
    name: 'Firebase',
    company: 'Google LLC',
    type: 'Cloud',
    color: '#FFC400',
    rating: '4.4',
    freeAvailable: true,
    startingPrice: 'Gratis (Spark) / Pay-as-go (Blaze)',
    desc: 'Backend-as-a-Service dari Google. Menyediakan Firestore (NoSQL realtime), Authentication, Hosting, Cloud Functions, Storage, dan lebih banyak layanan untuk aplikasi mobile dan web. Sangat populer untuk MVP dan aplikasi mobile.',
    plans: [
      {
        name: 'Spark (Free)',
        price: 'Gratis',
        popular: false,
        highlight: 'Limit: 50.000 MAU (Auth), 1GB Firestore storage, 10GB/bulan bandwidth, 50.000 reads/hari Firestore, 20.000 writes/hari. Cukup untuk MVP dan proyek kecil.'
      },
      {
        name: 'Blaze (Pay-as-you-go)',
        price: 'Bayar per penggunaan',
        popular: true,
        priceNote: '$300 kredit untuk akun baru yang upgrade',
        highlight: 'Batas harian gratis tetap berlaku (carryover dari Spark). Firestore: bayar per operasi read/write. Cloud Functions aktif. Hosting bandwidth $0.15/GB (lebih mahal dari Amplify).'
      },
    ],
    specs: [
      { label: 'Firestore Free Reads', value: '50.000/hari' },
      { label: 'Firestore Free Writes', value: '20.000/hari' },
      { label: 'Hosting Bandwidth (Blaze)', value: '$0.15/GB served' },
      { label: 'Storage Free', value: '5GB (Spark) / 1GB Firestore' },
      { label: 'Integrasi', value: 'Semua layanan Google Cloud' },
      { label: 'App Hosting (Aug 2025)', value: 'Baru — Cloud Run + Cloud CDN' },
    ],
    pros: [
      'Sangat mudah untuk memulai — setup auth, database, dan hosting dalam hitungan menit',
      'Realtime database dan Firestore untuk update real-time tanpa polling',
      'Terintegrasi sempurna dengan ekosistem Google (Maps, Analytics, AdMob)',
      'Firestore tersedia offline (client SDK dengan sync)',
      'SDK resmi untuk iOS, Android, Web, Flutter, Unity',
    ],
    cons: [
      'Biaya bisa melonjak drastis untuk aplikasi dengan banyak read/write (terutama dengan AI features)',
      'Hosting bandwidth $0.15/GB — 15x lebih mahal dari Amplify Hosting',
      'Budget alert tidak memotong penggunaan — hanya notifikasi, bukan hard cap',
      'Read amplification (AI features trigger banyak read) bisa memicu bill besar',
    ],
    bestFor: 'Aplikasi mobile (iOS/Android), startup yang butuh backend cepat, proyek dengan kebutuhan realtime, dan MVP yang perlu auth + database dalam satu ekosistem.',
    warning: 'Fitur AI (chatbot, summarizer) yang membaca Firestore dokumen berulang dapat memicu "read amplification" — satu aksi pengguna memicu ratusan reads dan tagihan tak terduga. Set budget alert di Google Cloud Console.',
    tableData: {
      bandwidth: 'Free 10GB/bln; Blaze $0.15/GB',
      autoDeploy: true,
      suitableFor: 'Mobile app, realtime, MVP, startup',
    },
  },
  {
    name: 'Render',
    company: 'Render Inc.',
    type: 'PaaS',
    color: '#46E3B7',
    rating: '4.7',
    freeAvailable: true,
    startingPrice: 'Gratis / $7/bln per layanan',
    desc: 'Platform cloud modern untuk aplikasi full-stack: web services, background workers, cron jobs, database PostgreSQL dan Redis, semua dari satu platform. Model per-service pricing memberikan prediktabilitas biaya. Update besar April 2026: hilangkan per-seat billing.',
    plans: [
      {
        name: 'Hobby (Free)',
        price: 'Gratis',
        popular: false,
        highlight: 'Static sites, web services (750 jam/bulan), PostgreSQL gratis 90 hari. Web services spin down setelah 15 menit idle — cold start 30-60 detik.'
      },
      {
        name: 'Starter Web Service',
        price: '$7/bulan per service',
        popular: false,
        highlight: '512MB RAM, 0.5 vCPU. Tidak ada spin down. Cocok untuk app kecil yang perlu selalu aktif.'
      },
      {
        name: 'Standard Web Service',
        price: '$25/bulan per service',
        popular: true,
        highlight: '2GB RAM, 1 vCPU. Cocok untuk sebagian besar production workload.'
      },
      {
        name: 'Pro Workspace (Apr 2026)',
        price: 'Flat fee, unlimited member',
        popular: false,
        highlight: 'Update April 2026: tidak ada lagi per-seat billing. Audit logs, compliance reports tersedia di tier lebih rendah.'
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        popular: false,
        highlight: 'SLA enterprise, dedicated support, fitur compliance lanjutan.'
      },
    ],
    specs: [
      { label: 'Service Pricing Model', value: 'Per-service/bulan (flat per instance)' },
      { label: 'Web Service Starter', value: '$7/bln · 512MB · 0.5 vCPU' },
      { label: 'Idle Spin-down', value: 'Hanya di Free tier (15 menit)' },
      { label: 'Autoscaling', value: '+biaya per instance tambahan' },
      { label: 'Managed PostgreSQL', value: 'Tersedia (berbayar per instance)' },
      { label: 'Private Networking', value: 'Gratis antara services' },
    ],
    pros: [
      'Harga per-service mudah diprediksi — tidak ada kejutan traffic',
      'Support full-stack: Docker, background workers, cron jobs, databases',
      'Private networking gratis antara services',
      'Deploy otomatis dari Git dengan zero-downtime rolling deployments',
      'DDoS protection dan TLS otomatis',
    ],
    cons: [
      'Free tier spin down setelah 15 menit idle — cold start lambat, buruk untuk demo',
      'Stack biaya bisa tinggi: Standard ($25) + Postgres + Redis = $70+/bulan untuk app kecil',
      'Autoscaling menambah biaya linear per instance',
      'Region terbatas (US, Europe, Asia — tidak ada Indonesia)',
    ],
    bestFor: 'Developer yang butuh platform full-stack komprehensif (web + DB + worker + cron) dengan harga predictable. Sangat baik untuk aplikasi yang butuh persistent server berbeda dari JAMstack.',
    warning: 'Free tier web service spin down setelah 15 menit idle — pengguna pertama setelah idle akan menunggu 30-60 detik. Bayar minimal $7/bulan per service untuk menghindari ini.',
    tableData: {
      bandwidth: '100GB Hobby / Berbayar di atasnya',
      autoDeploy: true,
      suitableFor: 'Full-stack, API, Docker, background workers',
    },
  },
  {
    name: 'Koyeb',
    company: 'Koyeb Inc.',
    type: 'Edge',
    color: '#7C3AED',
    rating: '4.9',
    freeAvailable: true,
    startingPrice: 'Gratis (Nano) / Pay-as-go',
    desc: 'Platform serverless modern dengan fokus pada performa edge global. Dikenal untuk kemudahan penggunaan dan tidak ada spin-down policy bahkan di free tier. Rating tertinggi di G2 untuk kategori PaaS di 2026.',
    plans: [
      {
        name: 'Free (Nano Instance)',
        price: 'Gratis',
        popular: false,
        highlight: 'Satu Nano instance gratis tanpa kartu kredit. Tidak ada sleep policy. Cocok untuk satu service aktif terus-menerus.'
      },
      {
        name: 'Pay-as-you-go',
        price: 'Billed per detik',
        popular: true,
        highlight: 'Bayar hanya sesuai resource yang digunakan, per detik. Autoscaling otomatis. Tidak ada biaya platform tambahan selain resource.'
      },
      {
        name: 'Custom/Enterprise',
        price: 'Hubungi sales',
        popular: false,
        highlight: 'Volume discounts, SLA khusus, dedicated support untuk tim besar.'
      },
    ],
    specs: [
      { label: 'Rating G2 (2026)', value: '4.9/5 — tertinggi di kategori PaaS' },
      { label: 'Sleep Policy', value: 'Tidak ada — selalu aktif termasuk free' },
      { label: 'Billing Model', value: 'Per-detik, pay-as-you-go' },
      { label: 'Kartu Kredit', value: 'Tidak diperlukan untuk Free tier' },
      { label: 'Global Edge', value: 'Multi-region deployment otomatis' },
      { label: 'Autoscaling', value: 'Otomatis (termasuk scale to 0)' },
    ],
    pros: [
      'Rating G2 tertinggi (4.9/5) di antara semua platform PaaS pada 2026',
      'Free Nano instance aktif terus — tidak ada cold start',
      'Billing per-detik paling transparan — bayar persis yang dipakai',
      'Global edge deployment untuk latency rendah',
      'Setup sangat mudah — developer experience terbaik menurut reviewer G2',
    ],
    cons: [
      'Ekosistem dan integrasi lebih terbatas dibanding AWS/GCP',
      'Komunitas dan plugin ekosistem lebih kecil',
      'Dokumentasi masih dalam pengembangan untuk fitur-fitur advanced',
      'Belum ada managed database bawaan seperti Render',
    ],
    bestFor: 'Developer yang mencari platform dengan developer experience terbaik, startup yang butuh deployment global cepat, dan proyek yang butuh edge computing tanpa konfigurasi rumit.',
    warning: 'Meskipun sangat bagus untuk developer experience, evaluasi ketersediaan fitur lanjutan (database terkelola, monitoring enterprise) sebelum commit untuk production skala besar.',
    tableData: {
      bandwidth: 'Pay-as-you-go (per penggunaan)',
      autoDeploy: true,
      suitableFor: 'Edge serverless, startup, global deployment',
    },
  },
  {
    "name": "Azure App Service",
    "company": "Microsoft",
    "type": "Cloud",
    "color": "#0078D4",
    "rating": "4.5",
    "freeAvailable": true,
    "startingPrice": "Gratis / $9.49/bulan",
    "desc": "Platform-as-a-Service (PaaS) dari Microsoft untuk hosting web app, API, dan layanan backend. Mendukung berbagai bahasa pemrograman dan framework, dengan skalabilitas terintegrasi dan keamanan tingkat enterprise.",
    "plans": [
      {
        "name": "Free",
        "price": "Gratis",
        "popular": false,
        "highlight": "1 GB storage, shared infrastructure, 60 menit compute/hari. Cocok untuk development dan testing."
      },
      {
        "name": "Shared",
        "price": "$9.49/bulan",
        "popular": false,
        "highlight": "Lingkungan shared untuk dev/test."
      },
      {
        "name": "Basic",
        "price": "$54.75/bulan",
        "popular": false,
        "highlight": "Dedicated environment untuk dev/test."
      },
      {
        "name": "Standard",
        "price": "$73/bulan",
        "popular": true,
        "highlight": "Untuk workload production."
      }
    ],
    "specs": [
      {
        "label": "Storage Free",
        "value": "1 GB (Free)"
      },
      {
        "label": "Compute Free",
        "value": "60 menit/hari (Free)"
      }
    ],
    "pros": [
      "Integrasi mendalam dengan ekosistem Microsoft dan Azure",
      "Mendukung berbagai bahasa pemrograman dan container",
      "Skalabilitas mudah dengan scale up/out",
      "Fitur keamanan bawaan (autentikasi, managed identities, TLS)"
    ],
    "cons": [
      "Biaya bisa membengkak jika tidak dikelola dengan baik",
      "Kurva pembelajaran untuk konfigurasi optimal",
      "Harga lebih mahal dibanding provider shared hosting"
    ],
    "bestFor": "Enterprise dan tim yang sudah menggunakan ekosistem Microsoft. Cocok untuk web app enterprise, REST API, dan mobile backend.",
    "warning": "Pilih App Service Plan dengan tepat! Compute resources dan scaling options ditentukan oleh plan yang dipilih. Production apps sebaiknya menggunakan monitoring, managed identities, deployment slots, dan scaling rules sejak awal.",
    "tableData": {
      "bandwidth": "Tergantung plan",
      "autoDeploy": true,
      "suitableFor": "Enterprise, .NET, Java, Python"
    }
  },
  {
    "name": "Cleavr",
    "company": "Cleavr",
    "type": "Server Management",
    "color": "#4A90D9",
    "rating": "4.2",
    "freeAvailable": false,
    "startingPrice": "$10/bulan",
    "desc": "Server management tool yang menyederhanakan deployment dan manajemen VPS. Alternatif untuk Cloudways dan RunCloud, dengan dukungan lebih dari sekadar PHP dan WordPress.",
    "plans": [
      {
        "name": "Basic",
        "price": "$10/bulan",
        "popular": true,
        "highlight": "Manajemen server dasar, deploy PHP, Laravel, WordPress, Node.js."
      },
      {
        "name": "Pro",
        "price": "$25/bulan",
        "popular": false,
        "highlight": "Fitur kolaborasi tim dan advanced."
      },
      {
        "name": "Business",
        "price": "$50/bulan",
        "popular": false,
        "highlight": "Untuk kebutuhan bisnis dengan skala lebih besar."
      }
    ],
    "specs": [
      {
        "label": "Server Resource",
        "value": "Agent ~200-500MB RAM"
      },
      {
        "label": "Integration",
        "value": "DigitalOcean, AWS, Linode, UpCloud, Vultr, Hetzner"
      }
    ],
    "pros": [
      "Mendukung lebih dari sekadar PHP dan WordPress (Node.js, Python AI/ML)",
      "Integrasi dengan berbagai VPS provider",
      "Antarmuka web yang user-friendly"
    ],
    "cons": [
      "Berlangganan bulanan (tidak ada one-time payment)",
      "Membutuhkan instalasi agent di server",
      "Web panel terekspos ke internet"
    ],
    "bestFor": "Developer dan tim yang ingin manajemen VPS lebih mudah tanpa kompleksitas DevOps berlebihan, terutama untuk PHP, Laravel, dan WordPress.",
    "warning": "Cleavr adalah alat manajemen, bukan hosting. Anda tetap harus menyewa VPS dari provider seperti DigitalOcean atau AWS dan membayar biaya VPS tersebut.",
    "tableData": {
      "bandwidth": "Tergantung VPS provider",
      "autoDeploy": true,
      "suitableFor": "PHP, Laravel, WordPress, Node.js"
    }
  },
  {
    "name": "Clever Cloud",
    "company": "Clever Cloud",
    "type": "PaaS",
    "color": "#FF6B00",
    "rating": "4.3",
    "freeAvailable": true,
    "startingPrice": "€5.60/bulan",
    "desc": "Platform as a Service yang membantu bisnis mengelola operasi dengan berbagai runtime dan API. Fokus pada otomatisasi dan skalabilitas, cocok untuk startup dan tim agile.",
    "plans": [
      {
        "name": "Starter",
        "price": "€5.60/bulan",
        "popular": true,
        "highlight": "Paket awal dengan harga terjangkau."
      },
      {
        "name": "Basic",
        "price": "€6.77/bulan",
        "popular": false,
        "highlight": "Fitur lebih lengkap."
      },
      {
        "name": "Business",
        "price": "€16.24/bulan",
        "popular": false,
        "highlight": "Untuk kebutuhan bisnis."
      }
    ],
    "specs": [
      {
        "label": "Pricing Model",
        "value": "Usage-based (runtimes, databases, containers, storage, messaging)"
      }
    ],
    "pros": [
      "Otomatisasi dan skalabilitas yang baik",
      "Cocok untuk tim agile dan tech-driven startups",
      "Harga mulai dari €5.60/bulan"
    ],
    "cons": [
      "Harga berdasarkan usage, bisa sulit diprediksi"
    ],
    "bestFor": "Startup dan tim development yang membutuhkan PaaS dengan otomatisasi dan skalabilitas tinggi.",
    "warning": "Pricing berbasis usage (runtimes, databases, containers, storage, messaging). Pantau penggunaan untuk menghindari biaya tak terduga.",
    "tableData": {
      "bandwidth": "Tergantung usage",
      "autoDeploy": true,
      "suitableFor": "Startup, Agile teams, Multi-runtime apps"
    }
  },
  {
    "name": "Deno Deploy",
    "company": "Deno",
    "type": "Edge",
    "color": "#000000",
    "rating": "4.6",
    "freeAvailable": true,
    "startingPrice": "Gratis / $20/bulan",
    "desc": "Platform edge deployment dari Deno, menggunakan V8 isolates untuk eksekusi kode yang cepat dan ringan. Mendukung TypeScript secara native dan ideal untuk aplikasi serverless modern.",
    "plans": [
      {
        "name": "Free",
        "price": "Gratis",
        "popular": false,
        "highlight": "1M requests/bulan, 20GB egress, 50 custom domains/org, 15h CPU time, 350 GB-h memory time, 20 apps, 5 team members."
      },
      {
        "name": "Pro",
        "price": "$20/bulan",
        "popular": true,
        "highlight": "5M requests/bulan (then $2/M), 100GB egress (then $0.5/GB), team collaboration, advanced features."
      },
      {
        "name": "Builder",
        "price": "$200/bulan",
        "popular": false,
        "highlight": "20M requests/bulan, 400 CPU hours, 4GB runtime & build memory, 200 deployments/hour. Untuk Subhosting dan platform growing."
      }
    ],
    "specs": [
      {
        "label": "Memory",
        "value": "512MB"
      },
      {
        "label": "Latency",
        "value": "0–5ms"
      },
      {
        "label": "CPU Time (Free)",
        "value": "15h/bulan"
      },
      {
        "label": "Memory Time (Free)",
        "value": "350 GB-h/bulan"
      }
    ],
    "pros": [
      "Dukungan TypeScript native",
      "Eksekusi cepat dengan V8 isolates",
      "Model pricing transparan"
    ],
    "cons": [
      "Ekosistem masih lebih kecil dibanding Node.js",
      "Beberapa library npm mungkin tidak kompatibel"
    ],
    "bestFor": "Developer TypeScript yang mencari platform edge serverless dengan performa tinggi dan pricing transparan.",
    "warning": "Perhatikan overage: Pro plan $2/juta requests and $0.5/GB network setelah kuota.",
    "tableData": {
      "bandwidth": "20GB (Free) / 100GB (Pro) / $0.5/GB overage",
      "autoDeploy": true,
      "suitableFor": "TypeScript, Edge, Serverless"
    }
  },
  {
    "name": "Firebase Hosting",
    "company": "Google",
    "type": "BaaS",
    "color": "#FFCA28",
    "rating": "4.4",
    "freeAvailable": true,
    "startingPrice": "Gratis / Pay-as-you-go",
    "desc": "Backend-as-a-Service dari Google untuk hosting statis, dengan integrasi Authentication, Firestore, Cloud Functions, dan Cloud Storage. Ideal untuk SPA dan PWA.",
    "plans": [
      {
        "name": "Spark (Free)",
        "price": "Gratis",
        "popular": false,
        "highlight": "Hosting 10GB, 360MB/day transfer, Auth 50K MAU, Firestore 1GB, Functions 125K invocations/bulan."
      },
      {
        "name": "Blaze (Pay-as-you-go)",
        "price": "$0+ (usage)",
        "popular": true,
        "highlight": "Bayar hanya untuk overages. Hosting $0.15/GB, Firestore reads $0.06/100K. Budget alerts untuk mencegah biaya tak terduga."
      }
    ],
    "specs": [
      {
        "label": "Hosting Storage (Free)",
        "value": "10GB"
      },
      {
        "label": "Transfer (Free)",
        "value": "360MB/hari"
      },
      {
        "label": "Firestore (Free)",
        "value": "1GB"
      },
      {
        "label": "Cloud Functions (Free)",
        "value": "125K invocations/bulan"
      }
    ],
    "pros": [
      "Integrasi BaaS lengkap (Auth + DB + Functions + Storage)",
      "CLI yang powerful untuk automasi",
      "Pay-as-you-go, gratis untuk skala kecil",
      "Integrasi dengan Google Cloud Platform"
    ],
    "cons": [
      "Free bandwidth hanya 360MB/hari",
      "Spark plan memblokir outbound API calls dari Cloud Functions",
      "Biaya sulit diprediksi di skala besar"
    ],
    "bestFor": "Developer yang membangun SPA, PWA, atau aplikasi yang membutuhkan backend terintegrasi (auth, database, functions) dalam satu platform.",
    "warning": "Spark plan membatasi outbound network calls dari Cloud Functions. Untuk production apps atau yang memanggil external APIs, wajib menggunakan Blaze plan.",
    "tableData": {
      "bandwidth": "360MB/hari (Free) / $0.15/GB overage",
      "autoDeploy": true,
      "suitableFor": "SPA, PWA, Google ecosystem"
    }
  },
  {
    "name": "Flightcontrol",
    "company": "Flightcontrol",
    "type": "PaaS",
    "color": "#6C47FF",
    "rating": "4.3",
    "freeAvailable": true,
    "startingPrice": "Gratis / $97/bulan",
    "desc": "Platform deployment yang menyederhanakan AWS. Memungkinkan deploy ke ECS+Fargate atau ECS+EC2 dengan biaya AWS yang transparan.",
    "plans": [
      {
        "name": "Single user (Free)",
        "price": "Gratis",
        "popular": false,
        "highlight": "1 user, hobby dan commercial use allowed. Unlimited projects, environments, deployments. Community support."
      },
      {
        "name": "Starter",
        "price": "$97/bulan",
        "popular": true,
        "highlight": "Includes 5 services (+$20/service), 25 users, GitHub organizations, business support."
      },
      {
        "name": "Business",
        "price": "$397/bulan",
        "popular": false,
        "highlight": "Includes 10 services (+$30/service), 100 users, preview environments, RBAC, multi-region, 24/7 emergency response."
      },
      {
        "name": "Enterprise",
        "price": "Custom",
        "popular": false,
        "highlight": "SAML SSO, SCIM, SOC 2 Type II, SLAs, dedicated account manager."
      }
    ],
    "specs": [
      {
        "label": "AWS Infrastructure",
        "value": "Bayar langsung ke AWS + biaya Flightcontrol"
      },
      {
        "label": "Fargate Cost",
        "value": "~$9/bulan (0.25 CPU, 0.5 GB) + $17/bulan load balancer"
      },
      {
        "label": "EC2 Cost",
        "value": "~$55/bulan (termasuk NAT gateway)"
      }
    ],
    "pros": [
      "Menyederhanakan kompleksitas AWS",
      "Bisa menggunakan AWS credits",
      "Live display biaya AWS di dashboard"
    ],
    "cons": [
      "Biaya Flightcontrol + biaya AWS (double cost)",
      "Harga melonjak tajam dari Starter ke Business"
    ],
    "bestFor": "Tim yang ingin memanfaatkan AWS tanpa harus mengelola kompleksitas infrastruktur secara manual.",
    "warning": "Flightcontrol cost adalah tambahan di atas biaya AWS. Anda tetap membayar infrastruktur AWS langsung ke AWS.",
    "tableData": {
      "bandwidth": "Tergantung AWS",
      "autoDeploy": true,
      "suitableFor": "AWS users, DevOps"
    }
  },
  {
    "name": "GitHub Pages",
    "company": "GitHub",
    "type": "Static Hosting",
    "color": "#181717",
    "rating": "4.6",
    "freeAvailable": true,
    "startingPrice": "Gratis",
    "desc": "Static site hosting dari GitHub. Push file ke repository, dan GitHub akan menserve-nya di username.github.io. Sederhana, gratis, dan reliable untuk static sites.",
    "plans": [
      {
        "name": "Free",
        "price": "Gratis",
        "popular": true,
        "highlight": "Untuk public repositories. 1GB storage, 100GB bandwidth/bulan, 10 builds/hour."
      }
    ],
    "specs": [
      {
        "label": "Storage",
        "value": "1GB per repository"
      },
      {
        "label": "Bandwidth",
        "value": "100GB/bulan"
      },
      {
        "label": "Builds",
        "value": "10 builds/hour"
      },
      {
        "label": "HTTPS",
        "value": "Otomatis dengan Let's Encrypt"
      }
    ],
    "pros": [
      "Gratis untuk public repositories",
      "Zero setup - enable di settings, push files, langsung live",
      "Custom domain dengan HTTPS otomatis",
      "Integrasi dengan GitHub Actions"
    ],
    "cons": [
      "Static files only - tidak ada serverless functions, SSR, runtime environment variables",
      "Tidak ada preview per-PR",
      "Kurang cocok untuk high-traffic sites"
    ],
    "bestFor": "Open source documentation, developer portfolios, dan simple static sites.",
    "warning": "GitHub Pages hanya untuk static files. Tidak ada dynamic functionality, server-side logic, atau runtime environment variables.",
    "tableData": {
      "bandwidth": "100GB/bulan",
      "autoDeploy": true,
      "suitableFor": "Static sites, Documentation, Portfolios"
    }
  },
  {
    "name": "GitLab Pages",
    "company": "GitLab",
    "type": "Static Hosting",
    "color": "#FC6D26",
    "rating": "4.5",
    "freeAvailable": true,
    "startingPrice": "Gratis",
    "desc": "Static website hosting dari GitLab. Deploy otomatis melalui GitLab CI/CD, mendukung berbagai static site generator, dan terintegrasi dengan ekosistem GitLab.",
    "plans": [
      {
        "name": "Free",
        "price": "Gratis",
        "popular": true,
        "highlight": "Tersedia untuk semua tier (Free, Premium, Ultimate). Run on GitLab-provided infrastructure at no additional cost."
      }
    ],
    "specs": [
      {
        "label": "Static Site Generators",
        "value": "Hugo, Jekyll, Gatsby, Middleman, Harp, Hexo, Brunch"
      },
      {
        "label": "Custom Domains",
        "value": "Dengan SSL/TLS certificates"
      },
      {
        "label": "Access Control",
        "value": "Built-in authentication"
      }
    ],
    "pros": [
      "Gratis, terintegrasi dengan GitLab CI/CD",
      "Mendukung berbagai static site generator",
      "Custom domains dan SSL/TLS",
      "Access control bawaan"
    ],
    "cons": [
      "Static files only - tidak ada dynamic server-side processing"
    ],
    "bestFor": "Pengguna GitLab yang ingin hosting static websites langsung dari repository dengan CI/CD terintegrasi.",
    "warning": "Dynamic server-side processing (seperti .php dan .asp) tidak didukung. Hanya untuk static files.",
    "tableData": {
      "bandwidth": "Tergantung GitLab plan",
      "autoDeploy": true,
      "suitableFor": "Static sites, GitLab users"
    }
  },
  {
    "name": "Heroku",
    "company": "Salesforce",
    "type": "PaaS",
    "color": "#430098",
    "rating": "4.4",
    "freeAvailable": false,
    "startingPrice": "$5/bulan",
    "desc": "Platform as a Service pionir dengan git push deployment. Mengelola OS updates, security patches, dan server provisioning secara otomatis. Sederhana namun premium.",
    "plans": [
      {
        "name": "Eco",
        "price": "$5/bulan",
        "popular": false,
        "highlight": "Paket termurah untuk workload ringan."
      },
      {
        "name": "Basic",
        "price": "$7/bulan",
        "popular": false,
        "highlight": "Untuk aplikasi sederhana."
      },
      {
        "name": "Standard",
        "price": "$25-$250+/bulan",
        "popular": true,
        "highlight": "Untuk production applications."
      },
      {
        "name": "Performance",
        "price": "$250+/bulan",
        "popular": false,
        "highlight": "Untuk high-traffic applications."
      }
    ],
    "specs": [
      {
        "label": "Medium App Cost",
        "value": "$300-500/bulan"
      },
      {
        "label": "High-Traffic App Cost",
        "value": "$1,000-3,000+/bulan"
      },
      {
        "label": "Postgres Performance Instance",
        "value": "$900/bulan"
      }
    ],
    "pros": [
      "Git push deployment, minimal infrastructure management",
      "Ekosistem add-on yang luas",
      "Mudah digunakan"
    ],
    "cons": [
      "Mahal: production workloads $500-2,000/bulan",
      "Self-hosting di DigitalOcean hanya $24-100/bulan untuk infrastruktur setara",
      "Heroku Connect mulai €4,000/bulan"
    ],
    "bestFor": "Developer dan tim yang mengutamakan kemudahan dan speed of development, dengan budget yang cukup untuk membayar premium.",
    "warning": "Heroku sangat mahal untuk production workloads. Typical production apps $500-2,000/bulan. Pertimbangkan self-hosting di VPS jika budget terbatas.",
    "tableData": {
      "bandwidth": "Tergantung dyno type",
      "autoDeploy": true,
      "suitableFor": "Rapid prototyping, Production apps (with budget)"
    }
  },
  {
    "name": "Hostinger",
    "company": "Hostinger",
    "type": "Shared Hosting",
    "color": "#673DE6",
    "rating": "4.2",
    "freeAvailable": false,
    "startingPrice": "$2.99/bulan",
    "desc": "Web hosting budget-friendly dengan berbagai pilihan: shared hosting, cloud hosting, VPS, dan WordPress hosting. Cocok untuk pemula dan bisnis kecil.",
    "plans": [
      {
        "name": "Premium",
        "price": "$3.99/bulan",
        "popular": true,
        "highlight": "3 websites, 2 email, 20GB SSD, unlimited monthly data transfers."
      },
      {
        "name": "Business",
        "price": "$2.99/bulan",
        "popular": false,
        "highlight": "5x improved performance, unlimited SSL, up to 50 websites, 50GB storage."
      },
      {
        "name": "Cloud Startup",
        "price": "$6.99/bulan",
        "popular": false,
        "highlight": "Cloud hosting dengan performa lebih tinggi."
      }
    ],
    "specs": [
      {
        "label": "VPS KVM 1",
        "value": "$19.49/bulan, 1 vCPU, 4GB RAM, 50GB storage"
      },
      {
        "label": "VPS KVM 2",
        "value": "$24.49/bulan, 2 vCPU, 8GB RAM, 100GB storage"
      },
      {
        "label": "VPS KVM 4",
        "value": "$42.99/bulan, 4 vCPU, 16GB RAM, 200GB storage"
      }
    ],
    "pros": [
      "Harga sangat terjangkau, mulai $2.99/bulan",
      "Unlimited data transfers pada shared dan cloud plans",
      "AI tools dan website builder"
    ],
    "cons": [
      "Tidak ada dedicated hosting",
      "Tidak ada dukungan telepon",
      "Shared hosting tidak semua plan support Windows"
    ],
    "bestFor": "Pemula, bisnis kecil, dan budget-conscious users yang butuh hosting murah dengan fitur lengkap.",
    "warning": "Harga promo berlaku untuk komitmen jangka panjang (1 tahun atau lebih). Perhatikan harga renewal yang lebih tinggi.",
    "tableData": {
      "bandwidth": "Unlimited (shared/cloud)",
      "autoDeploy": false,
      "suitableFor": "Budget hosting, WordPress, Small business"
    }
  },
  {
    "name": "IIS (Internet Information Services)",
    "company": "Microsoft",
    "type": "Web Server",
    "color": "#0078D4",
    "rating": "4.0",
    "freeAvailable": true,
    "startingPrice": "Gratis (dengan Windows Server)",
    "desc": "Web server dari Microsoft untuk Windows Server. Mendukung ASP.NET, ASP Classic, dan MSSQL. Biasa digunakan untuk enterprise applications di lingkungan Windows.",
    "plans": [
      {
        "name": "Included with Windows Server",
        "price": "Gratis",
        "popular": true,
        "highlight": "IIS included with Windows Server at no additional cost."
      }
    ],
    "specs": [
      {
        "label": "Windows Server Cost",
        "value": "$3,600 - $18,000/tahun"
      },
      {
        "label": "Equipment Rental",
        "value": "$60 - $180/tahun"
      }
    ],
    "pros": [
      "Gratis dengan Windows Server",
      "Integrasi sempurna dengan ekosistem Microsoft",
      "Cocok untuk enterprise ASP.NET applications"
    ],
    "cons": [
      "Lisensi Windows Server mahal",
      "Kurang populer dibanding Apache atau Nginx",
      "Ekosistem terbatas pada Windows"
    ],
    "bestFor": "Enterprise yang sudah menggunakan ekosistem Microsoft and membutuhkan hosting untuk ASP.NET, ASP Classic, atau MSSQL applications.",
    "warning": "IIS gratis, tetapi Windows Server tidak. Biaya lisensi Windows Server bisa mencapai $3,600-$18,000/tahun.",
    "tableData": {
      "bandwidth": "Tergantung server",
      "autoDeploy": false,
      "suitableFor": "Enterprise, .NET, Windows ecosystem"
    }
  },
  {
    "name": "Northflank",
    "company": "Northflank",
    "type": "PaaS",
    "color": "#2D3748",
    "rating": "4.4",
    "freeAvailable": true,
    "startingPrice": "Gratis / Pay-as-you-go",
    "desc": "Deployment platform untuk application services, databases, workers, cron jobs, dan preview environments. Mendukung managed cloud dan bring-your-own-cloud.",
    "plans": [
      {
        "name": "Sandbox (Free)",
        "price": "Gratis",
        "popular": false,
        "highlight": "Always-on compute, 2 free services, 1 free database, 2 free cron jobs."
      },
      {
        "name": "Pay-as-you-go",
        "price": "Pay-as-you-go",
        "popular": true,
        "highlight": "Compute $0.01667/vCPU/hour, memory $0.00833/GB/hour. 6+ cloud regions, 600 BYOC regions, CPU/GPU support."
      }
    ],
    "specs": [
      {
        "label": "Compute",
        "value": "$0.01667/vCPU/hour"
      },
      {
        "label": "Memory",
        "value": "$0.00833/GB/hour"
      },
      {
        "label": "Uptime",
        "value": "99.99% historical"
      },
      {
        "label": "Compliance",
        "value": "SOC 2 Type 2"
      }
    ],
    "pros": [
      "Bring-your-own-cloud (BYOC) tersedia self-serve",
      "CPU dan GPU support",
      "Uptime 99.99%",
      "SOC 2 Type 2 compliant"
    ],
    "cons": [
      "Model pricing usage-based, bisa sulit diprediksi"
    ],
    "bestFor": "Tim yang membutuhkan fleksibilitas managed cloud dan bring-your-own-cloud dalam satu platform, dengan dukungan CPU dan GPU.",
    "warning": "Northflank adalah platform berbayar dengan model consumption-based. Pantau usage untuk menghindari biaya tak terduga.",
    "tableData": {
      "bandwidth": "Tergantung usage",
      "autoDeploy": true,
      "suitableFor": "BYOC, GPU workloads, Production apps"
    }
  },
  {
    "name": "SST",
    "company": "SST",
    "type": "IaC",
    "color": "#E95420",
    "rating": "4.5",
    "freeAvailable": true,
    "startingPrice": "Gratis (open source)",
    "desc": "Framework Infrastructure-as-Code untuk deployment serverless di AWS. Memungkinkan developer membangun aplikasi full-stack dengan mudah menggunakan AWS CDK.",
    "plans": [
      {
        "name": "Open Source",
        "price": "Gratis",
        "popular": true,
        "highlight": "Framework open source, tidak ada biaya lisensi. Bayar hanya untuk infrastruktur AWS yang digunakan."
      }
    ],
    "specs": [
      {
        "label": "License",
        "value": "Open Source"
      },
      {
        "label": "Infrastructure",
        "value": "AWS (bayar sesuai usage)"
      }
    ],
    "pros": [
      "Open source dan gratis",
      "Memanfaatkan AWS CDK",
      "Cocok untuk full-stack serverless applications"
    ],
    "cons": [
      "Membutuhkan pengetahuan AWS",
      "Bergantung pada ekosistem AWS"
    ],
    "bestFor": "Developer yang membangun aplikasi serverless di AWS dan menginginkan kontrol penuh melalui Infrastructure-as-Code.",
    "warning": "SST adalah framework, bukan platform hosting. Anda tetap harus membayar infrastruktur AWS yang digunakan.",
    "tableData": {
      "bandwidth": "Tergantung AWS",
      "autoDeploy": true,
      "suitableFor": "AWS Serverless, Full-stack"
    }
  },
  {
    "name": "Stormkit",
    "company": "Stormkit",
    "type": "PaaS",
    "color": "#FF6B6B",
    "rating": "4.3",
    "freeAvailable": false,
    "startingPrice": "$15/bulan",
    "desc": "Platform deployment untuk Node.js and Python serverless dengan model flat-rate pricing. Open source alternative untuk Heroku, Vercel, dan Netlify.",
    "plans": [
      {
        "name": "Individual",
        "price": "$15/bulan",
        "popular": true,
        "highlight": "Flat rate untuk individu."
      },
      {
        "name": "Team",
        "price": "$49/bulan",
        "popular": false,
        "highlight": "Up to 5 team members."
      }
    ],
    "specs": [
      {
        "label": "Self-Hosted",
        "value": "Free seats, unlimited projects, domains, teams"
      }
    ],
    "pros": [
      "Predictable flat-rate pricing, no hidden fees",
      "Open source alternative",
      "Mengurangi biaya infrastruktur hingga 60%"
    ],
    "cons": [
      "Free trial discontinued (April 2025)",
      "Fokus utama pada Node.js and Python"
    ],
    "bestFor": "Tim yang mencari predictable pricing untuk Node.js and Python serverless deployments.",
    "warning": "Free trial sudah tidak tersedia sejak April 2025. Existing paid cloud subscriptions tetap berjalan.",
    "tableData": {
      "bandwidth": "Tergantung plan",
      "autoDeploy": true,
      "suitableFor": "Node.js, Python, Serverless"
    }
  },
  {
    "name": "Zerops",
    "company": "Zerops",
    "type": "PaaS",
    "color": "#00A3E0",
    "rating": "4.4",
    "freeAvailable": true,
    "startingPrice": "Gratis / $5/bulan",
    "desc": "Developer-first cloud platform dengan pricing model yang tidak menghalangi praktik development yang baik. No feature tiers, no seat fees, minute-based pricing.",
    "plans": [
      {
        "name": "Lightweight Core",
        "price": "Gratis",
        "popular": false,
        "highlight": "Development, testing, smaller workloads. 15 hours build time/month, 5GB backup storage, 100GB egress."
      },
      {
        "name": "Serious Core",
        "price": "$10/30 hari",
        "popular": true,
        "highlight": "Production workloads, high availability. 150 hours build time/month, 25GB backup storage, 3TB egress."
      }
    ],
    "specs": [
      {
        "label": "Shared CPU",
        "value": "$0.60 per CPU / 30 days"
      },
      {
        "label": "Dedicated CPU",
        "value": "$6.00 per CPU / 30 days"
      },
      {
        "label": "RAM",
        "value": "$0.75 per 0.25 GB / 30 days"
      },
      {
        "label": "Disk Space",
        "value": "$0.05 per 0.5 GB / 30 days"
      },
      {
        "label": "Extra Egress",
        "value": "$0.02 per GB"
      }
    ],
    "pros": [
      "No feature tiers, no seat fees",
      "Minute-based pricing + auto-scaling",
      "Daily spending control",
      "Transparan dan fair billing"
    ],
    "cons": [
      "Masih relatif baru (re-launch 2024)"
    ],
    "bestFor": "Developer yang menginginkan kontrol penuh atas biaya dengan pricing model yang transparan dan fair.",
    "warning": "Zerops menggunakan model consumption-based dengan billing per menit. Set daily spending limits untuk mengontrol biaya.",
    "tableData": {
      "bandwidth": "100GB (Free) / 3TB (Serious) / $0.02/GB overage",
      "autoDeploy": true,
      "suitableFor": "Developer-first, Production, Auto-scaling"
    }
  }
]

const filteredProviders = computed(() => {
  if (activeCategory.value === 'all') return providers
  return providers.filter(p => p.type === activeCategory.value)
})

const guideItems = [
  {
    icon: '🚀',
    scenario: 'Project Pertama / Belajar',
    desc: 'Pilih platform dengan free plan yang generous dan kemudahan setup. Tidak perlu kartu kredit, tidak ada sleep down, bisa langsung deploy dari GitHub.',
    recommendations: ['Vercel (Hobby)', 'Koyeb (Nano Free)', 'Zeabur (Free $5)'],
  },
  {
    icon: '⚡',
    scenario: 'Frontend / Next.js / React App',
    desc: 'Butuh integrasi framework yang sempurna, edge CDN global, dan preview per branch. Performa SSR dan ISR menjadi prioritas.',
    recommendations: ['Vercel', 'Netlify', 'Cloudflare Pages'],
  },
  {
    icon: '📱',
    scenario: 'Aplikasi Mobile Backend / BaaS',
    desc: 'Butuh auth, database realtime, storage, dan push notification dalam satu SDK. MVP mobile yang perlu cepat launch.',
    recommendations: ['Firebase (Blaze)', 'AWS Amplify'],
  },
  {
    icon: '🏗️',
    scenario: 'Full-stack App dengan Database',
    desc: 'Butuh web service, PostgreSQL, Redis, dan background worker dalam satu platform dengan harga predictable.',
    recommendations: ['Render', 'DigitalOcean App Platform', 'Zeabur'],
  },
  {
    icon: '🌐',
    scenario: 'API Global / Edge Functions',
    desc: 'Butuh API yang berjalan di edge dekat pengguna global dengan latensi minimal dan biaya bandwidth terkontrol.',
    recommendations: ['Cloudflare Workers', 'Vercel Edge', 'Koyeb'],
  },
  {
    icon: '🏢',
    scenario: 'Skala Enterprise / Production Besar',
    desc: 'Kebutuhan compliance (HIPAA, SOC2), SLA enterprise, dedicated support, dan infrastruktur yang terbukti di skala besar.',
    recommendations: ['AWS Amplify', 'Vercel Enterprise', 'Cloudflare Enterprise'],
  },
  {
    icon: '💰',
    scenario: 'Budget Ketat / Cost-efficient',
    desc: 'Prioritas utama adalah biaya minimum untuk resource setara. Kontrol penuh atas server tanpa markup platform.',
    recommendations: ['DigitalOcean', 'Cloudflare Pages', 'Koyeb'],
  },
  {
    icon: '🔧',
    scenario: 'Kontrol Penuh / Custom Stack',
    desc: 'Butuh akses root, custom Nginx config, Docker swarm, atau setup yang tidak mungkin di PaaS standar.',
    recommendations: ['DigitalOcean Droplet'],
  },
]

const glossary = [
  {
    word: 'Edge Computing',
    def: 'Menjalankan kode di server yang berlokasi dekat dengan pengguna akhir (bukan di satu data center terpusat), mengurangi latency hingga milidetik.',
  },
  {
    word: 'Serverless',
    def: 'Model deployment di mana developer tidak mengelola server. Platform otomatis menjalankan fungsi saat ada request dan berhenti saat selesai. Bayar per eksekusi, bukan per waktu aktif server.',
  },
  {
    word: 'CDN (Content Delivery Network)',
    def: 'Jaringan server global yang menyimpan salinan konten statis (gambar, CSS, JS) di dekat pengguna, sehingga aset dimuat lebih cepat.',
  },
  {
    word: 'CI/CD',
    def: 'Continuous Integration / Continuous Deployment. Proses otomatis yang mendeteksi perubahan kode di Git, menjalankan build, dan mendeploy ke server secara otomatis.',
  },
  {
    word: 'PaaS (Platform as a Service)',
    def: 'Platform yang menyediakan lingkungan untuk deploy, run, dan manage aplikasi tanpa perlu mengelola infrastruktur server secara langsung.',
  },
  {
    word: 'VPS (Virtual Private Server)',
    def: 'Server virtual yang memiliki resource dedicated (CPU, RAM, storage) dan akses root penuh. Lebih fleksibel dari shared hosting, lebih murah dari dedicated server.',
  },
  {
    word: 'Cold Start',
    def: 'Waktu delay yang terjadi ketika serverless function atau service yang sedang "tidur" (idle/spin-down) perlu diaktifkan kembali untuk melayani request.',
  },
  {
    word: 'Bandwidth Overage',
    def: 'Biaya tambahan yang dikenakan ketika penggunaan transfer data melebihi kuota yang termasuk dalam plan. Bisa sangat signifikan di platform seperti Netlify.',
  },
  {
    word: 'Spin-down / Sleep Policy',
    def: 'Kebijakan platform untuk mematikan service yang tidak aktif setelah periode tertentu (misalnya Render Free: 15 menit idle). Akan ada cold start saat diaktifkan kembali.',
  },
  {
    word: 'ISR (Incremental Static Regeneration)',
    def: 'Fitur Next.js yang memungkinkan halaman statis diperbarui secara incremental di background tanpa rebuild penuh. Di Vercel, ISR reads/writes dihitung sebagai biaya terpisah.',
  },
  {
    word: 'WAF (Web Application Firewall)',
    def: 'Lapisan keamanan yang memfilter dan memantau lalu lintas HTTP/HTTPS ke aplikasi web, melindungi dari serangan umum seperti SQL injection dan XSS.',
  },
  {
    word: 'Read Amplification',
    def: 'Fenomena di database seperti Firestore di mana satu aksi pengguna memicu puluhan atau ratusan operasi read, membengkakkan tagihan secara signifikan. Sering terjadi pada fitur AI yang memproses dokumen berulang.',
  },
]
</script>

