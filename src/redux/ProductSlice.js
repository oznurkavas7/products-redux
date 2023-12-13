import { createSlice } from '@reduxjs/toolkit'

export const ProductSlice = createSlice({
  name: 'product',
  initialState: {
    productList: [],
    basket: localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [],
  },

  reducers: {
    addBasket: (state, action) => {
      const doesItemExist = state.basket.find((item) => item.id === action.payload.id);
      const newArr = []

      if (doesItemExist) {
        state.basket.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity = item.quantity + 1;
            newArr.push({ ...item })
          }
          newArr.concat(state.basket);
          return state.basket;
        })
      }
      else {
        state.basket.push({
          ...action.payload, quantity: 1
        })
      }

      localStorage.setItem('basket', JSON.stringify(state.basket))
    },

    removeBasket: (state, action) => {
      const doesItemExist = state.basket.find((item) => item.id === action.payload.id);
      const newBasket = []
      
      if (doesItemExist && action.payload.quantity > 1) {
        state.basket.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity = item.quantity - 1;
            newBasket.push({ ...item })
          }
          newBasket.concat(state.basket);
          return state.basket;
        })
      }
      else {
        const modified = state.basket.filter(item => item.id !== action.payload.id)
        state.basket = modified
      }

      localStorage.setItem('basket', JSON.stringify(state.basket))

    }
  }
})

// Action creators are generated for each case reducer function
export const { addBasket, removeBasket } = ProductSlice.actions

export default ProductSlice.reducer