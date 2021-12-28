describe("login workflow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("can login successfully and navigate to users page", () => {
    cy.findByRole("textbox", { name: "email" }).type("ringo@mail.mail");
    cy.findByLabelText(/password/i).type("test1234");

    cy.findByRole("button", { name: /login/i }).click();
    cy.findByRole("heading", {
      name: /home/i,
      level: 1,
    });

    cy.findByRole("link", {
      name: /users/i,
    }).click();
  });
});
