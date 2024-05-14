import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import Navbar from '../components/Navbar';

function Container() {
  return (
    <>
        <Header/>
        <Navbar/>
        <Outlet/>
    </>
  )
}

export default Container;