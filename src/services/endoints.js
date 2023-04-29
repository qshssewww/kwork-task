const BASE_URL = 'http://92.53.120.144';

export const endpoints = {
	// products: `${BASE_URL}/api/v1/product/`,
	categories: `${BASE_URL}/api/v1/category/`,
	basket:`${BASE_URL}/api/v1/basket/`,
	basketPut:`${BASE_URL}/api/v1/basket/put/`,
	basketAdd:`${BASE_URL}/api/v1/basket/add/`,
	basketDelete:`${BASE_URL}/api/v1/basket/remove/`,
	favoriteDelete:`${BASE_URL}/api/v1/favorite/remove/`,
	favorite:`${BASE_URL}/api/v1/favorite/`,
	favoriteAdd:`${BASE_URL}/api/v1/favorite/add/`,
	getCurrentProduct:`${BASE_URL}/api/v1/product/`,
	getDetailProduct:`${BASE_URL}/api/v1/variants/`,
	rating: `${BASE_URL}/api/v1/rating/`,
	order: `${BASE_URL}/api/v1/order/`,
	address: `${BASE_URL}/api/v1/address/`,

	login: `${BASE_URL}/auth/token/login/`,
	logout: `${BASE_URL}/auth/token/logout/`,
	signup: `${BASE_URL}/users/register/`,
	confirmcode: `${BASE_URL}/users/confirm_phone_number/`,
	
	getUser: `${BASE_URL}/auth/users/me/`,
	putUser: `${BASE_URL}/userget/`,
}
