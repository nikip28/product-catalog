import React, { useState, useContext } from "react";
import { UnorderedListOutlined, TableOutlined } from '@ant-design/icons';
import { Table, Tooltip } from 'antd';
import { getColumns } from './Columns'
import products from '../../mockData/products.json'
import inventory from '../../mockData/inventory.json'
import { CartContext } from '../../contexts/CartContext';
import "./index.css";

const Products = () => {
  const [type, setType] = useState("table")
  const { cart, storeCart } = useContext(CartContext);

  const updateView = () => {
    const newType = type === "table" ? "grid" : "table"
    setType(newType)
  }

  const addToCart = (product) => {
    let updatedCart = []
    let updated = 0
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
        updated = 1
        //if all good update the quantity
        return { ...item, quantity: updatedQuantity }
      } else {
        return item
      }
    })
    if (!updated) {
      updatedCart.push({ ...product, quantity: 1 })
    }
    storeCart(updatedCart)
  }

  return (
    <>
      <div className="switchIcon">
        {type === "table" ?
          <Tooltip title="Switch to Grid View">
            <UnorderedListOutlined onClick={updateView} className="viewTypeIcon" />
          </Tooltip> :
          <Tooltip title="Switch to Table View">
            <TableOutlined onClick={updateView} className="viewTypeIcon" />
          </Tooltip>}
      </div>
      {type === "table" ?
        <Table columns={getColumns(addToCart)} dataSource={products} /> :
        <div>grid view</div>}
    </>
  );
};

export default Products;