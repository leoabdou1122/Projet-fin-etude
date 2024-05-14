import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';

function Products() {

  const basePath = "C:\\Users\\bouka\\OneDrive\\Bureau\\Projet Fin D'etude\\front-end\\public";
  const { user, loading, error } = useSelector(state => state.userAuth);
  const {product} = useParams()
  const [allProduct, setAllProduct] = useState([])
  const [sort, setSort] = useState()
  useEffect(() => {
    axios.get(`http://localhost:3001/Products/groupe/${product}`)
    .then(res => setAllProduct(res.data))
  }, [])

  const addToCart = async productId => {
    const req = await axios.post(`http://localhost:3001/cart`, {
            UserID: user[0].UserID,
            ProductID: productId,
            Quantity: 1
      },
      { withCredentials: true })
      if (req.data) {
        console.log('Product added')
      }
  }

  const sortProduct = (e) => {
    const value = e.target.value

    if (value === 'default') {
      setAllProduct([...allProduct].sort((a, b) => parseFloat(a.ProductID) - parseFloat(b.ProductID)))
    }else if (value === 'lowToHigh'){
      setAllProduct([...allProduct].sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price)))
    }else if (value === 'highToLow'){
      setAllProduct([...allProduct].sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price)))
    }
  }
  return (
    <>
    <div className='product-page'>
      
      <h2>{product} Products</h2>
      <div className='sort-product'>
      <select name="" id="" onChange={sortProduct}>
        <option value='default'>Default</option>
        <option value='lowToHigh'>Price (low to high)</option>
        <option value='highToLow'>Price (high to low)</option>
      </select>
      </div>
      <div className='all-products'>
          {
            allProduct.map((v) => (
              <div className='product-info' key={v.ProductID}>
                <div className='product-img'>
                  <img src={v.ImageURL.replace(basePath, "")} alt='' />
                </div>
                <div className='product-title'>
                  {v.Name}
                </div>
                <div className='product-price'>
                  {v.Price}$ US
                </div>
                <div className='add-to-cart'>
                  {
                    user 
                    ? <button onClick={() => addToCart(v.ProductID)}>Add To Cart</button> 
                    : <Link to='/signin'><button>Add To Cart</button></Link>
                  }
                </div>
              </div>
            ))
          }
      </div>
    </div>
    </>
  )
}

export default Products;