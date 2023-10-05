import App from './App.vue'

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'

const mount = (el: HTMLElement) => {
    createApp(App)
        .use(createPinia)
        .use(router)
        .mount(el);
  };

if (process.env.NODE_ENV === "development") {
    const rootNode = document.getElementById("app");
    if (rootNode) {
        mount(rootNode);
    }
}

export class EmployeeAppVue extends HTMLElement {
    connectedCallback() {
        mount(this);
    }
}
  
customElements.define('employee-app-vue', EmployeeAppVue);