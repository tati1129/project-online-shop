import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await fetch("http://localhost:3333/products/all");
      if (!resp.ok) {
        throw new Error("Server error!");
      }
      const data = await resp.json();
      const newData = data.map(({ ...item }) => ({
        ...item,
        showByTitle: true,
        showFilteredPrice: true,
        showOnlyDiscounted: true,
        new_price: item.discont_price ? item.discont_price : item.price,
      }));
      
      return newData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }

);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    status: undefined,
    error: undefined,
    sortType: "",
    // min: null,
    // max: null, 
  },
  reducers: {
    discount_filter: (state) => {
      state.list = state.list.map((prod) => ({
        ...prod,
        showOnlyDiscounted: true,
      }));
    },
    sort: (state, { payload }) => {
      if (payload === "1") {
        state.list = state.list
          .slice()
          .sort((a, b) => a.new_price - b.new_price);
      } else if (payload === "2") {
        state.list = state.list
          .slice()
          .sort((a, b) => b.new_price - a.new_price);
      } 
    },

    filter_by_price: (state, { payload }) => {
      state.list = state.list.map((item) => 
        !(item.new_price >= payload.min && item.new_price <= payload.max) 
        ? { ...item, showFilteredPrice: false }
        : { ...item, showFilteredPrice: true }
      );
      // console.log(state.list);
    },
    
    searchProductsByName: (state, { payload }) => {
      state.list = state.list.map(item => ({
        ...item,
        showByTitle: item.title.toLowerCase().startsWith(payload.toLowerCase())
      }))
    },
    clearFilters: (state) => {
      state.min = null;
      state.max = null;
    },

  },

  extraReducers: (buider) => {
    buider
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.status = "resolve";
        state.list = payload;
      })
      .addCase(fetchProducts.rejected, (state, { payload }) => {
        state.status = "rejected";
        state.error = payload;
      });
  },
});

export const { discount_filter, sort, clearFilters, searchProductsByName, filter_by_price, } =
  productsSlice.actions;
export default productsSlice.reducer;


  


    //     clearFilters: (state) => {
//       state.sortType = "";
//       state.showOnlyDiscounted = false;
//       // state.showPriceFrom = false;
//       // state.showPriceTo = false;
//     },