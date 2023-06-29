/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { EmailInput } from "../components/EmailInput";

describe("Email component", () => {
  test("Exist email component", async () => {
    render(<EmailInput />);
    const emailInput = await screen.findByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });
  test("Invalid email input", async () => {
    render(<EmailInput />);
    const emailInput = await screen.findByLabelText(/email/i);
    userEvent.type(emailInput, "invalid email");
    const errorMessage = await screen.findByText(/メールアドレスが無効です/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
