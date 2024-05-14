import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Navbar() {

  return (
    <div className='category-bar'>
        <div className='category'>
            <div className='category-title'>Categoty: </div>
            <div className='categories'>
                <div><Link to='/categories/7'><span>Accounts</span></Link></div>
                <div><Link to='/categories/8'><span>Gift Carts</span></Link></div>
                <div><Link to='/categories/9'><span>Serial Keys</span></Link></div>
                <div><Link to='/categories/10'><span>Social media</span></Link></div>
            </div>
        </div>
    </div>
  )
}

export default Navbar;