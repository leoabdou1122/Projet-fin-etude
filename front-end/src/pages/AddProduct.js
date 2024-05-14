import axios from 'axios';
import React, { useEffect, useState } from 'react'

function AddProduct() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/products')
    .then(res => setProducts(res.data))
  }, [])

  console.log(products)
  return (
    <div className='addproduct-page'>
      <h2>Add Product</h2>
      <div className='add-product-form'>
        <div className='add-product-form-title'>Add new Product :</div>
      </div>
      <div className='list-of-all-product'>
        <div className='list-of-all-product-title'>Products List :</div>
        <table className='list-of-all-product-table'>
          <tr>
            <td>Product ID</td>
            <td>Product Name</td>
            <td>Product Price</td>
            <td>Category</td>
            <td>Groupe</td>
            <td>Modify</td>
            <td>Remove</td>
          </tr>
          {
            products.length !== 0
            &&
            products.map((v, i) => (
              <tr>
                <td>{v.ProductID}</td>
                <td>{v.Name}</td>
                <td>{v.Price}</td>
                <td>{v.CategoryName}</td>
                <td>{v.groupeName}</td>
                <td><button className='modify-btn'>Modify</button></td>
                <td><button className='remove-btn'>Remove</button></td>
              </tr>
            ))
          }
        </table>
      </div>
    </div>
  )
}

export default AddProduct;