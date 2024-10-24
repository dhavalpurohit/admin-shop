import {
  createSlice,
//   createAsyncThunk,
  isPending,
  isRejected,
  //   PayloadAction,
} from '@reduxjs/toolkit';
// import { user } from '../../services/api/ProductApi';


export const initialState = {
  isLoading: false,
  error: null as string | null,
  categories: null,
  ColorCodeMain: null,
  productBrands: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    RESET_STATE: () => initialState,
  },
  extraReducers: (builder) => {
    builder
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
