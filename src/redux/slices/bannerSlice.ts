import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
  //   PayloadAction,
} from '@reduxjs/toolkit';
import { BannerServices } from '../../services/api/BannerApi';

export const allBannerList = createAsyncThunk(
  '/banner/allBannerList',
  async (data: object) => {
    try {
      const response = await BannerServices.allBannerList(data);
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const initialState = {
  isLoading: false,
  error: null as string | null,
  allBannerList: null as any,
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,

  reducers: {
    RESET_STATE: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(allBannerList.fulfilled, (state, action) => {
        state.allBannerList = action.payload;
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

export const {} = bannerSlice.actions;
export default bannerSlice.reducer;
