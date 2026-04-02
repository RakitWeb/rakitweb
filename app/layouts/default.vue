<template>
  <div class="min-h-screen bg-white dark:bg-[#020618] selection:bg-primary/30 flex flex-col items-center">
    <!-- Main Content Frame -->
    <div class="w-full max-w-7xl mx-auto border-x border-gray-200 dark:border-white/10 flex flex-col flex-grow min-h-screen relative">
      <AppHeader />

      <UMain class="flex-grow">
        <slot />
      </UMain>

      <AppFooter class="border-t border-gray-200 dark:border-white/10" />
    </div>
  </div>
</template>

<style scoped>
/* Ensure smooth vertical scrolling and consistent aesthetic */
:deep(body) {
  scroll-behavior: smooth;
}
</style>
