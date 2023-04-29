import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadProducts = createAsyncThunk(
	'@@products/load-products',
	(_, {
		extra: { client, api }
	}) => {
		return client.get(api.ALL_PRODUCTS)
	}
)

const initialState = {
	status: 'idle',
	error: null,
	list: [],
}

const productSlice = createSlice({
	name: '@@products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadProducts.pending, (state, action) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(loadProducts.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload || action.meta.error;
			})
			.addCase(loadProducts.fulfilled, (state, action) => {
				state.status = 'received';
				state.list = [action.payload.data]
			})
	}
})

export const productReducer = productSlice.reducer;

export const selectAllProducts = (state) => {
	return state.products.list}