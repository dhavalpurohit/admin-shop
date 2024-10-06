import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  //   PayloadAction,
} from '@reduxjs/toolkit';
import { ProductServices } from '../../services/api/ProductApi';
import { Product } from '../../types/product';

export const createSingleProduct = createAsyncThunk(
  '/product/createSingleProduct',
  async (productDetails: Product) => {
    try {
      const response = await ProductServices.createSingleProduct(productDetails);
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const initialState = {
  isLoading: false,
  error: null as string | null,
};

const contactSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    RESET_STATE: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSingleProduct.fulfilled, (state, action) => {
        console.log(action);
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

export const {} = contactSlice.actions;
export default contactSlice.reducer;
