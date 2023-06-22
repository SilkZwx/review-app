/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EmailInput } from "./components/EmailInput";

describe("Email component", () => {
  test("Exist email component", () => {
    render(
      <EmailInput />
    );
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    expect(emailInput).toBeInTheDocument();
  });
});
