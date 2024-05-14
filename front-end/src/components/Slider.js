import React, { useState } from 'react'
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";

function Slider() {

    const [images, setImages] = useState([
        {img : 'first.png', alt : 'first'},
        {img : 'second.png', alt : 'second'},
        {img : 'third.png', alt : 'third'}
      ])

    const [isActive, setIsActive] = useState(0)

    const prev = () => {
        if(isActive === 0){
            setIsActive(images.length - 1)
        }else{
            setIsActive(prev => prev - 1)
        }
    }

    const next = () => {
        if(isActive >= images.length - 1){
            setIsActive(0)
        }else{
            setIsActive(prev => prev + 1)
        }
    }

  return (
    <>
    <div className='slider'>
        <div className='images'>
            {
                images.map((v, i) => (
                        <img src={v.img} alt={v.alt} className={(i === isActive) ? 'active' : ''}/>
                ))
            }
        </div>
        <button className='prev' onClick={() => prev()}>
            <BsChevronCompactLeft size={30}/>
        </button>
        <button className='next' onClick={() => next()}>
            <BsChevronCompactRight size={30}/>    
        </button>
    </div>
    </>
  )
}

export default Slider;