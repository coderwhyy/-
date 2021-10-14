import React,{useState} from 'react'
import { Badge, Drawer } from "antd"
import { ShoppingCartOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'

function Cart(props) {

    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    return (
        <div>
            <div className="Cart" onClick={() => { showDrawer() }}>
                <Badge count={1} size="small" offset={[0, 0]}>
                    <ShoppingCartOutlined />
                    购物车
                </Badge>
            </div>
            <div>
                <Drawer title="购物车" width={330} mask={false} placement="right" onClose={onClose} visible={visible}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
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
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
