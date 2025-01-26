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

export const fetchProductBrands = createAsyncThunk(
  '/fetchProductBrands',
  async () => {
    try {
      const response = await ProductServices.fetchProductBrands();
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const productSearchList = createAsyncThunk(
  '/productSearchList',
  async (data: object) => {
    try {
      const response = await ProductServices.productSearchList(data);
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const fetchProductSampleFile = createAsyncThunk(
  '/fetchProductSampleFile',
  async () => {
    try {
      const response = await ProductServices.fetchProductSampleFile();
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const createBulkProduct = createAsyncThunk(
  '/product/createBulkProduct',
  async (data: object) => {
    try {
      const response = await ProductServices.createBulkProduct(data);
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const bulkProductXlsList = createAsyncThunk(
  '/bulkProductXlsList',
  async () => {
    try {
      const response = await ProductServices.bulkProductXlsList();
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const productAddMultipleImages = createAsyncThunk(
  '/productAddMultipleImages',
  async (data: object) => {
    try {
      const response = await ProductServices.productAddMultipleImages(data);
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const productAttributeAddUpdate = createAsyncThunk(
  '/productAttributeAddUpdate',
  async (data: object) => {
    try {
      const response = await ProductServices.productAttributeAddUpdate(data);
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const productOptionAddUpdate = createAsyncThunk(
  '/productOptionAddUpdate',
  async (data: object) => {
    try {
      const response = await ProductServices.productOptionAddUpdate(data);
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const productFilterData = createAsyncThunk(
  '/productFilterData',
  async (data: object) => {
    try {
      const response = await ProductServices.productFilterData(data);
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const productDetailsView = createAsyncThunk(
  '/productDetailsView',
  async (data: object) => {
    try {
      const response = await ProductServices.productDetailsView(data);
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const productOfferAddUpdate = createAsyncThunk(
  '/productOfferAddUpdate',
  async (data: object) => {
    try {
      const response = await ProductServices.productOfferAddUpdate(data);
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const productAllLookup = createAsyncThunk(
  '/productLookup',
  async (data: object) => {
    try {
      const response = await ProductServices.productLookup(data);
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
  ColorCodeMain: null,
  productBrands: null,
  productList: null,
  productSampleFile: null,
  bulkProductXlsList: null,
  productDetails: null,
  productFilteredData: null,
  lookups: null,
};

const contactSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    RESET_STATE: () => initialState,
    RESET_PRODUCT_DETAILS: (state) => {
      state.productDetails = null;
    },
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
        state.ColorCodeMain = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchProductBrands.fulfilled, (state, action) => {
        state.productBrands = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(productSearchList.fulfilled, (state, action) => {
        state.productList = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchProductSampleFile.fulfilled, (state, action) => {
        state.productSampleFile = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createBulkProduct.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(bulkProductXlsList.fulfilled, (state, action) => {
        state.bulkProductXlsList = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(productFilterData.fulfilled, (state, action) => {
        state.productFilteredData = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(productDetailsView.fulfilled, (state, action) => {
        state.productDetails = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(productAllLookup.fulfilled, (state, action) => {
        state.lookups = action.payload;
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

export const { RESET_PRODUCT_DETAILS } = contactSlice.actions;
export default contactSlice.reducer;
