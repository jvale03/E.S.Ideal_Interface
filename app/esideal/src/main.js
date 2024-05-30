import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import router from './router';
import App from './App.vue';
import Button from './components/ui/Button.vue';
import Navbar from './components/Navbar.vue';
import Clock from './components/Clock.vue';
import Table from './components/Table.vue';

const app = createApp(App);

app.component('Button', Button);
app.component('Clock', Clock);
app.component('Table', Table);



app.use(router);
app.use(createPinia());


app.mount('#app');