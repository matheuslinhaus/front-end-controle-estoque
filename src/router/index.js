import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/Layout.vue";
import Shirts from "../views/ShirtsPage.vue";
import Shoes from "../views/ShoesPage.vue";
import Vapes from "../views/VapesPage.vue";
import Home from "../views/HomePage.vue";
import ProductDetails from "../views/ProductPage.vue"; 
import About from "../views/AboutPage.vue";
import Brands from "../views/BrandsPage.vue";


const routes = [
  {
    path: "/",
    component: Layout, // Layout é o contêiner
    children: [
      {
        path: "", // Rota raiz
        component: Home, // Página inicial
      },
      {
        path: "shirts", // Rota para a página de camisas
        component: Shirts,
      },
      {
        path: "shoes", // Rota para a página de tenis
        component: Shoes,
      },
      {
        path: "vapes", // Rota para a página de tenis
        component: Vapes,
      },
      {
        path: 'brands',
        component: Brands,
      },
      {
        path: "product/:type/:id",
        component: ProductDetails,
      },
      {
        path: 'about',  // Definindo a rota para a página Sobre
        component: About,
      },   
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
