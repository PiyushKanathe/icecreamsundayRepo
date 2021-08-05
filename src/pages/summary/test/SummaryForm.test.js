import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("Initial Conditions", () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", {
    name: /I agree to Terms and Conditions/i,
  });
  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });

  expect(checkBox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("checkbox enables button when checked and disables button when unchecked", () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", {
    name: /I agree to Terms and Conditions/i,
  });
  const confirmButton = screen.getByRole("button", {
    name: /Confirm Order/i,
  });

  fireEvent.click(checkBox);
  expect(confirmButton).toBeEnabled();

  fireEvent.click(checkBox);
  expect(confirmButton).toBeDisabled();
});
