<template>
    <div class="brand-manager">
        <h1>Gestão de Marcas</h1>

        <!-- Seletor de tipo de produto -->
        <select v-model="selectedProductType" @change="fetchBrands">
            <option value="">Todos</option>
            <option value="0">Tênis</option>
            <option value="1">Camisas</option>
            <option value="2">Vapes</option>
        </select>

        <button @click="openModal" class="create-btn">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/plus.png" alt="Criar nova camisa" />
            Adicionar Nova Marca
        </button>

        <!-- Modal para Adicionar/Editar Marca -->
        <div v-if="isModalOpen" class="modal-overlay">
            <div class="modal">
                <h2>{{ formData.id ? 'Editar Marca' : 'Adicionar Marca' }}</h2>
                <form @submit.prevent="handleSubmit">
                    <div>
                        <label for="name">Nome:</label>
                        <input type="text" id="name" v-model="formData.name" required />
                    </div>

                    <div>
                        <label for="productType">Tipo de Produto:</label>
                        <select id="productType" v-model="formData.productType" required>
                            <option value="SHIRT">Camisa</option>
                            <option value="SHOES">Tênis</option>
                            <option value="VAPE">Vape</option>
                        </select>
                    </div>

                    <div class="modal-actions">
                        <button class="submit-btn" type="submit">
                            {{ formData.id ? 'Atualizar' : 'Adicionar' }}
                        </button>
                        <button class="cancel-btn" type="button" @click="closeModal">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal para Confirmar Exclusão -->
        <div v-if="isDeleteModalOpen" class="modal-overlay">
            <div class="modal-delete">
                <h2>Confirmar Exclusão</h2>
                <p>
                    Tem certeza que deseja excluir a marca <strong>{{ brandToDelete?.name }}</strong>?
                </p>
                <div class="modal-actions">
                    <button class="submit-btn" @click="confirmDelete">
                        Sim, excluir
                    </button>
                    <button class="cancel-btn" @click="closeDeleteModal">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>

        <!-- Lista de Marcas -->
        <div class="tabela-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Tipo de Produto</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="brand in brands" :key="brand.id">
                        <td>{{ brand.id }}</td>
                        <td>{{ brand.name }}</td>
                        <td>{{ getProductTypeName(brand.productType) }}</td>
                        <td class="actions">
                            <button @click="editBrand(brand)">Editar</button>
                            <button class="delete-btn" @click="openDeleteModal(brand)">
                                Excluir
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import "../css/Modal.css";
import "../css/Table.css";

export default {
    name: "BrandManager",
    data() {
        return {
            brands: [],
            formData: {
                id: null,
                name: "",
                productType: "SHIRT",
            },
            productTypeEnum: {
                tenis: 0,
                camisas: 1,
                vapes: 2,
            },
            selectedProductType: "",
            isModalOpen: false,
            isDeleteModalOpen: false,
            brandToDelete: null,
        };
    },
    methods: {

        async fetchBrands() {
            // Verifica se o tipo de produto foi selecionado
            let url = 'https://controle-estoque-eu4h.onrender.com/brands/';
            if (this.selectedProductType !== '') {
                // Se houver um tipo selecionado, adiciona o parâmetro na URL
                url = `https://controle-estoque-eu4h.onrender.com/brands?productType=${this.selectedProductType}`;
            }

            try {
                const response = await fetch(url);
                const data = await response.json();
                this.brands = data; // Atualiza a lista de marcas com a resposta
            } catch (error) {
                console.error('Erro ao buscar marcas:', error);
            }
        },
        getProductTypeName(productType) {
            switch (productType) {
                case 'SHIRT':
                    return 'Camisa';
                case 'SHOES':
                    return 'Tênis';
                case 'VAPE':
                    return 'Vape';
                default:
                    return 'Desconhecido'; // Caso não seja nenhum dos valores esperados
            }
        },

        async handleSubmit() {
            try {
                if (this.formData.id) {
                    await axios.put(`https://controle-estoque-eu4h.onrender.com/api/brands/${this.formData.id}`, this.formData);
                } else {
                    await axios.post("https://controle-estoque-eu4h.onrender.com/api/brands", this.formData);
                }
                this.fetchBrands();
                this.closeModal();
            } catch (error) {
                console.error("Erro ao salvar marca:", error);
            }
        },
        editBrand(brand) {
            this.formData = { ...brand };
            this.openModal();
        },
        async confirmDelete() {
            try {
                await axios.delete(`https://controle-estoque-eu4h.onrender.com/api/brands/${this.brandToDelete.id}`);
                this.fetchBrands();
                this.closeDeleteModal();
            } catch (error) {
                console.error("Erro ao excluir marca:", error);
            }
        },
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.resetForm();
        },
        openDeleteModal(brand) {
            this.brandToDelete = brand;
            this.isDeleteModalOpen = true;
        },
        closeDeleteModal() {
            this.isDeleteModalOpen = false;
            this.brandToDelete = null;
        },
        resetForm() {
            this.formData = {
                id: null,
                name: "",
                productType: "SHIRT",
            };
        },
    },
    mounted() {
        this.fetchBrands();
    },
};
</script>