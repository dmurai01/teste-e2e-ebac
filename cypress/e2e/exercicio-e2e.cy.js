/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
        const dados = [0, 1, 2, 3]

        dados.forEach(item => {
            cy.fixture('produtos').then(dados => {
                produtosPage.buscarProduto(dados[item].nomeProduto)
                produtosPage.addProdutoCarrinho(
                    dados[item].tamanho,
                    dados[item].cor,
                    dados[item].quantidade)
            });
        });
        cy.get('.woocommerce-message > .button').click()
        cy.get('.page-title').should('contain', 'Carrinho')

    });

})