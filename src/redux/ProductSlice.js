import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  status: false,
  productList: localStorage.getItem('productList') ? JSON.parse(localStorage.getItem('productList')) : [],
  basket: localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [],
  showAlert: false,
  openDetail: null,
  token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
  userApi: localStorage.getItem('userpage') ? JSON.parse(localStorage.getItem('userpage')) : null,
}

export const getProductApi = createAsyncThunk(
  'gets/getProductApi',
  async (thunkAPI) => {
    const res = await fetch('https://fakestoreapi.com/products').then(
      (data) => data.json()
    )
    return res
  })

  export const loginOperation = createAsyncThunk(
    'gets/loginOperation',
    async ({ name, pass }) => {
      const res = await fetch('https://fakestoreapi.com/auth/login',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: name,
          password: pass
    })}).then(
        (data) => data.json()
      )
      return res
    }
  );

  export const getUserApi = createAsyncThunk(
    'gets/getUserApi',
    async (thunkAPI) => {
      const res = await fetch('https://fakestoreapi.com/users/5').then(
        (data) => data.json()
      )
      return res
    }
  );

  export const logOut = () => (dispatch) => {
    localStorage.removeItem("token")
    dispatch(tokenRemove());
  };

  export const searchCategory = (param) => (dispatch) => {
    if (param === "All") {
      dispatch(getProductApi())
    }
    else {
      fetch(`https://fakestoreapi.com/products/categories `)
        .then(res => res.json())
        .then(json => {
          json.map((item) => {
          if (param === item) {
            fetch(`https://fakestoreapi.com/products/category/${item} `)
              .then(res => res.json())
              .then(json => {
                json && dispatch(selectCard(json));
              })
          }
        })
        })
    }
  };

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
    },
    handleOpen: (state, action) => {
      state.openDetail = action.payload
    },
    handleClose: (state) => {
      state.openDetail = null
    },
    tokenRemove(state, action) {
      state.token = null
    },
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
      .addCase(loginOperation.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem('token', JSON.stringify(state.token))
      })
      .addCase(getUserApi.fulfilled, (state, action) => {
         state.userApi = action.payload;

         localStorage.setItem('userpage', JSON.stringify(state.userApi))
      })

      .addCase(getProductApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
});

// Action creators are generated for each case reducer function
export const { addBasket, removeBasket, getProductData, 
  selectCard, closeAlert, handleOpen, handleClose, tokenRemove } = ProductSlice.actions

export default ProductSlice.reducer