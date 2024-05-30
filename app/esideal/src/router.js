import { createRouter, createWebHistory } from 'vue-router';
import LogIn from './pages/LogIn.vue';
import Postos from './pages/Postos.vue';
import Services from './pages/Servicos_atribuidos.vue';
import Service from './pages/Servico.vue';
import Veiculo from './pages/Veiculo_page.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LogIn },
    { path: '/postos', component: Postos},
    { path: '/services', component: Services},
    { path: '/services/:id', component: Service,props: true},
    { path: '/veiculo/:id', component: Veiculo,props: true},

    /* Adicione as diversas rotas aqui */
  ]
});

export default router;