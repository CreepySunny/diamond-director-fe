describe('Team Page', () => {
    beforeEach(() => {
        cy.loginCoach('comcast@example.com', '123');
        cy.visit('http://localhost:5173/team');
    });

    it('Displays Team Coach List and Team Player List', () => {
    cy.contains('h2', 'Team:').should('be.visible');

    cy.get('.card:contains("Coaches in Team")').within(() => {
      cy.get('.list-group-item').should('have.length', 3);
    });

    cy.contains('button', 'Add Coach').should('be.visible').and('have.class', 'mt-3 btn btn-primary');

    cy.get('.card:contains("Players in Team")').within(() => {
      cy.get('.list-group-item').should('have.length', 2);
    });

    cy.contains('button', 'Add Player').should('be.visible').and('have.class', 'mt-3 btn btn-primary');
    });
});
