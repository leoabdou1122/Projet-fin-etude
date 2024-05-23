
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
const ProductDetails = () => {

    const basePath = "C:\\Users\\bouka\\OneDrive\\Bureau\\Projet Fin D'etude\\front-end\\public";
    const { productID } = useParams();
    const [products, setProducts] = useState([]);
    const [related, setRelated] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/products/${productID}`);
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching the product:", error);
        }
    };

    const fetchRelatedProducts = async (categoryID) => {
        try {
            const res = await axios.get(`http://localhost:3001/Products/category/${categoryID}`);
            setRelated(res.data);
        } catch (error) {
            console.error("Error fetching related products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [productID]);

    useEffect(() => {
        if (products.length > 0) {
            const categoryID = products[0].CategoryID;
            fetchRelatedProducts(categoryID);
        }
    }, [products]);

    console.log(related);
    // user 
    const { user, loading, error } = useSelector(state => state.userAuth);
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
    return (
        <>
            <section className="py-5 productInfo-page">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                            <img
                                className="card-img-top mb-5 mb-md-0"
                                src={products[0] && products[0].ImageURL.replace(basePath, "")}
                                alt={products[0] && products[0].ImageURL.replace(basePath, "")}
                            />
                        </div>
                        <div className="col-md-6">
                            <h1 className="display-5 fw-bolder">{products[0] && products[0].Name}</h1>
                            <div className="fs-5 mb-5">
                                <span className="text-decoration-line-through">$10.00</span>
                                <span>${products[0] && products[0].Price}</span>
                            </div>
                            <p className="lead">
                                {products[0] && products[0].Description}
                            </p>
                            <div className="d-flex">
                                <input
                                    className="form-control text-center me-2"
                                    id="inputQuantity"
                                    type="num"
                                    defaultValue={1}
                                    style={{ maxWidth: "3rem" }}
                                />
                                <div className='add-to-cart'>
                                    {
                                        user
                                            ? <button onClick={() => addToCart(productID)} className='add-to-cart-product'>Add To Cart</button>
                                            : <Link to='/signin'> <button
                                                className="btn btn-outline-dark flex-shrink-0 add-to-cart-product"
                                                type="button"
                                            >
                                                <i className="bi-cart-fill me-1" />
                                                Add to cart
                                            </button></Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5 related-products">
                <div className="container px-4 px-lg-5 mt-5">
                    <h2 className="fw-bolder mb-4">Related products</h2>
                    <div className="row gx-3 gx-lg-3 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {
                            related.length > 0 && related.map(r => {
                                return (
                                    <div className="col mb-5 " key={r.ProductID}>
                                        <div className="card h-100 product">
                                            <img
                                                className="card-img-top"
                                                src={r.ImageURL.replace(basePath, "")}
                                                alt={r.ImageURL.replace(basePath, "")}
                                            />
                                            <div className="card-body p-4">
                                                <div className="text-center">
                                                    <h5 className="fw-bolder">{r.Name}</h5>
                                                    ${r.Price}
                                                </div>
                                            </div>
                                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                                <div className="text-center">
                                                    <a className="btn btn-outline-dark mt-auto" href="#">
                                                        View options
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* <div className="col mb-5">
                            <div className="card h-100">
                                <div
                                    className="badge bg-dark text-white position-absolute"
                                    style={{ top: "0.5rem", right: "0.5rem" }}
                                >
                                    Sale
                                </div>
                                <img
                                    className="card-img-top"
                                    src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                    alt="..."
                                />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">Special Item</h5>
                                        <div className="d-flex justify-content-center small text-warning mb-2">
                                            <div className="bi-star-fill" />
                                            <div className="bi-star-fill" />
                                            <div className="bi-star-fill" />
                                            <div className="bi-star-fill" />
                                            <div className="bi-star-fill" />
                                        </div>
                                        <span className="text-muted text-decoration-line-through">
                                            $20.00
                                        </span>
                                        $18.00
                                    </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <a className="btn btn-outline-dark mt-auto" href="#">
                                            Add to cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col mb-5">
                            <div className="card h-100">
                                <div
                                    className="badge bg-dark text-white position-absolute"
                                    style={{ top: "0.5rem", right: "0.5rem" }}
                                >
                                    Sale
                                </div>
                                <img
                                    className="card-img-top"
                                    src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                    alt="..."
                                />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">Sale Item</h5>
                                        <span className="text-muted text-decoration-line-through">
                                            $50.00
                                        </span>
                                        $25.00
                                    </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <a className="btn btn-outline-dark mt-auto" href="#">
                                            Add to cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col mb-5">
                            <div className="card h-100">
                                <img
                                    className="card-img-top"
                                    src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                    alt="..."
                                />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">Popular Item</h5>
                                        <div className="d-flex justify-content-center small text-warning mb-2">
                                            <div className="bi-star-fill" />
                                            <div className="bi-star-fill" />
                                            <div className="bi-star-fill" />
                                            <div className="bi-star-fill" />
                                            <div className="bi-star-fill" />
                                        </div>
                                        $40.00
                                    </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <a className="btn btn-outline-dark mt-auto" href="#">
                                            Add to cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </>

    );
};

export default ProductDetails;
