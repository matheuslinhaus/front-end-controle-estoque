<template>
    <div>
      <h1>Vapes Disponíveis</h1>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Marca</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Puffs</th>
            <th>Sabor</th>
            <th>Imagem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(vape, index) in vapes" :key="vape.id" :class="{'highlight-row': index % 2 !== 0}">
            <td>{{ vape.id }}</td>
            <td>{{ vape.description }}</td>
            <td>{{ vape.brand }}</td>
            <td>{{ vape.price | currency }}</td>
            <td>{{ vape.quantity }}</td>
            <td>{{ vape.puffs }}</td>
            <td>{{ vape.flavor }}</td>
            <td>
              <img :src="vape.urlImage" alt="Vape" width="50" height="50" />
            </td>
            <td class="actions">
              <button @click="editVape(vape)" class="edit-btn" aria-label="Editar vape">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/edit.png" alt="Editar" />
                Editar
              </button>
              <button @click="confirmDelete(vape.id)" class="delete-btn" aria-label="Deletar vape">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/delete.png" alt="Deletar" />
                Deletar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal de Edição -->
      <div v-if="isModalVisible" class="modal-overlay">
        <div class="modal">
          <button @click="closeModal" class="close-btn" aria-label="Fechar modal">&times;</button>
          <h2>Editar Vape</h2>
          <form @submit.prevent="submitEdit">
            <label for="description">Descrição</label>
            <input type="text" id="description" v-model="editedVape.description" required />
  
            <label for="fullDescription">Descrição Completa</label>
            <textarea id="fullDescription" v-model="editedVape.fullDescription" required></textarea>
  
            <label for="brand">Marca</label>
            <input type="text" id="brand" v-model="editedVape.brand" required />
  
            <label for="price">Preço</label>
            <input type="number" id="price" v-model="editedVape.price" required />
  
            <label for="quantity">Quantidade</label>
            <input type="number" id="quantity" v-model="editedVape.quantity" required />
  
            <label for="puffs">Puffs</label>
            <input type="number" id="puffs" v-model="editedVape.puffs" required />
  
            <label for="flavor">Sabor</label>
            <input type="text" id="flavor" v-model="editedVape.flavor" required />
  
            <label for="urlImage">Imagem URL</label>
            <input type="text" id="urlImage" v-model="editedVape.urlImage" required />
  
            <div class="modal-actions">
              <button type="submit" class="submit-btn">Salvar</button>
              <button @click="closeModal" class="cancel-btn">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Modal de Confirmação de Exclusão -->
      <div v-if="isDeleteModalVisible" class="modal-overlay">
        <div class="modal-delete">
            <button @click="closeDeleteModal" class="close-btn" aria-label="Fechar modal">&times;</button>
          <h2>Você realmente deseja excluir?</h2>
          <div class="modal-actions">
            <button @click="deleteVape" class="submit-btn">Sim</button>
            <button @click="closeDeleteModal" class="cancel-btn">Não</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import "../css/Modal.css"
  import "../css/Table.css"
  import axios from 'axios';
  
  export default {
    data() {
      return {
        vapes: [],
        isModalVisible: false,
        isDeleteModalVisible: false,
        editedVape: {},
        vapeToDelete: null, // Armazena o ID do vape a ser excluído
      };
    },
    created() {
      this.fetchVapes();
    },
    methods: {
      async fetchVapes() {
        try {
          const response = await axios.get('https://controle-estoque-eu4h.onrender.com/vapes');
          this.vapes = response.data;
        } catch (error) {
          console.error("Erro ao buscar vapes:", error);
        }
      },
      editVape(vape) {
        this.editedVape = { ...vape }; // Copia os dados do vape selecionado
        this.isModalVisible = true; // Exibe o modal de edição
      },
      async submitEdit() {
        try {
          const response = await axios.put(`https://controle-estoque-eu4h.onrender.com/vapes/${this.editedVape.id}`, this.editedVape);
          // Atualiza a lista de vapes com os dados atualizados
          const index = this.vapes.findIndex(v => v.id === this.editedVape.id);
          if (index !== -1) {
            this.vapes.splice(index, 1, response.data); // Substitui o vape editado na lista
          }
          this.closeModal(); // Fecha o modal
        } catch (error) {
          console.error("Erro ao editar vape:", error);
        }
      },
      closeModal() {
        this.isModalVisible = false; // Fecha o modal de edição
        this.editedVape = {}; // Limpa os dados do modal
      },
      // Abre o modal de confirmação de exclusão
      confirmDelete(id) {
        this.vapeToDelete = id; // Armazena o ID do vape a ser excluído
        this.isDeleteModalVisible = true; // Exibe o modal de confirmação
      },
      // Deleta o vape
      async deleteVape() {
        try {
          await axios.delete(`https://controle-estoque-eu4h.onrender.com/vapes/${this.vapeToDelete}`);
          // Remove o vape da lista
          this.vapes = this.vapes.filter(vape => vape.id !== this.vapeToDelete);
          this.closeDeleteModal(); // Fecha o modal de confirmação
        } catch (error) {
          console.error("Erro ao deletar vape:", error);
        }
      },
      // Fecha o modal de confirmação de exclusão
      closeDeleteModal() {
        this.isDeleteModalVisible = false; // Fecha o modal de exclusão
        this.vapeToDelete = null; // Limpa o ID do vape a ser excluído
      }
    },
    filters: {
      currency(value) {
        if (!value) return '';
        return `R$ ${value.toFixed(2)}`;
      }
    }
  };
  </script>
  