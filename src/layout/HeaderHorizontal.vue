<template>
    <header class="header-horizontal">
      <button @click="$emit('toggleSidebar')" class="menu-toggle" aria-label="Alternar menu">
        ☰
      </button>
      <h1 class="site-title">Outlet Estoque</h1>
      <nav class="horizontal-nav">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">Sobre</router-link></li>
          <li><router-link to="/contact">Contato</router-link></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: "HeaderHorizontal",
  };
  </script>