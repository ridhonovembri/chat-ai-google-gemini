import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Skeleton from 'primevue/skeleton';

// import 'primevue/resources/themes/md-dark-indigo/theme.css'
// import 'primevue/resources/themes/md-light-deeppurple/theme.css'
// import 'primevue/resources/themes/aura-dark-lime/theme.css'
import 'primevue/resources/themes/lara-dark-green/theme.css'
import 'primeicons/primeicons.css'


createApp(App)
.use(router)
.use(PrimeVue)
.component('InputText', InputText)
.component('Card', Card)
.component('TextArea', Textarea)
.component('Button', Button)
.component('Skeleton', Skeleton)
.mount('#app')
