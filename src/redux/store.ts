import { initialState as productIntialState } from './slices/ProductSlice';
import { initialState as userInitialState } from './slices/userSlice';
import { initialState as bannerInitialState } from './slices/bannerSlice';
import { initialState as orderInitialState } from './slices/orderSlice';
import { initialState as selectedProductInitialState } from './slices/selectedProductSlice';


import productReducer from './slices/ProductSlice';
import userReducer from './slices/userSlice';
import bannerReducer from './slices/bannerSlice';
import orderReducer from './slices/orderSlice';
import selectedProductsReducer from "./slices/selectedProductSlice";


// Add AnyAction import
import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
} from '@reduxjs/toolkit';

export const RESET_STATE = 'RESET_STATE';

export const resetAction = () => ({
  type: RESET_STATE,
});

const combinedInitialState = {
  product: productIntialState,
  user: userInitialState,
  banner: bannerInitialState,
  order: orderInitialState,
  selectedProducts: selectedProductInitialState,
};

const appReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  banner: bannerReducer,
  order: orderReducer,
  selectedProducts: selectedProductsReducer,
});

const rootReducer: Reducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction,
): ReturnType<typeof appReducer> => {
  if (action.type === RESET_STATE) {
    return combinedInitialState;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
    }),
});

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
