const LOCAL_STORAGE = window.localStorage;

const globalState = {
	globalLoad: true,
	token: JSON.parse(LOCAL_STORAGE.getItem('token-telier')) ? JSON.parse(LOCAL_STORAGE.getItem('token-telier')) : null,
	userData: LOCAL_STORAGE.getItem('user-telier') ? JSON.parse(LOCAL_STORAGE.getItem('user-telier')) : {},
	basket: [],
	favorite: [],
}

export const reducer = (state = globalState, action) => {
	switch (action.type) {
		case 'GLOBAL_LOAD':
			return {
				...state,
				globalLoad: action.load
			}
		case 'TOKEN':
			return {
				...state,
				token: action.token
			}
		case 'USER_DATA':
			return {
				...state,
				userData: action.userData
			}
		case 'ADD_ITEM_TO_BASKET':
			return {
				...state,
				basket: action.basket
			}
		case 'ADD_ITEM_TO_FAVORITE':
			return {
				...state,
				favorite: action.favorite
			}
		default:
			return state
	}
}