describe("Email Form Test", function () {
  it("Checks invalid and valid email input", function () {
    // テスト対象のページにアクセス
    cy.visit("http://localhost:3000/");

    // 無効なメールアドレスを入力
    cy.get("#email").type("invalid email");

    // エラーメッセージが表示されることを確認
    cy.get("#errorMessage").should("be.visible");

    // メールアドレス入力フィールドをクリア
    cy.get("#email").clear();

    // 有効なメールアドレスを入力
    cy.get("#email").type("test@example.com");

    // エラーメッセージが表示されないことを確認
    cy.get("#errorMessage").should("not.exist");
  });
});
