import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';
import Slider from '../components/Slider';


function Home({checkLogin}) {

  useEffect(() => {
    checkLogin()
  }, []) 
  



  return (
      <main>
        <Slider/>
      </main>
  )
}

export default Home;