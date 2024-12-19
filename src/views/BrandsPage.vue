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

        <button @click="openCreateModal" class="create-btn">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/plus.png" alt="Criar nova marca" />
            Adicionar Nova Marca
        </button>

        <!-- Modal para Adicionar/Editar Marca -->
        <div v-if="isCreateModalVisible" class="modal-overlay">
            <div class="modal">
                <h2>{{ formData.id ? 'Editar Marca' : 'Adicionar Marca' }}</h2>
                <form @submit.prevent="submitCreateOrEdit">
                    <div>
                        <label for="name">Nome:</label>
                        <input type="text" id="name" v-model="formData.name" required />
                    </div>

                    <div>
                        <label for="productType">Tipo de Produto:</label>
                        <select id="productType" v-model="formData.productType" required>
                            <option value="SHOES">Tênis</option>
                            <option value="SHIRT">Camisa</option>
                            <option value="VAPE">Vape</option>
                        </select>
                    </div>

                    <div class="modal-actions">
                        <button class="submit-btn" type="submit">
                            {{ formData.id ? 'Atualizar' : 'Adicionar' }}
                        </button>
                        <button class="cancel-btn" type="button" @click="closeCreateModal">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal para Confirmar Exclusão -->
        <div v-if="isDeleteModalVisible" class="modal-overlay">
            <div class="modal-delete">
                <h2>Confirmar Exclusão</h2>
                <p>
                    Tem certeza que deseja excluir a marca <strong>{{ brandToDelete?.name }}</strong>?
                </p>
                <div class="modal-actions">
                    <button class="submit-btn" @click="deleteBrand">
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
                            <button @click="openEditModal(brand)">
                                <img src="https://img.icons8.com/ios-filled/50/ffffff/edit.png" alt="Editar" />
                                Editar
                            </button>
                            <button class="delete-btn" @click="openDeleteModal(brand)">
                                <img src="https://img.icons8.com/ios-filled/50/ffffff/delete.png" alt="Deletar" />
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
import api from '@/services/api';
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
                productType: "",
            },
            selectedProductType: "",
            isCreateModalVisible: false,
            isDeleteModalVisible: false,
            brandToDelete: null,
        };
    },
    methods: {
        async fetchBrands() {
            try {
                let endpoint = '/brands';
                if (!this.selectedProductType) {
                    endpoint += '/';
                }
                const params = this.selectedProductType ? { productType: this.selectedProductType } : {};
                const response = await api.get(endpoint, { params });
                this.brands = response.data;
            } catch (error) {
                console.error('Erro ao buscar marcas:', error);
            }
        },
        getProductTypeName(productType) {
            switch (productType) {
                case 'SHOES':
                    return 'Tênis';
                case "SHIRT":
                    return 'Camisa';
                case 'VAPE':
                    return 'Vape';
                default:
                    return 'Desconhecido';
            }
        },
        async submitCreateOrEdit() {
            try {
                if (this.formData.id) {
                    await api.put(`/brands/${this.formData.id}`, this.formData);
                } else {
                    await api.post('/brands', this.formData);
                }
                this.fetchBrands();
                this.closeCreateModal();
            } catch (error) {
                console.error("Erro ao salvar marca:", error);
            }
        },
        openEditModal(brand) {
            this.formData = { ...brand };
            this.isCreateModalVisible = true;
        },
        openCreateModal() {
            this.formData = {
                id: null,
                name: "",
                productType: "",
            };
            this.isCreateModalVisible = true;
        },
        closeCreateModal() {
            this.isCreateModalVisible = false;
            this.resetForm();
        },
        async deleteBrand() {
            try {
                await api.delete(`/brands/${this.brandToDelete.id}`);
                this.fetchBrands();
                this.closeDeleteModal();
            } catch (error) {
                console.error("Erro ao excluir marca:", error);
            }
        },
        openDeleteModal(brand) {
            this.brandToDelete = brand;
            this.isDeleteModalVisible = true;
        },
        closeDeleteModal() {
            this.isDeleteModalVisible = false;
            this.brandToDelete = null;
        },
        resetForm() {
            this.formData = {
                id: null,
                name: "",
                productType: "",
            };
        },
    },
    mounted() {
        this.fetchBrands();
    },
};
</script>