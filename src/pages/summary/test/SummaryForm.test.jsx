import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("Initial Condition", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /Confirm Order/i });
  expect(confirmButton).toBeDisabled();
});

test("enable the button on first click and disable on second", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /Confirm Order/i });

  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover response to hover", async () => {
  render(<SummaryForm />);
  // initial condition - no popover
  const nullPopover = screen.queryByText(/no ice cream will be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  // appears when we hover over checkbox label
  const termsAndConditions = screen.getByText(/Terms and Conditions/i);
  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will be delivered/i);
  expect(popover).toBeInTheDocument();

  // finally it disappear when we hover out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(
    screen.queryByText(/no ice cream will be delivered/i)
  );
});
