<template>
  <div id="layout">
    <HeaderHorizontal @toggleSidebar="toggleSidebar" />
    <Sidebar :isCollapsed="isSidebarCollapsed" :menuItems="menuItems" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import "..//css/LayoutCss.css"; // Importa o CSS do layout
import HeaderHorizontal from "./HeaderHorizontal.vue";
import Sidebar from "./Sidebar.vue";

export default {
  
  name: "Layout",
  components: { HeaderHorizontal, Sidebar },
  data() {
    return {
      isSidebarCollapsed: false, // Controle do estado do sidebar
      menuItems: [
        { path: "/", name: "Início", icon: "https://img.icons8.com/ios-filled/50/ffffff/home.png" },
        { path: "/shirts", name: "Camisas", icon: "https://img.icons8.com/ios-filled/50/ffffff/t-shirt.png" },
        { path: "/shoes", name: "Tênis", icon: "https://img.icons8.com/ios-filled/50/ffffff/sneakers.png" },
        { path: "/vapes", name: "Vapes", icon: "https://img.icons8.com/?size=100&id=1099&format=png&color=ffffff" },
        { path: "/brands", name: "Marcas", icon: "https://img.icons8.com/?size=100&id=9rCm9FIFH5qA&format=png&color=ffffff" },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
  },
};
</script>

