import React, { useState, useEffect } from 'react'
import { Select, message, Tooltip, Button } from 'antd'
import axios from "axios"
import { connect } from 'react-redux'
import { AddAction } from "./store/createAction"
const { Option } = Select;
function Products(props) {

    const [filter, setFilter] = useState("normal"); // 价格筛选

    const [product, setProduct] = useState([]);

    const [CartData, setCartData] = useState([]);

    function AddCart(cart) {
        //console.log("点击进来的数据",cart)
        let index=0
        console.log("props",props.cart)
        const CartData = props.cart.filter((item,indey) => {
            if(item.id === cart.id) index=indey
            return item.id === cart.id
        })
        
        let CartDataNew = []
        if (CartData.length === 0) {
            cart.number = 1
            CartDataNew = [...props.cart, cart]
            //console.log(CartDataNew)
        } else {
            CartDataNew = [...props.cart]
            CartDataNew[index].number+=1
        }
        props.AddCart(CartDataNew)
    }

    function ClickSelect(value) {
        message.info(value);
        setFilter(value);
    }

    useEffect(() => {
        axios({
            url: "http://120.55.193.14:3030/shoppingCat",
            params: {
                size: props.size,
                filter: filter
            }
        }).then(res => {
            console.log(res.data.data)
            setProduct(res.data.data)
        }).catch(err => {
            console.log(err)
        })

    }, [props.size, filter])

    return (
        <div className="Products">
            <div>
                <span>{product.length}件商品被找到</span>
                <span className="selects">
                    <span>价格排序：</span>
                    <Select
                        value={filter}
                        style={{ width: 120 }}
                        onChange={(value) => {
                            ClickSelect(value);
                        }}>
                        <Option value="normal">normal</Option>
                        <Option value="lower">lowestprice</Option>
                        <Option value="high">highestprice</Option>
                    </Select>
                </span>
            </div>
            <div className="productAll">
                {product.map((item, index) => {
                    return (
                        <div className="productItem" key={item.id}>
                            <div>
                                <img className="productimg" src={require(`./img/${item?.sku}_1.jpg`).default} alt="" />
                            </div>
                            <div className="producttite">
                                <Tooltip title="标题">{item.title}</Tooltip>
                            </div>
                            <div>
                                型号：
                                {item.availableSizes.map((item, index, arr) => {
                                    return ((arr.length) === (index + 1) ? item : item + ",")
                                })}
                            </div>
                            <div>
                                价格：
                                {"$" + item.price}
                            </div>
                            <div>
                                <Button type="primary" onClick={() => { AddCart(item) }}>加入购物车</Button>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        size: state.sizeInfo.size,
        cart: state.cartInfo.cart
    }
}
const mapDispatchToProps = dispatch => {
    return {
        AddCart(cart) {
            dispatch(AddAction(cart))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)