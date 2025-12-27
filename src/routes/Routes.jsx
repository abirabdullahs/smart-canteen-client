import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Root from '../Root/Root';
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/Error/ErrorPage';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import AllFood from '../pages/AllFood/AllFood';
import Profile from '../pages/Profile/Profile';
import AdminLogin from '../admin/pages/AdminLogin/AdminLogin';
import AdminDashboard from '../admin/pages/AdminDashboard/AdminDashboard';
import Cart from '../pages/Cart/Cart';
import FoodDetails from '../pages/FoodDetails/FoodDetails';
import Checkout from '../pages/Checkout/Checkout';
import Orders from '../pages/Orders/Orders';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';



export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        index: true,
        Component: Home,
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/signup',
        Component: Signup
      },
      {
        path: '/allfoods',
        Component: AllFood
      },
      {
        path: '/profile',
        Component: Profile
      },
      {
        path: '/admin-login',
        Component: AdminLogin
      },
      {
        path: '/admin-dashboard',
        Component: AdminDashboard
      },
      {
        path: '/cart',
        Component: Cart
      },
      {
        path: '/food/:id',
        Component: FoodDetails
      },
      {
        path: '/checkout',
        Component: Checkout
      },
      {
        path: '/orders',
        Component: Orders
      },
      {
        path:'/forgot-password',
        Component: ForgotPassword
      }
    ]
  },
]);
