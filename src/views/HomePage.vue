<template>
    <div class="home-container">
      <h1>Bem-vindo ao Outlet Estoque</h1>
      <p>Gerencie seus produtos de forma simples e eficiente.</p>
      <div class="explore-buttons">
        <router-link to="/shirts" class="link-button">Explorar Camisas</router-link>
        <router-link to="/shoes" class="link-button">Explorar Tênis</router-link>
        <router-link to="/vapes" class="link-button">Explorar Vapes</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Home",
  };
  </script>
  
  <style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
  }
  
  h1 {
    font-size: 2.5rem;
    color: #2c3e50;
  }
  
  p {
    font-size: 1.2rem;
    margin: 20px 0;
    color: #7f8c8d;
  }
  
  /* Container para os botões */
  .explore-buttons {
    display: flex;
    /* Usando flexbox */
    justify-content: center;
    /* Centraliza os botões horizontalmente */
    gap: 10px;
    /* Espaçamento entre os botões */
    margin-top: 20px;
    /* Espaçamento acima dos botões */
  }
  
  /* Estilo dos botões */
  .link-button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1rem;
    transition: background-color 0.3s;
  }
  
  .link-button:hover {
    background-color: #2980b9;
  }
  </style>
  