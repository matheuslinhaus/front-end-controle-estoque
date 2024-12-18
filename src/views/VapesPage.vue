<template>
  <div>
    <h1>Vapes</h1>

    <!-- Botão para Criar Novo Vape -->
    <button @click="openCreateModal" class="create-btn">
      <img src="https://img.icons8.com/ios-filled/50/ffffff/plus.png" alt="Criar novo vape" />
      Criar Novo Vape
    </button>

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
        <tr v-for="(vape, index) in vapes" :key="vape.id" :class="{ 'highlight-row': index % 2 !== 0 }">
          <td>{{ vape.id }}</td>
          <td>{{ vape.description }}</td>
          <td>{{ vape.brand.name }}</td>
          <td>{{ vape.price | currency }}</td>
          <td>{{ vape.quantity }}</td>
          <td>{{ vape.puffs }}</td>
          <td>{{ vape.flavor }}</td>
          <td>
            <img :src="vape.urlImage" alt="Vape" width="40" height="40" />
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

    <div>
      <LoadingModal ref="loadingModal" />
    </div>

    <!-- Modal de Criação -->
    <div v-if="isCreateModalVisible" class="modal-overlay">
      <div class="modal">
        <button @click="closeCreateModal" class="close-btn" aria-label="Fechar modal">&times;</button>
        <h2>Criar Novo Vape</h2>
        <form @submit.prevent="submitCreate">
          <label for="description">Descrição</label>
          <input type="text" id="description" v-model="newVape.description" required />

          <label for="brand">Marca <span class="required">*</span></label>
          <select id="brand" v-model="newVape.brand" required>
            <option v-for="brand in brands" :key="brand.id" :value="brand">
              {{ brand.name }}
            </option>
          </select>

          <label for="price">Preço</label>
          <input type="number" id="price" v-model="newVape.price" required />

          <label for="quantity">Quantidade</label>
          <input type="number" id="quantity" v-model="newVape.quantity" required />

          <label for="puffs">Puffs</label>
          <input type="number" id="puffs" v-model="newVape.puffs" required />

          <label for="flavor">Sabor</label>
          <input type="text" id="flavor" v-model="newVape.flavor" required />

          <label for="urlImage">Imagem URL</label>
          <input type="text" id="urlImage" v-model="newVape.urlImage" />

          <div class="modal-actions">
            <button type="submit" class="submit-btn">Salvar</button>
            <button @click="closeCreateModal" class="cancel-btn">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Edição -->
    <div v-if="isModalVisible" class="modal-overlay">
      <div class="modal">
        <button @click="closeModal" class="close-btn" aria-label="Fechar modal">&times;</button>
        <h2>Editar Vape</h2>
        <form @submit.prevent="submitEdit">
          <label for="description">Descrição</label>
          <input type="text" id="description" v-model="editedVape.description" required />

          <label for="fullDescription">Descrição Completa</label>
          <textarea id="fullDescription" v-model="editedVape.fullDescription" ></textarea>

          <label for="brand">Marca <span class="required">*</span></label>
          <select id="brand" v-model="editedVape.brand.id" required>
            <option v-for="brand in brands" :key="brand.id" :value="brand.id">
              {{ brand.name }}
            </option>
          </select>

          <label for="price">Preço</label>
          <input type="number" id="price" v-model="editedVape.price" required />

          <label for="quantity">Quantidade</label>
          <input type="number" id="quantity" v-model="editedVape.quantity" required />

          <label for="puffs">Puffs</label>
          <input type="number" id="puffs" v-model="editedVape.puffs" required />

          <label for="flavor">Sabor</label>
          <input type="text" id="flavor" v-model="editedVape.flavor" required />

          <label for="urlImage">Imagem URL</label>
          <input type="text" id="urlImage" v-model="editedVape.urlImage" />

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
import LoadingModal from "../components/LoadingModal.vue";
import "../css/Modal.css"
import "../css/Table.css"
import axios from 'axios';

export default {
  components: { LoadingModal, },
  data() {
    return {
      vapes: [],
      isModalVisible: false,
      isDeleteModalVisible: false,
      isCreateModalVisible: false, // Modal de Criação
      newVape: {
        description: '',
        brand: null,
        price: 0,
        quantity: 1,
        puffs: 0,
        flavor: '',
        urlImage: ''
      },
      brands: [],
      editedVape: {},
      vapeToDelete: null, // Armazena o ID do vape a ser excluído
    };
  },
  created() {
    this.fetchVapes();
    this.fetchBrands();
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
    fetchBrands() {
      // Substitua esta URL pela sua API real
      fetch('https://controle-estoque-eu4h.onrender.com/brands?productType=2')
        .then(response => response.json())
        .then(data => {
          this.brands = data; // Preenche o array de marcas com a resposta da API
        })
        .catch(error => {
          console.error('Erro ao carregar as marcas:', error);
        });
    },
    openCreateModal() {
      this.isCreateModalVisible = true;
    },
    async submitCreate() {
      this.$refs.loadingModal.show(); // Exibe o modal de carregamento
      try {
        const response = await axios.post('https://controle-estoque-eu4h.onrender.com/vapes', this.newVape);
        this.vapes.push(response.data);
        this.closeCreateModal();
      } catch (error) {
        console.error("Erro ao criar vape:", error);
      } finally {
        this.$refs.loadingModal.hide(); // Esconde o modal de carregamento
      }
    },
    closeCreateModal() {
      this.isCreateModalVisible = false;
      this.newVape = {
        description: '',
        brand: '',
        price: 0,
        quantity: 1,
        puffs: 0,
        flavor: '',
        urlImage: ''
      };
    },
    editVape(vape) {
      this.editedVape = { ...vape }; // Copia os dados do vape selecionado
      this.isModalVisible = true; // Exibe o modal de edição
    },
    async submitEdit() {
      this.$refs.loadingModal.show(); // Exibe o modal de carregamento
      try {
        const response = await axios.put(`https://controle-estoque-eu4h.onrender.com/vapes/${this.editedVape.id}`, this.editedVape);
        const index = this.vapes.findIndex(v => v.id === this.editedVape.id);
        if (index !== -1) {
          this.vapes.splice(index, 1, response.data);
        }
        this.closeModal();
      } catch (error) {
        console.error("Erro ao editar vape:", error);
      } finally {
        this.$refs.loadingModal.hide(); // Esconde o modal de carregamento
      }
    },
    closeModal() {
      this.isModalVisible = false;
      this.editedVape = {};
    },
    confirmDelete(id) {
      this.vapeToDelete = id;
      this.isDeleteModalVisible = true;
    },
    async deleteVape() {
      this.$refs.loadingModal.show(); // Exibe o modal de carregamento
      try {
        await axios.delete(`https://controle-estoque-eu4h.onrender.com/vapes/${this.vapeToDelete}`);
        this.vapes = this.vapes.filter(vape => vape.id !== this.vapeToDelete);
        this.closeDeleteModal();
      } catch (error) {
        console.error("Erro ao deletar vape:", error);
      } finally {
        this.$refs.loadingModal.hide(); // Esconde o modal de carregamento
      }
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false;
      this.vapeToDelete = null;
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
