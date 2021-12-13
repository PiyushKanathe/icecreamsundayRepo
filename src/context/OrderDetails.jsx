import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";
import { formatCurrency } from "../utilities";

// 1. create a context
const orderDetails = createContext();

// 2. create custom hook to check weather or not we are inside of provider
export const useOrderDetails = () => {
  const context = useContext(orderDetails);

  // if the value is falsy, we are not in a provider and vice-versa
  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  // value not falsy, we return context
  return context;
};

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
}

// 3. create provider
export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubTotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubTotal = calculateSubtotal("toppings", optionCounts);
    const tempScoop = scoopsSubTotal === isNaN() ? 0 : scoopsSubTotal;
    const tempToppings = toppingsSubTotal === isNaN() ? 0 : toppingsSubTotal;
    const grandTotal = tempScoop + tempToppings;
    setTotals({
      scoops: formatCurrency(scoopsSubTotal),
      toppings: formatCurrency(toppingsSubTotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);
  // value will be a getter and setter
  const value = useMemo(() => {
    // to upate the optionCounts count
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionCount = { ...optionCounts };

      // update option count for this item with new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCount);
    };
    // getter: value of inernal state {Object}, an object containing option count for scoops and toppings, subtotal and totals
    // setter: updateOptioncount

    const resetOrder = () => {
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map(),
      });
    };
    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);
  // it will return the provider from the context we created on step 1
  return <orderDetails.Provider value={value} {...props} />;
};
