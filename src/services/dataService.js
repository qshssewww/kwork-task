import { endpoints } from "./endoints";

const headers = {
	'Content-type': 'application/json',
	'Accept': 'application/json',
}

const LOCAL_STORAGE = window.localStorage;

export class dataService {
	getCurrentProduct = async (product) => {
		try {
			let res = await fetch(`${endpoints.getCurrentProduct}${product}`, {
				method: 'GET',
				headers: {
					...headers
				},
			})

			return await res.json();

		} catch (err) {
			console.log(err)
			return false
		}
	}

	getDetailProduct = async (product) => {
		try {
			let res = await fetch(`${endpoints.getDetailProduct}${product}`, {
				method: 'GET',
				headers: {
					...headers
				},
			})

			return await res.json();

		} catch (err) {
			console.log(err)
			return false
		}
	}

	getCategories = async () => {
		try {
			let res = await fetch(endpoints.categories, {
				method: 'GET',
				headers: {
					...headers
				},
			})

			return await res.json();

		} catch (err) {
			console.log(err)
			return false
		}
	}

	getBaskets = async (token) => {
		try {
			let res = await fetch(endpoints.basket, {
				method: 'GET',
				headers: {
					'Authorization': `Token ${token}`,
					...headers
				},
			})
			if (res.status !== 200) {
				LOCAL_STORAGE.removeItem('token-telier')
				LOCAL_STORAGE.removeItem('user-telier')
			}
			return await res.json();

		} catch (err) {
			console.log(err)
			return false
		}
	}

	putBaskets = async (token, id, data) => {
		try {
			let res = await fetch(`${endpoints.basketPut}${id}`, {
				method: 'PUT',
				headers: {
					'Authorization': `Token ${token}`,
					...headers
				},
				body: JSON.stringify(data),
			})

			return await res.json();
		} catch (err) {
			console.log(err)
			return false
		}
	}

	addBaskets = async (token, data) => {
		try {
			let res = await fetch(`${endpoints.basketAdd}`, {
				method: 'POST',
				headers: {
					'Authorization': `Token ${token}`,
					...headers
				},
				body: JSON.stringify(data),
			})

			return await res.json();
		} catch (err) {
			console.log(err)
			return false
		}
	}

	deleteBaskets = async (token, id) => {
		try {
			let res = await fetch(`${endpoints.basketDelete}${id}`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Token ${token}`,
					...headers
				},
			})

			return await res.json();
		} catch (err) {
			console.log(err)
			return false
		}
	}

	deleteFavorites = async (token, id) => {
		try {
			let res = await fetch(`${endpoints.favoriteDelete}${id}`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Token ${token}`,
					...headers
				},
			})

			return await res.json();
		} catch (err) {
			console.log(err)
			return false
		}
	}

	getFavorites = async (token) => {
		try {
			let res = await fetch(endpoints.favorite, {
				method: 'GET',
				headers: {
					'Authorization': `Token ${token}`,
					...headers
				},
			})

			return await res.json();
		} catch (err) {
			console.log(err)
			return false
		}
	}

	addFavorites = async (token, data) => {
		try {
			let res = await fetch(`${endpoints.favoriteAdd}`, {
				method: 'POST',
				headers: {
					'Authorization': `Token ${token}`,
					...headers
				},
				body: JSON.stringify(data),
			})

			return await res.json();
		} catch (err) {
			console.log(err)
			return false
		}
	}

	getRevs = async (sort, prodId) => {
		try {
			let res = await fetch(endpoints.rating + `?order_by=${sort}&product=${prodId}`, {
				method: 'GET',
				// mode: 'cors',
				headers,

			})

			return await res.json()
		} catch (err) {
			console.error(err)
		}
	}

	addRevs = async (token, data) => {
		try {
			let res = await fetch(`${endpoints.rating}`, {
				method: 'POST',
				headers: {
					'Authorization': `Token ${token}`,
					...headers
				},
				body: JSON.stringify(data),
			})

			return await res.json();
		} catch (err) {
			console.log(err)
			return false
		}
	}

	getCatalogProducts = async (subcategory = '', category = '', search = '') => {
		if (category == 'Везде') {
			category = ''
		}
		try {
			let res = await fetch(endpoints.getDetailProduct + `?category=${category}&subcategory=${subcategory}&search=${search}`, {
				method: 'GET',
				// mode: 'cors',
				headers,

			})
			return await res.json()
		} catch (err) {
			console.error(err)
		}
	}
	getOrder = async (userId, token) => {
		try {
			let res = await fetch(endpoints.order + `?user=${userId}`, {
				method: 'GET',
				// mode: 'cors',
				headers: {
					'Authorization': `Token ${token}`,
					...headers
				},

			})

			return await res.json()
		} catch (err) {
			console.error(err)
		}
	}

	addOrder = async (token, data) => {
		try {
			let res = await fetch(`${endpoints.order}`, {
				method: 'POST',
				headers: {
					'Authorization': `Token ${token}`,
					...headers
				},
				body: JSON.stringify(data),
			})

			return await res.json();
		} catch (err) {
			console.log(err)
			return false
		}
	}

	addAddress = async (token, data) => {
		try {
			let res = await fetch(`${endpoints.address}`, {
				method: 'POST',
				headers: {
					'Authorization': `Token ${token}`,
					...headers
				},
				body: JSON.stringify(data),
			})

			return await res.json();
		} catch (err) {
			console.log(err)
			return false
		}
	}
	
	getAddress = async (token, userId) => {
		try {
			let res = await fetch(endpoints.address + `?user=${userId}`, {
				method: 'GET',
				// mode: 'cors',
				headers: {
					'Authorization': `Token ${token}`,
					...headers
				},

			})

			return await res.json()
		} catch (err) {
			console.error(err)
		}
	}

	deleteAddress = async (token, id) => {
		try {
			let res = await fetch(`${endpoints.address}${id}/`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Token ${token}`,
					...headers
				},
			})

			return await res.json();
		} catch (err) {
			console.log(err)
			return false
		}
	}
}