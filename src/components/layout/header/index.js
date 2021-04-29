import React, { useContext } from "react";
import { Layout, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { CartContext } from '../../../contexts/CartContext';
import { useHistory } from 'react-router-dom'
import "./index.css";

const { Header } = Layout;

const MainHeader = () => {
  const { cart } = useContext(CartContext);
  const history = useHistory()

  const goToCart = (event) => {
    history.push('/cart')
  }

  const goToProducts = (event) => {
    history.push('/products')
  }

  return (
    <Header className="header">
      <div className="headerText" onClick={goToProducts}>Product Catalog</div>
      <Badge count={cart.length || 0} showZero className="badge">
        <ShoppingCartOutlined className="cartBadge" onClick={goToCart} />
      </Badge>
    </Header>
  );
};

export default MainHeader;
