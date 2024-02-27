import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '/src/assets/diy.css'

import agconnect from "@hw-agconnect/api";
import "@hw-agconnect/auth";
import "@hw-agconnect/instance";
import { agConnectConfig } from "./assets/agConnectConfig"

agconnect.instance().configInstance(agConnectConfig);

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// app.use(router)
app.use(ElementPlus)

app.directive('title', {
    inserted: function(el) {
        document.title = el.dataset.title
    }
})


app.config.globalProperties.$agconnect = agconnect;
app.mount('#app')