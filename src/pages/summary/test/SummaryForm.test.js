import {
  queryByText,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
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

  userEvent.click(checkBox);
  expect(confirmButton).toBeEnabled();

  userEvent.click(checkBox);
  expect(confirmButton).toBeDisabled();
});

test("popover response to hover", async () => {
  render(<SummaryForm />);
  // popover not exist on start
  const nullPopOver = screen.queryByText(
    /no icecream will actually be delivered/i
  );
  expect(nullPopOver).not.toBeInTheDocument();
  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no icecream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when mouse is out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no icecream will actually be delivered/i)
  );
  const nullPopOverAgain = screen.queryByText(
    /no icecream will actually be delivered/i
  );
  expect(nullPopOverAgain).not.toBeInTheDocument();
});
