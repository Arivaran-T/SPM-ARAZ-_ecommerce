import { configureStore } from "@reduxjs/toolkit";

import authStore from "./auth";
import OrderStore from "./OrderStore";

const store = configureStore({
  reducer: {
    loging: authStore.reducer,
    order: OrderStore.reducer,
  },
});

export default store;
