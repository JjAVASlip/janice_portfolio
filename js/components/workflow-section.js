// Workflow Section Component - Dynamic from Store Data
const WorkflowSection = {
  name: 'WorkflowSection',
  template: `
    <section 
      id="workflow" 
      class="relative py-24 md:py-32 bg-bgSecondary overflow-hidden border-t border-white/5"
    >
      <!-- Background Atmosphere -->
      <div class="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-royalPurple/10 blur-[150px] pointer-events-none"></div>
      <div class="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full bg-electricBlue/10 blur-[140px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <span class="font-mono text-xs text-gold tracking-widest uppercase">06 / WORKFLOW</span>
              <span class="w-12 h-[1px] bg-gold/40"></span>
              <span class="text-[11px] font-sora tracking-widest text-secondaryText uppercase">PROBLEM-SOLVING PROCESS</span>
            </div>

            <h2 class="text-3xl md:text-5xl lg:text-6xl font-sora font-extrabold tracking-tight text-primaryText leading-tight">
              FROM IDEA <br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-softGold to-gold">
                TO PRACTICAL SOLUTION.
              </span>
            </h2>

            <p class="text-secondaryText text-sm md:text-base leading-relaxed max-w-xl font-inter font-light">
              How I approach IT coursework, team collaborations, and system problem-solving: moving methodically from understanding needs to delivering tested solutions.
            </p>
          </div>

          <!-- Step Counter Badge -->
          <div v-if="steps.length > 0" class="px-4 py-2 rounded-full bg-bgPrimary border border-gold/30 text-xs font-mono text-softGold">
            STAGE {{ String(activeStepIndex + 1).padStart(2, '0') }} OF {{ String(steps.length).padStart(2, '0') }}
          </div>
        </div>

        <!-- Interactive Progress Pipeline / Timeline Tabs -->
        <div v-if="steps.length > 0" class="relative mb-12">
          
          <!-- Background Connecting Line -->
          <div class="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 z-0"></div>
          
          <!-- Active Gold Progress Line -->
          <div 
            class="hidden lg:block absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-gold via-softGold to-gold -translate-y-1/2 z-0 transition-all duration-700 ease-out"
            :style="{ width: ((activeStepIndex) / (steps.length - 1 || 1) * 100) + '%' }"
          ></div>

          <!-- Step Nodes Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            <button 
              v-for="(step, idx) in steps" 
              :key="step.number || idx"
              @click="activeStepIndex = idx"
              class="p-5 rounded-2xl text-left transition-all duration-500 flex flex-col justify-between border"
              :class="[
                activeStepIndex === idx 
                  ? 'bg-bgPrimary border-gold shadow-glow-gold scale-105' 
                  : idx < activeStepIndex 
                    ? 'bg-bgPrimary/80 border-white/20 text-secondaryText' 
                    : 'bg-bgPrimary/40 border-white/5 opacity-70 hover:opacity-100 hover:border-white/15'
              ]"
            >
              <div class="flex items-center justify-between mb-4">
                <span 
                  class="text-xs font-mono font-bold tracking-wider"
                  :class="activeStepIndex === idx ? 'text-gold' : 'text-mutedText'"
                >
                  {{ step.number }}
                </span>
                <span 
                  class="w-3 h-3 rounded-full border flex items-center justify-center"
                  :class="[
                    activeStepIndex === idx 
                      ? 'border-gold bg-gold shadow-[0_0_8px_#D4AF37]' 
                      : idx < activeStepIndex 
                        ? 'border-softGold bg-softGold/60' 
                        : 'border-white/20 bg-transparent'
                  ]"
                ></span>
              </div>

              <div>
                <h4 
                  class="text-sm font-sora font-bold tracking-wide uppercase transition-colors"
                  :class="activeStepIndex === idx ? 'text-softGold' : 'text-primaryText'"
                >
                  {{ step.title }}
                </h4>
                <p class="text-xs text-mutedText font-inter mt-1 line-clamp-2">
                  {{ step.tagline }}
                </p>
              </div>
            </button>
          </div>

        </div>

        <!-- Deep Dive Active Stage Detail Card -->
        <div v-if="currentStep" class="p-8 md:p-10 rounded-3xl bg-bgPrimary border border-white/15 shadow-2xl relative overflow-hidden">
          
          <div class="absolute top-0 right-0 w-80 h-80 bg-royalPurple/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <!-- Left Info -->
            <div class="lg:col-span-8 space-y-4">
              <div class="flex items-center gap-3">
                <span class="px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-[10px] font-mono tracking-widest uppercase">
                  STEP {{ currentStep.number }}
                </span>
                <span class="text-xs font-mono text-secondaryText uppercase tracking-wider">
                  {{ currentStep.phase }}
                </span>
              </div>

              <h3 class="text-2xl md:text-3xl font-sora font-bold text-primaryText">
                {{ currentStep.headline }}
              </h3>

              <p class="text-secondaryText text-sm md:text-base leading-relaxed font-inter">
                {{ currentStep.detailedDesc }}
              </p>

              <!-- Deliverables / Activities Checklist -->
              <div class="pt-4 border-t border-white/10">
                <span class="text-[10px] font-mono tracking-widest text-gold uppercase block mb-3">
                  TYPICAL DELIVERABLES & ACTIVITIES
                </span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div 
                    v-for="(item, i) in currentStep.deliverables" 
                    :key="i"
                    class="flex items-center gap-2 text-xs font-inter text-secondaryText"
                  >
                    <span class="text-gold">✔</span>
                    <span>{{ item }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Stage Insight Box -->
            <div class="lg:col-span-4 p-6 rounded-2xl bg-deepNavy/60 border border-white/10 space-y-3">
              <span class="text-[10px] font-mono tracking-widest text-gold uppercase">MY PERSONAL FOCUS</span>
              <p class="text-xs font-sora font-medium text-primaryText leading-relaxed">
                {{ currentStep.personalFocus }}
              </p>
              <div class="pt-2 text-[10px] font-mono text-mutedText">
                Janice Mas Bulanon • Workflow Methodology
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `,
  setup() {
    const { ref, computed } = Vue;
    const activeStepIndex = ref(0);

    const steps = computed(() => window.store.portfolioData.workflow || []);

    const currentStep = computed(() => {
      if (!steps.value.length) return null;
      return steps.value[activeStepIndex.value] || steps.value[0];
    });

    return {
      activeStepIndex,
      steps,
      currentStep
    };
  }
};

window.WorkflowSection = WorkflowSection;
