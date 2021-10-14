import React from 'react'
import { PoweroffOutlined } from '@ant-design/icons';
import CheckboxAll from './CheckboxAll';
import Products from './Products';
import Cart from './Cart';
import { Provider } from "react-redux"
import store from "./store/index"
import "./Allcss.css/Cart.css"

export default function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <CheckboxAll />
                <Products />
                <Cart />
            </Provider>
        </div>
    )
}
