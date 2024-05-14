import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

function AdminPage() {
  return (
    <div className='admin-panel'>
      <div className='admin-panel-navbar'>
        <div className='admin-panel-navbar-link'>
          <NavLink to='dashboard'>
            Dashboard
          </NavLink>
        </div>
        <div className='admin-panel-navbar-link'>
          <NavLink to='addProduct'>Add Product</NavLink>
        </div>
      </div>
      <div className='admin-panel-outlet'>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminPage;