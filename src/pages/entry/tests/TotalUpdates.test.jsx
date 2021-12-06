import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../context/OrderDetails";

test("update scoops subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });
  // test start price 0.00
  const scoopSubtotal = screen.getByText("Scoops total : $", { exact: false });
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
