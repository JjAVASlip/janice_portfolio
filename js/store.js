// Central Reactive Store for Janice Mas Bulanon Portfolio & Admin Management
const { reactive } = Vue;

const LOCAL_STORAGE_KEY = 'janice_portfolio_data_v1';
const AUTH_STORAGE_KEY = 'janice_portfolio_admin_auth';

const store = reactive({
  isLoaded: false,
  activeSection: 'home',
  currentView: 'portfolio', // 'portfolio' or 'admin'
  isAdminAuthenticated: sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true',
  adminTab: 'overview', // 'overview', 'profile', 'projects', 'visuals', 'skills', 'workflow', 'inbox', 'settings'
  
  // Custom cursor state
  cursor: {
    x: -100,
    y: -100,
    type: 'default',
    label: '',
    visible: false,
  },

  // Projects Case Study Modal
  isCaseStudyOpen: false,
  selectedProject: null,

  // Visual Lab Lightbox Modal
  isLightboxOpen: false,
  selectedVisual: null,

  // Toast notification system
  toast: {
    show: false,
    message: '',
    type: 'success', // 'success', 'info', 'error'
  },

  // Save status indicator
  saveStatus: 'idle', // 'idle', 'saving', 'saved', 'error'

  // Dynamic Portfolio Database
  portfolioData: JSON.parse(JSON.stringify(window.defaultPortfolioData || {})),

  // Initialize and load saved state
  async init() {
    // Check localStorage first
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        this.portfolioData = Object.assign({}, this.portfolioData, parsed);
      } catch (e) {
        console.warn('Could not parse localStorage portfolio data', e);
      }
    }

    // Try fetching from server API (api/get_data.php)
    try {
      const res = await fetch('api/get_data.php');
      if (res.ok) {
        const serverData = await res.json();
        if (serverData && serverData.profile) {
          this.portfolioData = serverData;
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(serverData));
        }
      }
    } catch (e) {
      console.log('Running in local/offline mode or PHP API unreachable. Using local storage.', e);
    }

    // Listen for hash changes to support #admin
    if (window.location.hash === '#admin') {
      this.currentView = 'admin';
    }
    window.addEventListener('hashchange', () => {
      if (window.location.hash === '#admin') {
        this.currentView = 'admin';
      } else if (window.location.hash === '' || window.location.hash === '#home') {
        this.currentView = 'portfolio';
      }
    });
  },

  // Save portfolio state to PHP Backend + LocalStorage
  async saveAll(showNotification = true) {
    this.saveStatus = 'saving';
    this.portfolioData.settings.lastSaved = new Date().toISOString();
    
    // Save to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.portfolioData));

    // Try saving to backend PHP
    try {
      const res = await fetch('api/save_data.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.portfolioData)
      });
      if (res.ok) {
        this.saveStatus = 'saved';
      } else {
        this.saveStatus = 'saved'; // local saved
      }
    } catch (e) {
      this.saveStatus = 'saved'; // local fallback saved
    }

    if (showNotification) {
      this.showToast('Changes saved successfully!', 'success');
    }

    setTimeout(() => {
      if (this.saveStatus === 'saved') this.saveStatus = 'idle';
    }, 2500);
  },

  // Reset to original starter dataset
  async resetToDefault() {
    if (confirm('Are you sure you want to reset all data back to the default portfolio template? This will overwrite custom edits.')) {
      this.portfolioData = JSON.parse(JSON.stringify(window.defaultPortfolioData));
      await this.saveAll(false);
      this.showToast('Portfolio reset to default successfully!', 'info');
    }
  },

  // Export JSON backup file
  exportData() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.portfolioData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `janice_portfolio_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.showToast('JSON backup exported successfully!', 'success');
  },

  // Import JSON backup file
  async importData(jsonContent) {
    try {
      const parsed = JSON.parse(jsonContent);
      if (parsed && parsed.profile && parsed.projects) {
        this.portfolioData = parsed;
        await this.saveAll(false);
        this.showToast('Data imported successfully!', 'success');
        return true;
      } else {
        alert('Invalid JSON structure. Missing profile or projects.');
        return false;
      }
    } catch (e) {
      alert('Error parsing JSON file: ' + e.message);
      return false;
    }
  },

  // Authentication
  loginAdmin(passcode) {
    const currentPasscode = this.portfolioData?.settings?.adminPasscode || 'admin123';
    if (passcode === currentPasscode) {
      this.isAdminAuthenticated = true;
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      this.showToast('Welcome to Admin Dashboard, Janice!', 'success');
      return true;
    }
    this.showToast('Incorrect passcode. Please try again.', 'error');
    return false;
  },

  logoutAdmin() {
    this.isAdminAuthenticated = false;
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    this.currentView = 'portfolio';
    window.location.hash = '';
    this.showToast('Logged out of Admin.', 'info');
  },

  toggleView(view) {
    this.currentView = view;
    if (view === 'admin') {
      window.location.hash = 'admin';
    } else {
      window.location.hash = 'home';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Modals & Navigation
  setLoaded(status) {
    this.isLoaded = status;
  },

  setActiveSection(sectionId) {
    this.activeSection = sectionId;
  },

  setCursor(type, label = '') {
    this.cursor.type = type;
    this.cursor.label = label;
  },

  resetCursor() {
    this.cursor.type = 'default';
    this.cursor.label = '';
  },

  openCaseStudy(project) {
    this.selectedProject = project;
    this.isCaseStudyOpen = true;
    document.body.style.overflow = 'hidden';
    this.resetCursor();
  },

  closeCaseStudy() {
    this.isCaseStudyOpen = false;
    this.selectedProject = null;
    document.body.style.overflow = '';
  },

  openLightbox(visual) {
    this.selectedVisual = visual;
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
    this.resetCursor();
  },

  closeLightbox() {
    this.isLightboxOpen = false;
    this.selectedVisual = null;
    document.body.style.overflow = '';
  },

  showToast(message, type = 'success') {
    this.toast.message = message;
    this.toast.type = type;
    this.toast.show = true;
    setTimeout(() => {
      this.toast.show = false;
    }, 3500);
  },

  scrollTo(elementId) {
    if (this.currentView !== 'portfolio') {
      this.currentView = 'portfolio';
      window.location.hash = elementId;
    }
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        const navOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        this.activeSection = elementId;
      }
    }, 50);
  }
});

// Initialize on execution
store.init();

window.store = store;
