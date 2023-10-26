import React from "react";
import Login from "./components/Login";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import ProductsAll from "./components/Admin/Products/ProductsAll";
import ProductsCreate from "./components/Admin/Products/ProductsCreate";
import ProductsEdit from "./components/Admin/Products/ProductsEdit";
import ProductDetails from "./components/Admin/Products/ProductDetails";
import CategoryAll from "./components/Admin/Category/CategoryAll";
import CategoryCreate from "./components/Admin/Category/CategoryCreate";
import CategoryEdit from "./components/Admin/Category/CategoryEdit";
import CategoryDetail from "./components/Admin/Category/CategoryDetail";
import PartnerAll from "./components/Admin/Partner/PartnerAll";
import PartnerCreate from "./components/Admin/Partner/PartnerCreate";
import PartnerEdit from "./components/Admin/Partner/PartnerEdit";
import PartnerDetail from "./components/Admin/Partner/PartnerDetail";
import LocationAll from "./components/Admin/Location/LocationAll";
import LocationCreate from "./components/Admin/Location/LocationCreate";
import LocationEdit from "./components/Admin/Location/LocationEdit";
import LocationDetail from "./components/Admin/Location/LocationDetail";
import SaleOrderAll from "./components/Admin/SaleOrder/SaleOrderAll";
import SaleOrderCreate from "./components/Admin/SaleOrder/SaleOrderCreate";
import SaleOrderDetail from "./components/Admin/SaleOrder/SaleOrderDetail";
import PosItems from "./components/Admin/POS/PosItems";
import Register from "./components/Register";
import GuardRouter from "./components/GuardRoute";
import Home from "./components/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import Profile from "./components/utility/Profile";
import OverView from "./components/utility/OverView";
import Customer from "./components/Admin/Customer/Customer";
import Vendors from "./components/Admin/Customer/Vendors";
import View from "./components/Admin/SaleOrder/View";
import PurchaseAll from "./components/Admin/Purchase/PurchaseAll";
import PurchaseCreate from "./components/Admin/Purchase/PurchaseCreate";
import PurchaseDetail from "./components/Admin/Purchase/PurchaseDetail";
import PurchaseView from "./components/Admin/Purchase/PurchaseView";
import Stock from "./components/Admin/Stock/Stock";
import AdjustmentView from "./components/Admin/Ajustment/AjusmentView";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signin" element={<Login />} />

          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            element={
              <GuardRouter>
                <Admin />
              </GuardRouter>
            }
          >
            <Route path="inventory/overview" element={<OverView />} />
            <Route path="adjustment">
              <Route path="view" element={<AdjustmentView />} />
            </Route>
            <Route path="user">
              <Route path="register" element={<Register />} />
              <Route path="edit/:id" element={<Profile />} />
            </Route>
            <Route path="stock">
              <Route path="all" element={<Stock />} />
            </Route>
            <Route path="purchase">
              <Route path="view" element={<PurchaseView />} />
              <Route path="all" element={<PurchaseAll />} />
              <Route path="create" element={<PurchaseCreate />} />
              <Route path="detail/:id" element={<PurchaseDetail />} />
            </Route>
            <Route path="products">
              <Route path="all" element={<ProductsAll />} />
              <Route path="create" element={<ProductsCreate />} />
              <Route path="edit/:id" element={<ProductsEdit />} />
              <Route path="detail/:id" element={<ProductDetails />} />
            </Route>
            <Route path="categorys">
              <Route path="all" element={<CategoryAll />} />
              <Route path="create" element={<CategoryCreate />} />
              <Route path="edit/:id" element={<CategoryEdit />} />
              <Route path="detail/:id" element={<CategoryDetail />} />
            </Route>
            <Route path="partners">
              <Route path="all" element={<PartnerAll />} />
              <Route path="create" element={<PartnerCreate />} />
              <Route path="edit/:id" element={<PartnerEdit />} />
              <Route path="detail/:id" element={<PartnerDetail />} />
            </Route>
            <Route path="customers">
              <Route path="all" element={<Customer />} />
              <Route path="vendors" element={<Vendors />} />
            </Route>
            <Route path="locations">
              <Route path="all" element={<LocationAll />} />
              <Route path="create" element={<LocationCreate />} />
              <Route path="edit/:id" element={<LocationEdit />} />
              <Route path="detail/:id" element={<LocationDetail />} />
            </Route>
            <Route path="saleorders">
              <Route path="all" element={<SaleOrderAll />} />
              <Route path="view" element={<View />} />
              <Route path="create" element={<SaleOrderCreate />} />
              <Route path="detail/:id" element={<SaleOrderDetail />} />
            </Route>
            <Route path="pos">
              <Route path="all" element={<PosItems />} />
            </Route>
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
