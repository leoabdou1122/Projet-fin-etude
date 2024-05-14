import React from 'react'
import { HashLoader } from 'react-spinners';
import { animate, motion } from "framer-motion";

function Loading() {
  return (
    <motion.div className='loading' initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01]
      }}>
        <HashLoader color="#FFD700" />
    </motion.div>
  )
}

export default Loading;