// About Section Component - Dynamic from Store Data
const AboutSection = {
  name: 'AboutSection',
  template: `
    <section 
      id="about" 
      class="relative py-24 md:py-32 bg-bgSecondary overflow-hidden border-t border-white/5"
    >
      <!-- Subtle Decorative Background Gradients -->
      <div class="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-royalPurple/10 blur-[130px] pointer-events-none"></div>
      <div class="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-electricBlue/10 blur-[120px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <!-- Section Header -->
        <div class="flex items-center gap-3 mb-6">
          <span class="font-mono text-xs text-gold tracking-widest uppercase">02 / ABOUT</span>
          <span class="w-12 h-[1px] bg-gold/40"></span>
          <span class="text-[11px] font-sora tracking-widest text-secondaryText uppercase">BACKGROUND & ASPIRATIONS</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <!-- Left Column: Editorial Layered Photo Collage -->
          <div class="lg:col-span-6 relative">
            <div class="relative w-full max-w-lg mx-auto py-8">
              
              <!-- Background Accent Card with Serif Quote -->
              <div class="absolute -top-4 -right-4 md:-right-6 w-52 p-4 rounded-xl bg-bgPrimary/90 border border-gold/30 shadow-2xl z-20 transform rotate-3">
                <span class="text-[10px] font-mono tracking-widest text-gold block mb-1 uppercase">MINDSET</span>
                <p class="font-serif italic text-sm text-primaryText">"{{ profile.quote }}"</p>
              </div>

              <!-- Main Primary Photo / Frame -->
              <div 
                class="relative rounded-2xl overflow-hidden bg-deepNavy border border-white/15 shadow-2xl aspect-[4/5] z-10 group"
                @mouseenter="onHover('view', 'VIEW')"
                @mouseleave="onLeave"
              >
                <img 
                  :src="profile.aboutImage1" 
                  :alt="profile.name"
                  class="w-full h-full object-cover filter contrast-[1.05] brightness-90 group-hover:scale-105 transition-transform duration-700"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                />
                
                <!-- Fallback Collage Visual -->
                <div class="hidden w-full h-full flex-col justify-between p-8 bg-gradient-to-br from-[#0B1530] via-[#060810] to-[#2A164D] relative">
                  <div class="flex justify-between items-start">
                    <span class="text-[10px] font-mono text-gold tracking-widest">STUDENT PROFILE</span>
                    <span class="w-2 h-2 rounded-full bg-gold"></span>
                  </div>
                  <div class="my-auto text-center space-y-2">
                    <div class="w-20 h-20 mx-auto rounded-full bg-electricBlue/20 border border-gold/40 flex items-center justify-center shadow-glow-blue">
                      <span class="text-2xl font-sora font-bold text-softGold">01</span>
                    </div>
                    <p class="text-sm font-sora font-semibold text-primaryText tracking-wide">{{ profile.collegeShort }} BSIT</p>
                    <p class="text-xs font-mono text-secondaryText">{{ profile.educationLevel }}</p>
                  </div>
                  <div class="text-[10px] font-mono text-mutedText text-center">
                    {{ profile.aboutImage1 }}
                  </div>
                </div>

                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-bgPrimary/90 via-transparent to-transparent opacity-60"></div>
                <div class="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-primaryText/90">
                  <span class="px-2.5 py-1 rounded bg-bgPrimary/80 backdrop-blur-md border border-white/10 text-[10px]">
                    {{ profile.collegeShort }} CAMPUS
                  </span>
                  <span class="text-[10px] text-softGold">BSIT 2026</span>
                </div>
              </div>

              <!-- Overlapping Secondary Card (Left Bottom) -->
              <div 
                class="absolute -bottom-6 -left-6 md:-left-8 w-44 md:w-52 aspect-[4/3] rounded-xl overflow-hidden bg-bgPrimary border border-white/20 shadow-2xl z-20 transform -rotate-3 group"
                @mouseenter="onHover('view', 'VIEW')"
                @mouseleave="onLeave"
              >
                <img 
                  :src="profile.aboutImage2" 
                  alt="School & Collaboration"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                />
                <div class="hidden w-full h-full flex-col justify-center items-center p-3 text-center bg-gradient-to-tr from-bgSecondary to-deepNavy">
                  <span class="text-[9px] font-mono text-gold mb-1">SYSTEMS LAB</span>
                  <p class="text-[11px] font-sora font-semibold text-primaryText">Academic Growth</p>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-bgPrimary/80 via-transparent to-transparent"></div>
                <div class="absolute bottom-2 left-2 right-2 text-[9px] font-mono text-white/80">
                  <span>{{ profile.shsStrand }}</span>
                </div>
              </div>

              <!-- Decorative Badge (Right Bottom) -->
              <div class="absolute bottom-8 -right-4 md:-right-8 p-3 rounded-xl bg-bgPrimary/95 border border-gold/30 shadow-2xl z-20 flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold font-sora font-bold text-xs">
                  ★
                </div>
                <div>
                  <p class="text-[10px] font-mono tracking-widest text-gold uppercase">HONORS</p>
                  <p class="text-xs font-sora font-medium text-primaryText">{{ profile.achievements[0] || 'Consistent Honor Student' }}</p>
                </div>
              </div>

            </div>
          </div>

          <!-- Right Column: Editorial Bio & Academic Panel -->
          <div class="lg:col-span-6 space-y-8">
            
            <div class="space-y-4">
              <h2 class="text-3xl md:text-5xl font-sora font-bold tracking-tight text-primaryText leading-tight">
                A LITTLE <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-softGold to-gold">
                  ABOUT ME.
                </span>
              </h2>

              <p class="text-secondaryText text-base md:text-lg leading-relaxed font-inter font-light">
                {{ profile.aboutBio1 }}
              </p>

              <p class="text-mutedText text-sm md:text-base leading-relaxed font-inter">
                {{ profile.aboutBio2 }}
              </p>
            </div>

            <!-- Academic Information Grid Panel -->
            <div class="p-6 rounded-2xl bg-bgPrimary/80 border border-white/10 space-y-5">
              
              <div class="flex items-center justify-between pb-3 border-b border-white/5">
                <span class="text-xs font-mono tracking-widest text-gold uppercase">ACADEMIC BACKGROUND</span>
                <span class="text-[11px] font-mono text-mutedText">VERIFIED RECORD</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <div>
                  <p class="text-[10px] font-mono tracking-widest text-mutedText uppercase mb-1">PROGRAM & DEGREE</p>
                  <p class="text-xs font-sora font-semibold text-primaryText">{{ profile.degree }}</p>
                  <p class="text-[11px] font-inter text-secondaryText">Current: {{ profile.educationLevel }}</p>
                </div>

                <div>
                  <p class="text-[10px] font-mono tracking-widest text-mutedText uppercase mb-1">COLLEGE / UNIVERSITY</p>
                  <p class="text-xs font-sora font-semibold text-primaryText">{{ profile.college }}</p>
                  <p class="text-[11px] font-inter text-secondaryText">{{ profile.collegeShort }}</p>
                </div>

                <div>
                  <p class="text-[10px] font-mono tracking-widest text-mutedText uppercase mb-1">SENIOR HIGH SCHOOL</p>
                  <p class="text-xs font-sora font-semibold text-primaryText">{{ profile.shs }}</p>
                  <p class="text-[11px] font-inter text-secondaryText">{{ profile.shsStrand }}</p>
                </div>

                <div>
                  <p class="text-[10px] font-mono tracking-widest text-mutedText uppercase mb-1">RECOGNITIONS</p>
                  <p class="text-xs font-sora font-semibold text-softGold">{{ profile.achievements[0] }}</p>
                  <p class="text-[11px] font-inter text-secondaryText">{{ profile.achievements[1] }}</p>
                </div>

              </div>

            </div>

            <!-- Developing Interest Badges -->
            <div>
              <p class="text-[11px] font-mono tracking-widest text-mutedText uppercase mb-3">KEY AREAS OF EXPLORATION</p>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="interest in profile.coreInterests" 
                  :key="interest"
                  class="px-3 py-1.5 rounded-lg bg-deepNavy/60 border border-white/10 text-xs font-sora text-primaryText hover:border-gold/50 transition-colors"
                >
                  {{ interest }}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `,
  setup() {
    const { computed } = Vue;
    const profile = computed(() => window.store.portfolioData.profile);

    const onHover = (type, label) => {
      window.store.setCursor(type, label);
    };

    const onLeave = () => {
      window.store.resetCursor();
    };

    return {
      profile,
      onHover,
      onLeave
    };
  }
};

window.AboutSection = AboutSection;
