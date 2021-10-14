import React, { useState, useEffect } from 'react'
import { Badge, Drawer, Button,InputNumber} from "antd"
import { ShoppingCartOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { AddAction } from "./store/createAction"

function Cart(props) {
    console.log(111)
    const [visible, setVisible] = useState(false);
    const [AllPrice, setAllPrice] = useState(0);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    useEffect(() => {
        //console.log("Cart",JSON.parse(localStorage.getItem("carData")));
        props.AddCart(JSON.parse(localStorage.getItem("carData")))
    }, [])

    useEffect(() => {
        GetAllPrice(props.cart)
    }, [props.cart])

    function GetAllPrice(cart) {
        let totalPrice = 0;
        for (var i in cart) {
            totalPrice = totalPrice + cart[i].price * cart[i].number;
        }
        setAllPrice(totalPrice.toFixed(2));
    }

    function deleteCart(index) {
        let cart = props.cart.filter((item, indey) => { return index != indey })
        props.AddCart(cart)
        localStorage.setItem("carData", JSON.stringify(cart));
    }

    function onChange(value,index) {
        let cart = [...props.cart]
        cart[index].number=value
        props.AddCart(cart)
        localStorage.setItem("carData", JSON.stringify(cart));
    }

    function CheckOut(){
        props.AddCart([])
        localStorage.setItem("carData", JSON.stringify([]));
    }


    return (
        <div>
            <div className="Cart" onClick={() => { showDrawer() }}>
                <Badge count={props.cart.length} size="small" offset={[0, 0]}>
                    <ShoppingCartOutlined />
                    购物车
                </Badge>
            </div>
            <div>
                <Drawer title="购物车" width={380} mask={false} placement="right" onClose={onClose} visible={visible}>
                    {props.cart.map((item, index) => {
                        return (
                            <div className="CartAll" key={item.id}>
                                <div className="CartImg">
                                    <div><img src={require(`./img/${item?.sku}_1.jpg`).default} alt="" /></div>
                                </div>
                                <div className="CartInfo">
                                    <div className="CartInfoTitle">{item.title}</div>
                                    <div>型号:{item.availableSizes.map((item, index, arr) => {
                                        return ((arr.length) === (index + 1) ? item : item + ",")
                                    })}</div>
                                    <div>价格:{"$" + item.price}</div>
                                    <InputNumber style={{ width: 50 }} min={1} size="small" defaultValue={item.number} onChange={(value)=>{onChange(value,index)}} />
                                </div>
                                <div className="CartButton">
                                    <Button type="primary" onClick={() => { deleteCart(index) }}>删除</Button>
                                </div>
                            </div>
                        )
                    })}
                    <div style={{ "text-align": "center" }}>
                        总价格：${AllPrice}
                        <br />
                        <Button type="primary" onClick={() => {CheckOut()}}>结算</Button>
                    </div>

                </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
