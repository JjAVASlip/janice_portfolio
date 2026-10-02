// Skills Section Component - Dynamic from Store Data
const SkillsSection = {
  name: 'SkillsSection',
  template: `
    <section 
      id="skills" 
      class="relative py-24 md:py-32 bg-bgPrimary overflow-hidden border-t border-white/5"
    >
      <!-- Background Glows -->
      <div class="absolute top-1/4 right-1/3 w-[450px] h-[450px] rounded-full bg-royalPurple/10 blur-[140px] pointer-events-none"></div>
      <div class="absolute bottom-10 left-1/3 w-[450px] h-[450px] rounded-full bg-electricBlue/10 blur-[140px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <span class="font-mono text-xs text-gold tracking-widest uppercase">05 / SKILLS</span>
              <span class="w-12 h-[1px] bg-gold/40"></span>
              <span class="text-[11px] font-sora tracking-widest text-secondaryText uppercase">DEVELOPING COMPETENCIES</span>
            </div>

            <h2 class="text-3xl md:text-5xl lg:text-6xl font-sora font-extrabold tracking-tight text-primaryText leading-tight">
              WHAT I'M <br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue via-royalPurple to-softGold">
                DEVELOPING.
              </span>
            </h2>

            <p class="text-secondaryText text-sm md:text-base leading-relaxed max-w-xl font-inter font-light">
              An honest representation of skills I apply in academic coursework and self-directed IT exploration—grounded in systems planning, quality assurance, interface structuring, and web tools.
            </p>
          </div>

          <!-- Proficiency Legend Indicator -->
          <div class="p-4 rounded-xl bg-bgSecondary/80 border border-white/10 flex flex-wrap items-center gap-4 text-[11px] font-mono">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="text-secondaryText">FAMILIAR</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-electricBlue"></span>
              <span class="text-secondaryText">LEARNING</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-gold"></span>
              <span class="text-secondaryText">EXPLORING</span>
            </div>
          </div>
        </div>

        <!-- Skill Domain Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div 
            v-for="(group, idx) in skillGroups" 
            :key="group.id || group.title"
            class="group relative p-7 rounded-2xl bg-bgSecondary/90 border border-white/10 flex flex-col justify-between transition-all duration-500 hover:border-gold/40 hover:shadow-2xl hover:-translate-y-1"
          >
            <!-- Top Card Header -->
            <div class="space-y-4 mb-6">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-gold">{{ String(idx + 1).padStart(2, '0') }}</span>
                <span class="text-xl">{{ group.icon }}</span>
              </div>

              <div>
                <h3 class="text-lg font-sora font-bold text-primaryText tracking-wide group-hover:text-softGold transition-colors">
                  {{ group.title }}
                </h3>
                <p class="text-xs text-mutedText font-inter mt-1">
                  {{ group.subtitle }}
                </p>
              </div>
            </div>

            <!-- Skill Items List -->
            <div class="space-y-3">
              <div 
                v-for="skill in group.skills" 
                :key="skill.name"
                class="flex items-center justify-between p-2.5 rounded-lg bg-bgPrimary/60 border border-white/5 hover:border-white/15 transition-colors"
              >
                <span class="text-xs font-sora text-secondaryText group-hover:text-primaryText transition-colors">
                  {{ skill.name }}
                </span>
                <span 
                  class="text-[9px] font-mono font-semibold px-2 py-0.5 rounded uppercase tracking-wider"
                  :class="badgeClass(skill.status)"
                >
                  {{ skill.status }}
                </span>
              </div>
            </div>

            <!-- Subtle Gold Bottom Border on Hover -->
            <div class="absolute bottom-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

        </div>

        <!-- Editorial Mindset Quote Banner -->
        <div class="mt-12 p-8 rounded-2xl bg-gradient-to-r from-deepNavy/60 via-bgSecondary to-deepPurple/40 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-1">
            <span class="text-[10px] font-mono tracking-widest text-gold uppercase">PHILOSOPHY</span>
            <p class="text-base md:text-lg font-sora font-semibold text-primaryText">
              "{{ philosophy }}"
            </p>
          </div>
          <span class="text-xs font-mono text-secondaryText px-4 py-2 rounded-full bg-bgPrimary border border-white/10 shrink-0">
            BSIT • 3RD YEAR FOCUS
          </span>
        </div>

      </div>
    </section>
  `,
  setup() {
    const { computed } = Vue;

    const skillGroups = computed(() => window.store.portfolioData.skills || []);
    const philosophy = computed(() => window.store.portfolioData.profile?.philosophy || 'Understanding why a system exists before deciding how it should be built.');

    const badgeClass = (status) => {
      switch (status) {
        case 'FAMILIAR':
          return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
        case 'LEARNING':
          return 'bg-electricBlue/10 text-electricBlue border border-electricBlue/20';
        case 'EXPLORING':
          return 'bg-gold/10 text-gold border border-gold/20';
        default:
          return 'bg-white/5 text-mutedText';
      }
    };

    return {
      skillGroups,
      philosophy,
      badgeClass
    };
  }
};

window.SkillsSection = SkillsSection;
