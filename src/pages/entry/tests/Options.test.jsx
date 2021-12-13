import userEvent from "@testing-library/user-event";

import { screen, render } from "../../../test-utils/testing-library-utils";

import Options from "../Options";

test("display image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const alttexts = scoopImages.map((elem) => elem.alt);
  expect(alttexts).toStrictEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display images for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altexts = toppingImages.map((topping) => topping.alt);
  expect(altexts).toStrictEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("dont update input if scoops values are invalid", async () => {
  render(<Options optionType="scoops" />);

  // expect button to be enabled, after adding scoops
  const VanillaInput = await screen.findByRole("spinbutton", {
    name: /Chocolate/i,
  });
  userEvent.clear(VanillaInput);
  userEvent.type(VanillaInput, "-1");

  // make sure scoops subtotal is not updated
  const scoopsSubtotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsSubtotal).toBeInTheDocument();
});
