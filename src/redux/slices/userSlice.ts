import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
  //   PayloadAction,
} from '@reduxjs/toolkit';
import { UserServices } from '../../services/api/userApi';

export const loginVendor = createAsyncThunk(
  '/user/vendorLogin',
  async (data: object) => {
    try {
      const response = await UserServices.loginVendor(data);
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const initialState = {
  isLoading: false,
  error: null as string | null,
  vendorDetails: null as any,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    RESET_STATE: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginVendor.fulfilled, (state, action) => {
        state.vendorDetails = action.payload;
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

export const {} = userSlice.actions;
export default userSlice.reducer;
