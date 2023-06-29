/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PasswordInput } from "../components/PasswordInput";

describe("Password component", () => {
  test("Exist password component", async () => {
    render(<PasswordInput />);
    const passwordInput = await screen.findByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });
});
