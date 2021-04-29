import React, { Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layout";

const Products = lazy(() => import("./components/products"));
const Cart = lazy(() => import("./components/cart"));

const Routes = props => (
    <Router>
        <Layout>
            <Suspense fallback={<div>...Loading</div>}>
                <Switch>
                    <Route path="/cart" render={() => <Cart {...props} />} />
                    <Route path="/products" render={() => <Products {...props} />} />
                    <Route path="/" render={() => <Products {...props} />} />
                </Switch>
            </Suspense>
        </Layout>
    </Router>
);

export default Routes