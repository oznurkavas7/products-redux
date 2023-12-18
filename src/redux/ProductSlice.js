import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  status: false,
  productList: localStorage.getItem('productList') ? JSON.parse(localStorage.getItem('productList')) : [],
  basket: localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [],
  showAlert: false
}

export const getProductApi = createAsyncThunk(
  'gets/getProductApi',
  async (thunkAPI) => {
    const res = await fetch('https://fakestoreapi.com/products').then(
      (data) => data.json()
    )
    return res
  })

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
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

      state.showAlert = true;
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

    },
    selectCard(state, action) {
      state.productList = action.payload
    },
    closeAlert: (state) => {
      state.showAlert = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productList = action.payload;
        localStorage.setItem('productList', JSON.stringify(state.productList))
      })
      .addCase(getProductApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const searchCategory = (param) => (dispatch) => {
  if (param === "All") {
    dispatch(getProductApi())
  }
  else {
    fetch(`https://fakestoreapi.com/products/categories `)
      .then(res => res.json())
      .then(json => {
        {
          json.map((item) => {
            if (param === item) {
              fetch(`https://fakestoreapi.com/products/category/${item} `)
                .then(res => res.json())
                .then(json => {
                  json && dispatch(selectCard(json));
                })
            }
          })
        }
      })
  }
};

// Action creators are generated for each case reducer function
export const { addBasket, removeBasket, getProductData, selectCard, closeAlert } = ProductSlice.actions

export default ProductSlice.reducer