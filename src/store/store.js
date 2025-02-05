import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/slices/productSlice'

const store = configureStore({
	reducer: {
		products: productReducer
	}
})

export default store