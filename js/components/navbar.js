// Navbar Component - Dynamic from Store Data with Admin Quick-Switch
const Navbar = {
  name: 'Navbar',
  template: `
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      :class="[
        isScrolled ? 'bg-bgPrimary/85 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl' : 'bg-transparent py-6 border-b border-white/5'
      ]"
    >
      <div class="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        <!-- Left: Brand Wordmark (3 taps triggers secret Admin Dashboard) -->
        <a 
          href="#home" 
          @click.prevent="handleBrandClick"
          class="group flex items-center gap-1 text-xl md:text-2xl font-sora font-semibold tracking-wider text-primaryText transition-colors duration-300 cursor-pointer select-none"
          @mouseenter="onHover('link')"
          @mouseleave="onLeave"
          title="Janice Portfolio"
        >
          <span>{{ profile.brandName || 'JANICE' }}</span>
          <span class="w-1.5 h-1.5 rounded-full bg-gold inline-block animate-pulse"></span>
        </a>

        <!-- Center: Desktop Navigation Links -->
        <nav class="hidden lg:flex items-center space-x-8">
          <a 
            v-for="link in navLinks" 
            :key="link.id"
            :href="'#' + link.id"
            @click.prevent="scrollTo(link.id)"
            class="relative text-xs tracking-widest uppercase transition-all duration-300 py-1"
            :class="[
              activeSection === link.id 
                ? 'text-primaryText font-medium -translate-y-0.5' 
                : 'text-secondaryText hover:text-primaryText hover:-translate-y-0.5'
            ]"
            @mouseenter="onHover('link')"
            @mouseleave="onLeave"
          >
            {{ link.label }}
            
            <!-- Active Gold Indicator -->
            <span 
              class="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold via-softGold to-gold transition-all duration-300 rounded-full"
              :class="activeSection === link.id ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full'"
            ></span>
          </a>
        </nav>

        <!-- Right: Actions (CTA) -->
        <div class="hidden lg:flex items-center space-x-3">

          <!-- Get in Touch CTA -->
          <a 
            href="#contact"
            @click.prevent="scrollTo('contact')"
            class="relative group overflow-hidden px-5 py-2.5 rounded-full border border-gold/40 text-xs font-sora tracking-widest text-primaryText uppercase transition-all duration-300 hover:border-gold hover:shadow-glow-gold"
            @mouseenter="onHover('button')"
            @mouseleave="onLeave"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-electricBlue/20 to-royalPurple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <span class="relative z-10 flex items-center gap-2">
              <span>GET IN TOUCH</span>
              <span class="text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
            </span>
          </a>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <button 
          @click="toggleMobileMenu"
          class="lg:hidden p-2 text-primaryText focus:outline-none"
          aria-label="Toggle Menu"
          @mouseenter="onHover('button')"
          @mouseleave="onLeave"
        >
          <div class="w-6 h-5 relative flex flex-col justify-between">
            <span 
              class="w-full h-0.5 bg-primaryText transition-all duration-300"
              :class="isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-gold' : ''"
            ></span>
            <span 
              class="w-3/4 h-0.5 bg-primaryText transition-all duration-300"
              :class="isMobileMenuOpen ? 'opacity-0' : ''"
            ></span>
            <span 
              class="w-full h-0.5 bg-primaryText transition-all duration-300"
              :class="isMobileMenuOpen ? '-rotate-45 -translate-y-2 bg-gold' : ''"
            ></span>
          </div>
        </button>

      </div>

      <!-- Mobile Dropdown Drawer -->
      <transition name="slide-fade">
        <div 
          v-if="isMobileMenuOpen"
          class="lg:hidden fixed inset-x-0 top-[65px] bg-bgPrimary/95 backdrop-blur-xl border-b border-white/10 px-8 py-8 shadow-2xl transition-all duration-300"
        >
          <div class="flex flex-col space-y-6">
            <a 
              v-for="link in navLinks" 
              :key="link.id"
              :href="'#' + link.id"
              @click.prevent="scrollTo(link.id); isMobileMenuOpen = false;"
              class="flex items-center justify-between text-sm tracking-widest uppercase transition-colors"
              :class="activeSection === link.id ? 'text-gold font-medium' : 'text-secondaryText hover:text-primaryText'"
            >
              <span>{{ link.label }}</span>
              <span class="text-xs font-mono text-mutedText">{{ link.number }}</span>
            </a>

            <div class="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a 
                href="#contact"
                @click.prevent="scrollTo('contact'); isMobileMenuOpen = false;"
                class="w-full text-center py-3 rounded-full border border-gold/40 text-xs font-sora tracking-widest text-primaryText uppercase hover:border-gold"
              >
                GET IN TOUCH ↗
              </a>
            </div>
          </div>
        </div>
      </transition>
    </header>
  `,
  setup() {
    const { ref, computed, onMounted, onUnmounted } = Vue;
    const isScrolled = ref(false);
    const isMobileMenuOpen = ref(false);

    const profile = computed(() => window.store.portfolioData.profile);
    const navLinks = window.navigationConfig.links;
    const activeSection = computed(() => window.store.activeSection);

    const onScroll = () => {
      isScrolled.value = window.scrollY > 40;
    };

    const brandTapCount = ref(0);
    let brandTapTimer = null;

    const handleBrandClick = () => {
      brandTapCount.value++;
      
      if (brandTapTimer) clearTimeout(brandTapTimer);

      if (brandTapCount.value >= 3) {
        brandTapCount.value = 0;
        if (window.store.showToast) {
          window.store.showToast('🔐 Secret Admin Access Unlocked', 'info');
        }
        openAdmin();
      } else {
        scrollTo('home');
        brandTapTimer = setTimeout(() => {
          brandTapCount.value = 0;
        }, 1500);
      }
    };

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const scrollTo = (id) => {
      window.store.scrollTo(id);
    };

    const openAdmin = () => {
      window.store.toggleView('admin');
    };

    const onHover = (type) => {
      window.store.setCursor(type);
    };

    const onLeave = () => {
      window.store.resetCursor();
    };

    onMounted(() => {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll);
    });

    return {
      profile,
      isScrolled,
      isMobileMenuOpen,
      navLinks,
      activeSection,
      handleBrandClick,
      toggleMobileMenu,
      scrollTo,
      openAdmin,
      onHover,
      onLeave
    };
  }
};

window.Navbar = Navbar;
