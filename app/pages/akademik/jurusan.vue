<script setup lang="ts">
const route = useRoute()
const title = route.path.split('/').pop()?.replace(/-/g, ' ').toUpperCase() || 'Halaman'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-950 text-white">
    <UContainer class="text-center">
      <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
      <p class="text-slate-400 mb-8">Halaman ini sedang dalam pengembangan.</p>
      <UButton to="/" color="primary" variant="solid">Kembali ke Beranda</UButton>
    </UContainer>
  </div>
</template>
