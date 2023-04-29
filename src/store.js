import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";

import * as api from './config';
import { productReducer } from "./components/Product/products-slice";
import { reducer } from './store/reducer';

export const store = configureStore({
	reducer: {
		products: productReducer,
		mainReducer: reducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		thunk: {
			extraArgument: {
				client: axios,
				api,
			}
		},
		serializableCheck: false,
		immutableCheck: false,
	})
})