import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'https://fakestoreapi.com/products'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
	try {
		const response = await axios.get(API)
		return response.data
	} catch (err) {
		console.log(err)
	}
})

export const getProductById = createAsyncThunk('products/getProductById', async (id) => {
	try {
		const res = await axios.get(`${API}/${id}`)
		return res.data
	} catch (error) {
		console.log(error);
	}
})


const initialState = {
	products: [],
	productById: [],
	loading: false,
	error: null
}

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
		.addCase(fetchProducts.pending, (state) => {
			state.loading = true
		})
		.addCase(fetchProducts.fulfilled, (state, action) => {
			state.loading = false
			state.products = action.payload
		})
		.addCase(fetchProducts.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
		})

		.addCase(getProductById.pending, (state) => {
			state.loading = true
		})
		.addCase(getProductById.fulfilled, (state, action) => {
			state.loading = false
			state.productById = action.payload
		})
		.addCase(getProductById.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
		})
	}
})

export default productSlice.reducer