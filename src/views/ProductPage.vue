<template>
    <div class="product-details">
        <!-- Imagem do Produto -->
        <div class="product-image-container" v-if="produto.urlImage">
            <img :src="produto.urlImage" alt="Imagem do Produto" class="product-image" />
        </div>

        <!-- Detalhes do Produto -->
        <div class="product-info">
            <h1 class="product-title">{{ produto.description || "Produto Não Encontrado" }}</h1>
            <p class="product-description">{{ produto.fullDescription || "Nenhuma descrição detalhada disponível." }}
            </p>

            <ul class="product-attributes" v-if="produto">
                <li><strong>Marca:</strong> {{ produto.brand.name }}</li>
                <li><strong>Preço:</strong> R$ {{ produto.price.toFixed(2) }}</li>
                <li><strong>Quantidade em Estoque:</strong> {{ produto.quantity }}</li>

                <!-- Campos específicos -->
                <template v-if="produto.brand.productType === 'SHIRT'">
                    <li><strong>Cor:</strong> {{ produto.color }}</li>
                    <li><strong>Tamanho:</strong> {{ produto.size }}</li>
                    <li><strong>Material:</strong> {{ produto.material }}</li>
                    <li><strong>Estampado:</strong> {{ produto.printed ? "Sim" : "Não" }}</li>
                </template>

                <template v-if="produto.brand.productType === 'VAPE'">
                    <li><strong>Sabor:</strong> {{ produto.flavor }}</li>
                    <li><strong>Puffs:</strong> {{ produto.puffs }}</li>
                </template>

                <template v-if="produto.brand.productType === 'SHOES'">
                    <li><strong>Cor:</strong> {{ produto.color }}</li>
                    <li><strong>Tamanho:</strong> {{ produto.size }}</li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
import api from '@/services/api';
export default {
    data() {
        return {
            produto: null,
        };
    },
    async created() {
        const { type, id } = this.$route.params; // Obtemos o tipo e ID da rota
        try {
            const endpoint = `/${type.toLowerCase()}/${id}`;
            const response = await api.get(endpoint);
            if (response.ok) {
                this.produto = await response.json();
            } else {
                console.error("Erro ao buscar o produto:", response.status, response.statusText);
            }
            this.produto = response.data;
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    },
};
</script>

<style scoped>
/* Container principal */
.product-details {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    /* Cor de fundo suave */
    border: 1px solid #ddd;
    /* Bordas leves */
    border-radius: 8px;
    /* Cantos arredondados */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    /* Sombra sutil */
}

/* Imagem */
.product-image-container {
    flex: 1;
    /* Ocupa menos espaço que os detalhes */
    text-align: center;
}

.product-image {
    max-width: 100%;
    max-height: 300px;
    border: 1px solid #ccc;
    border-radius: 8px;
    object-fit: cover;
    /* Garante que a imagem se ajuste */
}

/* Informações do produto */
.product-info {
    flex: 2;
    /* Ocupa mais espaço que a imagem */
    font-family: Arial, sans-serif;
}

.product-title {
    margin: 0;
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
    /* Título em cor escura */
}

.product-description {
    font-size: 1rem;
    margin: 10px 0;
    color: #666;
    /* Texto mais discreto */
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

/* Resolução Responsiva */
@media (max-width: 768px) {
    .product-details {
        flex-direction: column;
        align-items: center;
    }

    .product-image {
        max-width: 200px;
        max-height: 200px;
    }
}
</style>