import React from 'react'
import { animate, motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { BsCheck2Square, BsXLg } from "react-icons/bs";

function SignUpSucces({onButtonClick}) {
  return (
    <motion.div 
    initial={{ opacity: 0}} 
    animate={{ opacity: 1}} 
      transition={{
        duration: 0.8,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01]
      }} className='sigh-up-succes-component' >
            <div  className='close-icon' onClick={onButtonClick}>
                <BsXLg size={25} onClick={onButtonClick}/>
            </div>
          <div className='succes-icon'>
          <BsCheck2Square size={110}/>
          </div>
          <div className='msg'>
              <div>You Have Sign Up an Account Successfully.</div>
              <div>Now you can Log in to your Account.</div>
              <button className='sign-in-btn'>
                <Link to='/signin'>Log In</Link>
              </button>
          </div>
          
</motion.div>
  )
}

export default SignUpSucces;