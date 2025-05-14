/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";
import checkoutPage from "../support/page_objects/checkout.page";
import { faker } from '@faker-js/faker';

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

        //Checkout
        cy.get('.checkout-button').click()

        //Login
        cy.get('.showlogin').click()
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, { log: false })
            cy.get('.woocommerce-button').click()
            //cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá')
        })
        checkoutPage.detalhesFaturamento(faker.person.firstName(), faker.person.lastName(), faker.company.name(), 'BR', faker.location.street() + ', 23', faker.location.secondaryAddress(), 'São Paulo', 'SP', faker.location.zipCode('#####-###'), faker.number.int({ min: 100000000, max: 999999999 }), 'Teste informações adicionais', 'cod' )
    
    });

})