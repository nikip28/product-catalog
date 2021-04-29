import React, { useContext } from "react";
import { CartContext } from '../../contexts/CartContext';
import { Button, Card, Tooltip } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import inventory from '../../mockData/inventory.json'
import "./index.css";

const Cart = () => {
    const { cart, storeCart } = useContext(CartContext);

    const calculateTotalAmount = () => {
        let total = 0
        cart.forEach(item => {
            total = total + (item.quantity * item.price)
        })
        return total
    }

    const addQuantity = (product) => {
        let updatedCart = []
        updatedCart = cart.map(item => {
            if (item.sku === product.sku) {
                let updatedQuantity = item.quantity + 1
                //check inventory
                if (updatedQuantity > inventory[product.sku]) {
                    alert(`only ${inventory[product.sku]} item(s) are remaining so you can not add more than ${inventory[product.sku]} item(s) into cart!`)
                    return item
                }
                //check purchase limit per order
                if (updatedQuantity > product.purchaseQuantityLimitPerOrder) {
                    alert(`you can not order more than ${product.purchaseQuantityLimitPerOrder} of this item!`)
                    return item
                }
                // updated = 1
                //if all good update the quantity
                return { ...item, quantity: updatedQuantity }
            } else {
                return item
            }
        })
        storeCart(updatedCart)
    }

    const removeQuantity = (product) => {
        let updatedCart = cart.map(item => {
            if (item.sku === product.sku) {
                let updatedQuantity = item.quantity - 1
                //remove item if quantity is 0
                if (updatedQuantity === 0) {
                    return false
                }
                //if all good update the quantity
                return { ...item, quantity: updatedQuantity }
            } else {
                return item
            }
        }).filter(Boolean)
        storeCart(updatedCart)
    }

    return (
        <>
            {cart.length ?
                <>
                    {cart.map(item =>
                        <Card title={item.name}>
                            <div className="details">
                                <div>
                                    <p>Description: {item.description}</p>
                                    <p>Price: {item.price}</p>
                                </div>
                                <div className="detailsRight">
                                    <div className="actions">
                                        <Tooltip title="add">
                                            <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => addQuantity(item)} />
                                        </Tooltip>
                                        <div className="quantity">{item.quantity}</div>
                                        <Tooltip title="remove">
                                            <Button type="secondary" shape="circle" icon={<MinusOutlined />} onClick={() => removeQuantity(item)} />
                                        </Tooltip>
                                    </div>
                                    <div>Total: {item.price * item.quantity}</div>
                                </div>
                            </div>
                        </Card>)}
                    <Card title="Total Amount" className="totalAmount">
                        <p>{calculateTotalAmount()}</p>
                    </Card>
                </> :
                <div>Cart is Empty</div>
            }
        </>
    );
};

export default Cart;