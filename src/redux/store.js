import { configureStore } from '@reduxjs/toolkit'
import productReducer from './ProductSlice'

export default configureStore({
  reducer: {
    product: productReducer
  }
})