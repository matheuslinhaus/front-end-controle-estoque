<template>
  <div>
    <h1>Tênis</h1>

    <!-- Botão para Criar Novo Sapato -->
    <button @click="openCreateModal" class="create-btn">
      <img src="https://img.icons8.com/ios-filled/50/ffffff/plus.png" alt="Criar novo sapato" />
      Criar Novo Sapato
    </button>

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
        <tr v-for="(shoe, index) in shoes" :key="shoe.id" :class="{ 'highlight-row': index % 2 !== 0 }">
          <td>{{ shoe.id }}</td>
          <td>{{ shoe.description }}</td>
          <td>{{ shoe.brand.name }}</td>
          <td>{{ shoe.price | currency }}</td>
          <td>{{ shoe.quantity }}</td>
          <td>{{ shoe.color }}</td>
          <td>{{ shoe.size }}</td>
          <td><img :src="shoe.urlImage" alt="Imagem do sapato" class="shoe-image" width="40" height="40" /></td>
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

    <div>
      <LoadingModal ref="loadingModal" />
    </div>

    <!-- Modal de Criação -->
    <div v-if="isCreateModalVisible" class="modal-overlay">
      <div class="modal">
        <button @click="closeCreateModal" class="close-btn" aria-label="Fechar modal">&times;</button>
        <h2>Criar Novo Sapato</h2>
        <form @submit.prevent="submitCreate">
          <label for="description">Descrição <span class="required">*</span></label>
          <input type="text" id="description" v-model="newShoe.description" required />

          <label for="fullDescription">Descrição completa</label>
          <input type="text" id="fullDescription" v-model="newShoe.fullDescription" />

          <label for="brand">Marca <span class="required">*</span></label>
          <select id="brand" v-model="newShoe.brand" required>
            <option v-for="brand in brands" :key="brand.id" :value="brand">
              {{ brand.name }}
            </option>
          </select>

          <label for="price">Preço <span class="required">*</span></label>
          <input type="number" id="price" v-model="newShoe.price" required />

          <label for="quantity">Quantidade <span class="required">*</span></label>
          <input type="number" id="quantity" v-model="newShoe.quantity" required />

          <label for="color">Cor <span class="required">*</span></label>
          <input type="text" id="color" v-model="newShoe.color" required />

          <label for="size">Tamanho <span class="required">*</span></label>
          <select id="size" v-model="newShoe.size" required>
            <option disabled value="">Selecione um tamanho</option>
            <option v-for="size in sizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>

          <label for="urlImage">URL da Imagem</label>
          <input type="text" id="urlImage" v-model="newShoe.urlImage" />

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
        <h2>Editar Sapato</h2>
        <form @submit.prevent="submitEdit">
          <label for="description">Descrição <span class="required">*</span></label>
          <input type="text" id="description" v-model="editedShoe.description" required />

          <label for="fullDescription">Descrição Completa</label>
          <textarea id="fullDescription" v-model="editedShoe.fullDescription"></textarea>

          <label for="brand">Marca <span class="required">*</span></label>
          <select id="brand" v-model="editedShoe.brand.id" required>
            <option v-for="brand in brands" :key="brand.id" :value="brand.id">
              {{ brand.name }}
            </option>
          </select>

          <label for="price">Preço <span class="required">*</span></label>
          <input type="number" id="price" v-model="editedShoe.price" required />

          <label for="quantity">Quantidade <span class="required">*</span></label>
          <input type="number" id="quantity" v-model="editedShoe.quantity" required />

          <label for="color">Cor <span class="required">*</span></label>
          <input type="text" id="color" v-model="editedShoe.color" required />

          <label for="size">Tamanho <span class="required">*</span></label>
          <select id="size" v-model="editedShoe.size" required>
            <option disabled value="">Selecione um tamanho</option>
            <option v-for="size in sizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>

          <label for="urlImage">URL da Imagem</label>
          <input type="text" id="urlImage" v-model="editedShoe.urlImage" />

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
import LoadingModal from '../components/LoadingModal.vue';

export default {
  components: { LoadingModal, },
  data() {
    return {
      shoes: [],
      isModalVisible: false,
      isDeleteModalVisible: false,
      isCreateModalVisible: false, // Modal para criação de sapato
      sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
      newShoe: {
        description: '',
        fullDescription: '',
        brand: null,
        price: 0,
        quantity: 1,
        color: '',
        size: '',
        urlImage: ''
      },
      brands: [],
      editedShoe: {},
      shoeToDelete: null,
    };
  },
  created() {
    this.fetchShoes();
    this.fetchBrands();
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
    fetchBrands() {
      // Substitua esta URL pela sua API real
      fetch('https://controle-estoque-eu4h.onrender.com/brands?productType=0')
        .then(response => response.json())
        .then(data => {
          this.brands = data; // Preenche o array de marcas com a resposta da API
        })
        .catch(error => {
          console.error('Erro ao carregar as marcas:', error);
        });
    },
    editShoe(shoe) {
      this.editedShoe = { ...shoe };
      this.isModalVisible = true;
    },
    openCreateModal() {
      console.log('Abrindo modal');
      this.isCreateModalVisible = true;
    },
    async submitCreate() {
      this.$refs.loadingModal.show(); // Exibe o modal de carregamento
      try {
        const response = await axios.post('https://controle-estoque-eu4h.onrender.com/shoes', this.newShoe);
        this.shoes.push(response.data);
        this.closeCreateModal();
      } catch (error) {
        console.error("Erro ao criar sapato:", error);
      } finally {
        this.$refs.loadingModal.hide(); // Esconde o modal de carregamento
      }
    },
    closeCreateModal() {
      this.isCreateModalVisible = false;
      this.newShoe = {
        description: '',
        fullDescription: '',
        brand: null,
        price: 0,
        quantity: 1,
        color: '',
        size: '',
        urlImage: ''
      };
    },
    async submitEdit() {
      this.$refs.loadingModal.show(); // Exibe o modal de carregamento
      try {
        const response = await axios.put(`https://controle-estoque-eu4h.onrender.com/shoes/${this.editedShoe.id}`, this.editedShoe);
        const index = this.shoes.findIndex(s => s.id === this.editedShoe.id);
        if (index !== -1) {
          this.shoes.splice(index, 1, response.data);
        }
        this.closeModal();
      } catch (error) {
        console.error("Erro ao editar sapato:", error);
      } finally {
        this.$refs.loadingModal.hide(); // Esconde o modal de carregamento
      }
    },
    closeModal() {
      this.isModalVisible = false;
      this.editedShoe = {};
    },
    confirmDelete(id) {
      this.shoeToDelete = id;
      this.isDeleteModalVisible = true;
    },
    async deleteShoe() {
      this.$refs.loadingModal.hide(); // Esconde o modal de carregamento
      try {
        await axios.delete(`https://controle-estoque-eu4h.onrender.com/shoes/${this.shoeToDelete}`);
        this.shoes = this.shoes.filter(shoe => shoe.id !== this.shoeToDelete);
        this.closeDeleteModal();
      } catch (error) {
        console.error("Erro ao deletar sapato:", error);
      } finally {
        this.$refs.loadingModal.hide(); // Esconde o modal de carregamento
      }
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false;
      this.shoeToDelete = null;
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