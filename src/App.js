import "./App.css";
import Container from "react-bootstrap/Container";
import { OrderDetailsProvider } from "./context/OrderDetails";
import SummaryForm from "./pages/summary/SummaryForm";
import OrderEntry from "./pages/entry/OrderEntry";
function App() {
  return (
    <Container>
      <h1>Icecream Sunday</h1>
      <OrderDetailsProvider>
        {/* summary and entry page need provider*/}
        <OrderEntry></OrderEntry>
      </OrderDetailsProvider>
      {/* confirmation page does not need provider */}
    </Container>
  );
}

export default App;
