import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoops subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);
  // test start price 0.00
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // update vanilla scoop to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  // update chocolate scoop to 2 and check subtotal again
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);

  //test start price
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // update the M&M topping checkbox and check the subtotal
  let mmcheckbox = await screen.findByRole("checkbox", { name: /M&M/i });
  userEvent.click(mmcheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // update the cherries topping checkbox and check the subtotal
  let cherryCheckbox = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  userEvent.click(cherryCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // uncheck  cherries topping checkbox and check subtotal
  userEvent.click(cherryCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("Grand Total", () => {
  test("grand total updateds properly if the scoops added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    // "grand total starts at $0.00"
    expect(grandTotal).toHaveTextContent("0.00");

    // add scoops
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");

    expect(grandTotal).toHaveTextContent("4.00");

    // add toppings
    const cherriesToppings = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    userEvent.click(cherriesToppings);

    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updateds properly if the toppings added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    // add toppings
    const cherriesToppings = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    userEvent.click(cherriesToppings);
    expect(grandTotal).toHaveTextContent("1.50");

    // add scoops
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("grand total updated properly if item is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    // add toppings
    const cherriesToppings = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    userEvent.click(cherriesToppings);
    expect(grandTotal).toHaveTextContent("1.50");

    // add scoops
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.type(vanillaInput, "2");

    expect(grandTotal).toHaveTextContent("5.50");

    // remove 1 scoop and cherries toppinf
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    userEvent.click(cherriesToppings);

    expect(grandTotal).toHaveTextContent("2.00");
  });
});
