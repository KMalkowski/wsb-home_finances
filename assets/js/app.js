import Vue from 'vue';
import financesApp from './components/App.vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import VueRouter from 'vue-router';
import appRoutes from './router.js';

Vue.use(VueMaterial)
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        ...appRoutes,
    ],
});

const app = new Vue({
    render(h){
        return h(financesApp)
    },
    router
}).$mount('#app');

window.App = app;