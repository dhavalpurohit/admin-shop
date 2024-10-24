import { initialState as productIntialState } from './slices/ProductSlice';
import { initialState as userInitialState } from './slices/ProductSlice';


import productReducer from './slices/ProductSlice';
import userReducer from './slices/userSlice';


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
};

const appReducer = combineReducers({
  product: productReducer,
  user: userReducer,
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
