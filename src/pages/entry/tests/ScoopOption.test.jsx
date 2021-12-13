import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

test("indicate if scoop count is non-int or out of range", async () => {
  render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn()} />);

  // expect input to be invalid if value is negative
  const vanillaInput = screen.getByRole("spinbutton");
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  // expect input to be invalid if value is in decimal
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1.2");
  expect(vanillaInput).toHaveClass("is-invalid");

  // expect input to be invalid if value is too high
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  // expect input to be valid if value is valid
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "4");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
