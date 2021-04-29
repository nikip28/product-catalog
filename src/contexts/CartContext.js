import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartContextProvider = (props) => {
    const storedCartData = localStorage.getItem("cart")
    const [cart, setCart] = useState(storedCartData ? JSON.parse(storedCartData) : []);

    const storeCart = data => {
        localStorage.setItem("cart", JSON.stringify(data))
        setCart(data)
    };

    return (
        <CartContext.Provider value={{ cart, storeCart }}>
            {props.children}
        </CartContext.Provider>
    )
};

export default CartContextProvider;