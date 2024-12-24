import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const getCartProduct = createAsyncThunk(
    "get_cart_value",
    () => {
        const Iscart = localStorage.getItem("cart")
        if (Iscart != null || Iscart != undefined) {
            return {
                cart: JSON.parse(Iscart)
            }
        } else {
            return {
                cart: []
            }
        }
    }
)



const CartSlice = createSlice(
    {
        name: "cart",
        initialState: {
            cart: []
        },
        reducers: {
            cartempty: (state, { payload }) => {
                state.cart = []
            },
            inc: (state, { payload }) => {
                let index = null
                state.cart.forEach(
                    (item, i) => {
                        if (item.pId == payload.pId) {
                            index = i
                        }
                    }
                )
                state.cart[index].qty += 1
                localStorage.setItem("cart", JSON.stringify(state.cart))
            }
            ,
            dec: (state, { payload }) => {
                let index = null
                state.cart.forEach(
                    (item, i) => {
                        if (item.pId == payload.pId) {
                            index = i
                        }
                    }
                )
                if (state.cart[index].qty >= 1) {
                    state.cart[index].qty -= 1
                    localStorage.setItem("cart", JSON.stringify(state.cart))
                }

            },
            addToCart: (state, { payload }) => {
                // console.log(payload,state.cart);
                let index = null
                state.cart.forEach(
                    (item, i) => { 
                        if (item.pId == payload.pId) {
                            index = i
                        }
                    }
                )
                if (index == null) {
                    state.cart.push(payload)
                } else {
                    state.cart[index].qty = state.cart[index].qty + 1
                }
                localStorage.setItem("cart", JSON.stringify(state.cart))

            },
            removeToCart: (state, { payload }) => {
                let index = null
                state.cart.forEach(
                    (item, i) => {
                        if (item.pId == payload.pId) {
                            index = i
                        }
                    }
                )
                if (index != null) {
                    state.cart.splice(index, 1);
                    localStorage.setItem("cart", JSON.stringify(state.cart))
                }

            },
            userCart: (state, { payload }) => {
                state.cart = payload.userCart;
            }
        }

        , extraReducers: (bulider) => {
            bulider.addCase(
                getCartProduct.fulfilled,
                (state, { payload }) => {
                    state.cart = payload.cart
                }
            )

        }
    }
)


export const { addToCart, removeToCart, inc, dec, cartempty, userCart } = CartSlice.actions;
export default CartSlice.reducer;
export { getCartProduct }