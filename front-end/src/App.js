import React, { useEffect, useState } from 'react'
import './styles/global.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import SignIn from './pages/SignIn';
import Header from './components/header';
import SignUp from './pages/SignUp';
import Cart from './pages/cart';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthData } from './redux/slices/userAuthSlice';
import Loading from './components/loading';
import { Navigate } from 'react-router-dom';

import FormForTest from './pages/add';
import Test from './pages/groupadd';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import Products from './pages/Products';
import Admin from './pages/admin';
import Container from './pages/container';
import AdminSignin from './pages/AdminSignin';
import AdminPage from './pages/AdminPage';
import AdminDashboard from './pages/AdminDashboard';
import AddProduct from './pages/AddProduct';

function App() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.userAuth);
  const [isLogin, setIsLogin] = useState(Cookies.get('isLogin'))
  const [isLoading, setIsLoading] = useState(true)
  const [admin, setAdmin] = useState(Cookies.get('adminLogin'))

  useEffect(() => {
    dispatch(fetchAuthData())
    setIsLogin(Cookies.get('isLogin')) 
    setAdmin(Cookies.get('adminLogin'))
    console.log(loading)
  }, [dispatch, setIsLogin, setAdmin]);

  
  const handelLoginCheck = () => {
    setIsLogin(Cookies.get('isLogin'))
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Container/>}>
          <Route index element={<Home checkLogin={handelLoginCheck}/>}/>
          <Route path='signIn' element={isLogin  ? <Navigate to="/" replace /> : <SignIn/>}/>
          <Route path='signUp' element={ isLogin  ? <Navigate to="/" replace /> : <SignUp/>} />
          <Route path='cart' element={<Cart/>} />
          <Route path='categories/:category' element={<Categories/>}/>
          <Route path='products/:product' element={<Products/>} />
          <Route path='profile' element={<Profile/>} />
        </Route>

        <Route path='add' element={<FormForTest/>} />
        <Route path='test' element={<Test/>} />
        <Route path='admin'>
          <Route path='panel' element={ admin ? <AdminPage/> : <Navigate to="/admin/signin" replace/>}>
            <Route path='dashboard' element={<AdminDashboard/>}/>
            <Route path='addProduct' element={<AddProduct/>}/>
          </Route>
          <Route path='signin' element={admin ? <Navigate to="/admin/panel/dashboard" replace/> : <AdminSignin/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
