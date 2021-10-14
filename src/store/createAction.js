import {
    ADD_CART,
    SUB_CART,
    SIZE_DATA
} from "./constance.js"

export const AddAction = cart => (
    {
        type: ADD_CART,
        cart
    }
)

export const SubAction = cartdata => (
    {
        type: SUB_CART,
        cartdata
    }
)


export const AddMiddelDataAction = size => (
    {
        type: SIZE_DATA,
        size
    }
)



