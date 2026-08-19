export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate prices
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    )
  );

  state.shippingPrice = addDecimals(0);

  state.taxPrice = addDecimals(0);

  state.totalPrice = addDecimals(
    Number(state.itemsPrice)
  );

  // Save ONLY checkout information
  localStorage.setItem(
    "checkout",
    JSON.stringify({
      shippingAddress: state.shippingAddress,
      paymentMethod: state.paymentMethod,
    })
  );

  return state;
};