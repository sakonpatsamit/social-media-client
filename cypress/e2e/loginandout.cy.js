describe("login", () => {
  beforeEach(() => {
    cy.wait(1000);
    cy.visit("/");
    cy.wait(1000);
    cy.get("#registerForm .btn-close").click();
    cy.get(`header button[data-bs-target="#loginModal"]`).click();
    cy.wait(1000);
    cy.get("#loginForm #loginEmail").type("godgamer@noroff.no");
    cy.get("#loginForm #loginPassword").type("gamer321");
  });
  it("can login with valid credentials", () => {
    cy.get(`#loginForm`)
      .submit()
      .should(() => {
        expect(localStorage.getItem("token")).to.exist;
      });
  });

  describe("logout", () => {
    it("can log out using the logout button", () => {
      cy.get(`#loginForm`).submit();
      cy.wait(1000);
      cy.get(`header button[data-auth="logout"]`)
        .click({ force: true })
        .should(() => {
          expect(localStorage.getItem("token")).to.be.null;
        });
    });
  });
});
