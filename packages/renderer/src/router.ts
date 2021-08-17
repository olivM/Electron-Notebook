import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '/@/components/Home.vue';
import Settings from '/@/components/Settings.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/settings', name: 'Settings', component: Settings },
    //   {path: '/about', name: 'About', component: () => import('/@/components/About.vue')}, // Lazy load route component
];

export default createRouter({
    routes,
    history: createWebHashHistory(),
});
