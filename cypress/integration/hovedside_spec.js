describe('Hovedside', () => {
    it('Skal vise utkast panel', () => {
        cy.visit('/')
        cy.contains('Utkast til oppfølgingsvedtak')
    })
})