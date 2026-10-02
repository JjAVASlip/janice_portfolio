// Case Study Modal Component - Deep Dive Academic Project Inspector
const CaseStudyModal = {
  name: 'CaseStudyModal',
  template: `
    <transition name="modal-fade">
      <div 
        v-if="isOpen && project" 
        class="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 overflow-y-auto bg-bgPrimary/95 backdrop-blur-xl"
        @click.self="close"
      >
        <!-- Modal Backdrop Glow -->
        <div class="fixed top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-royalPurple/15 blur-[160px] pointer-events-none"></div>
        <div class="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-electricBlue/15 blur-[160px] pointer-events-none"></div>

        <!-- Main Modal Window -->
        <div class="relative w-full max-w-5xl bg-bgSecondary border border-white/15 md:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
          
          <!-- Sticky Header Bar -->
          <div class="sticky top-0 z-30 bg-bgSecondary/90 backdrop-blur-md px-6 md:px-10 py-5 border-b border-white/10 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <span class="text-xs font-mono font-bold text-gold tracking-widest">
                CASE STUDY / {{ project.number || '01' }}
              </span>
              <span class="w-1.5 h-1.5 rounded-full bg-white/20"></span>
              <span class="text-xs font-mono text-secondaryText uppercase tracking-wider hidden sm:inline">
                {{ project.category }}
              </span>
            </div>

            <!-- Close Action -->
            <button 
              @click="close"
              class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sora text-primaryText transition-colors"
            >
              <span>CLOSE</span>
              <span class="text-gold font-bold">✕</span>
            </button>
          </div>

          <!-- Scrollable Body Content -->
          <div class="overflow-y-auto p-6 md:p-10 space-y-12">
            
            <!-- Title & Hero Banner -->
            <div class="space-y-4">
              <span class="px-3 py-1 rounded-full bg-electricBlue/20 text-electricBlue border border-electricBlue/30 text-[10px] font-mono tracking-widest uppercase">
                {{ project.category }}
              </span>
              <h2 class="text-3xl md:text-5xl font-sora font-extrabold text-primaryText tracking-tight">
                {{ project.title }}
              </h2>
              <p class="text-secondaryText text-base md:text-lg leading-relaxed font-inter max-w-3xl">
                {{ project.tagline || project.description }}
              </p>
            </div>

            <!-- Large Hero Visual Frame -->
            <div class="relative w-full rounded-2xl overflow-hidden bg-deepNavy border border-white/15 aspect-[16/9]">
              <img 
                :src="project.image" 
                :alt="project.title"
                class="w-full h-full object-cover object-top"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
              />
              <div class="hidden w-full h-full flex-col justify-center items-center p-8 text-center bg-gradient-to-tr from-[#0B1530] via-[#060810] to-[#2A164D]">
                <span class="text-3xl font-sora font-bold text-softGold mb-2">{{ project.title }}</span>
                <p class="text-xs font-mono text-mutedText">High-Resolution Project Preview</p>
                <div class="mt-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gold">
                  {{ project.image }}
                </div>
              </div>
            </div>

            <!-- Two-Column Breakdown: Overview & Problem Statement -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              
              <div class="p-6 rounded-2xl bg-bgPrimary/60 border border-white/10 space-y-3">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gold"></span>
                  <h3 class="text-xs font-mono tracking-widest text-gold uppercase">01 / THE PROBLEM</h3>
                </div>
                <p class="text-secondaryText text-sm leading-relaxed font-inter">
                  {{ project.problem || "Organizations and students often face disorganized workflows, manual tracking challenges, and fragmented data flows that hinder efficiency." }}
                </p>
              </div>

              <div class="p-6 rounded-2xl bg-bgPrimary/60 border border-white/10 space-y-3">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-electricBlue"></span>
                  <h3 class="text-xs font-mono tracking-widest text-electricBlue uppercase">02 / THE APPROACH</h3>
                </div>
                <p class="text-secondaryText text-sm leading-relaxed font-inter">
                  {{ project.approach || "Structuring clear relational models, mapping step-by-step user journeys, and applying modular architecture to build an intuitive, reliable solution." }}
                </p>
              </div>

            </div>

            <!-- Honest Role Attribution Grid -->
            <div class="p-8 rounded-2xl bg-deepNavy/40 border border-white/10 space-y-6">
              <div class="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 class="text-xs font-mono tracking-widest text-gold uppercase">
                  CONTRIBUTION BREAKDOWN
                </h3>
                <span class="text-[10px] font-mono text-mutedText">ACADEMIC INTEGRITY</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Janice's Specific Role -->
                <div class="space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-softGold"></span>
                    <h4 class="text-sm font-sora font-semibold text-primaryText">MY CONTRIBUTION</h4>
                  </div>
                  <ul class="space-y-2 text-xs font-inter text-secondaryText leading-relaxed">
                    <li v-for="(item, idx) in project.myContributionList" :key="idx" class="flex items-start gap-2">
                      <span class="text-gold mt-0.5">✦</span>
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Collaborative / Team Role -->
                <div class="space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-royalPurple"></span>
                    <h4 class="text-sm font-sora font-semibold text-primaryText">TEAM COLLABORATION</h4>
                  </div>
                  <ul class="space-y-2 text-xs font-inter text-secondaryText leading-relaxed">
                    <li v-for="(item, idx) in project.teamContributionList" :key="idx" class="flex items-start gap-2">
                      <span class="text-royalPurple mt-0.5">✦</span>
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Process & Architecture Workflow -->
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono tracking-widest text-gold uppercase">03 / PROCESS & SYSTEM FLOW</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div 
                  v-for="(step, sIdx) in project.processSteps" 
                  :key="sIdx"
                  class="p-5 rounded-xl bg-bgPrimary/80 border border-white/5 space-y-2"
                >
                  <span class="text-xs font-mono font-bold text-gold">{{ String(sIdx + 1).padStart(2, '0') }}</span>
                  <h4 class="text-xs font-sora font-semibold text-primaryText">{{ step.title }}</h4>
                  <p class="text-[11px] font-inter text-mutedText leading-relaxed">{{ step.desc }}</p>
                </div>
              </div>
            </div>

            <!-- Technologies Used -->
            <div class="space-y-3">
              <span class="text-xs font-mono tracking-widest text-gold uppercase block">TECHNOLOGY STACK</span>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="px-3 py-1.5 rounded-lg bg-bgPrimary border border-white/10 text-xs font-mono text-primaryText"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- What I Learned -->
            <div class="p-6 rounded-2xl bg-gradient-to-r from-royalPurple/10 to-electricBlue/10 border border-gold/20 space-y-3">
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono tracking-widest text-gold uppercase">04 / KEY TAKEAWAYS & REFLECTION</span>
              </div>
              <p class="text-secondaryText text-sm leading-relaxed font-inter">
                {{ project.learning || "This project strengthened my understanding of systems analysis, translating user needs into structured processes, verifying interface usability, and ensuring reliable documentation for collaborative teams." }}
              </p>
            </div>

            <!-- Bottom Modal Actions -->
            <div class="pt-6 border-t border-white/10 flex justify-between items-center">
              <button 
                @click="close"
                class="px-6 py-3 rounded-full border border-white/20 text-xs font-sora tracking-widest text-primaryText uppercase hover:border-gold transition-colors"
              >
                ← BACK TO PROJECTS
              </button>

              <span class="text-[11px] font-mono text-mutedText">
                Janice Mas Bulanon • NCST Portfolio
              </span>
            </div>

          </div>
        </div>
      </div>
    </transition>
  `,
  setup() {
    const { computed, onMounted, onUnmounted } = Vue;

    const isOpen = computed(() => window.store.isCaseStudyOpen);
    const project = computed(() => window.store.selectedProject);

    const close = () => {
      window.store.closeCaseStudy();
    };

    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen.value) {
        close();
      }
    };

    onMounted(() => {
      window.addEventListener('keydown', onKeyDown);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', onKeyDown);
    });

    return {
      isOpen,
      project,
      close
    };
  }
};

window.CaseStudyModal = CaseStudyModal;
