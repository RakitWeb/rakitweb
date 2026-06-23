<script setup lang="ts">
useSeoMeta({
  title: 'Tim Kami - RakitWeb',
  description: 'Kenali tim di balik RakitWeb — developer, designer, dan engineer yang membangun solusi digital terbaik untuk bisnis Anda.',
  ogTitle: 'Tim Kami - RakitWeb',
  ogDescription: 'Kenali tim di balik RakitWeb — developer, designer, dan engineer yang membangun solusi digital terbaik untuk bisnis Anda.',
  ogImage: '/rakitweb.jpeg'
})

const team = [
  {
    name: 'Kin You (davingm)',
    role: 'Backend Enginner',
    experience: 'Never Say Never',
    avatar: 'https://avatars.githubusercontent.com/u/228851591?v=4',
    fallbackAvatar: 'https://ui-avatars.com/api/?name=Rakit+Dev&background=3b82f6&color=fff&size=200&bold=true',
    bio: 'Nuxter & Vue Enthusiast. Pengembang aplikasi web yang percaya bahwa development seharusnya intuitif dan menyenangkan.',
    stacks: [
      { name: 'TypeScript', skill: 'ts' },
      { name: 'nestjs', skill: 'nestjs' },
      { name: 'Nuxt.js', skill: 'nuxt' },
      
    ]
  },
  {
    name: 'Chandra',
    role: 'Founder of RakitWeb',
    experience: '',
    avatar: '/blog/kucing.jpeg',
    fallbackAvatar: 'https://ui-avatars.com/api/?name=Web+Engineer&background=10b981&color=fff&size=200&bold=true',
    bio: 'Mengembangkan sistem backend dan frontend dengan fokus pada performa, stabilitas, dan pengalaman pengguna yang optimal.',
    stacks: [
      { name: 'JavaScript', skill: 'js' },
      { name: 'NestJS', skill: 'nestjs' },
      { name: 'TypeScript', skill: 'ts' },
      { name: 'nodejs', skill: 'nodejs' },
      { name: 'django', skill: 'django' }
    ]
  },
  {
    name: 'Akbar',
    role: 'Co-Founder of RakitWeb',
    experience: '',
    avatar: '/team/akbar.png',
    fallbackAvatar: 'https://ui-avatars.com/api/?name=Backend+Dev&background=8b5cf6&color=fff&size=200&bold=true',
    bio: 'Merancang arsitektur backend yang scalable dan reliable. Ahli dalam deployment dan optimasi server.',
    stacks: [
      { name: 'TypeScript', skill: 'ts' },
      { name: 'nodejs', skill: 'nodejs' },
      { name: 'python', skill: 'python' },
      { name: 'nextjs', skill: 'nextjs' },
    ]
  },
  {
    name: 'Silo Kusuma',
    role: 'Frontend Developer',
    experience: '',
    avatar: '/team/elaina.jpg',
    fallbackAvatar: 'https://ui-avatars.com/api/?name=Backend+Dev&background=8b5cf6&color=fff&size=200&bold=true',
    bio: 'Merancang arsitektur backend yang scalable dan reliable. Ahli dalam deployment dan optimasi server.',
    stacks: [
      { name: 'react', skill: 'react' },
      { name: 'Next.js', skill: 'nextjs' },
      { name: 'java', skill: 'java' },
      { name: 'TypeScript', skill: 'ts' },
      { name: 'Kotlin', skill: 'kotlin' }
    ]
  },
{
  name: 'Rifzan',
  role: 'Frontend Developer',
  experience: '2+ tahun pengalaman',
  avatar: '/team/rifzan.png',
  fallbackAvatar: 'https://ui-avatars.com/api/?name=Rizal&background=ef4444&color=fff&size=200&bold=true',
  bio: 'Frontend Engineer | ☕️ & Code | Mengubah desain kompleks menjadi kode yang bersih dan terstruktur. Memiliki minat mendalam pada performa web, desain responsif, dan modernisasi framework seperti React.',
  stacks: [
    { name: 'astro', skill: 'astro' },
    { name: 'react', skill: 'react' },
    { name: 'svelte', skill: 'svelte' },
    { name: 'nextjs', skill: 'nextjs' },
    { name: 'tailwind', skill: 'tailwind' },

  ]
}
]

const allStacks = [
  { name: 'TypeScript', skill: 'ts' },
  { name: 'JavaScript', skill: 'js' },
  { name: 'PHP', skill: 'php' },
  { name: 'Laravel', skill: 'laravel' },
  { name: 'Angular', skill: 'angular' },
  { name: 'Nuxt.js', skill: 'nuxt' },
  { name: 'Next.js', skill: 'nextjs' },
  { name: 'NestJS', skill: 'nestjs' },
  { name: 'Java', skill: 'java' },
  { name: 'Spring', skill: 'spring' },
  { name: 'Flutter', skill: 'flutter' },
  { name: 'React Native', skill: 'react' },
  { name: 'ASP.NET', skill: 'dotnet' },
  { name: 'Python', skill: 'python' }
]

const imgErrors = ref<Record<number, boolean>>({})
const onImgError = (idx: number) => { imgErrors.value[idx] = true }
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#09090b]">

    <!-- HERO -->
    <section class="pt-32 pb-20 px-6">
      <UContainer>
        <div class="max-w-2xl">
          <p class="text-xs font-mono font-bold uppercase tracking-[0.3em] text-primary-500 mb-6">Tim Kami</p>
          <h1 class="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-6">
            Orang-orang di<br />balik RakitWeb.
          </h1>
          <p class="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
            Kami adalah tim kecil yang bergerak cepat — developer, engineer, dan builder yang fokus membangun produk digital berkualitas tinggi.
          </p>
        </div>
      </UContainer>
    </section>

    <!-- DIVIDER -->
    <div class="border-t border-gray-100 dark:border-white/5" />

    <!-- TEAM GRID -->
    <section class="py-20 px-6">
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden">
          <div
            v-for="(member, idx) in team"
            :key="member.name"
            class="bg-white dark:bg-[#09090b] p-8 flex flex-col gap-6 hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors duration-300"
          >
            <!-- Avatar + Info -->
            <div class="flex items-start gap-4">
              <div class="relative shrink-0">
                <img
                  :src="imgErrors[idx] ? member.fallbackAvatar : member.avatar"
                  :alt="member.name"
                  class="w-14 h-14 rounded-2xl object-cover bg-gray-100 dark:bg-white/5"
                  @error="onImgError(idx)"
                />
                <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-primary-500 rounded-full border-2 border-white dark:border-[#09090b]" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-bold text-gray-900 dark:text-white truncate">{{ member.name }}</h3>
                <p class="text-xs text-primary-500 font-semibold mt-0.5">{{ member.role }}</p>
                <p class="text-[10px] font-mono text-gray-400 uppercase tracking-wider mt-1">{{ member.experience }}</p>
              </div>
            </div>

            <!-- Bio -->
            <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {{ member.bio }}
            </p>

            <!-- Divider -->
            <div class="border-t border-gray-100 dark:border-white/5" />

            <!-- Stack -->
            <div class="space-y-3">
              <p class="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Tech Stack</p>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="stack in member.stacks"
                  :key="stack.name"
                  class="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200 cursor-default"
                  :title="stack.name"
                >
                  <img :src="`https://skillicons.dev/icons?i=${stack.skill}`" :alt="stack.name" class="w-3.5 h-3.5 shrink-0" />
                  <span class="text-[10px] font-semibold text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{{ stack.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- DIVIDER -->
    <div class="border-t border-gray-100 dark:border-white/5" />

    <!-- ALL STACKS SECTION -->
    <section class="py-20 px-6">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p class="text-xs font-mono font-bold uppercase tracking-[0.3em] text-primary-500 mb-3">Teknologi</p>
              <h2 class="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                Stack yang kami kuasai.
              </h2>
            </div>
            <p class="text-xs text-gray-400 max-w-xs leading-relaxed">
              Dari frontend hingga backend, mobile hingga cloud — kami memilih teknologi yang tepat untuk setiap kebutuhan.
            </p>
          </div>

          <div class="grid grid-cols-4 sm:grid-cols-7 gap-3">
            <div
              v-for="stack in allStacks"
              :key="stack.name"
              class="group flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/15 hover:bg-white dark:hover:bg-white/[0.06] transition-all duration-200 cursor-default"
              :title="stack.name"
            >
              <img :src="`https://skillicons.dev/icons?i=${stack.skill}`" :alt="stack.name" class="w-6 h-6 shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span class="text-[9px] font-semibold text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors text-center leading-tight">{{ stack.name }}</span>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- CTA -->
    <section class="py-20 px-6 border-t border-gray-100 dark:border-white/5">
      <UContainer>
        <div class="max-w-xl">
          <h2 class="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
            Tertarik bekerja sama?
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Kami selalu terbuka untuk proyek baru dan kolaborasi menarik. Hubungi kami dan ceritakan kebutuhan Anda.
          </p>
          <div class="flex items-center gap-4">
            <NuxtLink
              to="https://wa.me/6283160325595"
              target="_blank"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              <UIcon name="i-simple-icons-whatsapp" class="w-4 h-4" />
              Hubungi Kami
            </NuxtLink>
            <NuxtLink
              to="/pricing"
              class="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-xl hover:border-gray-400 dark:hover:border-white/30 transition-colors"
            >
              Lihat Harga
              <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </section>

  </div>
</template>
