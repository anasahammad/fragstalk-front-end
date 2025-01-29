import { createBrowserRouter } from "react-router-dom";
import ProductDetails from "../components/Details/ProductDetails";
import CheckoutPage from "../components/Checkout/CheckoutPage";
import Main from "../layouts/Main";
import Home from "../components/Home/Home";
import HelpCenter from "../Page/HelpCenter";
import ContactPage from "../Page/ContactPage";
import Login from "../Page/Login";
import UserDashboard from "../layouts/UserDashboard";
import Orders from "../Page/UsersPage/Orders";
import ProfilePage from "../Page/UsersPage/ProfilePage";
import AdminDashboard from "../layouts/AdminDashboard";
import AddProductPage from "../Page/AdminPage/AddProductPage";
import CategoryPage from "../Page/AdminPage/CategoryPage";
import AllOrdersPage from "../Page/AdminPage/AllOrdersPage";
import OrderDetailsPage from "../Page/AdminPage/OrderDetailsPage";
import AllProductsPage from "../Page/AdminPage/AllProductsPage";
import UpdateProductPage from "../Page/AdminPage/UpdateProductPage";
import AdminDashboardPage from "../Page/AdminPage/AdminDashboardPage";
import Brands from "../Page/AdminPage/Brands";
import AromaManagement from "../Page/AdminPage/AromaManagement";
import ReviewManagementPage from "../Page/AdminPage/ReviewManagementPage";
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/productdetails/:id", element: <ProductDetails /> },
      { path: "/checkout", element: <CheckoutPage /> },
      {path:"/page/helpcenter", element:<HelpCenter/> },
      {path:"/page/contactus", element:<ContactPage/>},
      {path:"/page/login", element:<Login/> }
    ],
  },
  {
    path: "/user",
    element: <UserDashboard />,
    children: [
      { path: "/user/orders", element: <Orders /> },
      { path: "/user/profile", element: <ProfilePage /> },
     
    ],
  },

  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      { path: "/admin", element: <AdminDashboardPage /> },
      { path: "/admin/add-product", element: <AddProductPage /> },
      { path: "/admin/category", element: <CategoryPage /> },
      { path: "/admin/brand", element: <Brands /> },
      { path: "/admin/aroma", element: <AromaManagement /> },
      { path: "/admin/reviews", element: <ReviewManagementPage /> },
      { path: "/admin/all-orders", element: <AllOrdersPage /> },
      { path: "/admin/orders/:id", element: <OrderDetailsPage /> },
      { path: "/admin/all-products", element: <AllProductsPage /> },
      { path: "/admin/products/:id/edit", element: <UpdateProductPage /> },
     
    ],
  },
]);

export default router;
