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
      const response = await ProductServices.createSingleProduct(
        productDetails,
      );
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const vendorFetchAllCategories = createAsyncThunk(
  '/product/vendorFetchAllCategories',
  async (productIds: object) => {
    try {
      const response = await ProductServices.vendorFetchAllCategories(
        productIds,
      );
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const fetchColorCodeMain = createAsyncThunk(
  '/fetchColorCodeMain',
  async () => {
    try {
      const response = await ProductServices.fetchColorCodeMain();
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const initialState = {
  isLoading: false,
  error: null as string | null,
  categories: null,
  fetchColorCodeMain: null,
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
      .addCase(vendorFetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchColorCodeMain.fulfilled, (state, action) => {
        state.fetchColorCodeMain = action.payload;
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
