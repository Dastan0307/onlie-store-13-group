import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
	},
	reducers: {
		addCart: (state, action) => {
			const existingItem = state.items.find(item => item.id == action.payload.id);
			if (existingItem) {
				existingItem.quantity += 1
			} else {
				state.items.push({ ...action.payload, quantity: 1 })
			}
		},
		removeFromCart: (state, action) => {
			state.items = state.items.filter(item => item.id !== action.payload)
		},
		clearCart: (state) => {
			state.items = []
		},
		incrementQuantity: (state, action) => {
			const item = state.items.find(item => item.id == action.payload);
			if (item) {
				item.quantity += 1
			}
		},
		decrementQuantity: (state, action) => {
			const item = state.items.find(item => item.id == action.payload);
			if (item && item.quantity > 1) {
				item.quantity -= 1
			} else {
				state.items = state.items.filter(item => item.id !== action.payload)
			}
		}
	}
})

export const { addCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions
export default cartSlice.reducer