<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref } from 'vue'

const props = defineProps<{
  files: any[]
  navigation: any[]
  links: any[]
}>()

const isOpen = defineModel<boolean>('open', { default: false })
const query = ref('')

// Manual Global Shortut (100% Reliable across all browsers)
const handleShortcut = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    isOpen.value = !isOpen.value
  }
  if (e.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleShortcut)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleShortcut)
})

// Transform Search Sections (Content)
const contentItems = computed(() => {
  return (props.files || []).map(file => ({
    id: file.id,
    label: file.title || 'Halaman',
    description: file.titles?.join(' > ') || 'Dokumentasi',
    icon: 'i-lucide-hash',
    to: file.id.split('#')[0] // Navigate to page
  }))
})

// Transform Navigation into searchable items
const navItems = computed(() => {
  const flatten = (items: any[]): any[] => {
    return items.reduce((acc, item) => {
      acc.push({
        id: item.path,
        label: item.title,
        description: item.description || 'Lihat dokumentasi',
        icon: 'i-lucide-file-text',
        to: item.path
      })
      if (item.children) acc.push(...flatten(item.children))
      return acc
    }, [])
  }
  return flatten(props.navigation || [])
})

// Transform Quick Links
const quickLinks = computed(() => (props.links || []).map(link => ({
  ...link,
  id: link.to,
  description: 'Akses Cepat'
})))

// Groups for Command Palette (Only Visible when Searching)
const groups = computed(() => {
  if (!query.value.trim()) return []

  // Combine everything: Search Sections, Navs, and Quick Links
  const allItems = [
    ...quickLinks.value, 
    ...navItems.value,
    ...contentItems.value
  ]
  
  // Case-insensitive filtering
  const q = query.value.toLowerCase()
  const filtered = allItems
    .filter(item => 
      item.label.toLowerCase().includes(q) || 
      item.description?.toLowerCase().includes(q)
    )
    .slice(0, 4) // Stick to the 4-item limit

  return [
    {
      id: 'results',
      label: `Hasil Pencarian untuk "${query.value}"`,
      items: filtered
    }
  ]
})

const onSelect = (item: any) => {
  if (item && item.to) {
    navigateTo(item.to)
    isOpen.value = false
    query.value = ''
  }
}
</script>

<template>
  <Teleport to="body">
    <!-- Manual Modal Portal (Bypasses any UModal issues) -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-[1000] flex items-start justify-center pt-0 sm:pt-[12vh] px-0 sm:px-6"
    >
      <!-- Backdrop Overlay (Visible only on desktop) -->
      <div 
        class="hidden sm:block fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        @click="isOpen = false" 
      />

      <!-- Search Content Container -->
      <div 
        class="relative w-full h-full sm:h-auto sm:max-w-2xl bg-white dark:bg-[#020617] ring-0 sm:ring-1 ring-white/10 shadow-2xl rounded-none sm:rounded-2xl overflow-hidden border-none sm:border border-border/10 flex flex-col"
      >
        <!-- Mobile Header (Visible only on mobile) -->
        <div class="sm:hidden flex items-center justify-between px-4 h-14 border-b border-border/40">
           <span class="text-sm font-bold text-foreground">Search Assalaam</span>
           <button 
             class="p-2 -mr-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
             @click="isOpen = false"
           >
             <UIcon name="i-lucide-x" class="w-5 h-5 text-muted-foreground" />
           </button>
        </div>

        <UCommandPalette
          v-model:query="query"
          :groups="groups"
          :autofocus="true"
          placeholder="Ketik untuk mencari..."
          class="border-none w-full grow overflow-y-auto"
          :ui="{
            input: 'h-14 sm:h-14 px-6 border-b border-border/40 sm:border-b bg-transparent text-base font-medium placeholder:text-muted-foreground/30',
            item: 'px-4 py-3 sm:px-4 rounded-none sm:rounded-xl transition-all duration-200 cursor-pointer data-[active=true]:bg-primary/10 data-[active=true]:ring-0 sm:data-[active=true]:ring-1 data-[active=true]:ring-primary/20 hover:bg-gray-100 dark:hover:bg-white/5',
            itemLabel: 'text-[13px] font-bold text-foreground data-[active=true]:text-primary',
            itemLabelSuffix: 'text-[11px] text-muted-foreground/50 ml-2 font-medium',
            itemLeadingIcon: 'w-5 h-5 opacity-40 text-primary'
          }"
          @update:model-value="onSelect"
        >
          <template #empty-state>
            <div class="flex flex-col items-center justify-center py-20 text-center px-6">
              <div class="w-16 h-16 rounded-3xl bg-secondary/10 flex items-center justify-center mb-6 ring-1 ring-secondary/20">
                <UIcon :name="query ? 'i-lucide-search-x' : 'i-lucide-search'" class="w-8 h-8 text-secondary/60" />
              </div>
              <p v-if="!query" class="text-sm font-semibold text-foreground mb-1">Cari Informasi Assalaam...</p>
              <p v-else class="text-sm font-semibold text-foreground mb-1">Tidak ada hasil ditemukan</p>
              <p class="text-xs text-muted-foreground max-w-[240px]">
                {{ query ? 'Gunakan kata kunci lain atau periksa ejaan.' : 'Cari jurusan, berita, atau informasi pendaftaran.' }}
              </p>
            </div>
          </template>
        </UCommandPalette>

        <!-- Serious Footer -->
        <div class="hidden sm:flex items-center justify-between px-6 py-4 border-t border-border/40 bg-gray-50/30 dark:bg-white/[0.02] shrink-0">
          <div class="flex items-center gap-5">
             <div class="flex items-center gap-2">
               <span class="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground/60">Search by</span>
               <div class="flex items-center gap-1">
                 <UIcon name="i-simple-icons-algolia" class="w-5 h-5 text-[#5468ff]" />
                 <span class="text-[14px] font-extrabold text-[#5468ff] tracking-tighter">algolia</span>
               </div>
             </div>
          </div>

          <div class="flex items-center gap-4 opacity-60">
             <div class="flex items-center gap-1.5 px-2 py-1 rounded bg-muted/40 translate-y-px">
               <UKbd value="enter" size="sm" class="bg-transparent border-none shadow-none text-[9px] font-mono leading-none" />
               <span class="text-[10px] font-bold uppercase tracking-widest translate-y-[0.5px]">Select</span>
             </div>
             <div class="flex items-center gap-1.5 px-2 py-1 rounded bg-muted/40 translate-y-px">
               <UKbd value="esc" size="sm" class="bg-transparent border-none shadow-none text-[9px] font-mono leading-none" />
               <span class="text-[10px] font-bold uppercase tracking-widest translate-y-[0.5px]">Close</span>
             </div>
          </div>
        </div>

        <!-- Mobile Brand (Visible only on mobile) -->
        <div class="sm:hidden flex items-center justify-center py-5 border-t border-border/10">
           <div class="flex items-center gap-2">
              <span class="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground/60">Search by</span>
              <div class="flex items-center gap-1">
                <UIcon name="i-simple-icons-algolia" class="w-5 h-5 text-[#5468ff]" />
                <span class="text-[14px] font-extrabold text-[#5468ff] tracking-tighter">algolia</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
