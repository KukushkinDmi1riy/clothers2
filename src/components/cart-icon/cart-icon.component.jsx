import React from 'react';
import {connect} from 'react-redux';

import {selectCartItemsCount} from '../../redux/cart/cart.selectors';

import {toggleCartHidden} from '../../redux/cart/cart.actions.js';

import { CartIconContainer, ItemCountContainer, ShoppingIconContainer} from './cart-icon.styles';



const CartIcon = ({toggleCartHidden, itemCount}) => {
    return (
        <CartIconContainer onClick={toggleCartHidden}>
            <ShoppingIconContainer className = "shopping-icon"/> 
            <ItemCountContainer> {itemCount} </ItemCountContainer>
        </CartIconContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: ()=> dispatch(toggleCartHidden())
})

const mapStateToProps = (state) => ( {
    itemCount: selectCartItemsCount(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);