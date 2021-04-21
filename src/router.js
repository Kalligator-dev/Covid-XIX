import { createRouter, createWebHistory } from 'vue-router'
import CovidApp from './components/GlobeView.vue'
import About from './components/About.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: CovidApp, name: 'main' },
        { path: '/credits', component: About },
        { path: '/:notFound(.*)', redirect: { name: 'main' } },
    ]
});

export default router;