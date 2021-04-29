import React from "react";
import { Layout } from 'antd';
import Header from "./header";
import Footer from "./footer";
import "./index.css";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <Layout>
        <Header>Header</Header>
        <Content className="content">{children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
};

export default MainLayout;