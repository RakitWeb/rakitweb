<template>
  <div class="min-h-screen bg-white dark:bg-[#09090b] selection:bg-primary/30 flex justify-center w-full relative overflow-x-hidden">
    <div class="flex justify-center w-full min-h-screen">
      <!-- Left Side Column (Fixed Width & Striped Pattern) -->
      <div class="hidden xl:block w-16 xl:w-24 border-l border-zinc-200/80 dark:border-zinc-800/80 bg-side-pattern shrink-0 pointer-events-none" />

      <!-- Main Content Frame -->
      <div class="w-full max-w-7xl shrink-0 flex flex-col min-h-screen relative bg-white dark:bg-[#09090b] border-x border-zinc-200/80 dark:border-zinc-800">
        <AppHeader />

        <UMain class="flex-grow">
          <slot />
        </UMain>

        <AppFooter class="border-t border-zinc-200/80 dark:border-zinc-800" />
      </div>

      <!-- Right Side Column (Fixed Width & Striped Pattern) -->
      <div class="hidden xl:block w-16 xl:w-24 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-side-pattern shrink-0 pointer-events-none" />
    </div>
  </div>
</template>

<style scoped>
/* Ensure smooth vertical scrolling and consistent aesthetic */
:deep(body) {
  scroll-behavior: smooth;
}

.bg-side-pattern {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(161, 161, 170, 0.12),
    rgba(161, 161, 170, 0.12) 1px,
    transparent 1px,
    transparent 10px
  );
}

:deep(.dark) .bg-side-pattern,
.dark .bg-side-pattern {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.05) 1px,
    transparent 1px,
    transparent 10px
  );
}
</style>
