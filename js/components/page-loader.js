// Page Loader Component - Cinematic Editorial Entry
const PageLoader = {
  name: 'PageLoader',
  template: `
    <transition name="fade-loader">
      <div 
        v-if="!isFinished" 
        class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bgPrimary select-none overflow-hidden"
      >
        <!-- Background Ambient Glow -->
        <div class="absolute w-96 h-96 rounded-full bg-royalPurple/15 blur-[120px] pointer-events-none"></div>
        <div class="absolute w-72 h-72 rounded-full bg-electricBlue/10 blur-[100px] pointer-events-none translate-x-20"></div>

        <div class="relative z-10 flex flex-col items-center">
          <!-- Main Brand Wordmark -->
          <div class="overflow-hidden mb-6">
            <h1 
              class="text-4xl md:text-6xl font-sora font-semibold tracking-widest text-primaryText transition-all duration-1000 transform"
              :class="stage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
            >
              JANICE<span class="text-gold">.</span>
            </h1>
          </div>

          <!-- Expanding Gold Line -->
          <div class="relative w-48 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mb-6">
            <div 
              class="absolute inset-y-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-1000 ease-out"
              :style="{
                left: stage >= 2 ? '0%' : '50%',
                right: stage >= 2 ? '0%' : '50%',
                opacity: stage >= 2 ? 1 : 0
              }"
            ></div>
          </div>

          <!-- Section / Stage Identifier -->
          <div class="flex items-center gap-4 text-xs tracking-ultra font-sora text-secondaryText/80">
            <span 
              class="text-gold font-mono transition-all duration-700 delay-200 transform"
              :class="stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'"
            >
              01
            </span>
            <span class="w-1 h-1 rounded-full bg-white/20"></span>
            <span 
              class="uppercase tracking-widest text-[11px] text-mutedText transition-all duration-700 delay-300 transform"
              :class="stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'"
            >
              PORTFOLIO • BSIT NCST
            </span>
          </div>
        </div>

        <!-- Bottom Loading Status -->
        <div class="absolute bottom-10 left-0 right-0 flex justify-center items-center text-[10px] tracking-widest text-mutedText/60 font-mono">
          INITIALIZING EDITORIAL EXPERIENCE
        </div>
      </div>
    </transition>
  `,
  setup() {
    const { ref, onMounted } = Vue;
    const stage = ref(0);
    const isFinished = ref(false);

    onMounted(() => {
      // Step 1: Text reveal
      setTimeout(() => {
        stage.value = 1;
      }, 150);

      // Step 2: Gold line expansion
      setTimeout(() => {
        stage.value = 2;
      }, 600);

      // Step 3: Show "01" metadata
      setTimeout(() => {
        stage.value = 3;
      }, 1100);

      // Step 4: Complete loader
      setTimeout(() => {
        stage.value = 4;
        isFinished.value = true;
        window.store.setLoaded(true);
      }, 1800);
    });

    return {
      stage,
      isFinished
    };
  }
};

window.PageLoader = PageLoader;
