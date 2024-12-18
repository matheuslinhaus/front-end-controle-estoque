<template>
    <div class="sobre">
        <section class="introducao">
            <h1>Sobre o Projeto</h1>
            <p>
                Este projeto visa fornecer uma solução para controle de estoque de produtos em um sistema integrado com
                funcionalidades para gerenciar camisas, tênis e vapes. A ideia é permitir uma gestão eficiente de
                produtos, com fácil acesso aos detalhes de cada item e controle de informações essenciais como
                quantidade, preço e descrição.
            </p>
        </section>

        <section class="tecnologias">
            <h2>Tecnologias Utilizadas</h2>
            <div class="tecnologia">
                <h3>Backend</h3>
                <p><strong>Java Spring Boot 3</strong>: A aplicação backend foi construída utilizando o framework Spring
                    Boot 3, que facilita a criação de APIs robustas e seguras.</p>
            </div>
            <div class="tecnologia">
                <h3>Frontend</h3>
                <p><strong>Vue.js</strong>: O frontend foi desenvolvido utilizando Vue.js, proporcionando uma interface
                    dinâmica e interativa para o usuário final.</p>
                <p><strong>CSS</strong>: Estilos customizados foram aplicados para garantir uma interface responsiva e
                    agradável.</p>
            </div>
        </section>

        <section class="repositorios">
            <h2>Diretórios do Projeto</h2>
            <div class="repositorio">
                <h3><a href="https://github.com/matheuslinhaus/controle-estoque" target="_blank">Controle Estoque -
                        Backend</a></h3>
                <p>Este repositório contém a implementação do backend, onde a lógica de controle de estoque e a
                    exposição da API para interação com o frontend são feitas.</p>
            </div>
            <div class="repositorio">
                <h3><a href="https://github.com/matheuslinhaus/front-end-controle-estoque" target="_blank">Controle
                        Estoque - Frontend</a></h3>
                <p>Este repositório contém o código do frontend, onde a interface do usuário foi criada utilizando
                    Vue.js para permitir a interação com os dados do backend de forma intuitiva.</p>
            </div>
        </section>

        <section class="sobre-desenvolvedor">
            <h2>Sobre o mim</h2>
            <p>
                Me chamo <strong>Matheus Rita Linhaus</strong>, estou cursando Análise e Desenvolvimento de Sistemas na Universidade Cruzeiro do Sul, tenho experiência em
                diversas tecnologias, incluindo Java, SpringBoot3, Selenium, Vue.js, e outras ferramentas modernas para construção de sistemas
                web. Estou sempre buscando aprender mais e aplicar minhas habilidades em projetos práticos.
            </p>
            <p>
                <strong>Perfil no LinkedIn:</strong> <a
                    href="https://www.linkedin.com/in/matheus-rita-linhaus-9597831a0/" target="_blank">Matheus Rita
                    Linhaus</a>
            </p>
        </section>
    </div>
</template>

<style scoped>
.sobre {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    max-height: 83vh;
    /* Limita a altura do conteúdo, permitindo a rolagem apenas sobre ele */
    overflow-y: auto;
    /* Ativa a rolagem apenas dentro do conteúdo */
}

h1,
h2,
h3 {
    color: #ffffff;
}

h1 {
    font-size: 2rem;
    margin-bottom: 20px;
}

h2 {
    font-size: 1.5rem;
    margin-top: 30px;
    margin-bottom: 15px;
}

h3 {
    font-size: 1.2rem;
    margin-top: 15px;
}

p {
    font-size: 1rem;
    line-height: 1.6;
}

a {
    color: #007BFF;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.section {
    margin-bottom: 30px;
}

.tecnologia,
.repositorio,
.sobre-desenvolvedor {
    margin-bottom: 20px;
}

.repositorio {
    margin-top: 15px;
}

.sobre-desenvolvedor a {
    color: #007BFF;
}

.informacoes-sobre {
    margin-top: 30px;
}
</style>