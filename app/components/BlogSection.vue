<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const sectionRef = ref<HTMLElement | null>(null)

const { data: posts } = await useAsyncData('latest-posts', () => 
  queryCollection('posts')
    .order('date', 'DESC')
    .limit(3)
    .all()
)

onMounted(async () => {
  await nextTick()
  if (!sectionRef.value) return

  const ctx = gsap.context(() => {
    gsap.from(".blog-reveal", {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    })
  }, sectionRef.value)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <section 
    ref="sectionRef"
    class="relative py-24 bg-white dark:bg-black border-t border-gray-100 dark:border-white/5 transition-colors duration-500"
  >
    <!-- corner marks top -->
    <span class="hidden md:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black z-10" />
    <span class="hidden md:block absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black z-10" />
    <UContainer>
      <!-- Header Section: Minimalist Monolith style -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
        <div class="blog-reveal space-y-2">
          <h3 class="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Artikel Dan Berita
          </h3>
        </div>
        
        <div class="blog-reveal">
          <UButton
            to="/blog"
            color="neutral"
            variant="ghost"
            trailing-icon="i-lucide-arrow-up-right"
            class="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-0 hover:bg-transparent"
          >
            All posts
          </UButton>
        </div>
      </div>

      <!-- Posts Grid: Flat & Clean -->
      <div class="hidden md:grid md:grid-cols-3 md:gap-6">
        <div 
          v-for="(post, index) in posts" 
          :key="index"
          class="blog-reveal group flex flex-col"
        >
          <NuxtLink :to="post.path" class="flex flex-col h-full space-y-4">
            <div class="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 dark:bg-white/[0.03]">
              <img 
                v-if="post.image"
                :src="post.image.src" 
                :alt="post.title"
                class="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
              />
            </div>

            <div class="flex flex-col flex-grow space-y-2">
              <div class="flex items-center gap-2 text-[11px] font-mono text-gray-400 dark:text-gray-500">
                <time :datetime="post.date">
                  {{ new Date(post.date ?? '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
                </time>
                <span v-if="post.badge">/</span>
                <span v-if="post.badge" class="text-gray-600 dark:text-gray-300">
                  {{ post.badge.label }}
                </span>
              </div>
              
              <h4 class="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors line-clamp-2 leading-snug">
                {{ post.title }}
              </h4>
              
              <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed font-normal pt-0.5">
                {{ post.description }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="md:hidden">
        <div class="-mx-2 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            v-for="(post, index) in posts"
            :key="index"
            class="blog-reveal group min-w-[78%] max-w-[78%] shrink-0 snap-start"
          >
            <NuxtLink :to="post.path" class="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
              <div class="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 dark:bg-white/[0.03]">
                <img
                  v-if="post.image"
                  :src="post.image.src"
                  :alt="post.title"
                  class="absolute inset-0 h-full w-full object-cover grayscale-[20%] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>

              <div class="mt-3 flex flex-col space-y-2">
                <div class="flex items-center gap-2 text-[10px] font-mono text-gray-400 dark:text-gray-500">
                  <time :datetime="post.date">
                    {{ new Date(post.date ?? '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
                  </time>
                  <span v-if="post.badge">/</span>
                  <span v-if="post.badge" class="text-gray-600 dark:text-gray-300">
                    {{ post.badge.label }}
                  </span>
                </div>

                <h4 class="text-sm font-medium leading-snug text-gray-900 dark:text-gray-100 line-clamp-2">
                  {{ post.title }}
                </h4>

                <p class="text-xs leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2">
                  {{ post.description }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
section {
  font-feature-settings: "cv11", "ss01", "cv01";
}
</style>