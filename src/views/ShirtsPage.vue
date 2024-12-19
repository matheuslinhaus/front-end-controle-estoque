<template>
  <div>
    <div class="header">
      <h1>Camisas</h1>

      <button @click="openCreateModal" class="create-btn">
        <img src="https://img.icons8.com/ios-filled/50/ffffff/plus.png" alt="Criar nova camisa" />
        Criar Nova Camisa
      </button>
    </div>
    <div class="tabela-container">
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
            <th>Imagem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(shirt, index) in shirts" :key="shirt.id" :class="{ 'highlight-row': index % 2 !== 0 }"
            @click="navigateToProduct(shirt.id, 'shirts')" style="cursor: pointer">
            <td>{{ shirt.id }}</td>
            <td>{{ shirt.description }}</td>
            <td>{{ shirt.brand.name }}</td>
            <td>{{ shirt.price | currency }}</td>
            <td>{{ shirt.quantity }}</td>
            <td>{{ shirt.color }}</td>
            <td>{{ shirt.size }}</td>
            <td>{{ shirt.printed ? "Sim" : "Não" }}</td>
            <td>{{ shirt.material }}</td>
            <td><img :src="shirt.urlImage" alt="Imagem da camisa" class="shirt-image" width="40" height="40" /></td>
            <td class="actions">
              <button @click.stop="editShirt(shirt)" class="edit-btn" aria-label="Editar camisa">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/edit.png" alt="Editar" />
                Editar
              </button>
              <button @click.stop="confirmDelete(shirt.id)" class="delete-btn" aria-label="Deletar camisa">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/delete.png" alt="Deletar" />
                Deletar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <LoadingModal ref="loadingModal" />
    </div>


    <!-- Modal de Criação -->
    <div v-if="isCreateModalVisible" class="modal-overlay">
      <div class="modal">
        <button @click="closeCreateModal" class="close-btn" aria-label="Fechar modal">&times;</button>
        <h2>Criar Nova Camisa</h2>
        <form @submit.prevent="submitCreate">
          <label for="description">
            Descrição <span class="required">*</span>
          </label>
          <input type="text" id="description" v-model="newShirt.description" required />

          <label for="fullDescription">Descrição Completa</label>
          <textarea id="fullDescription" v-model="newShirt.fullDescription"></textarea>

          <label for="brand">Marca <span class="required">*</span></label>
          <select id="brand" v-model="newShirt.brand" required>
            <option v-for="brand in brands" :key="brand.id" :value="brand">
              {{ brand.name }}
            </option>
          </select>

          <label for="price">Preço <span class="required">*</span></label>
          <input type="number" id="price" v-model="newShirt.price" required />

          <label for="quantity">Quantidade <span class="required">*</span></label>
          <input type="number" id="quantity" v-model="newShirt.quantity" required />

          <label for="color">Cor <span class="required">*</span></label>
          <input type="text" id="color" v-model="newShirt.color" required />

          <label for="size">Tamanho <span class="required">*</span></label>
          <select id="size" v-model="newShirt.size" required>
            <option disabled value="">Selecione um tamanho</option>
            <option v-for="size in sizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>

          <label for="printed" style="display: flex; align-items: center">
            <span style="margin-right: 10px">Estampa</span>
            <input type="checkbox" id="printed" v-model="newShirt.printed" />
          </label>

          <label for="material">Material</label>
          <input type="text" id="material" v-model="newShirt.material" />

          <label for="urlImage">Url da Imagem</label>
          <input type="text" id="urlImage" v-model="newShirt.urlImage" />

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
        <h2>Editar Camisa</h2>
        <form @submit.prevent="submitEdit">
          <label for="description">Descrição <span class="required">*</span></label>
          <input type="text" id="description" v-model="editedShirt.description" required />

          <label for="fullDescription">Descrição Completa</label>
          <textarea id="fullDescription" v-model="editedShirt.fullDescription"></textarea>

          <!-- <label for="brand">Marca</label>
          <input type="text" id="brand" v-model="editedShirt.brand" required /> -->

          <label for="brand">Marca <span class="required">*</span></label>
          <select id="brand" v-model="editedShirt.brand.id" required>
            <option v-for="brand in brands" :key="brand.id" :value="brand.id">
              {{ brand.name }}
            </option>
          </select>


          <label for="price">Preço <span class="required">*</span></label>
          <input type="number" id="price" v-model="editedShirt.price" required />

          <label for="quantity">Quantidade <span class="required">*</span></label>
          <input type="number" id="quantity" v-model="editedShirt.quantity" required />

          <label for="color">Cor <span class="required">*</span></label>
          <input type="text" id="color" v-model="editedShirt.color" required />

          <label for="size">Tamanho <span class="required">*</span></label>
          <select id="size" v-model="editedShirt.size" required>
            <option disabled value="">Selecione um tamanho</option>
            <option v-for="size in sizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>

          <label for="printed" style="display: flex; align-items: center">
            <span style="margin-right: 10px">Estampa</span>
            <input type="checkbox" id="printed" v-model="editedShirt.printed" />
          </label>

          <label for="material">Material</label>
          <input type="text" id="material" v-model="editedShirt.material" />

          <label for="urlImage">Url da Imagem</label>
          <input type="text" id="urlImage" v-model="editedShirt.urlImage" />

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
import LoadingModal from "../components/LoadingModal.vue";
import api from '@/services/api';

export default {
  components: { LoadingModal, },
  data() {
    return {
      shirts: [],
      isCreateModalVisible: false,
      isModalVisible: false,
      isDeleteModalVisible: false,
      editedShirt: {},
      sizes: ["PP", "P", "M", "G", "GG", "XG"],
      newShirt: {
        description: "",
        fullDescription: "",
        brand: null,
        price: 0,
        quantity: 1,
        color: "",
        size: "",
        printed: false,
        material: "",
        urlImage: "",
      },
      brands: [],
      shirtToDelete: null,
    };
  },
  created() {
    this.fetchShirts();
    this.fetchBrands();
  },
  methods: {
    async fetchShirts() {
      try {
        const response = await api.get('/shirts');
        this.shirts = response.data;
      } catch (error) {
        console.error("Erro ao buscar camisas:", error);
      }
    },
    async fetchBrands() {
      try {
        const response = await api.get('/brands', { params: { productType: 1 } });
        this.brands = response.data;
      } catch (error) {
        console.error('Erro ao carregar as marcas:', error);
      }
    },
    navigateToProduct(productId, productType) {
      this.$router.push({ path: `/product/${productType}/${productId}` });
    },
    editShirt(shirt) {
      this.editedShirt = { ...shirt };
      this.isModalVisible = true;
    },
    async submitEdit() {
      this.$refs.loadingModal.show(); // Exibe o modal de carregamento
      try {
        const response = await api.put(`/shirts/${this.editedShirt.id}`, this.editedShirt);
        const index = this.shirts.findIndex((s) => s.id === this.editedShirt.id);
        if (index !== -1) {
          this.shirts.splice(index, 1, response.data);
        }
        this.closeModal();
      } catch (error) {
        console.error("Erro ao editar camisa:", error);
      } finally {
        this.$refs.loadingModal.hide(); // Esconde o modal de carregamento
      }
    },
    closeModal() {
      this.isModalVisible = false;
      this.editedShirt = {};
    },
    openCreateModal() {
      this.isCreateModalVisible = true;
    },
    async submitCreate() {
      this.$refs.loadingModal.show(); // Exibe o modal de carregamento
      try {
        const response = await api.post('/shirts', this.newShirt);
        this.shirts.push(response.data);
        this.closeCreateModal();
      } catch (error) {
        console.error("Erro ao criar camisa:", error);
      } finally {
        this.$refs.loadingModal.hide(); // Esconde o modal de carregamento
      }
    },
    closeCreateModal() {
      this.isCreateModalVisible = false;
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
        urlImage: "",
      };
    },
    confirmDelete(id) {
      this.shirtToDelete = id;
      this.isDeleteModalVisible = true;
    },
    async deleteShirt() {
      this.$refs.loadingModal.show(); // Exibe o modal de carregamento
      try {
        await api.delete(`/shirts/${this.shirtToDelete}`);
        this.shirts = this.shirts.filter(
          (shirt) => shirt.id !== this.shirtToDelete
        );
        this.closeDeleteModal();
      } catch (error) {
        console.error("Erro ao deletar camisa:", error);
      } finally {
        this.$refs.loadingModal.hide(); // Esconde o modal de carregamento
      }
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false;
      this.shirtToDelete = null;
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