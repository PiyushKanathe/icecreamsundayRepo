import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const heading = screen.getByRole("heading", { name: /Design your sundae!/i });
  expect(heading).toBeInTheDocument();
});
