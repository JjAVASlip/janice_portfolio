// Vue Router Configuration (Optional multi-view routing)
const { createRouter, createWebHashHistory } = VueRouter || {};

let router = null;

if (typeof VueRouter !== 'undefined' && createRouter) {
  const routes = [
    { path: '/', name: 'Home', component: window.HomeView }
  ];

  router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth'
        };
      }
      return savedPosition || { top: 0 };
    }
  });
}

window.appRouter = router;
