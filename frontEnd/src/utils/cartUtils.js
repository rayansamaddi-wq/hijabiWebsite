export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};


export const updateCart = (state) => {

  // Calculate items price only
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    )
  );


  // Remove shipping
  state.shippingPrice = addDecimals(0);


  // Remove tax
  state.taxPrice = addDecimals(0);


  // Total = items only
  state.totalPrice = addDecimals(
    Number(state.itemsPrice)
  );


  // Save updated cart
  localStorage.setItem(
    'cart',
    JSON.stringify(state)
  );


  return state;
};