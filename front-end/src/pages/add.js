import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function FormForTest() {
    const [categoryName, setCategoryName] = useState('')
    const [categoryData, setCategoryData] = useState([])
    const handelCategory = async e => {
        e.preventDefault()
        const req = await axios.post('http://localhost:3001/category', { "CategoryName": categoryName }, { withCredentials: true })
        if (req.data) {
            console.log('Category get ADD')
        }
    }
    // get all category : 
    const fetchCategory = async () => {
        try {
            const res = await axios.get('http://localhost:3001/category', { withCredentials: true });
            setCategoryData(res.data);
        } catch (error) {
            console.error('Error while fetching categories:', error);
        }
    };

    // groupes : 
    const [groupName, setGroupName] = useState('')
    const [groupImage, setGroupImage] = useState('')
    const [categoryID, setCategoryID] = useState('')
    const [groupData, setGroupData] = useState([])
   /* const handelGroup = async e => {
        e.preventDefault()
        const formData = new FormData();

        formData.append('Name', groupName);
        formData.append('ImageURL', groupImage);
        formData.append('CategoryID', categoryID);
   

        try {
            const req = await axios.post('http://localhost:3001/groupes/createGroupe', formData, {
                withCredentials: true
            }); 
            if (req.data) {
                console.log('Groupe get ADD')
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }*/
    // get all groupe : 
    const fetchGroup = async () => {
        try {
            const res = await axios.get('http://localhost:3001/groupes/allGroup', { withCredentials: true });
            setGroupData(res.data);
        } catch (error) {
            console.error('Error while fetching groups:', error);
        }
    };
    const fetchData = async () => {
        try {
            // Await the completion of fetchCategory
            await fetchCategory();

            // Await the completion of fetchGroupe
            await fetchGroup();

            // Handle categoryResponse and groupeResponse as needed
        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Call fetchData when the component mounts
        fetchData();
    });
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [productImage, setProductImage] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productStock, setProductStock] = useState('')
    const [groupID, setGroupID] = useState('')
    // products : 
    // const haldelProducts = async e => {
    //     e.preventDefault()
    //     const req = await axios.post('http://localhost:3001/Products',
    //         {
    //             Name: productName,
    //             Description: productDescription,
    //             ImageURL: productImage,
    //             Price: productPrice,
    //             StockQuantity: productStock,
    //             CategoryID: categoryID,
    //             GroupeID: groupID
    //         },
    //         { withCredentials: true })
    //     if (req.data) {
    //         console.log('Product get ADD')
    //     }
    // }
    const haldelProducts = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', productImage); // Append the image file to FormData

        formData.append('Name', productName);
        formData.append('Description', productDescription);
        formData.append('Price', productPrice);
        formData.append('StockQuantity', productStock);
        formData.append('CategoryID', categoryID);
        formData.append('GroupeID', groupID);

        try {
            const req = await axios.post('http://localhost:3001/Products', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                }
            });

            if (req.data) {
                console.log('Product added successfully');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }

    const haldelgroup = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', groupImage); // Append the image file to FormData

        formData.append('Name', groupName);
        
        formData.append('CategoryID', categoryID);

        try {
            const req = await axios.post('http://localhost:3001/groupes/createGroupe', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                }
            });

            if (req.data) {
                console.log('Product added successfully');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }

    return (
        <div>
            <h1>Ctagories : </h1>
            <form action="" onSubmit={handelCategory}>
                <label htmlFor="">Category Name</label>
                <input type="text" name="" id=""
                    onChange={e => setCategoryName(e.target.value)}
                />
                <button>ADD Category</button>
            </form>
            <h1>Groups : </h1>
            <form action="" onSubmit={haldelgroup}>
                <label htmlFor="">Name</label>
                <input type="text" name="" id=""
                    onChange={e => setGroupName(e.target.value)}
                />
                <label htmlFor="">ImageURL</label>
                <input type="file" name="image" id=""
                    onChange={e => setGroupImage(e.target.files[0])}
                />
                <label htmlFor="">CategoryID</label>
                <select name="" id=""
                    onChange={e => setCategoryID(e.target.value)}
                >
                    <option>choose Category ...</option>
                    {
                        categoryData.map(category => {
                            return (
                                <option value={category.CategoryID} key={category.CategoryID}>{category.CategoryName}</option>
                            )
                        })
                    }
                </select>
                <button>ADD Group</button>
            </form>
            <h1>Products :</h1>
            <form action="" onSubmit={haldelProducts} encType='multipart/form-data'>
                <label htmlFor="">Name</label>
                <input type="text"
                    onChange={e => setProductName(e.target.value)}
                />

                <label htmlFor="">Description</label>
                <input type="text"
                    onChange={e => setProductDescription(e.target.value)}
                />

                <label htmlFor="">ImageURL</label>
                <input type="file"
                    name="image"
                    onChange={e => setProductImage(e.target.files[0])}
                />

                <label htmlFor="">Price</label>
                <input type="number"
                    onChange={e => setProductPrice(e.target.value)}
                />

                <label htmlFor="">Stock</label>
                <input type="number"
                    onChange={e => setProductStock(e.target.value)}
                />

                <label htmlFor="">CategoryID</label>
                <select name="" id=""
                    onChange={e => setCategoryID(e.target.value)}
                >
                    <option>choose Category ...</option>
                    {
                        categoryData.map(category => {
                            return (
                                <option value={category.CategoryID} key={category.CategoryID}>{category.CategoryName}</option>
                            )
                        })
                    }
                </select>

                <label htmlFor="">GrouprID</label>
                <select name="" id=""
                    onChange={e => setGroupID(e.target.value)}
                >
                    <option>choose Groupe ...</option>
                    {
                        groupData.map(group => {
                            return (
                                <option value={group.GroupeID} key={group.GroupeID}>{group.Name}</option>
                            )
                        })
                    }
                </select>

                <button>ADD Products</button>
            </form>
        </div>
    )
}
