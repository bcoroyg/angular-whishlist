describe('ventana principal', () => {
  it('tiene encabezado correcto y en español por defecto', () => {
    cy.visit('http://localhost:4200');
    cy.contains('Whishlist');
    cy.get('h3 b').should('contain', 'HOLA es');
  });
});
