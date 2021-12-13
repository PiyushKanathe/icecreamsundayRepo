import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../context/OrderDetails";

const renderWithOcntext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

//re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithOcntext as render };
