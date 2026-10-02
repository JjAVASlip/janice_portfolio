// Project Card Component
const ProjectCard = {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  template: `
    <div 
      class="group relative w-full rounded-3xl bg-bgSecondary/90 border transition-all duration-500 overflow-hidden flex flex-col justify-between"
      :class="[
        isActive ? 'border-gold/50 shadow-glow-gold' : 'border-white/10 hover:border-white/25 hover:shadow-2xl'
      ]"
      @mouseenter="onHover"
      @mouseleave="onLeave"
    >
      <!-- Top Header Row -->
      <div class="p-6 md:p-8 flex items-center justify-between border-b border-white/5">
        <div class="flex items-center gap-3">
          <span class="text-xs font-mono font-bold tracking-widest text-gold">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <span class="w-1.5 h-1.5 rounded-full bg-white/20"></span>
          <span class="text-[10px] md:text-xs font-mono tracking-widest text-secondaryText uppercase">
            {{ project.category }}
          </span>
        </div>

        <span class="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-mutedText">
          ACADEMIC PROJECT
        </span>
      </div>

      <!-- Main Visual Showcase Container -->
      <div 
        class="relative aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden cursor-pointer bg-deepNavy"
        @click="$emit('open', project)"
      >
        <!-- Project Screenshot -->
        <img 
          :src="project.image" 
          :alt="project.title"
          class="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />

        <!-- Fallback Custom Graphic Card if image is missing -->
        <div class="hidden w-full h-full flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#0B1530] via-[#060810] to-[#2A164D] relative">
          <div class="absolute inset-0 bg-[radial-gradient(#2864FF_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
          <div class="w-16 h-16 rounded-2xl bg-royalPurple/20 border border-gold/40 flex items-center justify-center mb-3 shadow-glow-purple">
            <span class="text-xl font-sora font-bold text-softGold">{{ project.title.substring(0, 2) }}</span>
          </div>
          <h4 class="text-lg font-sora font-semibold text-primaryText tracking-wide">{{ project.title }}</h4>
          <p class="text-xs font-mono text-mutedText mt-1">{{ project.category }}</p>
          <div class="mt-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gold">
            {{ project.image }}
          </div>
        </div>

        <!-- Light Sweep Hover Shimmer Effect -->
        <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-electricBlue/10 to-royalPurple/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

        <!-- Bottom Overlay Gradient -->
        <div class="absolute inset-0 bg-gradient-to-t from-bgSecondary via-transparent to-transparent opacity-70 pointer-events-none"></div>

        <!-- Floating View Case Study Quick Trigger -->
        <div class="absolute bottom-4 right-4 z-10">
          <button 
            @click.stop="$emit('open', project)"
            class="px-4 py-2 rounded-full bg-bgPrimary/90 backdrop-blur-md border border-gold/40 text-xs font-sora text-primaryText tracking-wider flex items-center gap-2 group-hover:bg-gold group-hover:text-bgPrimary transition-all duration-300"
          >
            <span>{{ project.cta || 'VIEW PROJECT' }}</span>
            <span class="text-gold group-hover:text-bgPrimary transition-colors">↗</span>
          </button>
        </div>
      </div>

      <!-- Bottom Information Content -->
      <div class="p-6 md:p-8 space-y-5 bg-bgSecondary">
        <div>
          <h3 class="text-2xl md:text-3xl font-sora font-bold text-primaryText mb-2 group-hover:text-softGold transition-colors">
            {{ project.title }}
          </h3>
          <p class="text-secondaryText text-sm leading-relaxed font-inter line-clamp-2">
            {{ project.description }}
          </p>
        </div>

        <!-- Student Contribution / Role -->
        <div class="p-3.5 rounded-xl bg-bgPrimary/60 border border-white/5">
          <span class="text-[10px] font-mono tracking-widest text-gold uppercase block mb-1">
            MY CONTRIBUTION
          </span>
          <p class="text-xs font-sora text-primaryText font-medium">
            {{ project.role }}
          </p>
        </div>

        <!-- Technologies Tags -->
        <div class="flex flex-wrap gap-2 pt-2">
          <span 
            v-for="tech in project.technologies" 
            :key="tech"
            class="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-secondaryText"
          >
            {{ tech }}
          </span>
        </div>
      </div>

    </div>
  `,
  setup(props, { emit }) {
    const onHover = () => {
      window.store.setCursor('project', 'VIEW PROJECT');
    };

    const onLeave = () => {
      window.store.resetCursor();
    };

    return {
      onHover,
      onLeave
    };
  }
};

window.ProjectCard = ProjectCard;
