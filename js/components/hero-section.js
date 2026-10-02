// Hero Section Component - Dynamic from Store Data
const HeroSection = {
  name: 'HeroSection',
  template: `
    <section 
      id="home" 
      class="relative min-h-screen flex items-center justify-center pt-32 pb-16 md:pt-36 md:pb-20 lg:py-0 overflow-hidden bg-bgPrimary"
    >
      <!-- Background Ambient Glow & Light Cone -->
      <div class="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-electricBlue/10 blur-[150px] pointer-events-none"></div>
      <div class="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-royalPurple/10 blur-[140px] pointer-events-none"></div>
      <div class="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-hero-gradient pointer-events-none"></div>

      <!-- Subtle Geometric Lines in Background -->
      <div class="absolute inset-0 pointer-events-none opacity-20">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="15%" y1="0%" x2="15%" y2="100%" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <line x1="85%" y1="0%" x2="85%" y2="100%" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <circle cx="80%" cy="40%" r="240" fill="none" stroke="rgba(212,175,55,0.08)" stroke-width="1" stroke-dasharray="4 8" />
          <circle cx="80%" cy="40%" r="320" fill="none" stroke="rgba(40,100,255,0.06)" stroke-width="1" />
        </svg>
      </div>

      <div class="max-w-7xl mx-auto px-6 md:px-12 w-full z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <!-- Left Column: Editorial Headline & Bio -->
          <div class="lg:col-span-7 flex flex-col justify-center text-left">
            
            <!-- Section Label -->
            <div class="flex items-center gap-3 mb-6">
              <span class="font-mono text-xs text-gold tracking-widest uppercase">01 / HOME</span>
              <span class="w-8 h-[1px] bg-gold/40"></span>
              <span class="text-[11px] font-sora tracking-widest text-secondaryText uppercase">
                {{ profile.role }} • {{ profile.subrole }}
              </span>
            </div>

            <!-- Main Masked Headline -->
            <div class="space-y-1 mb-8">
              <div class="overflow-hidden">
                <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-sora font-extrabold tracking-tight text-primaryText leading-[1.05]">
                  {{ profile.headlineLine1 }}
                </h1>
              </div>
              <div class="overflow-hidden">
                <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-sora font-extrabold tracking-tight leading-[1.05]">
                  <span class="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue via-royalPurple to-softGold">
                    {{ profile.headlineGradient }}
                  </span>
                </h1>
              </div>
              <div class="overflow-hidden flex items-baseline">
                <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-sora font-extrabold tracking-tight text-primaryText leading-[1.05]">
                  {{ profile.headlineLine3 }}
                </h1>
                <span class="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] text-gold font-sora font-extrabold ml-1">.</span>
              </div>
            </div>

            <!-- Supporting Text -->
            <p class="text-secondaryText text-base md:text-lg leading-relaxed max-w-xl mb-10 font-inter font-light">
              {{ profile.heroBio }}
            </p>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-4 mb-12">
              <a 
                href="#projects"
                @click.prevent="scrollTo('projects')"
                class="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-primaryText text-bgPrimary font-sora text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-softGold hover:shadow-glow-gold hover:-translate-y-0.5"
                @mouseenter="onHover('button')"
                @mouseleave="onLeave"
              >
                <span>EXPLORE MY PROJECTS</span>
                <span class="text-bgPrimary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
              </a>

              <a 
                href="#about"
                @click.prevent="scrollTo('about')"
                class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-primaryText font-sora text-xs font-medium tracking-wider uppercase transition-all duration-300 hover:border-gold/60 hover:text-softGold hover:-translate-y-0.5"
                @mouseenter="onHover('button')"
                @mouseleave="onLeave"
              >
                <span>ABOUT ME</span>
              </a>
            </div>

            <!-- Metadata Details Grid -->
            <div class="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <p class="text-[10px] font-mono tracking-widest text-mutedText uppercase mb-1">INSTITUTION</p>
                <p class="text-xs font-sora text-primaryText font-medium">BSIT • {{ profile.collegeShort }}</p>
              </div>
              <div>
                <p class="text-[10px] font-mono tracking-widest text-mutedText uppercase mb-1">STANDING</p>
                <p class="text-xs font-sora text-primaryText font-medium">{{ profile.educationLevel.toUpperCase() }}</p>
              </div>
              <div>
                <p class="text-[10px] font-mono tracking-widest text-mutedText uppercase mb-1">FOCUS</p>
                <p class="text-xs font-sora text-primaryText font-medium">SYSTEMS • DESIGN • QA</p>
              </div>
            </div>

          </div>

          <!-- Right Column: Cinematic Portrait Area with Parallax -->
          <div class="lg:col-span-5 flex justify-center lg:justify-end">
            <div 
              class="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-3xl p-1 group transition-transform duration-500 ease-out"
              :style="portraitParallaxStyle"
              @mousemove="onMouseMove"
              @mouseleave="onMouseReset"
            >
              
              <!-- Outer Glowing Halo & Accent Rings -->
              <div class="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-electricBlue/30 via-royalPurple/20 to-gold/30 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <!-- Abstract Orbit Lines -->
              <div class="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-gold/30 border-dashed animate-spin" style="animation-duration: 25s;"></div>
              <div class="absolute -bottom-6 -left-6 w-20 h-20 rounded-full border border-electricBlue/30 animate-spin" style="animation-duration: 20s; animation-direction: reverse;"></div>

              <!-- Portrait Frame Container -->
              <div class="relative w-full h-full rounded-[22px] overflow-hidden bg-bgSecondary border border-white/15 shadow-2xl flex flex-col justify-between">
                
                <!-- Main Portrait Visual / Art Fallback -->
                <div class="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-deepNavy via-bgSecondary to-bgPrimary">
                  
                  <img 
                    :src="profile.portraitImage" 
                    :alt="profile.name"
                    class="w-full h-full object-cover object-center filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-700"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                  />

                  <!-- Embedded SVG Portrait Fallback if image not yet supplied -->
                  <div class="hidden w-full h-full flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0b1530] via-[#060810] to-[#2a164d] relative">
                    <div class="absolute inset-0 bg-[radial-gradient(#2864FF_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
                    
                    <div class="relative z-10 w-28 h-28 rounded-full border-2 border-gold/40 flex items-center justify-center bg-gradient-to-tr from-royalPurple/40 to-electricBlue/30 mb-4 shadow-glow-purple">
                      <span class="text-3xl font-sora font-bold text-softGold">JB</span>
                    </div>

                    <p class="relative z-10 text-xs font-sora font-semibold tracking-widest text-primaryText uppercase mb-1">
                      {{ profile.name }}
                    </p>
                    <p class="relative z-10 text-[11px] font-mono text-secondaryText uppercase tracking-wider mb-4">
                      BSIT {{ profile.educationLevel }} • {{ profile.collegeShort }}
                    </p>

                    <div class="relative z-10 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gold">
                      PORTRAIT PLACEHOLDER
                    </div>
                  </div>

                  <!-- Rim Lighting and Atmospheric Gradient Overlays -->
                  <div class="absolute inset-0 bg-gradient-to-t from-bgPrimary via-transparent to-transparent opacity-80"></div>
                  <div class="absolute inset-0 bg-gradient-to-tr from-electricBlue/15 via-transparent to-royalPurple/20 mix-blend-screen pointer-events-none"></div>
                  <div class="absolute inset-0 border border-gold/20 rounded-[22px] pointer-events-none"></div>
                </div>

                <!-- Top Floating Tag -->
                <div class="relative z-10 p-5 flex justify-between items-center">
                  <span class="px-3 py-1 rounded-full bg-bgPrimary/80 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-softGold">
                    PORTFOLIO 2026
                  </span>
                  <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Open for academic & IT collaboration"></div>
                </div>

                <!-- Bottom Floating Portrait Badge -->
                <div class="relative z-10 p-6 bg-gradient-to-t from-bgPrimary via-bgPrimary/80 to-transparent">
                  <div class="p-4 rounded-xl bg-bgSecondary/90 backdrop-blur-md border border-white/10">
                    <p class="text-[11px] font-sora font-medium text-primaryText">{{ profile.name }}</p>
                    <p class="text-[10px] font-mono text-secondaryText">Systems Planning • Workflow • QA</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Bottom Scroll Indicator -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60 hover:opacity-100 transition-opacity">
        <span class="text-[9px] font-mono tracking-widest text-mutedText uppercase">SCROLL TO DISCOVER</span>
        <div class="w-4 h-7 rounded-full border border-white/20 flex justify-center pt-1.5">
          <div class="w-1 h-1.5 rounded-full bg-gold animate-bounce"></div>
        </div>
      </div>

    </section>
  `,
  setup() {
    const { ref, computed } = Vue;
    const rotateX = ref(0);
    const rotateY = ref(0);

    const profile = computed(() => window.store.portfolioData.profile);

    const portraitParallaxStyle = computed(() => ({
      transform: `perspective(1000px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`,
    }));

    const onMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      rotateX.value = - (y / rect.height) * 10;
      rotateY.value = (x / rect.width) * 10;
    };

    const onMouseReset = () => {
      rotateX.value = 0;
      rotateY.value = 0;
    };

    const scrollTo = (id) => {
      window.store.scrollTo(id);
    };

    const onHover = (type) => {
      window.store.setCursor(type);
    };

    const onLeave = () => {
      window.store.resetCursor();
    };

    return {
      profile,
      portraitParallaxStyle,
      onMouseMove,
      onMouseReset,
      scrollTo,
      onHover,
      onLeave
    };
  }
};

window.HeroSection = HeroSection;
