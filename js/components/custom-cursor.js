// Custom Cursor Component for Desktop
const CustomCursor = {
  name: 'CustomCursor',
  template: `
    <div 
      v-if="isEnabled" 
      class="pointer-events-none fixed z-[9999] transition-opacity duration-300 hidden md:block"
      :class="isVisible ? 'opacity-100' : 'opacity-0'"
      :style="cursorStyle"
    >
      <!-- Center Dot / Expanded Bubble -->
      <div 
        class="flex items-center justify-center rounded-full transition-all duration-300 ease-out transform -translate-x-1/2 -translate-y-1/2"
        :class="bubbleClasses"
        :style="bubbleStyle"
      >
        <span 
          v-if="cursorState.label" 
          class="text-[9px] font-sora font-semibold tracking-widest text-primaryText uppercase text-center px-2 select-none animate-fadeIn"
        >
          {{ cursorState.label }}
        </span>
      </div>
    </div>
  `,
  setup() {
    const { ref, reactive, computed, onMounted, onUnmounted } = Vue;
    const isEnabled = ref(false);
    const isVisible = ref(false);
    const mousePos = reactive({ x: -100, y: -100 });
    const currentPos = reactive({ x: -100, y: -100 });
    let animationFrameId = null;

    const cursorState = computed(() => window.store.cursor);

    const cursorStyle = computed(() => ({
      transform: `translate3d(${currentPos.x}px, ${currentPos.y}px, 0)`,
    }));

    const bubbleClasses = computed(() => {
      switch (cursorState.value.type) {
        case 'project':
          return 'w-24 h-24 bg-electricBlue/20 backdrop-blur-md border border-gold/60 text-white shadow-glow-gold';
        case 'view':
          return 'w-16 h-16 bg-royalPurple/30 backdrop-blur-md border border-white/30 text-white shadow-glow-purple';
        case 'link':
          return 'w-10 h-10 bg-gold/20 border border-gold text-gold scale-125';
        case 'button':
          return 'w-12 h-12 bg-white/10 border border-white/40 scale-110';
        default:
          return 'w-3.5 h-3.5 bg-gold rounded-full shadow-[0_0_10px_#D4AF37]';
      }
    });

    const bubbleStyle = computed(() => {
      if (cursorState.value.type === 'default') {
        return {
          boxShadow: '0 0 12px rgba(212, 175, 55, 0.8), 0 0 24px rgba(40, 100, 255, 0.4)'
        };
      }
      return {};
    });

    const updateSmoothPosition = () => {
      // Linear interpolation for smooth trailing feel
      const ease = 0.2;
      currentPos.x += (mousePos.x - currentPos.x) * ease;
      currentPos.y += (mousePos.y - currentPos.y) * ease;
      animationFrameId = requestAnimationFrame(updateSmoothPosition);
    };

    const onMouseMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      if (!isVisible.value) isVisible.value = true;
    };

    const onMouseLeave = () => {
      isVisible.value = false;
    };

    onMounted(() => {
      // Check for touch device or reduced motion preference
      const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (!isTouch && !prefersReducedMotion) {
        isEnabled.value = true;
        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
        animationFrameId = requestAnimationFrame(updateSmoothPosition);
      }
    });

    onUnmounted(() => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    });

    return {
      isEnabled,
      isVisible,
      cursorState,
      cursorStyle,
      bubbleClasses,
      bubbleStyle
    };
  }
};

window.CustomCursor = CustomCursor;
