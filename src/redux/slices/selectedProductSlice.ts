import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  brand?: string;
  category_name?: string;
  regular_price?: number;
  sale_price?: number;
}

interface SelectedProductsState {
  items: Product[];
}

export const initialState: SelectedProductsState = {
  items: [],
};
const selectedProductsSlice = createSlice({
  name: "selectedProducts",
  initialState,
  reducers: {
    addToSelectedProducts: (state, action: PayloadAction<Product>) => {
      if (!state.items.some((item) => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromSelectedProducts: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToSelectedProducts, removeFromSelectedProducts } =
  selectedProductsSlice.actions;
export default selectedProductsSlice.reducer;
