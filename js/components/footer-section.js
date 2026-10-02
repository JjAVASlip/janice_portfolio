// Footer Section Component - Dynamic from Store Data with Admin Link
const FooterSection = {
  name: 'FooterSection',
  template: `
    <footer class="bg-bgPrimary border-t border-white/10 pt-16 pb-12 overflow-hidden relative">
      <!-- Ambient Glow -->
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-32 bg-radial-gradient from-royalPurple/10 to-transparent blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          <!-- Left Brand Column -->
          <div class="md:col-span-6 space-y-4">
            <a 
              href="#home" 
              @click.prevent="scrollTo('home')"
              class="inline-flex items-center gap-1 text-2xl font-sora font-bold text-primaryText"
            >
              <span>{{ profile.name || 'JANICE MAS BULANON' }}</span>
              <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>
            </a>

            <div class="space-y-1 text-xs font-mono text-secondaryText">
              <p class="text-softGold">{{ profile.educationLevel.toUpperCase() }} {{ profile.degree.toUpperCase() }}</p>
              <p>{{ profile.college.toUpperCase() }} ({{ profile.collegeShort }})</p>
              <p class="text-mutedText">Specializing in Systems Analysis, Workflow Organization & QA</p>
            </div>
          </div>

          <!-- Right Quick Nav Links -->
          <div class="md:col-span-6 flex flex-col md:items-end justify-between">
            <div class="flex flex-wrap gap-x-6 gap-y-3">
              <a 
                v-for="link in navLinks" 
                :key="link.id"
                :href="'#' + link.id"
                @click.prevent="scrollTo(link.id)"
                class="text-xs font-sora text-secondaryText hover:text-gold uppercase tracking-wider transition-colors"
              >
                {{ link.label }}
              </a>
            </div>

            <!-- Actions Row -->
            <div class="mt-6 flex items-center gap-6">
              <button 
                @click="scrollTo('home')"
                class="inline-flex items-center gap-2 text-xs font-mono text-mutedText hover:text-softGold transition-colors"
              >
                <span>BACK TO TOP</span>
                <span class="text-gold">↑</span>
              </button>
            </div>
          </div>


        </div>

        <!-- Bottom Copyright & Academic Disclaimer -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-mutedText">
          <p>© 2026 {{ profile.name }}. All rights reserved.</p>
          <p class="text-[11px] text-mutedText/70">
            Crafted for BSIT Academic Showcase & Systems Analysis Exploration
          </p>
        </div>

      </div>
    </footer>
  `,
  setup() {
    const { computed } = Vue;

    const profile = computed(() => window.store.portfolioData.profile);
    const navLinks = window.navigationConfig.links;

    const scrollTo = (id) => {
      window.store.scrollTo(id);
    };

    const openAdmin = () => {
      window.store.toggleView('admin');
    };

    return {
      profile,
      navLinks,
      scrollTo,
      openAdmin
    };
  }
};

window.FooterSection = FooterSection;
