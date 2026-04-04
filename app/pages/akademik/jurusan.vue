<script setup lang="ts">
const route = useRoute()
const title = route.path.split('/').pop()?.replace(/-/g, ' ').toUpperCase() || 'Halaman'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-white dark:bg-[#020618] text-gray-900 dark:text-white">
    <UContainer class="text-center">
      <h1 class="text-4xl font-bold mb-4 tracking-tight drop-shadow-sm">{{ title }}</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
        Halaman ini sedang dalam pemeliharaan dan akan segera kembali dengan desain yang lebih modern.
      </p>
      <UButton to="/" color="primary" variant="solid" size="lg" icon="i-lucide-arrow-left">
        Kembali ke Beranda
      </UButton>
    </UContainer>
  </div>
</template>
