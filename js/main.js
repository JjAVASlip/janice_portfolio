// Main Application Bootstrap for Janice Mas Bulanon Portfolio & Admin Dashboard
const { createApp, computed, onMounted, onUnmounted } = Vue;

const App = {
  template: `
    <div class="min-h-screen bg-bgPrimary text-primaryText font-sora antialiased selection:bg-gold selection:text-bgPrimary relative">
      
      <!-- Custom Cursor (Desktop) -->
      <CustomCursor v-if="currentView === 'portfolio'" />

      <!-- Page Loader Animation (On initial load) -->
      <PageLoader v-if="currentView === 'portfolio'" />

      <!-- PUBLIC PORTFOLIO VIEW -->
      <div v-if="currentView === 'portfolio'">
        <!-- Sticky Editorial Navigation Bar -->
        <Navbar />

        <!-- Main Home Storytelling View -->
        <HomeView />

        <!-- Footer Section -->
        <FooterSection />

        <!-- Modals -->
        <CaseStudyModal />
        <LightboxModal />
      </div>

      <!-- ADMIN DASHBOARD VIEW -->
      <div v-else-if="currentView === 'admin'">
        <AdminView />
      </div>

      <!-- Global Toast Notification -->
      <transition name="fade">
        <div 
          v-if="toast.show" 
          class="fixed bottom-6 right-6 z-[120] px-5 py-3 rounded-2xl bg-bgSecondary/95 backdrop-blur-md border border-gold/40 text-xs font-sora text-primaryText shadow-2xl flex items-center gap-3"
        >
          <span 
            class="w-2 h-2 rounded-full"
            :class="toast.type === 'error' ? 'bg-rose-500 animate-ping' : 'bg-gold animate-ping'"
          ></span>
          <span>{{ toast.message }}</span>
        </div>
      </transition>

    </div>
  `,
  setup() {
    const toast = computed(() => window.store.toast);
    const currentView = computed(() => window.store.currentView);

    const onKeyDown = (e) => {
      // Shortcut Alt + A to toggle Admin Dashboard
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        window.store.toggleView(currentView.value === 'portfolio' ? 'admin' : 'portfolio');
      }
    };

    onMounted(() => {
      window.addEventListener('keydown', onKeyDown);

      // Intersection Observer to track active section dynamically during scroll
      const sections = ['home', 'about', 'projects', 'visual-lab', 'skills', 'workflow', 'contact'];
      
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && currentView.value === 'portfolio') {
            window.store.setActiveSection(entry.target.id);
          }
        });
      }, observerOptions);

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', onKeyDown);
    });

    return {
      toast,
      currentView
    };
  }
};

// Create and Mount App
const app = createApp(App);

// Register Global Components
app.component('CustomCursor', window.CustomCursor);
app.component('PageLoader', window.PageLoader);
app.component('Navbar', window.Navbar);
app.component('HeroSection', window.HeroSection);
app.component('AboutSection', window.AboutSection);
app.component('ProjectCard', window.ProjectCard);
app.component('ProjectSection', window.ProjectSection);
app.component('CaseStudyModal', window.CaseStudyModal);
app.component('VisualLab', window.VisualLab);
app.component('LightboxModal', window.LightboxModal);
app.component('SkillsSection', window.SkillsSection);
app.component('WorkflowSection', window.WorkflowSection);
app.component('ContactSection', window.ContactSection);
app.component('FooterSection', window.FooterSection);
app.component('HomeView', window.HomeView);
app.component('AdminView', window.AdminView);

if (window.appRouter) {
  app.use(window.appRouter);
}

app.mount('#app');
