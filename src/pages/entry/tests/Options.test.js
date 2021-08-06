import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("It displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);
  // find the images
  // name option for images is alt text
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
