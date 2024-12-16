<template>
    <div>
      <h1>Sapatos Disponíveis</h1>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Marca</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Cor</th>
            <th>Tamanho</th>
            <th>Imagem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(shoe, index) in shoes" :key="shoe.id" :class="{'highlight-row': index % 2 !== 0}">
            <td>{{ shoe.id }}</td>
            <td>{{ shoe.description }}</td>
            <td>{{ shoe.brand }}</td>
            <td>{{ shoe.price | currency }}</td>
            <td>{{ shoe.quantity }}</td>
            <td>{{ shoe.color }}</td>
            <td>{{ shoe.size }}</td>
            <td><img :src="shoe.urlImage" alt="Imagem do sapato" class="shoe-image" /></td>
            <td class="actions">
              <button @click="editShoe(shoe)" class="edit-btn" aria-label="Editar sapato">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/edit.png" alt="Editar" />
                Editar
              </button>
              <button @click="confirmDelete(shoe.id)" class="delete-btn" aria-label="Deletar sapato">
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
          <h2>Editar Sapato</h2>
          <form @submit.prevent="submitEdit">
            <label for="description">Descrição</label>
            <input type="text" id="description" v-model="editedShoe.description" required />
  
            <label for="fullDescription">Descrição Completa</label>
            <textarea id="fullDescription" v-model="editedShoe.fullDescription" required></textarea>
  
            <label for="brand">Marca</label>
            <input type="text" id="brand" v-model="editedShoe.brand" required />
  
            <label for="price">Preço</label>
            <input type="number" id="price" v-model="editedShoe.price" required />
  
            <label for="quantity">Quantidade</label>
            <input type="number" id="quantity" v-model="editedShoe.quantity" required />
  
            <label for="color">Cor</label>
            <input type="text" id="color" v-model="editedShoe.color" required />
  
            <label for="size">Tamanho</label>
            <input type="text" id="size" v-model="editedShoe.size" required />
  
            <label for="urlImage">URL da Imagem</label>
            <input type="text" id="urlImage" v-model="editedShoe.urlImage" required />
  
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
            <button @click="deleteShoe" class="submit-btn">Sim</button>
            <button @click="closeDeleteModal" class="cancel-btn">Não</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import "../css/Table.css"
  import "../css/Modal.css"
  
  export default {
    data() {
      return {
        shoes: [],
        isModalVisible: false,
        isDeleteModalVisible: false,
        editedShoe: {},
        shoeToDelete: null, // Armazena o ID do sapato a ser excluído
      };
    },
    created() {
      this.fetchShoes();
    },
    methods: {
      async fetchShoes() {
        try {
          const response = await axios.get('https://controle-estoque-eu4h.onrender.com/shoes');
          this.shoes = response.data;
        } catch (error) {
          console.error("Erro ao buscar sapatos:", error);
        }
      },
      editShoe(shoe) {
        this.editedShoe = { ...shoe }; // Copia os dados do sapato selecionado
        this.isModalVisible = true; // Exibe o modal de edição
      },
      async submitEdit() {
        try {
          const response = await axios.put(`https://controle-estoque-eu4h.onrender.com/shoes/${this.editedShoe.id}`, this.editedShoe);
          // Atualiza a lista de sapatos com os dados atualizados
          const index = this.shoes.findIndex(s => s.id === this.editedShoe.id);
          if (index !== -1) {
            this.shoes.splice(index, 1, response.data); // Substitui o sapato editado na lista
          }
          this.closeModal(); // Fecha o modal
        } catch (error) {
          console.error("Erro ao editar sapato:", error);
        }
      },
      closeModal() {
        this.isModalVisible = false; // Fecha o modal de edição
        this.editedShoe = {}; // Limpa os dados do modal
      },
      confirmDelete(id) {
        this.shoeToDelete = id; // Armazena o ID do sapato a ser excluído
        this.isDeleteModalVisible = true; // Exibe o modal de confirmação
      },
      async deleteShoe() {
        try {
          await axios.delete(`https://controle-estoque-eu4h.onrender.com/shoes/${this.shoeToDelete}`);
          // Remove o sapato da lista
          this.shoes = this.shoes.filter(shoe => shoe.id !== this.shoeToDelete);
          this.closeDeleteModal(); // Fecha o modal de confirmação
        } catch (error) {
          console.error("Erro ao deletar sapato:", error);
        }
      },
      closeDeleteModal() {
        this.isDeleteModalVisible = false; // Fecha o modal de exclusão
        this.shoeToDelete = null; // Limpa o ID do sapato a ser excluído
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