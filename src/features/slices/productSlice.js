import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

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

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
	try {
		const res = await axios.delete(`${API}/${id}`)
		return res.data
	} catch (error) {
		console.log(error)
	}
})

export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
	try {
		const res = await axios.put(`${API}/${product.id}`, product)
		return res.data

	} catch (error) {
		console.log(error)
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

		.addCase(deleteProduct.pending, (state) => {
			state.loading = true
		})
		.addCase(deleteProduct.fulfilled, (state, action) => {
			state.loading = false
			state.products = state.products.filter(product => product.id !== action.payload)
			toast.success('Продукт был удален!')
		})
		.addCase(deleteProduct.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
			toast.error('Продукт не удален!')
		})

		.addCase(updateProduct.fulfilled, (state, action) => {
			state.loading = false
			const index = state.products.findIndex(product => product.id === action.payload.id)
			if (index !== -1) {
				state.products[index] = action.payload
                toast.success('Продукт был изменен!')
			}
		})
		.addCase(updateProduct.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
			toast.error('Продукт не был изменен!')
		})
	}
})

export default productSlice.reducer