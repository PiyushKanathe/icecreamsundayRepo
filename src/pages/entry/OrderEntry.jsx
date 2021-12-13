import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";
import Button from "react-bootstrap/Button";

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();
  // disable order button if no scoops are ordered
  const orderDisabled = orderDetails.totals.scoops === "$0.00";
  return (
    <>
      <h1>Design your sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={() => setOrderPhase("review")} disabled={orderDisabled}>
        Order Sundae!
      </Button>
    </>
  );
};

export default OrderEntry;
