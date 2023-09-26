import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login';

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId:
    '799250504893-lioto5u799fvgk82j9eofbdfs94truss.apps.googleusercontent.com',
});

app.mount('#app')
