<template>
    <div v-if="isVisible" class="loading-overlay">
      <div class="loading-modal">
        <div class="spinner"></div>
        <span>Carregando...</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoadingModal",
    data() {
      return {
        isVisible: false,
      };
    },
    methods: {
      show() {
        this.isVisible = true;
      },
      hide() {
        this.isVisible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para o modal de carregamento */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-modal {
  color: black;
  font-weight: bold;
  background-color: white;
  padding: 30px; /* Aumentei o padding para dar mais espaço ao spinner e ao texto */
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 50px; /* Tamanho mínimo para o modal */
  min-height: 50px; /* Tamanho mínimo para o modal */
}

.spinner {
  border: 8px solid #f3f3f3; /* Cor do fundo */
  border-top: 8px solid #3498db; /* Cor da borda superior */
  border-radius: 50%;
  width: 50px; /* Aumentei o tamanho do spinner */
  height: 50px; /* Aumentei o tamanho do spinner */
  animation: spin 1s linear infinite;
  margin-bottom: 20px; /* Aumentei o espaço entre o spinner e o texto */
}

/* Animação de rotação */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
  </style>
  