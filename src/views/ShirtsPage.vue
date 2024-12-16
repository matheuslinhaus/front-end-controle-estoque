<template>
    <div>
      <div class="header">
        <h1>Camisas Disponíveis</h1>
  
        <button @click="openCreateModal" class="create-btn">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/plus.png" alt="Criar nova camisa" />
  
          Criar Nova Camisa
        </button>
      </div>
  
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
            <th>Estampa</th>
            <th>Material</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(shirt, index) in shirts" :key="shirt.id" :class="{ 'highlight-row': index % 2 !== 0 }">
            <td>{{ shirt.id }}</td>
            <td>{{ shirt.description }}</td>
            <td>{{ shirt.brand }}</td>
            <td>{{ shirt.price | currency }}</td>
            <td>{{ shirt.quantity }}</td>
            <td>{{ shirt.color }}</td>
            <td>{{ shirt.size }}</td>
            <td>{{ shirt.printed ? "Sim" : "Não" }}</td>
            <td>{{ shirt.material }}</td>
            <td class="actions">
              <button @click="editShirt(shirt)" class="edit-btn" aria-label="Editar camisa">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/edit.png" alt="Editar" />
                Editar
              </button>
              <button @click="confirmDelete(shirt.id)" class="delete-btn" aria-label="Deletar camisa">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/delete.png" alt="Deletar" />
                Deletar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal de Criação -->
  
      <div v-if="isCreateModalVisible" class="modal-overlay">
        <div class="modal">
          <button @click="closeCreateModal" class="close-btn" aria-label="Fechar modal">
            &times;
          </button>
  
          <h2>Criar Nova Camisa</h2>
  
          <form @submit.prevent="submitCreate">
            <label for="description">
              Descrição <span class="required">*</span>
            </label>
            <input type="text" id="description" v-model="newShirt.description" required />
  
            <label for="fullDescription">Descrição Completa</label>
  
            <textarea id="fullDescription" v-model="newShirt.fullDescription"></textarea>
  
            <label for="brand">Marca <span class="required">*</span></label>
  
            <input type="text" id="brand" v-model="newShirt.brand" required />
  
            <label for="price">Preço <span class="required">*</span></label>
  
            <input type="number" id="price" v-model="newShirt.price" required />
  
            <label for="quantity">Quantidade <span class="required">*</span></label>
  
            <input type="number" id="quantity" v-model="newShirt.quantity" required />
  
            <label for="color">Cor <span class="required">*</span></label>
  
            <input type="text" id="color" v-model="newShirt.color" required />
  
            <label for="size">Tamanho <span class="required">*</span></label>
  
            <input type="text" id="size" v-model="newShirt.size" required />
  
            <label for="printed" style="display: flex; align-items: center">
              <span style="margin-right: 10px">Estampa</span>
              <input type="checkbox" id="printed" v-model="newShirt.printed" />
            </label>
  
            <label for="material">Material</label>
  
            <input type="text" id="material" v-model="newShirt.material" required />
  
            <div class="modal-actions">
              <button type="submit" class="submit-btn">Salvar</button>
  
              <button @click="closeCreateModal" class="cancel-btn">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Modal de Edição -->
      <div v-if="isModalVisible" class="modal-overlay">
        <div class="modal">
          <button @click="closeModal" class="close-btn" aria-label="Fechar modal">
            &times;
          </button>
          <h2>Editar Camisa</h2>
          <form @submit.prevent="submitEdit">
            <label for="description">Descrição</label>
            <input type="text" id="description" v-model="editedShirt.description" required />
  
            <label for="fullDescription">Descrição Completa</label>
            <textarea id="fullDescription" v-model="editedShirt.fullDescription" required></textarea>
  
            <label for="brand">Marca</label>
            <input type="text" id="brand" v-model="editedShirt.brand" required />
  
            <label for="price">Preço</label>
            <input type="number" id="price" v-model="editedShirt.price" required />
  
            <label for="quantity">Quantidade</label>
            <input type="number" id="quantity" v-model="editedShirt.quantity" required />
  
            <label for="color">Cor</label>
            <input type="text" id="color" v-model="editedShirt.color" required />
  
            <label for="size">Tamanho</label>
            <input type="text" id="size" v-model="editedShirt.size" required />
  
            <label for="printed" style="display: flex; align-items: center">
              <span style="margin-right: 10px">Estampa</span>
  
              <input type="checkbox" id="printed" v-model="editedShirt.printed" />
            </label>
  
            <label for="material">Material</label>
            <input type="text" id="material" v-model="editedShirt.material" required />
  
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
          <button @click="closeDeleteModal" class="close-btn" aria-label="Fechar modal">
            &times;
          </button>
          <h2>Você realmente deseja excluir?</h2>
          <div class="modal-actions">
            <button @click="deleteShirt" class="submit-btn">Sim</button>
            <button @click="closeDeleteModal" class="cancel-btn">Não</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import "../css/Modal.css";
  import "../css/Table.css";
  import axios from "axios";
  
  export default {
    data() {
      return {
        shirts: [],
        isCreateModalVisible: false, // Variável para controlar a visibilidade do modal de criação
        isModalVisible: false,
        isDeleteModalVisible: false,
        editedShirt: {},
        newShirt: {
          // Dados da nova camisa
  
          description: "",
  
          fullDescription: "",
  
          brand: "",
  
          price: 0,
  
          quantity: 1,
  
          color: "",
  
          size: "",
  
          printed: false,
  
          material: "",
        },
        shirtToDelete: null, // Armazena o ID da camisa a ser excluída
      };
    },
    created() {
      this.fetchShirts();
    },
    methods: {
      async fetchShirts() {
        try {
          const response = await axios.get(
            "https://controle-estoque-eu4h.onrender.com/shirts"
          );
          this.shirts = response.data;
        } catch (error) {
          console.error("Erro ao buscar camisas:", error);
        }
      },
      editShirt(shirt) {
        this.editedShirt = { ...shirt }; // Copia os dados da camisa selecionada
        this.isModalVisible = true; // Exibe o modal de edição
      },
      async submitEdit() {
        try {
          const response = await axios.put(
            `https://controle-estoque-eu4h.onrender.com/shirts/${this.editedShirt.id}`,
            this.editedShirt
          );
          // Atualiza a lista de camisas com os dados atualizados
          const index = this.shirts.findIndex(
            (s) => s.id === this.editedShirt.id
          );
          if (index !== -1) {
            this.shirts.splice(index, 1, response.data); // Substitui a camisa editada na lista
          }
          this.closeModal(); // Fecha o modal
        } catch (error) {
          console.error("Erro ao editar camisa:", error);
        }
      },
      closeModal() {
        this.isModalVisible = false; // Fecha o modal de edição
        this.editedShirt = {}; // Limpa os dados do modal
      },
      openCreateModal() {
        this.isCreateModalVisible = true; // Exibe o modal de criação
      },
  
      async submitCreate() {
        try {
          const response = await axios.post(
            "https://controle-estoque-eu4h.onrender.com/shirts",
            this.newShirt
          );
  
          this.shirts.push(response.data); // Adiciona a nova camisa à lista
  
          this.closeCreateModal(); // Fecha o modal de criação
        } catch (error) {
          console.error("Erro ao criar camisa:", error);
        }
      },
  
      closeCreateModal() {
        this.isCreateModalVisible = false; // Fecha o modal de criação
  
        this.newShirt = {
          description: "",
          fullDescription: "",
          brand: "",
          price: 0,
          quantity: 1,
          color: "",
          size: "",
          printed: false,
          material: "",
        }; // Limpa os dados
      },
      // Abre o modal de confirmação de exclusão
      confirmDelete(id) {
        this.shirtToDelete = id; // Armazena o ID da camisa a ser excluída
        this.isDeleteModalVisible = true; // Exibe o modal de confirmação
      },
      // Deleta a camisa
      async deleteShirt() {
        try {
          await axios.delete(
            `https://controle-estoque-eu4h.onrender.com/shirts/${this.shirtToDelete}`
          );
          // Remove a camisa da lista
          this.shirts = this.shirts.filter(
            (shirt) => shirt.id !== this.shirtToDelete
          );
          this.closeDeleteModal(); // Fecha o modal de confirmação
        } catch (error) {
          console.error("Erro ao deletar camisa:", error);
        }
      },
      // Fecha o modal de confirmação de exclusão
      closeDeleteModal() {
        this.isDeleteModalVisible = false; // Fecha o modal de exclusão
        this.shirtToDelete = null; // Limpa o ID da camisa a ser excluída
      },
    },
    filters: {
      currency(value) {
        if (!value) return "";
        return `R$ ${value.toFixed(2)}`;
      },
    },
  };
  </script>
  