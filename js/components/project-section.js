// Projects Section Component - Dynamic from Store Data
const ProjectSection = {
  name: 'ProjectSection',
  template: `
    <section 
      id="projects" 
      class="relative py-24 md:py-32 bg-bgPrimary overflow-hidden border-t border-white/5"
    >
      <!-- Ambient Glows -->
      <div class="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-electricBlue/10 blur-[150px] pointer-events-none"></div>
      <div class="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-royalPurple/10 blur-[140px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <!-- Section Header & Controls -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <span class="font-mono text-xs text-gold tracking-widest uppercase">03 / SELECTED WORK</span>
              <span class="w-12 h-[1px] bg-gold/40"></span>
              <span class="text-[11px] font-sora tracking-widest text-secondaryText uppercase">ACADEMIC PORTFOLIO</span>
            </div>

            <h2 class="text-3xl md:text-5xl lg:text-6xl font-sora font-extrabold tracking-tight text-primaryText leading-tight">
              PROJECTS THAT I'VE <br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue via-royalPurple to-softGold">
                BEEN PART OF.
              </span>
            </h2>

            <p class="text-secondaryText text-sm md:text-base leading-relaxed max-w-xl font-inter font-light">
              Academic and collaborative projects that helped me explore technology, systems, design, and problem-solving.
            </p>
          </div>

          <!-- Progress Indicator & Carousel Controls -->
          <div v-if="projects.length > 0" class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            
            <!-- Progress Counter & Bar -->
            <div class="flex items-center gap-3">
              <span class="font-mono text-xs text-gold font-bold">
                {{ String(currentIndex + 1).padStart(2, '0') }}
              </span>
              <div class="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-gold to-softGold transition-all duration-500 ease-out"
                  :style="{ width: ((currentIndex + 1) / projects.length * 100) + '%' }"
                ></div>
              </div>
              <span class="font-mono text-xs text-mutedText">
                {{ String(projects.length).padStart(2, '0') }}
              </span>
            </div>

            <!-- Prev / Next Navigation Arrows -->
            <div class="flex items-center gap-3">
              <button 
                @click="prevProject"
                class="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-primaryText hover:border-gold hover:text-gold hover:bg-white/5 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                :disabled="currentIndex === 0"
                aria-label="Previous Project"
              >
                ←
              </button>
              <button 
                @click="nextProject"
                class="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-primaryText hover:border-gold hover:text-gold hover:bg-white/5 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                :disabled="currentIndex === projects.length - 1"
                aria-label="Next Project"
              >
                →
              </button>
            </div>

          </div>
        </div>

        <!-- Empty State (if no projects) -->
        <div v-if="projects.length === 0" class="p-16 text-center rounded-3xl bg-bgSecondary border border-white/10 text-mutedText font-mono text-xs">
          No projects added yet. Open Admin Dashboard to add your first project.
        </div>

        <!-- Horizontal Interactive Projects Slider Container -->
        <div v-else class="relative overflow-hidden">
          <!-- Slider Track -->
          <div 
            class="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] gap-6 md:gap-8"
            :style="{ transform: 'translateX(-' + (currentIndex * slideWidthPercent) + '%)' }"
          >
            <div 
              v-for="(proj, idx) in projects" 
              :key="proj.id"
              class="w-full lg:w-[850px] shrink-0 transition-opacity duration-500"
              :class="currentIndex === idx ? 'opacity-100 scale-100' : 'opacity-60 scale-[0.98]'"
            >
              <ProjectCard 
                :project="proj" 
                :index="idx" 
                :is-active="currentIndex === idx"
                @open="openCaseStudy" 
              />
            </div>
          </div>
        </div>

        <!-- Dots Navigation -->
        <div v-if="projects.length > 1" class="flex justify-center items-center gap-3 mt-10">
          <button 
            v-for="(p, i) in projects" 
            :key="i"
            @click="setProject(i)"
            class="h-1.5 rounded-full transition-all duration-300"
            :class="currentIndex === i ? 'w-8 bg-gold' : 'w-2 bg-white/20 hover:bg-white/40'"
            :aria-label="'Go to project ' + (i + 1)"
          ></button>
        </div>

      </div>
    </section>
  `,
  setup() {
    const { ref, computed, onMounted } = Vue;
    const currentIndex = ref(0);
    const windowWidth = ref(window.innerWidth);

    const projects = computed(() => window.store.portfolioData.projects || []);

    const slideWidthPercent = computed(() => {
      return windowWidth.value < 1024 ? 100 : 70;
    });

    const nextProject = () => {
      if (currentIndex.value < projects.value.length - 1) {
        currentIndex.value++;
      }
    };

    const prevProject = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
      }
    };

    const setProject = (index) => {
      currentIndex.value = index;
    };

    const openCaseStudy = (proj) => {
      window.store.openCaseStudy(proj);
    };

    onMounted(() => {
      window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth;
      });
    });

    return {
      projects,
      currentIndex,
      slideWidthPercent,
      nextProject,
      prevProject,
      setProject,
      openCaseStudy
    };
  }
};

window.ProjectSection = ProjectSection;
