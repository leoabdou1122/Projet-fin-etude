import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';
function Category() {

    const basePath = "C:\\Users\\bouka\\OneDrive\\Bureau\\Projet Fin D'etude\\front-end\\public";
    const { category } = useParams()
    const [categoryInfo, setCategoryInfo] = useState([])
    const [group, setGroup] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3001/category/${category}`)
        .then(res => setCategoryInfo(res.data[0]))
        axios.get(`http://localhost:3001/groupes/groupByCategoryId/${category}`)
        .then(res => setGroup(res.data))
    }, [category])

    

  return (
    
    <div className='account-page' >
        <h2>{categoryInfo.CategoryName} Category</h2>
        <div className='account-products' >
            {
                group.map((v, i) => (
                    <Link to={`/products/${v.Name}`} key={v.GroupeID} >
                        <motion.div className='product' initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.4}}
                            >
                            <div className='product-img'>
                                <img src={v.ImageURL.replace(basePath, "")} alt={v.Name} width='150px' height='150px'/>
                            </div>
                            <div className='product-title'>
                                {v.Name}
                            </div>
                        </motion.div>
                    </Link>
                ))
            }
        </div>
    </div>
    
  )
}

export default Category;