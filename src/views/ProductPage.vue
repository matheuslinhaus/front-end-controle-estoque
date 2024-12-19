<template>
    <div v-if="successMessage" class="success-message">
        {{ successMessage }}
    </div>
    <div v-if="deleteMessage" class="delete-message">
        {{ deleteMessage }}
    </div>
    <div class="product-details">
        <!-- Imagem do Produto -->
        <div class="product-image-container" v-if="produto.urlImage">
            <img :src="produto.urlImage" alt="Imagem do Produto" class="product-image" />
        </div>

        <!-- Detalhes do Produto -->
        <div class="product-info">
            <!-- Atributos do Produto -->
            <ul class="product-attributes" v-if="produto">
                <!-- Descrição -->
                <li>
                    <template v-if="editing">
                        <strong>Descrição:</strong>
                    </template>
                    <template v-else>
                        <!-- Não exibe o <strong> quando não estiver editando -->
                    </template>
                    <template v-if="editing">
                        <textarea v-model="produto.description" id="description" class="edit-input"></textarea>
                    </template>
                    <template v-else>
                        <p :style="{
                            fontSize: editing ? 'initial' : '26px',
                            fontWeight: editing ? 'normal' : 'bold',
                            margin: editing ? 'initial' : '0',
                            padding: editing ? 'initial' : '0'
                        }">
                            {{ produto.description || "Produto Não Encontrado" }}
                        </p>
                    </template>
                </li>

                <!-- Descrição Completa -->
                <li>
                    <template v-if="editing">
                        <strong>Descrição Completa:</strong>
                    </template>
                    <template v-else>
                        <!-- Não exibe o <strong> quando não estiver editando -->
                    </template>
                    <template v-if="editing">
                        <textarea v-model="produto.fullDescription" style="height: 60px;" id="fullDescription"
                            class="edit-input"></textarea>
                    </template>
                    <template v-else>
                        <p :style="{
                            fontSize: editing ? 'initial' : '18px', margin: editing ? 'initial' : '0',
                            padding: editing ? 'initial' : '0'
                        }">
                            {{ produto.fullDescription || "" }}
                        </p>
                    </template>
                </li>
                <li><strong>Marca:</strong>
                    <span v-if="!editing">{{ produto.brand.name }}</span>
                    <template v-else>
                        <select v-model="produto.brand.id" class="edit-input">
                            <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                                {{ brand.name }}
                            </option>
                        </select>
                    </template>
                </li>
                <li><strong>Preço:</strong> <span v-if="!editing">R$ {{ produto.price.toFixed(2) }}</span>
                    <template v-else>
                        <textarea v-model="produto.price" type="number" class="edit-input" />
                    </template>
                </li>
                <li><strong>Quantidade em Estoque:</strong> <span v-if="!editing">{{ produto.quantity }}</span>
                    <template v-else>
                        <textarea v-model="produto.quantity" type="number" class="edit-input" />
                    </template>
                </li>

                <!-- Campos específicos -->
                <template v-if="produto.brand.productType === 'SHIRT'">
                    <li><strong>Cor:</strong> <span v-if="!editing">{{ produto.color }}</span>
                        <template v-else>
                            <textarea v-model="produto.color" class="edit-input" />
                        </template>
                    </li>
                    <li><strong>Tamanho:</strong> <span v-if="!editing">{{ produto.size }}</span>
                        <template v-else>
                            <select v-model="produto.size" class="edit-input">
                                <option v-for="size in ['PP', 'P', 'M', 'G', 'GG', 'XG']" :key="size" :value="size">
                                    {{ size }}
                                </option>
                            </select>
                        </template>
                    </li>
                    <li><strong>Material:</strong> <span v-if="!editing">{{ produto.material }}</span>
                        <template v-else>
                            <textarea v-model="produto.material" class="edit-input" />
                        </template>
                    </li>
                    <li><strong>Estampado:</strong> <span v-if="!editing">{{ produto.printed ? "Sim" : "Não"
                            }}</span>
                        <template v-else>
                            <input type="checkbox"
                                style="color-scheme: auto; color-scheme: auto; transform: scale(1.5);"
                                v-model="produto.printed" />
                        </template>
                    </li>
                </template>

                <template v-if="produto.brand.productType === 'VAPE'">
                    <li><strong>Sabor:</strong> <span v-if="!editing">{{ produto.flavor }}</span>
                        <template v-else>
                            <input v-model="produto.flavor" class="edit-input" />
                        </template>
                    </li>
                    <li><strong>Puffs:</strong> <span v-if="!editing">{{ produto.puffs }}</span>
                        <template v-else>
                            <input v-model="produto.puffs" class="edit-input" />
                        </template>
                    </li>
                </template>

                <template v-if="produto.brand.productType === 'SHOES'">
                    <li><strong>Cor:</strong> <span v-if="!editing">{{ produto.color }}</span>
                        <template v-else>
                            <textarea v-model="produto.color" class="edit-input" />
                        </template>
                    </li>
                    <li><strong>Tamanho:</strong> <span v-if="!editing">{{ produto.size }}</span>
                        <template v-else>
                            <select v-model="produto.size" class="edit-input">
                                <option v-for="size in [35, 36, 37, 38, 39, 40, 41, 42, 43, 44]" :key="size"
                                    :value="size">
                                    {{ size }}
                                </option>
                            </select>
                        </template>
                    </li>
                </template>
            </ul>

            <!-- Botões de ação -->
            <div class="product-actions">
                <button class="submit-btn" @click="toggleEdit" v-if="!editing && !productDeleted">Editar</button>
                <button class="submit-btn" @click="toggleEdit" v-if="editing && !productDeleted">Salvar</button>
                <button class="cancel-btn" @click="cancelEdit" v-if="editing">Cancelar</button>
                <button class="cancel-btn" @click="openDeleteModal" v-if="!editing && !productDeleted">Excluir</button>
                <!-- Excluindo só se não estiver em edição -->
            </div>

            <!-- Modal de Confirmação de Exclusão -->
            <div v-if="showModal" class="modal-overlay">
                <div class="modal-delete">
                    <h2>Você realmente deseja excluir?</h2>
                    <button @click="deleteProduct" class="submit-btn">Sim</button>
                    <button @click="closeModal" class="cancel-btn">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import '../css/Table.css'
import '../css/Modal.css'
import api from '@/services/api';

export default {
    data() {
        return {
            produto: null,
            brands: [],
            editing: false, // Controla o modo de edição
            showModal: false, // Controla a exibição do modal
            successMessage: "", // Mensagem de sucesso
            deleteMessage: "",
            productDeleted: false,
        };
    },
    async created() {
        const { type, id } = this.$route.params;
        try {
            const endpoint = `/${type.toLowerCase()}/${id}`;
            const response = await api.get(endpoint);
            this.produto = response.data;
        } catch (error) {
            console.error("Erro ao buscar o produto:", error);
        }
        await this.fetchBrands();
    },
    methods: {
        toggleEdit() {
            if (this.editing) {
                this.saveProduct();
            } else {
                this.editing = true;
            }
        },
        async saveProduct() {
            try {
                const { type, id } = this.$route.params;
                const endpoint = `/${type.toLowerCase()}/${id}`;
                const response = await api.put(endpoint, this.produto);

                if (response && response.data) {
                    this.successMessage = "Produto atualizado com sucesso!"; // Definindo a mensagem de sucesso
                    this.produto = response.data;
                    this.editing = false;
                } else {
                    console.error("Erro ao salvar o produto:", response.status, response.statusText);
                }
            } catch (error) {
                console.error("Erro ao salvar produto:", error);
            }
        },
        cancelEdit() {
            this.editing = false; // Cancela a edição
            this.fetchProduto(); // Recarrega os dados do produto
        },
        async fetchBrands() {
            let productType;
            const { type } = this.$route.params; // Captura o tipo do produto (SHOES, SHIRT, VAPE)
            console.log(type)
            console.log(this.$route.params)
            switch (type.toUpperCase()) {
                case 'SHOES':
                    productType = '0';
                    break;
                case 'SHIRTS':
                    productType = '1';
                    break;
                case 'VAPES':
                    productType = '2';
                    break;
            }
            try {
                const response = await api.get('/brands', { params: { productType } }); // Envia o valor inteiro corretamente
                console.log("Marcas carregadas:", response.data); // Verifique os dados
                this.brands = response.data;
            } catch (error) {
                console.error('Erro ao carregar as marcas:', error);
            }
        }
        ,
        openDeleteModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async deleteProduct() {
            try {
                const { type, id } = this.$route.params;
                const endpoint = `/${type.toLowerCase()}/${id}`;
                const response = await api.delete(endpoint);

                // Verifique o status da resposta
                if (response.status === 204) { // 204 significa sucesso, sem conteúdo
                    this.deleteMessage = "Produto excluído com sucesso!";
                    this.successMessage = false;
                    this.productDeleted = true;
                } else {
                    console.error("Erro ao excluir produto:", response.status, response.statusText);
                }
            } catch (error) {
                console.error("Erro ao excluir produto:", error);
            }
            this.showModal = false;
        }

    },
};
</script>

<style scoped>
.product-details {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.product-image-container {
    flex: 1;
    text-align: center;
}

.product-image {
    max-width: 100%;
    max-height: 300px;
    border: 1px solid #ccc;
    border-radius: 8px;
    object-fit: cover;
}

.product-info {
    flex: 2;
}

.product-title {
    margin: 0;
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
}

.product-description {
    font-size: 1rem;
    margin: 10px 0;
    color: #666;
}

.product-attributes {
    list-style: none;
    padding: 0;
}

.product-attributes li {
    font-size: 1rem;
    margin: 5px 0;
    color: #444;
}

.product-actions {
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    margin: 5px;
    font-size: 1rem;
    cursor: pointer;
}

button:hover {
    background-color: #f1f1f1;
}

textarea {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    resize: none;
    /* Remove a capacidade de redimensionar */
}

.success-message {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
}

.delete-message {
    background-color: #edd4d4;
    color: #571515;
    border: 1px solid #e6c3c3;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
}

.edit-input {
    height: 35px;
    color: #333;
    background-color: #f0f0f0;
    /* Fundo cinza claro */
    border: 1px solid #ccc;
    /* Borda cinza clara */
    padding: 8px;
    /* Espaçamento interno */
    border-radius: 4px;
    /* Bordas arredondadas */
    font-size: 14px;
    /* Tamanho da fonte */
    width: 100%;
    /* Faz com que ocupe 100% da largura disponível */
    box-sizing: border-box;
    /* Inclui o padding no cálculo da largura total */
    transition: background-color 0.3s ease;
    /* Transição suave para mudança de fundo */
}

.edit-input:focus {
    border-color: #3498db;
    /* Azul no foco */
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
    /* Brilho ao foco */
    outline: none;
}
</style>
