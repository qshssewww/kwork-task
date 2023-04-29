import { endpoints } from "./endoints";

const headers = {
	'Content-type': 'application/json',
	'Accept': 'application/json',
}

export class authService {
	login = async (data) => {
		try {
			let res = await fetch(endpoints.login, {
				method: 'POST',
				body: JSON.stringify(data),
				headers
			})
			// console.log(res.json())
			// if(res.status == 200) {
			return res;
			// } else {
			// 	return null
			// }

		} catch (err) {
			console.log(err)
		}
	}

	logout = async (token) => {
		try {
			let res = await fetch(endpoints.logout, {
				method: 'POST',
				headers: {
					'Authorization': `Token ${token}`,
					...headers,
				}
			})

			return res;
		} catch (err) {
			console.log(err)
		}
	}

	getUserData = async (token) => {
		try {
			let res = await fetch(endpoints.getUser, {
				method: 'GET',
				headers: {
					'Authorization': `Token ${token}`,
					...headers
				}
			})

			return await res.json()

		} catch (err) {
			console.log(err)
		}
	}

	signup = async (data) => {
		try {
			let res = await fetch(endpoints.signup, {
				method: 'POST',
				body: JSON.stringify(data),
				headers
			})

			return res;

		} catch (err) {
			console.log(err)
		}
	}

	confirmcode = async (data) => {
		try {
			let res = await fetch(endpoints.confirmcode, {
				method: 'POST',
				body: JSON.stringify(data),
				headers
			})

			return res;

		} catch (err) {
			console.log(err)
		}
	}

	putUser = async (token, id, data) => {
		try {
			let res = await fetch(`${endpoints.putUser}${id}/`, {
				method: 'PUT',
				headers: {
					'Authorization': `Token ${token}`,
					...headers
				},
				body: JSON.stringify(data),
			})

			return res;
		} catch (err) {
			console.log(err)
			return false
		}
	}
}