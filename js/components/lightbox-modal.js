// Lightbox Modal Component - High Fidelity Visual & Diagram Inspector
const LightboxModal = {
  name: 'LightboxModal',
  template: `
    <transition name="modal-fade">
      <div 
        v-if="isOpen && visual" 
        class="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-bgPrimary/95 backdrop-blur-2xl"
        @click.self="close"
      >
        <!-- Background Light Source -->
        <div class="fixed top-1/3 left-1/3 w-[600px] h-[600px] rounded-full bg-royalPurple/15 blur-[180px] pointer-events-none"></div>

        <div class="relative w-full max-w-4xl bg-bgSecondary border border-white/20 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          
          <!-- Modal Top Bar -->
          <div class="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-bgSecondary/90 backdrop-blur-md">
            <div class="flex items-center gap-3">
              <span class="text-xs font-mono text-gold font-bold">{{ visual.tag || 'VISUAL LAB' }}</span>
              <span class="w-1.5 h-1.5 rounded-full bg-white/20"></span>
              <span class="text-xs font-sora text-primaryText font-medium">{{ visual.title }}</span>
            </div>

            <button 
              @click="close"
              class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-primaryText text-xs font-mono transition-colors"
            >
              ✕
            </button>
          </div>

          <!-- Main Visual Display -->
          <div class="relative flex-1 overflow-auto bg-deepNavy/80 flex items-center justify-center p-4 md:p-8 min-h-[350px]">
            <img 
              :src="visual.image" 
              :alt="visual.title"
              class="max-h-[60vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            />

            <!-- Fallback Diagram Visual Graphic -->
            <div class="hidden w-full h-80 flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0B1530] via-[#060810] to-[#2A164D] rounded-xl border border-white/10 relative">
              <div class="w-16 h-16 rounded-2xl bg-electricBlue/20 border border-gold/40 flex items-center justify-center mb-3">
                <span class="text-2xl font-sora font-bold text-softGold">📐</span>
              </div>
              <h4 class="text-base font-sora font-semibold text-primaryText">{{ visual.title }}</h4>
              <p class="text-xs font-mono text-mutedText mt-1">{{ visual.category }}</p>
              <div class="mt-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gold">
                {{ visual.image }}
              </div>
            </div>
          </div>

          <!-- Bottom Caption & Context Panel -->
          <div class="p-6 bg-bgSecondary border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-1">
              <p class="text-sm font-sora text-primaryText font-medium">{{ visual.description }}</p>
              <p class="text-xs font-mono text-mutedText">Tools / Methodology: {{ visual.tools }}</p>
            </div>

            <span class="text-[10px] font-mono tracking-widest text-gold uppercase px-3 py-1.5 rounded bg-bgPrimary border border-gold/30 shrink-0 self-start md:self-auto">
              {{ visual.type }}
            </span>
          </div>

        </div>
      </div>
    </transition>
  `,
  setup() {
    const { computed, onMounted, onUnmounted } = Vue;

    const isOpen = computed(() => window.store.isLightboxOpen);
    const visual = computed(() => window.store.selectedVisual);

    const close = () => {
      window.store.closeLightbox();
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
      visual,
      close
    };
  }
};

window.LightboxModal = LightboxModal;
