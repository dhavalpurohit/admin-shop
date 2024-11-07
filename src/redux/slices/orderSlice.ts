import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
  //   PayloadAction,
} from '@reduxjs/toolkit';
import { OrderServices } from '../../services/api/OrderApi';

export const orderList = createAsyncThunk(
  '/orderList',
  async (data: object) => {
    try {
      const response = await OrderServices.orderList(data);
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const initialState = {
  isLoading: false,
  error: null as string | null,
  orderList: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,

  reducers: {
    RESET_STATE: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderList.fulfilled, (state, action) => {
        state.orderList = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(isPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(isRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const {} = orderSlice.actions;
export default orderSlice.reducer;
