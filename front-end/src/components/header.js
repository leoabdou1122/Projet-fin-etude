import React, { useEffect, useState } from 'react';
import '../styles/global.css'
import { Link } from 'react-router-dom';
import { BsSearch, BsPersonCircle, BsBag , BsGlobe2, BsFillSunFill } from "react-icons/bs";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
function Header() {
  
  const { user, loading, error } = useSelector(state => state.userAuth);
  const [cart, setCart] = useState([]);
  const [isLogin, setIsLogin] = useState();
  const [mode, setMode] = useState(false);


  useEffect( () => {
    if(!loading){
      axios.get(`http://localhost:3001/cart/${user[0].UserID}`)
      .then(res => setCart(res.data))
    }
    setIsLogin(Cookies.get('isLogin'))
  }, [user, cart])


  const handelMode = () => {
    setMode(!mode);
    // You can set your CSS variables here based on the click event
    document.documentElement.style.setProperty('--p-color', mode ? '#F0F0F0' : '#001F3F');
    document.documentElement.style.setProperty('--s-color', mode ? '#ad1f50' : '#FFD700');
    document.documentElement.style.setProperty('--text-p-color', mode ? '#333333' : '#FFFFFF');
    document.documentElement.style.setProperty('--t-color', mode ? '#e0e0e0' : '#013066');
  };

  return (
    
    <header>
      <div className='logo'>
        <Link to='/'>Logo</Link>
      </div>
      <div className="search-input">
        <input type="text" name="" id="" placeholder='Enter your search terms'/>
        <button>
          <BsSearch size={20}/>
        </button>
      </div>
      <div className='user-account'>
        <div className='user-icon'>
        <BsPersonCircle  size={30}/>
        </div>
        <div className='user-text'>
          <div>Hello</div>
          <div>
            {user ? <Link to='/profile' className='user-name'>{user[0].FirstName}</Link>: <Link to='/signIn'>Sign in</Link>}
          </div>
        </div>
      </div>
      <div className='clb-icons'>
        <div className='user-cart' data-value={cart.length}>
          <Link to={isLogin ? '/cart' : '/signin'}>
          <BsBag size={25}/>
          </Link>
        </div>
        <div className='langue'>
          <BsGlobe2 size={20}/>
          <span>English</span>
        </div>
        <div className='browser-mode' onClick={handelMode}>
          <BsFillSunFill size={20} />
        </div>
      </div>
    </header>
  )
}

export default Header;