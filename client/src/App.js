import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import About from "./screens/About";
import Contact from "./screens/Contact";
import Policy from "./screens/Policy";
import PageNotFound from "./screens/PageNotFound";
import Register from "./screens/Log&Reg/Register";
import Login from "./screens/Log&Reg/Login";
import Dashboard from "./screens/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./screens/Log&Reg/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./screens/Admin/AdminDashboard";
import CreateCategory from "./screens/Admin/CreateCategory";
import CreateProduct from "./screens/Admin/CreateProduct";
import Orders from "./screens/user/Orders";
import { Profile } from "./screens/user/Profile";
import Products from "./screens/Admin/Products";
import { UpdateProduct } from "./screens/Admin/UpdateProduct";
import Search from "./screens/Search";
import ProductDetails from "./screens/ProductDetails";
import { Categories } from "./screens/Categories";
import CategoryProduct from "./screens/CategoryProduct";
import CartPage from "./screens/CartPage";
import AdminOrders from "./screens/Admin/AdminOrders";
import './styles/home.css';
import './styles/loginOut.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/dashboard" element={< PrivateRoute />} >
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />}></Route>
          <Route path="admin/create-category" element={<CreateCategory />}></Route>
          <Route path="admin/create-product" element={<CreateProduct />}></Route>
          <Route path="admin/products" element={<Products />}></Route>
          <Route path="admin/product/:slug" element={<UpdateProduct />}></Route>
          <Route path="admin/orders" element={<AdminOrders />}></Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
