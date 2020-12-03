describe('Hovedside', () => {
    it('Skal vise utkast panel', () => {
        cy.visit('http://localhost:3666')
        cy.contains('Utkast til oppfølgingsvedtak')
    })
})