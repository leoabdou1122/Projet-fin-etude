import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlus, BsDash, BsTrash3 } from "react-icons/bs";


function Cart() {

  const basePath = "C:\\Users\\bouka\\OneDrive\\Bureau\\Projet Fin D'etude\\front-end\\public";
  const { user, loading, error } = useSelector(state => state.userAuth);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect( () => {
    if(!loading){
      axios.get(`http://localhost:3001/cart/${user[0].UserID}`)
      .then(res => {
        setCart(res.data)
        const total = res.data.reduce((acc, item) => {
          return acc + (parseFloat(item.Price) * item.Quantity);
        }, 0);
        setTotalPrice(total.toFixed(2));
      })
      
    }
    
  }, [user])

  console.log(cart)

  const updatePrice = (c) => {
    let total = 0;
    for (const item of c) {
      total += parseFloat(item.Price) * item.Quantity;
    }
    setTotalPrice(total.toFixed(2));
  }

  const addOneToQuantity = async (cartID) => {
  try {
      const req = await axios.put(`http://localhost:3001/cart/${cartID}/${1}`, {withCredentials: true})
      if(req.data){
        setCart(prevCart => {
          const updatedCart = prevCart.map(item => {
            if (item.CartID === cartID) {
              return { ...item, Quantity: item.Quantity + 1 };
            }
            return item;
          });
          updatePrice(updatedCart);
          return updatedCart;
        });
      }
    }catch (error){
      console.log(error)
    }
  }

  const removeOneFromQuantity = async (cartID) => {
    try {
        const req = await axios.put(`http://localhost:3001/cart/${cartID}/${-1}`, {withCredentials: true})
        if(req.data){
          setCart(prevCart => {
          const updatedCart = prevCart.map(item => {
            if (item.CartID === cartID) {
              return { ...item, Quantity: item.Quantity - 1 };
            }
            return item;
          });
          updatePrice(updatedCart);
          return updatedCart;
        });
        }
      }catch (error){
        console.log(error)
      }
  }
  
  const removeProductFromCart = async (cartID, userID) => {
    try {
      const req = await axios.delete(`http://localhost:3001/cart/${cartID}/${userID}`,  {withCredentials: true})
      if(req.data){
        setCart(prevCart => {
          const updatedCart = prevCart.filter(product => !(product.CartID === cartID && product.UserID === userID));
          updatePrice(updatedCart);
          return updatedCart
        });
      }
      
    }catch (error){
      console.log(error)
    }
  }

  

  return (
    <div className='cart-section-page'>
      <div className='cart-page'>
      <div className='product-side'>
        <h3>Shopping Cart ({cart.length})</h3>
        <div className='products-in-cart'>
            {
              cart.map((v, i) => (
                <div className='cart-product-info' key={i}>
                  <div className='product-image'>
                    <img src={v.ImageURL.replace(basePath, "")} alt={v.ProductID} />
                  </div>
                  <div className='title-price-quantity'>
                    <div className='product-title'>{v.Name}</div>
                    <div className='product-price'>{v.Price}$ US</div>
                    <div className='quantity-remove'>
                      <div className='product-quantity'>
                        <button onClick={() => removeOneFromQuantity(v.CartID)}>
                          <BsDash size={22}/>
                        </button>
                        <input type='number' value={v.Quantity} readOnly/>
                        <button onClick={() => addOneToQuantity(v.CartID)}>
                          <BsPlus size={22}/>
                        </button>
                      </div>
                      <div className='remove-product' onClick={() => removeProductFromCart(v.CartID, v.UserID)}>
                      <BsTrash3 />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
        </div>
      </div>
      <div className='paiment-side'>
        <h3>Order summary</h3>
        <div className='subtotal-save'>
            <div className='subtotal'>
              <span>Subtotal</span>
              <span>{totalPrice} $</span>
            </div>
            <div className='save'>
              <span>Saved</span>
              <span>0.00 $</span>
            </div>
        </div>
        <div className='total'>
          <span>Total</span>
          <span>20.50 $</span>
        </div>
        <div className='checkout'>
            <button>Checkout</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Cart;