import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getCategory = createAsyncThunk("getcategory_api", async () => {
  const response = await fetch("http://localhost:5000/category");
  const data = await response.json();
  if (data.status == 1) {
    return {
      Category: data.data,
      BaseUrl: data.base_url,
    };
  } else {
    console.log("category fetch error")

    return {
      Category: [],
      BaseUrl: null,
    };
  }
});
const Categoryslice = createSlice({
  name: "category",
  initialState: {
    Category: [],
    BaseUrl: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, { payload }) => {
        state.Category=payload.Category
        state.BaseUrl=payload.BaseUrl
    });
    builder.addCase(getCategory.rejected, (state) => {
      console.log("hello");
      state.Category = [];
      state.BaseUrl = null;
    });
  },
});
export { getCategory };
export default Categoryslice.reducer;
