import { createSlice } from "@reduxjs/toolkit";

const initial = {
  products: JSON.parse(localStorage.getItem("products")),
  total: localStorage.getItem("total"),
  address: JSON.parse(localStorage.getItem("address")),
};

const OrderStore = createSlice({
  name: "order",
  initialState: initial,
  reducers: {
    addProducts(state, action) {
      state.products = action.payload.products;
      localStorage.setItem("products", JSON.stringify(action.payload.products));
      localStorage.setItem("total", action.payload.total);
      console.log(action.payload.products);
    },
    addAddress(state, action) {
      state.address = action.payload.address;
      localStorage.setItem("address", JSON.stringify(action.payload.address));
    },
    addTotal(state, action) {
      state.total = action.payload.total;

      localStorage.setItem("total", action.payload.total);
    },
    // romoveAddress(state) {
    //   localStorage.removeItem("address");
    // },
  },
});

export default OrderStore;
export const { addProducts, addAddress, addTotal } = OrderStore.actions;
