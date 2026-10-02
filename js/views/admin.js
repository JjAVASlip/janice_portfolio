// Admin Dashboard View Component - Modern Control Center for Janice Mas Bulanon
const AdminView = {
  name: 'AdminView',
  template: `
    <div class="min-h-screen bg-[#05070D] text-primaryText font-sora flex flex-col selection:bg-gold selection:text-bgPrimary">
      
      <!-- 1. AUTHENTICATION LOCK SCREEN (If not logged in) -->
      <div 
        v-if="!isAuthenticated" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bgPrimary/95 backdrop-blur-2xl"
      >
        <!-- Atmospheric Ambient Aura -->
        <div class="absolute w-[500px] h-[500px] rounded-full bg-royalPurple/20 blur-[160px] pointer-events-none"></div>
        <div class="absolute w-[400px] h-[400px] rounded-full bg-electricBlue/15 blur-[140px] pointer-events-none translate-x-20"></div>

        <div class="relative w-full max-w-md p-8 rounded-3xl bg-bgSecondary/90 border border-white/15 shadow-2xl text-center space-y-6">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-electricBlue/20 to-royalPurple/30 border border-gold/40 flex items-center justify-center shadow-glow-gold">
            <span class="text-2xl">🔐</span>
          </div>

          <div class="space-y-1">
            <h2 class="text-2xl font-bold tracking-tight text-primaryText">Admin Dashboard</h2>
            <p class="text-xs font-mono text-secondaryText">Janice Mas Bulanon Portfolio Control Center</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4 text-left">
            <div>
              <label class="block text-[10px] font-mono tracking-widest text-gold uppercase mb-2">
                ADMIN PASSCODE
              </label>
              <input 
                type="password" 
                v-model="passcodeInput" 
                placeholder="Enter passcode (default: admin123)" 
                autofocus
                class="w-full px-4 py-3 rounded-xl bg-bgPrimary border border-white/15 text-sm font-mono text-primaryText focus:border-gold focus:outline-none transition-colors"
              />
              <p class="text-[10px] font-mono text-mutedText mt-1.5">
                Default passcode is: <span class="text-softGold">admin123</span> (Changeable in settings)
              </p>
            </div>

            <button 
              type="submit"
              class="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold via-softGold to-gold text-bgPrimary font-bold text-xs tracking-widest uppercase hover:shadow-glow-gold transition-all duration-300 transform active:scale-95"
            >
              UNLOCK CONTROL CENTER
            </button>
          </form>

          <div class="pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono">
            <button 
              @click="returnToPortfolio" 
              class="text-secondaryText hover:text-softGold transition-colors"
            >
              ← Back to Live Portfolio
            </button>
            <span class="text-mutedText">v2.0 • Secured</span>
          </div>
        </div>
      </div>

      <!-- 2. MAIN DASHBOARD LAYOUT (When authenticated) -->
      <div v-else class="flex-1 flex flex-col md:flex-row relative">
        
        <!-- Mobile Sidebar Overlay Backdrop -->
        <transition name="fade">
          <div 
            v-if="isSidebarOpen" 
            @click="isSidebarOpen = false" 
            class="md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          ></div>
        </transition>

        <!-- Sidebar Navigation Drawer -->
        <aside 
          class="fixed md:static inset-y-0 left-0 z-50 w-72 md:w-64 bg-bgSecondary border-r border-white/10 flex flex-col justify-between shrink-0 p-5 min-h-screen transition-transform duration-300 transform md:transform-none overflow-y-auto"
          :class="isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'"
        >
          <div class="space-y-6">
            <!-- Brand & Admin Status + Mobile Close Button -->
            <div class="pb-5 border-b border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-royalPurple/40 to-electricBlue/30 border border-gold/40 flex items-center justify-center font-bold text-softGold text-xs">
                  JB
                </div>
                <div>
                  <h1 class="text-sm font-bold text-primaryText tracking-wide">JANICE ADMIN</h1>
                  <div class="flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span class="text-[10px] font-mono text-emerald-400">Online & Synced</span>
                  </div>
                </div>
              </div>

              <!-- Mobile Close Drawer Button -->
              <button 
                @click="isSidebarOpen = false" 
                class="md:hidden p-2 rounded-lg text-mutedText hover:text-white hover:bg-white/10 text-base transition-colors"
                aria-label="Close Sidebar"
              >
                ✕
              </button>
            </div>

            <!-- Navigation Links -->
            <nav class="space-y-1.5">
              <button 
                v-for="tab in navTabs" 
                :key="tab.id"
                @click="selectTab(tab.id)"
                class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 text-left"
                :class="[
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-electricBlue/20 to-royalPurple/20 border border-gold/40 text-softGold shadow-sm font-semibold' 
                    : 'text-secondaryText hover:bg-white/5 hover:text-primaryText border border-transparent'
                ]"
              >
                <div class="flex items-center gap-3">
                  <span class="text-base">{{ tab.icon }}</span>
                  <span>{{ tab.label }}</span>
                </div>
                
                <!-- Unread Messages Badge -->
                <span 
                  v-if="tab.id === 'inbox' && unreadCount > 0"
                  class="px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold"
                >
                  {{ unreadCount }}
                </span>
              </button>
            </nav>
          </div>

          <!-- Bottom Actions -->
          <div class="pt-6 border-t border-white/10 space-y-2 mt-6">
            <button 
              @click="returnToPortfolio"
              class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-primaryText transition-colors"
            >
              <span>VIEW LIVE SITE</span>
              <span class="text-gold">↗</span>
            </button>

            <button 
              @click="handleLogout"
              class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-rose-500/10 text-xs font-mono text-rose-400 transition-colors"
            >
              <span>LOGOUT</span>
              <span>✕</span>
            </button>
          </div>

        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 flex flex-col overflow-y-auto max-h-screen min-w-0">
          
          <!-- Sticky Topbar Header -->
          <header class="h-16 px-4 md:px-10 bg-bgSecondary/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between sticky top-0 z-30 shrink-0">
            <!-- Left: Hamburger Button + Breadcrumbs -->
            <div class="flex items-center gap-2.5 md:gap-3 overflow-hidden">
              <!-- Hamburger Menu Toggle Button (Mobile Only) -->
              <button 
                @click="isSidebarOpen = !isSidebarOpen"
                class="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-primaryText hover:bg-white/10 hover:text-gold transition-colors shrink-0"
                title="Toggle Sidebar Navigation"
                aria-label="Toggle Sidebar Navigation"
              >
                <div class="w-5 h-4 flex flex-col justify-between">
                  <span class="w-full h-0.5 bg-current rounded-full"></span>
                  <span class="w-full h-0.5 bg-current rounded-full"></span>
                  <span class="w-full h-0.5 bg-current rounded-full"></span>
                </div>
              </button>

              <div class="flex items-center gap-1.5 md:gap-3 truncate">
                <span class="text-[10px] md:text-xs font-mono text-gold uppercase tracking-wider md:tracking-widest shrink-0">DASHBOARD</span>
                <span class="text-white/20 text-xs">/</span>
                <span class="text-xs md:text-sm font-semibold text-primaryText uppercase truncate">{{ currentTabTitle }}</span>
              </div>
            </div>

            <!-- Right: Save Status & Responsive Button -->
            <div class="flex items-center gap-2 md:gap-3 shrink-0">
              <!-- Save Status Indicator -->
              <span 
                v-if="saveStatus === 'saving'" 
                class="hidden sm:flex text-[11px] font-mono text-softGold animate-pulse items-center gap-1.5"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-softGold animate-ping"></span>
                Saving...
              </span>
              <span 
                v-else-if="saveStatus === 'saved'" 
                class="hidden sm:flex text-[11px] font-mono text-emerald-400 items-center gap-1"
              >
                ✓ Saved
              </span>

              <!-- Manual Save Button -->
              <button 
                @click="saveChanges"
                class="px-3 md:px-4 py-2 rounded-xl bg-gold text-bgPrimary font-bold text-[11px] md:text-xs font-mono tracking-wider uppercase hover:bg-softGold hover:shadow-glow-gold transition-all duration-200 flex items-center gap-1.5 shrink-0"
              >
                <span class="hidden sm:inline">SAVE ALL CHANGES</span>
                <span class="sm:hidden">SAVE</span>
                <span>💾</span>
              </button>
            </div>
          </header>

          <!-- Tab Content Views -->
          <div class="p-6 md:p-10 flex-1 space-y-8 pb-20">
            
            <!-- 1. OVERVIEW TAB -->
            <div v-if="activeTab === 'overview'" class="space-y-8 animate-fadeIn">
              
              <!-- Quick Stats Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div class="p-6 rounded-2xl bg-bgSecondary/80 border border-white/10 space-y-2">
                  <div class="flex items-center justify-between text-secondaryText">
                    <span class="text-xs font-mono uppercase">Projects</span>
                    <span class="text-xl">📁</span>
                  </div>
                  <div class="text-3xl font-extrabold text-primaryText">{{ data.projects.length }}</div>
                  <p class="text-[11px] font-mono text-softGold">Live in Selected Work</p>
                </div>

                <div class="p-6 rounded-2xl bg-bgSecondary/80 border border-white/10 space-y-2">
                  <div class="flex items-center justify-between text-secondaryText">
                    <span class="text-xs font-mono uppercase">Visual Lab Items</span>
                    <span class="text-xl">🎨</span>
                  </div>
                  <div class="text-3xl font-extrabold text-primaryText">{{ data.visuals.length }}</div>
                  <p class="text-[11px] font-mono text-electricBlue">Diagrams, UI & DFDs</p>
                </div>

                <div class="p-6 rounded-2xl bg-bgSecondary/80 border border-white/10 space-y-2">
                  <div class="flex items-center justify-between text-secondaryText">
                    <span class="text-xs font-mono uppercase">Skill Domains</span>
                    <span class="text-xl">⚡</span>
                  </div>
                  <div class="text-3xl font-extrabold text-primaryText">{{ totalSkillsCount }}</div>
                  <p class="text-[11px] font-mono text-emerald-400">Across 4 Categories</p>
                </div>

                <div class="p-6 rounded-2xl bg-bgSecondary/80 border border-white/10 space-y-2">
                  <div class="flex items-center justify-between text-secondaryText">
                    <span class="text-xs font-mono uppercase">Inbox Inquiries</span>
                    <span class="text-xl">📬</span>
                  </div>
                  <div class="text-3xl font-extrabold text-primaryText">{{ data.inbox ? data.inbox.length : 0 }}</div>
                  <p class="text-[11px] font-mono text-rose-400">{{ unreadCount }} Unread Messages</p>
                </div>
              </div>

              <!-- Quick Jump Action Cards -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                  @click="activeTab = 'projects'"
                  class="p-6 rounded-2xl bg-gradient-to-br from-deepNavy/60 to-bgSecondary border border-white/10 hover:border-gold/40 cursor-pointer transition-all duration-300 space-y-3 group"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-mono text-gold uppercase">FEATURED PROJECTS</span>
                    <span class="text-gold group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <h3 class="text-base font-bold text-primaryText">Manage Academic Work</h3>
                  <p class="text-xs text-secondaryText leading-relaxed">Add new course projects, edit descriptions, adjust case study problem & approach breakdowns.</p>
                </div>

                <div 
                  @click="activeTab = 'profile'"
                  class="p-6 rounded-2xl bg-gradient-to-br from-deepPurple/40 to-bgSecondary border border-white/10 hover:border-royalPurple/50 cursor-pointer transition-all duration-300 space-y-3 group"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-mono text-royalPurple uppercase">BIOGRAPHY & NCST DATA</span>
                    <span class="text-royalPurple group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <h3 class="text-base font-bold text-primaryText">Edit Personal Narrative</h3>
                  <p class="text-xs text-secondaryText leading-relaxed">Update bio paragraphs, academic standing, honors received, quote, and portrait image URLs.</p>
                </div>

                <div 
                  @click="activeTab = 'inbox'"
                  class="p-6 rounded-2xl bg-gradient-to-br from-electricBlue/20 to-bgSecondary border border-white/10 hover:border-electricBlue/50 cursor-pointer transition-all duration-300 space-y-3 group"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-mono text-electricBlue uppercase">CONTACT INQUIRIES</span>
                    <span class="text-electricBlue group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <h3 class="text-base font-bold text-primaryText">Check Recent Messages</h3>
                  <p class="text-xs text-secondaryText leading-relaxed">Review submissions from professors, recruiters, and capstone collaborators directly.</p>
                </div>
              </div>

              <!-- Quick Overview Info Card -->
              <div class="p-8 rounded-3xl bg-bgSecondary border border-white/10 space-y-4">
                <div class="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 class="text-sm font-mono tracking-wider text-gold uppercase">CURRENT LIVE IDENTITY</h3>
                  <span class="text-xs font-mono text-mutedText">Last saved: {{ formatDate(data.settings.lastSaved) }}</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div>
                    <span class="text-mutedText uppercase block mb-1">Full Name & Degree</span>
                    <p class="text-sm font-semibold text-primaryText">{{ data.profile.name }}</p>
                    <p class="text-secondaryText">{{ data.profile.degree }} ({{ data.profile.educationLevel }})</p>
                  </div>
                  <div>
                    <span class="text-mutedText uppercase block mb-1">College Institution</span>
                    <p class="text-sm font-semibold text-primaryText">{{ data.profile.college }}</p>
                    <p class="text-secondaryText">Cavite Campus</p>
                  </div>
                </div>
              </div>

            </div>

            <!-- 2. PROFILE & IDENTITY TAB -->
            <div v-if="activeTab === 'profile'" class="space-y-8 animate-fadeIn">
              <div class="p-8 rounded-3xl bg-bgSecondary border border-white/10 space-y-6">
                <div class="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 class="text-sm font-mono tracking-wider text-gold uppercase">HERO & MAIN BRANDING</h3>
                  <span class="text-xs font-mono text-mutedText">Affects Hero & Navigation</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">FULL NAME</label>
                    <input type="text" v-model="data.profile.name" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">NAV BRAND WORDMARK</label>
                    <input type="text" v-model="data.profile.brandName" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">PRIMARY ROLE BADGE</label>
                    <input type="text" v-model="data.profile.role" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none" />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">HEADLINE LINE 1</label>
                    <input type="text" v-model="data.profile.headlineLine1" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">HEADLINE GRADIENT WORD</label>
                    <input type="text" v-model="data.profile.headlineGradient" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">HEADLINE LINE 3</label>
                    <input type="text" v-model="data.profile.headlineLine3" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">HERO SUPPORTING BIO</label>
                  <textarea v-model="data.profile.heroBio" rows="2" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none resize-none"></textarea>
                </div>
              </div>

              <!-- About & Academic Details -->
              <div class="p-8 rounded-3xl bg-bgSecondary border border-white/10 space-y-6">
                <div class="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 class="text-sm font-mono tracking-wider text-gold uppercase">ABOUT SECTION & ACADEMIC RECORDS</h3>
                  <span class="text-xs font-mono text-mutedText">02 / ABOUT SECTION</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">DEGREE PROGRAM</label>
                    <input type="text" v-model="data.profile.degree" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">YEAR LEVEL STANDING</label>
                    <input type="text" v-model="data.profile.educationLevel" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">COLLEGE / UNIVERSITY</label>
                    <input type="text" v-model="data.profile.college" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">SENIOR HIGH SCHOOL</label>
                    <input type="text" v-model="data.profile.shs" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none" />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">ABOUT PARAGRAPH 1</label>
                    <textarea v-model="data.profile.aboutBio1" rows="3" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none"></textarea>
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">ABOUT PARAGRAPH 2</label>
                    <textarea v-model="data.profile.aboutBio2" rows="3" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none"></textarea>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">FAVORITE QUOTE</label>
                    <input type="text" v-model="data.profile.quote" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">PHILOSOPHY STATEMENT</label>
                    <input type="text" v-model="data.profile.philosophy" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none" />
                  </div>
                </div>

                <!-- Photos & Image Paths -->
                <div class="pt-4 border-t border-white/10 space-y-4">
                  <span class="text-xs font-mono text-gold uppercase">PROFILE & COLLAGE IMAGES</span>
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">HERO PORTRAIT</label>
                      <input type="text" v-model="data.profile.portraitImage" class="w-full px-3 py-2 rounded-lg bg-bgPrimary border border-white/15 text-xs text-primaryText mb-2" />
                      <input type="file" @change="uploadImage($event, 'portraitImage')" class="text-[10px] text-mutedText file:py-1 file:px-2 file:rounded file:border-0 file:bg-white/10 file:text-white" />
                    </div>
                    <div>
                      <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">ABOUT PHOTO 1</label>
                      <input type="text" v-model="data.profile.aboutImage1" class="w-full px-3 py-2 rounded-lg bg-bgPrimary border border-white/15 text-xs text-primaryText mb-2" />
                      <input type="file" @change="uploadImage($event, 'aboutImage1')" class="text-[10px] text-mutedText file:py-1 file:px-2 file:rounded file:border-0 file:bg-white/10 file:text-white" />
                    </div>
                    <div>
                      <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">ABOUT PHOTO 2</label>
                      <input type="text" v-model="data.profile.aboutImage2" class="w-full px-3 py-2 rounded-lg bg-bgPrimary border border-white/15 text-xs text-primaryText mb-2" />
                      <input type="file" @change="uploadImage($event, 'aboutImage2')" class="text-[10px] text-mutedText file:py-1 file:px-2 file:rounded file:border-0 file:bg-white/10 file:text-white" />
                    </div>
                    <div>
                      <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">ABOUT PHOTO 3</label>
                      <input type="text" v-model="data.profile.aboutImage3" class="w-full px-3 py-2 rounded-lg bg-bgPrimary border border-white/15 text-xs text-primaryText mb-2" />
                      <input type="file" @change="uploadImage($event, 'aboutImage3')" class="text-[10px] text-mutedText file:py-1 file:px-2 file:rounded file:border-0 file:bg-white/10 file:text-white" />
                    </div>
                  </div>
                </div>

                <!-- Contact & Socials -->
                <div class="pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">EMAIL ADDRESS</label>
                    <input type="email" v-model="data.profile.email" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">LINKEDIN URL</label>
                    <input type="text" v-model="data.profile.linkedin" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-2">GITHUB URL</label>
                    <input type="text" v-model="data.profile.github" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText focus:border-gold focus:outline-none" />
                  </div>
                </div>

              </div>
            </div>

            <!-- 3. PROJECTS MANAGER TAB -->
            <div v-if="activeTab === 'projects'" class="space-y-6 animate-fadeIn">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-bold text-primaryText">Academic Projects Showcase</h3>
                  <p class="text-xs text-secondaryText">Manage projects displayed in the horizontal showcase and case study modals.</p>
                </div>
                <button 
                  @click="openProjectModal(null)"
                  class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-electricBlue to-royalPurple text-xs font-mono font-bold text-white shadow-glow-purple flex items-center gap-2 hover:opacity-90"
                >
                  <span>+ ADD NEW PROJECT</span>
                </button>
              </div>

              <!-- Projects List Cards -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  v-for="(proj, idx) in data.projects" 
                  :key="proj.id"
                  class="p-6 rounded-2xl bg-bgSecondary border border-white/10 space-y-4 relative group"
                >
                  <div class="flex items-center justify-between border-b border-white/10 pb-3">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-mono font-bold text-gold">#{{ String(idx + 1).padStart(2, '0') }}</span>
                      <span class="text-xs font-mono text-secondaryText uppercase">{{ proj.category }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <button @click="openProjectModal(proj)" class="p-1.5 rounded-lg bg-white/5 hover:bg-gold hover:text-bgPrimary text-xs text-secondaryText transition-colors" title="Edit Project">
                        ✏️ Edit
                      </button>
                      <button @click="deleteProject(idx)" class="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500 hover:text-white text-xs text-secondaryText transition-colors" title="Delete Project">
                        🗑️
                      </button>
                    </div>
                  </div>

                  <div class="flex gap-4 items-start">
                    <div class="w-24 h-16 rounded-xl bg-deepNavy overflow-hidden shrink-0 border border-white/10">
                      <img :src="proj.image" class="w-full h-full object-cover" onerror="this.src='assets/images/studyquest.jpg'" />
                    </div>
                    <div>
                      <h4 class="text-base font-bold text-primaryText">{{ proj.title }}</h4>
                      <p class="text-xs text-secondaryText line-clamp-2 mt-1">{{ proj.description }}</p>
                    </div>
                  </div>

                  <div class="text-[11px] font-mono text-gold bg-bgPrimary/60 p-2.5 rounded-xl">
                    <span class="text-mutedText">Role: </span>{{ proj.role }}
                  </div>

                  <div class="flex flex-wrap gap-1.5">
                    <span v-for="t in proj.technologies" :key="t" class="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-secondaryText">
                      {{ t }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 4. VISUAL LAB TAB -->
            <div v-if="activeTab === 'visuals'" class="space-y-6 animate-fadeIn">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-bold text-primaryText">Visual Lab Artifacts</h3>
                  <p class="text-xs text-secondaryText">Manage ERDs, flowcharts, Figma UI mockups, and QA testing matrices.</p>
                </div>
                <button 
                  @click="openVisualModal(null)"
                  class="px-4 py-2.5 rounded-xl bg-gold text-bgPrimary font-bold text-xs font-mono tracking-wider uppercase shadow-glow-gold hover:bg-softGold"
                >
                  <span>+ ADD VISUAL ARTIFACT</span>
                </button>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  v-for="(vis, idx) in data.visuals" 
                  :key="vis.id"
                  class="p-5 rounded-2xl bg-bgSecondary border border-white/10 space-y-3"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-mono text-gold uppercase">{{ vis.category }}</span>
                    <div class="flex items-center gap-1.5">
                      <button @click="openVisualModal(vis)" class="text-xs text-secondaryText hover:text-gold">✏️</button>
                      <button @click="deleteVisual(idx)" class="text-xs text-secondaryText hover:text-rose-400">🗑️</button>
                    </div>
                  </div>

                  <div class="aspect-[16/9] rounded-xl bg-deepNavy overflow-hidden border border-white/10">
                    <img :src="vis.image" class="w-full h-full object-cover" />
                  </div>

                  <div>
                    <h4 class="text-sm font-bold text-primaryText">{{ vis.title }}</h4>
                    <p class="text-xs text-mutedText mt-0.5">Tools: {{ vis.tools }}</p>
                    <p class="text-xs text-secondaryText line-clamp-2 mt-1">{{ vis.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 5. SKILLS TAB -->
            <div v-if="activeTab === 'skills'" class="space-y-6 animate-fadeIn">
              <div>
                <h3 class="text-lg font-bold text-primaryText">Skills & Competency Domains</h3>
                <p class="text-xs text-secondaryText">Manage skill domains and toggle proficiency badges (FAMILIAR, LEARNING, EXPLORING).</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  v-for="group in data.skills" 
                  :key="group.id"
                  class="p-6 rounded-2xl bg-bgSecondary border border-white/10 space-y-4"
                >
                  <div class="flex items-center justify-between border-b border-white/10 pb-3">
                    <div class="flex items-center gap-2">
                      <span class="text-xl">{{ group.icon }}</span>
                      <div>
                        <h4 class="text-sm font-bold text-primaryText">{{ group.title }}</h4>
                        <p class="text-[10px] font-mono text-mutedText">{{ group.subtitle }}</p>
                      </div>
                    </div>
                    <button @click="addSkillItem(group)" class="text-xs font-mono text-gold hover:underline">+ Add Skill</button>
                  </div>

                  <div class="space-y-2">
                    <div 
                      v-for="(skill, sIdx) in group.skills" 
                      :key="sIdx"
                      class="flex items-center justify-between p-2 rounded-xl bg-bgPrimary border border-white/5 gap-2"
                    >
                      <input type="text" v-model="skill.name" class="bg-transparent text-xs text-primaryText focus:outline-none flex-1" />
                      
                      <select v-model="skill.status" class="bg-bgSecondary border border-white/15 text-[10px] font-mono px-2 py-1 rounded text-softGold focus:outline-none">
                        <option value="FAMILIAR">FAMILIAR</option>
                        <option value="LEARNING">LEARNING</option>
                        <option value="EXPLORING">EXPLORING</option>
                      </select>

                      <button @click="removeSkillItem(group, sIdx)" class="text-xs text-mutedText hover:text-rose-400 px-1">✕</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 6. WORKFLOW TAB -->
            <div v-if="activeTab === 'workflow'" class="space-y-6 animate-fadeIn">
              <div>
                <h3 class="text-lg font-bold text-primaryText">5-Stage Workflow Pipeline</h3>
                <p class="text-xs text-secondaryText">Edit the step-by-step methodology from Problem Planning to Testing & QA.</p>
              </div>

              <div class="space-y-6">
                <div 
                  v-for="(stage, wIdx) in data.workflow" 
                  :key="stage.number"
                  class="p-6 rounded-2xl bg-bgSecondary border border-white/10 space-y-4"
                >
                  <div class="flex items-center justify-between border-b border-white/10 pb-3">
                    <div class="flex items-center gap-3">
                      <span class="text-xs font-mono font-bold text-gold">STEP {{ stage.number }}</span>
                      <input type="text" v-model="stage.title" class="text-sm font-bold bg-transparent text-primaryText border-b border-white/20 focus:border-gold focus:outline-none" />
                      <input type="text" v-model="stage.phase" class="text-xs font-mono text-mutedText bg-transparent border-b border-white/10 focus:outline-none" />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">TAGLINE</label>
                      <input type="text" v-model="stage.tagline" class="w-full px-3 py-2 rounded-lg bg-bgPrimary border border-white/15 text-xs text-primaryText" />
                    </div>
                    <div>
                      <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">HEADLINE</label>
                      <input type="text" v-model="stage.headline" class="w-full px-3 py-2 rounded-lg bg-bgPrimary border border-white/15 text-xs text-primaryText" />
                    </div>
                  </div>

                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">DETAILED DESCRIPTION</label>
                    <textarea v-model="stage.detailedDesc" rows="2" class="w-full px-3 py-2 rounded-lg bg-bgPrimary border border-white/15 text-xs text-primaryText"></textarea>
                  </div>

                  <div>
                    <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">PERSONAL FOCUS INSIGHT</label>
                    <input type="text" v-model="stage.personalFocus" class="w-full px-3 py-2 rounded-lg bg-bgPrimary border border-white/15 text-xs text-primaryText" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 7. INBOX TAB -->
            <div v-if="activeTab === 'inbox'" class="space-y-6 animate-fadeIn">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-bold text-primaryText">Visitor & Inquiries Inbox</h3>
                  <p class="text-xs text-secondaryText">Messages sent through your website contact form.</p>
                </div>
                <span class="text-xs font-mono text-gold">{{ data.inbox ? data.inbox.length : 0 }} Total Submissions</span>
              </div>

              <div v-if="!data.inbox || data.inbox.length === 0" class="p-12 text-center rounded-2xl bg-bgSecondary border border-white/10 text-mutedText font-mono text-xs">
                No inquiries received yet.
              </div>

              <div v-else class="space-y-4">
                <div 
                  v-for="msg in data.inbox" 
                  :key="msg.id"
                  class="p-6 rounded-2xl border transition-all duration-200 space-y-3"
                  :class="msg.isRead ? 'bg-bgSecondary/60 border-white/10 opacity-80' : 'bg-bgSecondary border-gold/40 shadow-glow-gold'"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <span class="w-2 h-2 rounded-full" :class="msg.isRead ? 'bg-white/20' : 'bg-rose-400 animate-pulse'"></span>
                      <span class="text-sm font-bold text-primaryText">{{ msg.name }}</span>
                      <span class="text-xs font-mono text-secondaryText">({{ msg.email }})</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <span class="text-[10px] font-mono text-mutedText">{{ msg.date }}</span>
                      <button @click="toggleReadMessage(msg)" class="text-xs font-mono text-softGold hover:underline">
                        {{ msg.isRead ? 'Mark Unread' : 'Mark Read' }}
                      </button>
                      <button @click="deleteMessage(msg.id)" class="text-xs text-rose-400 hover:text-rose-300">🗑️</button>
                    </div>
                  </div>

                  <div class="text-xs font-sora font-semibold text-softGold">{{ msg.subject }}</div>
                  <p class="text-xs text-secondaryText font-inter leading-relaxed bg-bgPrimary/50 p-4 rounded-xl border border-white/5">
                    {{ msg.message }}
                  </p>

                  <div class="flex justify-end">
                    <a :href="'mailto:' + msg.email + '?subject=Re: ' + encodeURIComponent(msg.subject)" class="px-3 py-1 rounded-lg bg-electricBlue/20 text-electricBlue border border-electricBlue/30 text-[11px] font-mono hover:bg-electricBlue hover:text-white transition-colors">
                      Reply via Email ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- 8. SETTINGS TAB -->
            <div v-if="activeTab === 'settings'" class="space-y-8 animate-fadeIn">
              
              <!-- Security & Passcode -->
              <div class="p-8 rounded-3xl bg-bgSecondary border border-white/10 space-y-4">
                <h3 class="text-sm font-mono tracking-wider text-gold uppercase">ADMIN DASHBOARD SECURITY</h3>
                <div class="max-w-md space-y-3">
                  <label class="block text-[10px] font-mono text-mutedText uppercase">CUSTOM ADMIN PASSCODE</label>
                  <input type="text" v-model="data.settings.adminPasscode" class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/15 text-xs text-primaryText font-mono focus:border-gold focus:outline-none" />
                  <p class="text-[10px] font-mono text-mutedText">Remember to save changes to keep your new passcode active.</p>
                </div>
              </div>

              <!-- Backup & Restore -->
              <div class="p-8 rounded-3xl bg-bgSecondary border border-white/10 space-y-6">
                <h3 class="text-sm font-mono tracking-wider text-gold uppercase">DATA BACKUP & RESTORE</h3>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button 
                    @click="exportJson"
                    class="p-5 rounded-2xl bg-bgPrimary border border-white/10 hover:border-gold/50 text-left space-y-2 group transition-all"
                  >
                    <span class="text-xl block">📥</span>
                    <h4 class="text-xs font-bold text-primaryText">Export JSON Backup</h4>
                    <p class="text-[10px] text-mutedText">Download all portfolio content into a portable JSON file.</p>
                  </button>

                  <label class="p-5 rounded-2xl bg-bgPrimary border border-white/10 hover:border-electricBlue/50 text-left space-y-2 cursor-pointer group transition-all block">
                    <span class="text-xl block">📤</span>
                    <h4 class="text-xs font-bold text-primaryText">Import JSON File</h4>
                    <p class="text-[10px] text-mutedText">Restore content from a previous JSON backup file.</p>
                    <input type="file" @change="importJsonFile" accept=".json" class="hidden" />
                  </label>

                  <button 
                    @click="resetDefault"
                    class="p-5 rounded-2xl bg-bgPrimary border border-rose-500/20 hover:border-rose-500/60 text-left space-y-2 group transition-all"
                  >
                    <span class="text-xl block">🔄</span>
                    <h4 class="text-xs font-bold text-rose-400">Reset to Starter Template</h4>
                    <p class="text-[10px] text-mutedText">Reset all changes back to Janice's default BSIT dataset.</p>
                  </button>
                </div>
              </div>

              <!-- Database Status Panel -->
              <div class="p-8 rounded-3xl bg-bgSecondary border border-white/10 space-y-5">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-mono tracking-wider text-gold uppercase">DATABASE STATUS</h3>
                  <button
                    @click="loadDbStatus"
                    class="px-3 py-1.5 rounded-lg bg-bgPrimary border border-white/15 text-[10px] font-mono text-secondaryText hover:text-primaryText hover:border-gold/40 transition-colors"
                  >
                    &#x1F504; Refresh Status
                  </button>
                </div>
                <div v-if="dbStatus === null" class="py-6 text-center text-xs font-mono text-mutedText animate-pulse">
                  Checking database connection...
                </div>
                <div v-else class="space-y-4">
                  <div class="flex items-center gap-3 p-4 rounded-2xl border"
                    :class="dbStatus.database.connected ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'"
                  >
                    <span class="text-xl">{{ dbStatus.database.connected ? '&#x2705;' : '&#x274C;' }}</span>
                    <div>
                      <p class="text-sm font-bold" :class="dbStatus.database.connected ? 'text-emerald-400' : 'text-rose-400'">
                        {{ dbStatus.database.connected ? 'MySQL Connected — portfolio_janice_db' : 'MySQL Offline — using JSON fallback' }}
                      </p>
                      <p class="text-[10px] font-mono text-mutedText">
                        {{ dbStatus.mysql_version ? 'MySQL ' + dbStatus.mysql_version : '' }} &middot; PHP {{ dbStatus.php_version }} &middot; host: localhost
                      </p>
                    </div>
                  </div>
                  <div v-if="dbStatus.database.connected" class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div
                      v-for="(info, tbl) in dbStatus.database.tables"
                      :key="tbl"
                      class="p-3 rounded-xl bg-bgPrimary border text-center space-y-1"
                      :class="info.exists ? 'border-white/10' : 'border-rose-500/30'"
                    >
                      <p class="text-[10px] font-mono uppercase tracking-wider text-mutedText">{{ tbl }}</p>
                      <p class="text-lg font-extrabold" :class="info.exists ? 'text-primaryText' : 'text-rose-400'">
                        {{ info.exists ? info.rows : 'x' }}
                      </p>
                      <p class="text-[9px] font-mono" :class="info.exists ? 'text-secondaryText' : 'text-rose-400'">
                        {{ info.exists ? 'rows' : 'missing' }}
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div class="p-4 rounded-xl bg-bgPrimary border border-white/10 space-y-1">
                      <p class="font-mono text-[10px] text-mutedText uppercase">JSON Backup File</p>
                      <p class="font-bold" :class="dbStatus.json_file.exists ? 'text-softGold' : 'text-mutedText'">
                        {{ dbStatus.json_file.exists ? 'Exists: ' + dbStatus.json_file.size_kb + ' KB' : 'Not created yet' }}
                      </p>
                    </div>
                    <div class="p-4 rounded-xl bg-bgPrimary border border-white/10 space-y-1">
                      <p class="font-mono text-[10px] text-mutedText uppercase">Uploads Folder</p>
                      <p class="font-bold" :class="dbStatus.uploads_dir.writable ? 'text-emerald-400' : 'text-rose-400'">
                        {{ dbStatus.uploads_dir.exists ? (dbStatus.uploads_dir.writable ? 'Writable' : 'Not Writable') : 'Missing' }}
                        {{ dbStatus.uploads_dir.file_count !== undefined ? ' | ' + dbStatus.uploads_dir.file_count + ' files' : '' }}
                      </p>
                    </div>
                    <div class="p-4 rounded-xl bg-bgPrimary border border-white/10 space-y-1">
                      <p class="font-mono text-[10px] text-mutedText uppercase">Last Saved</p>
                      <p class="font-bold text-electricBlue text-[11px]">{{ formatDate(data.settings.lastSaved) }}</p>
                    </div>
                  </div>
                  <div class="flex flex-wrap gap-3 pt-2">
                    <a href="http://localhost/phpmyadmin/" target="_blank"
                      class="px-4 py-2 rounded-xl bg-bgPrimary border border-gold/30 text-gold text-[11px] font-mono hover:bg-gold hover:text-bgPrimary transition-colors">
                      Open phpMyAdmin &nearr;
                    </a>
                    <a href="api/db_status.php" target="_blank"
                      class="px-4 py-2 rounded-xl bg-bgPrimary border border-white/15 text-secondaryText text-[11px] font-mono hover:border-electricBlue/50 hover:text-electricBlue transition-colors">
                      DB Status API &nearr;
                    </a>
                    <a href="api/get_data.php" target="_blank"
                      class="px-4 py-2 rounded-xl bg-bgPrimary border border-white/15 text-secondaryText text-[11px] font-mono hover:border-electricBlue/50 hover:text-electricBlue transition-colors">
                      Live Portfolio Data &nearr;
                    </a>
                  </div>
                </div>
              </div>


            </div>

          </div>
        </main>
      </div>

      <!-- 3. PROJECT EDIT/CREATE MODAL -->
      <div v-if="projectModal.isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bgPrimary/90 backdrop-blur-xl overflow-y-auto">
        <div class="relative w-full max-w-3xl bg-bgSecondary border border-white/20 rounded-3xl p-8 max-h-[90vh] overflow-y-auto space-y-6">
          <div class="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 class="text-base font-bold text-primaryText">{{ projectModal.isNew ? 'Create New Project' : 'Edit Project Details' }}</h3>
            <button @click="projectModal.isOpen = false" class="text-mutedText hover:text-white">✕</button>
          </div>

          <div class="space-y-4 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">PROJECT TITLE</label>
                <input type="text" v-model="projectModal.form.title" class="w-full px-3 py-2 rounded-xl bg-bgPrimary border border-white/15 text-primaryText" />
              </div>
              <div>
                <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">COURSE / CATEGORY</label>
                <input type="text" v-model="projectModal.form.category" class="w-full px-3 py-2 rounded-xl bg-bgPrimary border border-white/15 text-primaryText" />
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">ONE-LINE TAGLINE</label>
              <input type="text" v-model="projectModal.form.tagline" class="w-full px-3 py-2 rounded-xl bg-bgPrimary border border-white/15 text-primaryText" />
            </div>

            <div>
              <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">DESCRIPTION</label>
              <textarea v-model="projectModal.form.description" rows="2" class="w-full px-3 py-2 rounded-xl bg-bgPrimary border border-white/15 text-primaryText"></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">MY SPECIFIC ROLE</label>
                <input type="text" v-model="projectModal.form.role" class="w-full px-3 py-2 rounded-xl bg-bgPrimary border border-white/15 text-primaryText" />
              </div>
              <div>
                <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">IMAGE PATH / URL</label>
                <div class="flex items-center gap-2">
                  <input type="text" v-model="projectModal.form.image" class="w-full px-3 py-2 rounded-xl bg-bgPrimary border border-white/15 text-primaryText" placeholder="assets/images/... or URL" />
                  <label class="shrink-0 px-3 py-2 rounded-xl bg-white/10 hover:bg-gold/20 border border-white/15 hover:border-gold/40 text-[11px] font-mono text-secondaryText hover:text-softGold cursor-pointer transition-colors flex items-center gap-1">
                    <span>📁</span>
                    <span>Browse</span>
                    <input type="file" @change="uploadProjectModalImage" accept="image/*" class="hidden" />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">TECHNOLOGIES (comma-separated)</label>
              <input type="text" :value="projectModal.form.technologies ? projectModal.form.technologies.join(', ') : ''" @input="updateProjectTech($event.target.value)" class="w-full px-3 py-2 rounded-xl bg-bgPrimary border border-white/15 text-primaryText" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">THE PROBLEM STATEMENT</label>
                <textarea v-model="projectModal.form.problem" rows="3" class="w-full px-3 py-2 rounded-xl bg-bgPrimary border border-white/15 text-primaryText"></textarea>
              </div>
              <div>
                <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">THE APPROACH</label>
                <textarea v-model="projectModal.form.approach" rows="3" class="w-full px-3 py-2 rounded-xl bg-bgPrimary border border-white/15 text-primaryText"></textarea>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">WHAT I LEARNED</label>
              <textarea v-model="projectModal.form.learning" rows="2" class="w-full px-3 py-2 rounded-xl bg-bgPrimary border border-white/15 text-primaryText"></textarea>
            </div>
          </div>

          <div class="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button @click="projectModal.isOpen = false" class="px-4 py-2 rounded-xl bg-white/10 text-xs text-primaryText">Cancel</button>
            <button @click="saveProjectModal" class="px-5 py-2 rounded-xl bg-gold text-bgPrimary font-bold text-xs">Save Project</button>
          </div>
        </div>
      </div>

      <!-- 4. VISUAL LAB EDIT/CREATE MODAL -->
      <div v-if="visualModal.isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bgPrimary/90 backdrop-blur-xl overflow-y-auto">
        <div class="relative w-full max-w-xl bg-bgSecondary border border-white/20 rounded-3xl p-8 space-y-6">
          <div class="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 class="text-base font-bold text-primaryText">{{ visualModal.isNew ? 'Add Visual Lab Item' : 'Edit Visual Lab Item' }}</h3>
            <button @click="visualModal.isOpen = false" class="text-mutedText hover:text-white">✕</button>
          </div>

          <div class="space-y-4 text-xs">
            <div>
              <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">TITLE</label>
              <input type="text" v-model="visualModal.form.title" class="w-full px-3 py-2 rounded-xl bg-bgPrimary border border-white/15 text-primaryText" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">CATEGORY</label>
                <select v-model="visualModal.form.category" class="w-full px-3 py-2 rounded-xl bg-bgPrimary border border-white/15 text-primaryText">
                  <option value="SYSTEMS & FLOWS">SYSTEMS & FLOWS</option>
                  <option value="UI/UX & FIGMA">UI/UX & FIGMA</option>
                  <option value="QA & TESTING">QA & TESTING</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">TAG / TYPE</label>
                <input type="text" v-model="visualModal.form.tag" class="w-full px-3 py-2 rounded-xl bg-bgPrimary border border-white/15 text-primaryText" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">TOOLS / METHODOLOGY</label>
                <input type="text" v-model="visualModal.form.tools" class="w-full px-3 py-2 rounded-xl bg-bgPrimary border border-white/15 text-primaryText" />
              </div>
              <div>
                <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">IMAGE PATH / URL</label>
                <div class="flex items-center gap-2">
                  <input type="text" v-model="visualModal.form.image" class="w-full px-3 py-2 rounded-xl bg-bgPrimary border border-white/15 text-primaryText" placeholder="assets/images/... or URL" />
                  <label class="shrink-0 px-3 py-2 rounded-xl bg-white/10 hover:bg-gold/20 border border-white/15 hover:border-gold/40 text-[11px] font-mono text-secondaryText hover:text-softGold cursor-pointer transition-colors flex items-center gap-1">
                    <span>📁</span>
                    <span>Browse</span>
                    <input type="file" @change="uploadVisualModalImage" accept="image/*" class="hidden" />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">DESCRIPTION</label>
              <textarea v-model="visualModal.form.description" rows="3" class="w-full px-3 py-2 rounded-xl bg-bgPrimary border border-white/15 text-primaryText"></textarea>
            </div>
          </div>

          <div class="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button @click="visualModal.isOpen = false" class="px-4 py-2 rounded-xl bg-white/10 text-xs text-primaryText">Cancel</button>
            <button @click="saveVisualModal" class="px-5 py-2 rounded-xl bg-gold text-bgPrimary font-bold text-xs">Save Visual Item</button>
          </div>
        </div>
      </div>

    </div>
  `,
  setup() {
    const { ref, reactive, computed, onMounted, watch } = Vue;

    const passcodeInput = ref('');
    const activeTab = ref('overview');
    const dbStatus = ref(null);
    const isSidebarOpen = ref(false);

    const selectTab = (tabId) => {
      activeTab.value = tabId;
      isSidebarOpen.value = false;
    };

    const isAuthenticated = computed(() => window.store.isAdminAuthenticated);
    const data = computed(() => window.store.portfolioData);
    const saveStatus = computed(() => window.store.saveStatus);


    const navTabs = [
      { id: 'overview', label: 'Overview', icon: '📊' },
      { id: 'profile', label: 'Profile & Bio', icon: '👤' },
      { id: 'projects', label: 'Projects Manager', icon: '📁' },
      { id: 'visuals', label: 'Visual Lab', icon: '🎨' },
      { id: 'skills', label: 'Skills & Tech', icon: '⚡' },
      { id: 'workflow', label: 'Workflow Stages', icon: '🔄' },
      { id: 'inbox', label: 'Inquiries Inbox', icon: '📬' },
      { id: 'settings', label: 'Backup & Settings', icon: '⚙️' }
    ];

    const currentTabTitle = computed(() => {
      const found = navTabs.find(t => t.id === activeTab.value);
      return found ? found.label : 'Admin';
    });

    const unreadCount = computed(() => {
      if (!data.value.inbox) return 0;
      return data.value.inbox.filter(m => !m.isRead).length;
    });

    const totalSkillsCount = computed(() => {
      if (!data.value.skills) return 0;
      return data.value.skills.reduce((acc, cat) => acc + (cat.skills ? cat.skills.length : 0), 0);
    });

    const handleLogin = () => {
      window.store.loginAdmin(passcodeInput.value);
      passcodeInput.value = '';
    };

    const handleLogout = () => {
      window.store.logoutAdmin();
    };

    const returnToPortfolio = () => {
      window.store.toggleView('portfolio');
    };

    const saveChanges = () => {
      window.store.saveAll(true);
    };

    const exportJson = () => {
      window.store.exportData();
    };

    const importJsonFile = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        window.store.importData(event.target.result);
      };
      reader.readAsText(file);
    };

    const resetDefault = () => {
      window.store.resetToDefault();
    };

    const formatDate = (isoString) => {
      if (!isoString) return 'Just now';
      try {
        const d = new Date(isoString);
        return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } catch (e) {
        return isoString;
      }
    };

    const loadDbStatus = async () => {
      dbStatus.value = null;
      try {
        const res = await fetch('api/db_status.php');
        if (res.ok) {
          dbStatus.value = await res.json();
        } else {
          dbStatus.value = { database: { connected: false }, json_file: { exists: false }, uploads_dir: { exists: false, writable: false }, php_version: 'N/A' };
        }
      } catch (e) {
        dbStatus.value = { database: { connected: false, tables: {} }, json_file: { exists: false }, uploads_dir: { exists: false, writable: false }, php_version: 'N/A' };
      }
    };

    watch(activeTab, (newTab) => {
      if (newTab === 'settings' && dbStatus.value === null) {
        loadDbStatus();
      }
    });

    // Project Modal
    const projectModal = reactive({
      isOpen: false,
      isNew: false,
      editIndex: -1,
      form: {}
    });

    const openProjectModal = (proj) => {
      if (proj) {
        projectModal.isNew = false;
        projectModal.editIndex = data.value.projects.findIndex(p => p.id === proj.id);
        projectModal.form = JSON.parse(JSON.stringify(proj));
      } else {
        projectModal.isNew = true;
        projectModal.editIndex = -1;
        projectModal.form = {
          id: 'proj-' + Date.now(),
          number: String(data.value.projects.length + 1).padStart(2, '0'),
          title: '',
          category: 'COMPROG / WEBTECH',
          tagline: '',
          description: '',
          role: 'Systems Analysis • UI Planning',
          technologies: ['HTML', 'CSS', 'JavaScript'],
          image: 'assets/images/studyquest.jpg',
          cta: 'VIEW PROJECT',
          problem: '',
          approach: '',
          myContributionList: ['Conducted system requirements analysis', 'Created user interface wireframes'],
          teamContributionList: ['Collaborated on core architecture implementation'],
          processSteps: [
            { title: 'Planning', desc: 'Defined core objectives.' },
            { title: 'Analysis', desc: 'Mapped workflows.' },
            { title: 'QA', desc: 'Tested boundary cases.' }
          ],
          learning: 'Refined my systems planning and QA testing skills.'
        };
      }
      projectModal.isOpen = true;
    };

    const updateProjectTech = (val) => {
      projectModal.form.technologies = val.split(',').map(s => s.trim()).filter(Boolean);
    };

    const saveProjectModal = () => {
      if (!projectModal.form.title) {
        alert('Please enter a project title');
        return;
      }
      if (projectModal.isNew) {
        data.value.projects.push(projectModal.form);
      } else {
        data.value.projects[projectModal.editIndex] = projectModal.form;
      }
      projectModal.isOpen = false;
      saveChanges();
    };

    const deleteProject = (idx) => {
      if (confirm(`Are you sure you want to delete "${data.value.projects[idx].title}"?`)) {
        data.value.projects.splice(idx, 1);
        saveChanges();
      }
    };

    // Visual Modal
    const visualModal = reactive({
      isOpen: false,
      isNew: false,
      editIndex: -1,
      form: {}
    });

    const openVisualModal = (vis) => {
      if (vis) {
        visualModal.isNew = false;
        visualModal.editIndex = data.value.visuals.findIndex(v => v.id === vis.id);
        visualModal.form = JSON.parse(JSON.stringify(vis));
      } else {
        visualModal.isNew = true;
        visualModal.editIndex = -1;
        visualModal.form = {
          id: 'vis-' + Date.now(),
          title: '',
          category: 'SYSTEMS & FLOWS',
          type: 'Diagram / Architecture',
          tag: 'WORKFLOW',
          tools: 'Draw.io / Figma',
          image: 'assets/images/visual-01.jpg',
          description: ''
        };
      }
      visualModal.isOpen = true;
    };

    const saveVisualModal = () => {
      if (!visualModal.form.title) {
        alert('Please enter a visual item title');
        return;
      }
      if (visualModal.isNew) {
        data.value.visuals.push(visualModal.form);
      } else {
        data.value.visuals[visualModal.editIndex] = visualModal.form;
      }
      visualModal.isOpen = false;
      saveChanges();
    };

    const deleteVisual = (idx) => {
      if (confirm(`Delete visual artifact "${data.value.visuals[idx].title}"?`)) {
        data.value.visuals.splice(idx, 1);
        saveChanges();
      }
    };

    // Skills actions
    const addSkillItem = (group) => {
      const name = prompt('Enter new skill name (e.g. Docker, Python, REST APIs):');
      if (name) {
        group.skills.push({ name: name.trim(), status: 'LEARNING' });
        saveChanges();
      }
    };

    const removeSkillItem = (group, sIdx) => {
      group.skills.splice(sIdx, 1);
      saveChanges();
    };

    // Inbox actions — also sync to MySQL immediately via update_inbox.php
    const toggleReadMessage = async (msg) => {
      msg.isRead = !msg.isRead;
      try {
        await fetch('api/update_inbox.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: msg.id, isRead: msg.isRead })
        });
      } catch (e) { /* fallback: full save will still sync */ }
      saveChanges();
    };

    const deleteMessage = async (id) => {
      const idx = data.value.inbox.findIndex(m => m.id === id);
      if (idx !== -1 && confirm('Delete this message? This cannot be undone.')) {
        data.value.inbox.splice(idx, 1);
        try {
          await fetch('api/update_inbox.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, deleted: true })
          });
        } catch (e) { /* fallback */ }
        saveChanges();
      }
    };


    // Image file upload for profile
    const uploadImage = async (e, field) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch('api/upload_image.php', {
          method: 'POST',
          body: formData
        });
        const result = await res.json();
        if (result.success && result.url) {
          data.value.profile[field] = result.url;
          window.store.showToast('Image uploaded successfully!', 'success');
          saveChanges();
        } else {
          window.store.showToast(result.error || 'Upload failed', 'error');
        }
      } catch (err) {
        window.store.showToast('Could not reach upload API. You can still paste the image URL directly.', 'info');
      }
    };

    // Upload helper for Project Modal Image
    const uploadProjectModalImage = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('image', file);
      try {
        const res = await fetch('api/upload_image.php', { method: 'POST', body: formData });
        const result = await res.json();
        if (result.success && result.url) {
          projectModal.form.image = result.url;
          window.store.showToast('Project image uploaded!', 'success');
        } else {
          window.store.showToast(result.error || 'Upload failed', 'error');
        }
      } catch (err) {
        window.store.showToast('Upload error', 'error');
      }
    };

    // Upload helper for Visual Lab Modal Image
    const uploadVisualModalImage = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('image', file);
      try {
        const res = await fetch('api/upload_image.php', { method: 'POST', body: formData });
        const result = await res.json();
        if (result.success && result.url) {
          visualModal.form.image = result.url;
          window.store.showToast('Visual lab image uploaded!', 'success');
        } else {
          window.store.showToast(result.error || 'Upload failed', 'error');
        }
      } catch (err) {
        window.store.showToast('Upload error', 'error');
      }
    };

    return {
      passcodeInput,
      activeTab,
      isSidebarOpen,
      selectTab,
      navTabs,

      currentTabTitle,
      isAuthenticated,
      data,
      saveStatus,
      unreadCount,
      totalSkillsCount,
      handleLogin,
      handleLogout,
      returnToPortfolio,
      saveChanges,
      exportJson,
      importJsonFile,
      resetDefault,
      formatDate,
      dbStatus,
      loadDbStatus,
      projectModal,
      openProjectModal,
      updateProjectTech,
      saveProjectModal,
      deleteProject,
      visualModal,
      openVisualModal,
      saveVisualModal,
      deleteVisual,
      addSkillItem,
      removeSkillItem,
      toggleReadMessage,
      deleteMessage,
      uploadImage,
      uploadProjectModalImage,
      uploadVisualModalImage
    };

  }
};

window.AdminView = AdminView;
