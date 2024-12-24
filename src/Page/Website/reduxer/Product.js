import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Updated action type to be consistent with camelCase

const getProduct = createAsyncThunk(
    "getProduct",
    async () => {
        try {
            const response = await fetch("http://localhost:5000/product");
            const data = await response.json();
            console.log(data);
            if (data.status === 1) {
                return {
                    Product: data.data,
                    Base_Url: data.base_url
                };
            } else {
                return {
                    Product: [],
                    Base_Url: null
                };
            }
        } catch (error) {
            // Handle the error by returning a default state or error message
            return {
                Product: [],
                Base_Url: null,
                error: error.message
            };
        }
    }
);

const ProductSlice = createSlice({
    name: "product",
    initialState: {
        Product: [],
        Base_Url: null,
        error: null // Added error field to manage error states
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getProduct.fulfilled, (state, { payload }) => {
                state.Product = payload.Product;
                state.Base_Url = payload.Base_Url;
                state.error = null; // Clear any previous errors on success
            }
        );
        builder.addCase(
            getProduct.rejected, (state, { error }) => {
                state.Product = [];
                state.Base_Url = null;
                state.error = error.message; // Set the error message on rejection
            }
        );
    }
});

export { getProduct };
export default ProductSlice.reducer;
