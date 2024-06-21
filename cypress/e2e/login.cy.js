describe('Login Flow', () => {
  it('Logs in and redirects to Coach Dashboard', () => {
    cy.loginCoach('comcast@example.com', '123');

    cy.location('pathname').should('eq', '/coach-dashboard');

    cy.contains('Go to Team Page').should('exist');
    cy.contains('Go to Game Page').should('exist');
  });
});
