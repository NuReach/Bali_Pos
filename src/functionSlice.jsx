import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const functionSlice = createSlice({
  name: 'functionSlice',
  initialState: {
    value: 0,
    cart:[],
    showCartBoolean : false,
    showSidebarBoolean : false,
    filterMenuKey : "all",
    searchKey : ""
  },
  reducers :{
    addToCartReducer: (state, action) => {
      const item = action.payload.item;
      const itemId = item.id;
      const existingCartItem = state.cart.find(cartItem => cartItem.item.id === itemId);
      if (existingCartItem) {
        const updatedCart = state.cart.map(cartItem => {
          if (cartItem.item.id === itemId) {
            return { ...cartItem, qty: cartItem.qty + 1, total: (cartItem.qty + 1) * parseFloat(cartItem.item.price) }; // Update total
          }
          return cartItem;
        });
        return {
          ...state,
          cart: updatedCart
        };
      } else {
        const id = uuidv4();
        const cartItem = { id: id, item: item, qty: 1, total: parseFloat(item.price) }; // Add total
        return {
          ...state,
          cart: [...state.cart, cartItem]
        };
      }
    },
  
    // Other reducers...
  
    updateCartItemReducer: (state, action) => {
      const { id } = action.payload;
      const updatedCart = state.cart.map(item => {
        if (item.id === id) {
          return { ...item, qty: item.qty + 1, total: (item.qty + 1) * parseFloat(item.item.price) }; // Update total
        }
        return item;
      });
      return {
        ...state,
        cart: updatedCart
      };
    },
  
    minusCartItemReducer: (state, action) => {
      const { id } = action.payload;
      const updatedCart = state.cart.map(item => {
        if (item.id === id) {
          return { ...item, qty: item.qty - 1, total: (item.qty - 1) * parseFloat(item.item.price) }; // Update total
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

    removeAllCartItem : (state,action)=>{
      return {
        ...state,cart:[]
      }
    },

    showCartDailog : (state,action)=>{
      return {
        ...state,showCartBoolean:!state.showCartBoolean
      }
    },
    showSidebarDailog : (state,action)=>{
      return {
        ...state,showSidebarBoolean:!state.showSidebarBoolean
      }
    },
    filterMenu : (state,action)=>{
      const key = action.payload.key;
      return {
        ...state,filterMenuKey:key
      }
    },
    searchMenu : (state,action)=>{
      const key = action.payload.key;
      return {
        ...state,searchKey:key
      }
    }
  }
})

export const { addToCartReducer,deleteCartItemReducer,updateCartItemReducer,minusCartItemReducer,showCartDailog,showSidebarDailog,filterMenu,searchMenu,removeAllCartItem } = functionSlice.actions

export default functionSlice.reducer