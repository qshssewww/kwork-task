export const globaLoadState = (bool) => ({type: 'GLOBAL_LOAD', load: bool})
export const updateToken = (token) => ({type: 'TOKEN', token: token});
export const updateUserData = (userData) => ({type: 'USER_DATA', userData: userData});
export const addItemToBasket = (basket) => ({type: 'ADD_ITEM_TO_BASKET', basket: basket});
export const addItemToFavorite = (favorite) => ({type: 'ADD_ITEM_TO_FAVORITE', favorite: favorite});