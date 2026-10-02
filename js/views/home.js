// Home View Component - Storytelling Flow of the Portfolio
const HomeView = {
  name: 'HomeView',
  template: `
    <main class="relative z-10">
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <VisualLab />
      <SkillsSection />
      <WorkflowSection />
      <ContactSection />
    </main>
  `
};

window.HomeView = HomeView;
