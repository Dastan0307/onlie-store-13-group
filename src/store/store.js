import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/slices/productSlice'
import cartReducer from '../features/slices/cartSlice'

const store = configureStore({
	reducer: {
		products: productReducer,
		cart: cartReducer
	}
})

export default store