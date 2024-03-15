import { createSlice } from '@reduxjs/toolkit'

export const functionSlice = createSlice({
  name: 'functionSlice',
  initialState: {
    value: 0,
    cart:[],
  },
  reducers: {
    addToCartReducer: (state, action) => {
      const item = action.payload.item;
      const cartItem = { id: Date.now(), item: item, qty: 1 };
      return {
        ...state,
        cart: [...state.cart, cartItem]
      };
    },
    updateCartItemReducer: (state, action) => {
      const { id } = action.payload;
      const updatedCart = state.cart.map(item => {
        if (item.id === id) {
          return { ...item, qty:item.qty+1 };
        }
        return item;
      });
      return {
        ...state,
        cart: updatedCart
      };
    }, 
    
    minusCartItemReducer : (state,action)=>{
      const { id } = action.payload;
      const updatedCart = state.cart.map(item => {
        if (item.id === id) {
          return { ...item, qty:item.qty-1 };
        }
        return item;
      });
      return {
        ...state,
        cart: updatedCart
      };
    },
    deleteCartItemReducer: (state, action) => {
      const idToDelete = action.payload.id;
      const updatedCart = state.cart.filter(item => item.id !== idToDelete);
      return {
        ...state,
        cart: updatedCart
      };
    },
  }
})

// Action creators are generated for each case reducer function
export const { addToCartReducer,deleteCartItemReducer,updateCartItemReducer,minusCartItemReducer } = functionSlice.actions

export default functionSlice.reducer