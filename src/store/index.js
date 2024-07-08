import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Sử dụng localStorage
// import { flowerApi } from "../services/flowerApi";
// import flowerReducer from "../slices/flower.slice";
import employeeReducer from "../slices/employee.slice";
import authReducer from "../slices/auth.slice";
import productReducer from "../slices/product.slice";
import orderReducer from "../slices/order.slice";
import customerReducer from "../slices/customer.slice";
import counterReducer from "../slices/counter.slice";
import categoryReducer from "../slices/category.slice";
import promotionReducer from "../slices/promotion.slice";
import { employeeAPI } from "../services/employeeAPI";
import { orderAPI } from "../services/orderAPI";
import { authApi } from "../services/authAPI";
import { productAPI } from "../services/productAPI";
import { customerAPI } from "../services/customerAPI";
import { counterAPI } from "../services/counterAPI";
import { categoryAPI } from "../services/categoryAPI";
import { promotionAPI } from "../services/promotionAPI";

const persistConfig = {
  key: "root",
  storage,
};
// Define the Reducers that will always be present in the application
const staticReducers = {
  theme: "theme",
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer); //user them API test
// const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [employeeAPI.reducerPath]: employeeAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [customerAPI.reducerPath]: customerAPI.reducer,
    [counterAPI.reducerPath]: counterAPI.reducer,
    [categoryAPI.reducerPath]: categoryAPI.reducer,
    [promotionAPI.reducerPath]: promotionAPI.reducer,

    auth: persistedAuthReducer,
    employee: employeeReducer,
    product: productReducer,
    order: orderReducer,
    customer: customerReducer,
    counter: counterReducer,
    category: categoryReducer,
    promotion: promotionReducer,
    // product: productReducer,
    // counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      employeeAPI.middleware,
      productAPI.middleware,
      orderAPI.middleware,
      customerAPI.middleware,
      counterAPI.middleware,
      categoryAPI.middleware,
      promotionAPI.middleware
      // productAPI.middleware,
      // counterAPI.middleware
    ), //user them API test
});

// Add a dictionary to keep track of the registered async reducers
store.asyncReducers = {};

// Create an inject reducer function
// This function adds the async reducer, and creates a new combined reducer
export const injectReducer = (key, asyncReducer) => {
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return asyncReducer;
};

function createReducer(asyncReducers = {}) {
  if (Object.keys(asyncReducers).length === 0) {
    return (state) => state;
  } else {
    return combineReducers({
      ...staticReducers,
      ...asyncReducers,
    });
  }
}

export const Persister = persistStore(store);
