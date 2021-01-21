const getProducts = (...data) => {
    return {
        type: 'GET_PRODUCTS',
        payload: data
    }
}
const getSlides = (...data) => {
    return {
        type: 'GET_SLIDES',
        payload: data
    }
}
const addToCart = (...data) => {
    return {
        type: 'ADD_TO_CART',
        payload: data
    }
}
const removeCartItem = (...data) => {
    return {
        type: 'REMOVE_CART_ITEM',
        payload: data
    }
}
const changeFullPrice = (...data) => {
    return {
        type: 'CHANGE_FULL_PRICE',
        payload: data
    }
}

export { getProducts, getSlides, addToCart, removeCartItem, changeFullPrice }