<script setup>
import Layout from './layout/Layout.vue'
</script>

<template>
  <Layout msg="Vite + Vue" />
  <footer class="footer">
      <p>&copy; 2024 Outlet Estoque. Todos os direitos reservados.</p>
    </footer>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

footer {
  margin-bottom: -30px;
  color: white;
  text-align: center;
  font-size: 14px;
  position: relative;
  width: 100%;
  margin-top: auto; /* Empurra o rodapé para a parte inferior */
}
</style>
