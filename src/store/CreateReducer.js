import {
    SIZE_DATA,
    ADD_CART
} from "./constance.js"



const sizeData = {
    size: ["XS", "S", "M", "ML", "L", "XL", "XXL"]
}

function reducerSizeData(state = sizeData, action) {
    switch (action.type) {
        case SIZE_DATA:
            return { ...state, size: action.size }
        default:
            return state
    }
}

const cartData = {
    cart: []
}

function reducerCARData(state = cartData, action) {
    //console.log("action",action)
    //console.log("state",state)
    switch (action.type) {
       
        // action.cart 这儿错了吧  cartdata是这个吧
        case ADD_CART:
            return { ...state, cart: action.cart }
        default:
            return state
    }
}

function reducer(state = {}, action) {
    return {
        sizeInfo: reducerSizeData(state.sizeInfo, action),
        cartInfo: reducerCARData(state.cartInfo, action)
    }

}

export default reducer