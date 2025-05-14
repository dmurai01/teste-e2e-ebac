class checkoutPage {

    detalhesFaturamento(nome, sobrenome, nomeEmpresa, pais, endereco, complemento, cidade, estado, cep, telefone, infAdicional, pagamento){
        cy.get('#billing_first_name').clear().type(nome)
        cy.get('#billing_last_name').clear().type(sobrenome)
        cy.get('#billing_company').clear().type(nomeEmpresa)
        cy.get('[name="billing_country"]').select(pais, { force: true }).should('have.value', pais)
        cy.get('#billing_address_1').clear().type(endereco)
        cy.get('#billing_address_2').clear().type(complemento)
        cy.get('#billing_city').clear().type(cidade)
        cy.get('[name="billing_state"]').select(estado,  { force: true }).should('have.value', estado)
        cy.get('#billing_postcode').clear().type(cep)
        cy.get('#billing_phone').clear().type(telefone)
        cy.get('#order_comments').clear().type(infAdicional)
        cy.get('[name="payment_method"]').check(pagamento)
        cy.get('.woocommerce-terms-and-conditions-checkbox-text').click()

        cy.get('#place_order').click()

        cy.wait(1000)
        cy.get('.page-title').should('contain','Pedido recebido')
    }

}

export default new checkoutPage()