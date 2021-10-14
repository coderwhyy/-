import React from 'react'
import { Checkbox} from 'antd'
import { connect } from 'react-redux'
import {AddMiddelDataAction} from "./store/createAction"
function CheckboxAll(props) {

    const size =["XS", "S", "M", "ML", "L", "XL", "XXL"]

    return (
        <div className="CheckBoxAll">
            <Checkbox.Group options={size} defaultValue={props.size} onChange={props.onChangeSize} style={{"width":"200px","textAlign":"left"}} />
            <br />
        </div>
    )
}


const mapStateToProps=state=>{
    return {
        size:state.sizeInfo.size,
        cart:state.cartInfo.cart
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        onChangeSize(size){
            dispatch(AddMiddelDataAction(size))
        }, 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CheckboxAll)
