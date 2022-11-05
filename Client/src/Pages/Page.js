import { Navigate, Route, Routes } from "react-router";
import Favorite_Products from "./Favorite_Products/Favorite_Products";
import { useSelector, useDispatch } from "react-redux";

//pages
import Dashboard from "./Dashboard/Dashboard";
import Offer from "./Offer_Manage/Offer";
import SellerProduct from "./Product_Detail_Seller/Product";
import AdminProduct from "./Product_Manage/Product";
import Store from "./Store/Store";
import Stores from "./Stores/Stores";
import RegisterStore from "./Store_Register/RegisterStore";
import CustomerProduct from "./Product_Detail_Customer/ProductDetails";
import Profile from "./Profile/Profile";
import SignUp from "./Signup/Signup";
import Login from "./Login/Login";
import Cart from "./Cart/Cart";
import Checkout from "./Checkout/Checkout";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import OTP from "./ForgotPassword/OTP";
import ResetPassword from "./ForgotPassword/ResetPassword";
import Report from "./Report/Report";
import AboutUs from "./AboutUs/AboutUs";
import CategoryTable from "./Category/CategoryTable";
import NewCategory from "./Category/NewCategory";
import Transaction from "./Transaction/Transaction";
import UserTable from "./Users/UserTable";

function Page() {
  const { token, role, userID } = useSelector((state) => state.loging);

  return (
    <Routes>
      {userID && (
        <>
          <Route path="/" element={<Dashboard />} />
          {role === "admin" && (
            <>
              <Route path="/stores" element={<Stores />} />
              <Route path="/category" element={<CategoryTable />} />
              <Route path="/newCategory/:id" element={<NewCategory />} />
              <Route path="/users" element={<UserTable />} />
            </>
          )}
          {role === "buyer" && (
            <>
              <Route path="/products/view/:id" element={<CustomerProduct />} />
              <Route path="/stores/new" element={<RegisterStore />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/Favorites" element={<Favorite_Products />} />
              <Route path="/checkout" element={<Checkout />} />
            </>
          )}
          {role === "seller" && (
            <>
              <Route path="/stores" element={<RegisterStore />} />
              <Route path="/products/new" element={<AdminProduct />} />
              <Route path="/products/:id/offers" element={<Offer />} />
              <Route path="/products/:id" element={<AdminProduct />} />
              <Route path="/store" element={<Store />} />
              <Route path="/products/view/:id" element={<SellerProduct />} />
            </>
          )}
          <Route path="/profile/:page" element={<Profile />} />
        </>
      )}
      {!userID && (
        <>
          <Route path="/passworForgot" element={<ForgotPassword />} />
          <Route path="/otp/:id" element={<OTP />} />
          <Route path="/passwordReset/:id" element={<ResetPassword />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </>
      )}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/report" element={<Report />} />
      <Route path="/about-us" element={<AboutUs />} />
    </Routes>
  );
}

export default Page;
