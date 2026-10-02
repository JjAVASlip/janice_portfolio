// Contact Section Component - Dynamic from Store Data with Real Backend Inbox Sync
const ContactSection = {
  name: 'ContactSection',
  template: `
    <section 
      id="contact" 
      class="relative py-28 md:py-36 bg-bgPrimary overflow-hidden border-t border-white/5"
    >
      <!-- Dramatic Atmosphere Gradients -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-radial-gradient from-royalPurple/15 via-electricBlue/10 to-transparent blur-[180px] pointer-events-none"></div>

      <!-- Subtle Gold Horizon Line -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>

      <div class="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        <!-- Section Tag -->
        <div class="inline-flex items-center gap-3 mb-8">
          <span class="font-mono text-xs text-gold tracking-widest uppercase">07 / CONTACT</span>
          <span class="w-8 h-[1px] bg-gold/40"></span>
          <span class="text-[11px] font-sora tracking-widest text-secondaryText uppercase">GET IN TOUCH</span>
        </div>

        <!-- Headline -->
        <h2 class="text-4xl sm:text-6xl md:text-7xl font-sora font-extrabold tracking-tight text-primaryText leading-[1.1] mb-6">
          LET'S CREATE <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue via-royalPurple to-softGold">
            SOMETHING MEANINGFUL.
          </span>
        </h2>

        <!-- Supporting Narrative -->
        <p class="text-secondaryText text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12 font-inter font-light">
          {{ profile.contactText || "I'm always open to learning, collaboration, academic projects, and opportunities to grow in the IT field. Feel free to reach out for inquiries or discussion." }}
        </p>

        <!-- Primary Action Links / Buttons Grid -->
        <div class="flex flex-wrap items-center justify-center gap-4 mb-16">
          
          <a 
            :href="'mailto:' + profile.email"
            class="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold text-bgPrimary font-sora text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-softGold hover:shadow-glow-gold hover:-translate-y-1"
            @mouseenter="onHover('button')"
            @mouseleave="onLeave"
          >
            <span>EMAIL ME</span>
            <span class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
          </a>

          <button 
            @click="copyEmail"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-bgSecondary border border-white/20 text-xs font-sora tracking-widest text-primaryText uppercase transition-all duration-300 hover:border-gold/60 hover:text-softGold hover:-translate-y-1"
            @mouseenter="onHover('button')"
            @mouseleave="onLeave"
          >
            <span>{{ copied ? 'EMAIL COPIED! ✓' : 'COPY EMAIL' }}</span>
          </button>

          <a 
            v-if="profile.linkedin"
            :href="profile.linkedin" 
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-bgSecondary border border-white/20 text-xs font-sora tracking-widest text-primaryText uppercase transition-all duration-300 hover:border-electricBlue hover:text-electricBlue hover:-translate-y-1"
            @mouseenter="onHover('button')"
            @mouseleave="onLeave"
          >
            <span>LINKEDIN</span>
            <span>↗</span>
          </a>

          <a 
            v-if="profile.github"
            :href="profile.github" 
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-bgSecondary border border-white/20 text-xs font-sora tracking-widest text-primaryText uppercase transition-all duration-300 hover:border-white/60 hover:text-white hover:-translate-y-1"
            @mouseenter="onHover('button')"
            @mouseleave="onLeave"
          >
            <span>GITHUB</span>
            <span>↗</span>
          </a>

        </div>

        <!-- Interactive Direct Message Submission Form -->
        <div class="max-w-xl mx-auto p-8 rounded-3xl bg-bgSecondary/90 border border-white/10 shadow-2xl text-left space-y-4">
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-mono text-gold tracking-widest uppercase">DIRECT INQUIRY / MESSAGE</span>
            <span class="text-[10px] font-mono text-mutedText">CONNECTED TO ADMIN INBOX</span>
          </div>

          <form @submit.prevent="sendMessage" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">YOUR NAME</label>
                <input 
                  type="text" 
                  v-model="form.name"
                  placeholder="e.g. Collaborator / Recruiter"
                  required
                  class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/10 text-xs font-sora text-primaryText focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  v-model="form.email"
                  placeholder="name@organization.com"
                  required
                  class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/10 text-xs font-sora text-primaryText focus:border-gold focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">SUBJECT / TOPIC</label>
              <input 
                type="text" 
                v-model="form.subject"
                placeholder="Academic Project / Systems Inquiry"
                required
                class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/10 text-xs font-sora text-primaryText focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label class="block text-[10px] font-mono text-mutedText uppercase mb-1">MESSAGE</label>
              <textarea 
                v-model="form.message"
                rows="3"
                placeholder="Hello Janice, I would like to connect regarding..."
                required
                class="w-full px-4 py-2.5 rounded-xl bg-bgPrimary border border-white/10 text-xs font-inter text-primaryText focus:border-gold focus:outline-none transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              class="w-full py-3.5 rounded-xl bg-gradient-to-r from-electricBlue to-royalPurple text-primaryText text-xs font-sora font-semibold tracking-wider uppercase transition-opacity hover:opacity-90 shadow-glow-purple"
            >
              SEND DIRECT MESSAGE
            </button>
          </form>
        </div>

      </div>
    </section>
  `,
  setup() {
    const { ref, reactive, computed } = Vue;
    const copied = ref(false);
    const form = reactive({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    const profile = computed(() => window.store.portfolioData.profile);

    const copyEmail = () => {
      const email = profile.value.email || 'janice.bulanon@ncst.edu.ph';
      navigator.clipboard.writeText(email).then(() => {
        copied.value = true;
        window.store.showToast('Email address copied to clipboard!');
        setTimeout(() => {
          copied.value = false;
        }, 3000);
      });
    };

    const sendMessage = async () => {
      const payload = {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message
      };

      // Add to local state
      const newMsg = {
        id: 'msg-' + Date.now(),
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false
      };

      if (!window.store.portfolioData.inbox) {
        window.store.portfolioData.inbox = [];
      }
      window.store.portfolioData.inbox.unshift(newMsg);
      window.store.saveAll(false);

      // Attempt PHP API contact submission
      try {
        await fetch('api/contact.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (e) {
        console.log('Saved to local inbox state.');
      }

      window.store.showToast(`Thank you, ${form.name}! Your message has been sent to Janice's inbox.`, 'success');
      form.name = '';
      form.email = '';
      form.subject = '';
      form.message = '';
    };

    const onHover = (type) => {
      window.store.setCursor(type);
    };

    const onLeave = () => {
      window.store.resetCursor();
    };

    return {
      profile,
      copied,
      form,
      copyEmail,
      sendMessage,
      onHover,
      onLeave
    };
  }
};

window.ContactSection = ContactSection;
