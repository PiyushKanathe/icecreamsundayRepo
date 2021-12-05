import "./App.css";
import SummaryForm from "./pages/summary/SummaryForm";
import OrderEntry from "./pages/entry/OrderEntry";
function App() {
  return (
    <>
      <h2>Icecream Sunday</h2>
      <OrderEntry />
      <SummaryForm />
    </>
  );
}

export default App;
