import {
  screen,
  render,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

test("handle error for scoops and toppings routes", async () => {
  // setting up server to give error response
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("disable order button if there are no scoops added", async () => {
  render(<OrderEntry />);

  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  expect(orderButton).toBeDisabled();

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(orderButton).toBeEnabled();

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "0");
  expect(orderButton).toBeDisabled();
});
