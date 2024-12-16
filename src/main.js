import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"; // Importe o arquivo de configuração do Vue Router

// Crie e monte o aplicativo Vue, e use o Vue Router
createApp(App)
  .use(router) // Registra o Vue Router no aplicativo
  .mount("#app"); // Monta o aplicativo na div com id 'app'
