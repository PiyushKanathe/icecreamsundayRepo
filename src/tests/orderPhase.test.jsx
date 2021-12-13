import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  // render app
  render(<App />);

  // add icecream and toppings
  let chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  let cherriesToppings = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  userEvent.click(cherriesToppings);

  // find and click Order button on order entry
  let orderButton = screen.getByRole("button", { name: /order sundae/i });
  userEvent.click(orderButton);

  // check summary information on order
  const summaryHeadding = screen.getByRole("heading", {
    name: "Order Summary",
  });
  expect(summaryHeadding).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accept T&C and click on confirm order
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);
  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);

  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/);
  expect(orderNumber).toBeInTheDocument();

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  userEvent.click(newOrderButton);

  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  // to we need to await anythhing to avoid test errors
  await screen.findByRole("spinbutton", { name: "Chocolate" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});
