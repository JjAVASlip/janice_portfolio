// Visual Lab Component - Dynamic from Store Data
const VisualLab = {
  name: 'VisualLab',
  template: `
    <section 
      id="visual-lab" 
      class="relative py-24 md:py-32 bg-bgSecondary overflow-hidden border-t border-white/5"
    >
      <!-- Background Ambient Glow -->
      <div class="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-royalPurple/10 blur-[150px] pointer-events-none"></div>
      <div class="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full bg-electricBlue/10 blur-[140px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <span class="font-mono text-xs text-gold tracking-widest uppercase">04 / VISUAL LAB</span>
              <span class="w-12 h-[1px] bg-gold/40"></span>
              <span class="text-[11px] font-sora tracking-widest text-secondaryText uppercase">SYSTEM ARTIFACTS & DESIGN</span>
            </div>

            <h2 class="text-3xl md:text-5xl lg:text-6xl font-sora font-extrabold tracking-tight text-primaryText leading-tight">
              THINGS I'VE DESIGNED, <br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-softGold to-gold">
                PLANNED, AND EXPLORED.
              </span>
            </h2>

            <p class="text-secondaryText text-sm md:text-base leading-relaxed max-w-xl font-inter font-light">
              Explorations beyond finished code: from Figma design systems and user journey wireframes to ERD data models, DFD flows, and QA testing matrices.
            </p>
          </div>

          <!-- Category Filter Tabs -->
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="cat in categories" 
              :key="cat"
              @click="activeCategory = cat"
              class="px-4 py-2 rounded-full text-xs font-mono transition-all duration-300"
              :class="[
                activeCategory === cat 
                  ? 'bg-gold text-bgPrimary font-bold shadow-glow-gold' 
                  : 'bg-bgPrimary/60 border border-white/10 text-secondaryText hover:text-primaryText hover:border-white/25'
              ]"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Editorial Masonry / Dynamic Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div 
            v-for="(item, idx) in filteredItems" 
            :key="item.id"
            class="group relative rounded-2xl bg-bgPrimary/80 border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-gold/50 hover:shadow-2xl hover:-translate-y-1.5"
            @click="openLightbox(item)"
            @mouseenter="onHover('view', 'VIEW')"
            @mouseleave="onLeave"
          >
            <!-- Visual Media Container -->
            <div class="relative overflow-hidden aspect-[4/3] bg-deepNavy">
              <img 
                :src="item.image" 
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out filter contrast-[1.03]"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
              />

              <!-- Fallback Media Card -->
              <div class="hidden w-full h-full flex-col justify-between p-6 bg-gradient-to-br from-[#0B1530] via-[#060810] to-[#2A164D] relative">
                <div class="flex justify-between items-center">
                  <span class="text-[10px] font-mono text-gold tracking-widest uppercase">{{ item.tag }}</span>
                  <span class="text-[10px] font-mono text-secondaryText">{{ item.type }}</span>
                </div>
                <div class="text-center my-auto space-y-2">
                  <div class="w-12 h-12 mx-auto rounded-xl bg-electricBlue/20 border border-gold/40 flex items-center justify-center">
                    <span class="text-lg text-softGold">📐</span>
                  </div>
                  <h4 class="text-sm font-sora font-semibold text-primaryText">{{ item.title }}</h4>
                </div>
                <div class="text-[9px] font-mono text-mutedText text-center">
                  {{ item.image }}
                </div>
              </div>

              <!-- Subtle Gradient Sweep -->
              <div class="absolute inset-0 bg-gradient-to-t from-bgPrimary via-transparent to-transparent opacity-60"></div>
              <div class="absolute inset-0 bg-gradient-to-tr from-electricBlue/10 to-royalPurple/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <!-- Hover Gold Line at Bottom of Frame -->
              <div class="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <!-- Content Card Details -->
            <div class="p-5 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono tracking-widest text-gold uppercase">
                  {{ item.category }}
                </span>
                <span class="text-[10px] font-mono text-mutedText">
                  {{ item.tools }}
                </span>
              </div>

              <h3 class="text-base font-sora font-semibold text-primaryText group-hover:text-softGold transition-colors">
                {{ item.title }}
              </h3>

              <p class="text-xs text-secondaryText leading-relaxed font-inter line-clamp-2">
                {{ item.description }}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
  setup() {
    const { ref, computed } = Vue;

    const categories = ['ALL', 'SYSTEMS & FLOWS', 'UI/UX & FIGMA', 'QA & TESTING'];
    const activeCategory = ref('ALL');

    const visualItems = computed(() => window.store.portfolioData.visuals || []);

    const filteredItems = computed(() => {
      if (activeCategory.value === 'ALL') return visualItems.value;
      return visualItems.value.filter(item => item.category === activeCategory.value);
    });

    const openLightbox = (item) => {
      window.store.openLightbox(item);
    };

    const onHover = (type, label) => {
      window.store.setCursor(type, label);
    };

    const onLeave = () => {
      window.store.resetCursor();
    };

    return {
      categories,
      activeCategory,
      filteredItems,
      openLightbox,
      onHover,
      onLeave
    };
  }
};

window.VisualLab = VisualLab;
