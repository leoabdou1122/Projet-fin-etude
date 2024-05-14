import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Test() {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState(7);

    const haldelProducts = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image); // Append the image file to FormData

        formData.append('Name', name);
        
        formData.append('CategoryID', category);

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
            <form onSubmit={haldelProducts}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />

                <label htmlFor="image">Image</label>
                <input type="file" id="image" onChange={e => setImage(e.target.files[0])} />


                <button type="submit">Submit</button>
            </form>
        </div>
    );
}