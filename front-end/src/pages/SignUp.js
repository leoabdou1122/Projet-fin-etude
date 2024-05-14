import React, { useState } from 'react'
import SignUpForm from '../components/SignUpForm';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../redux/slices/userSlices';
import { useEffect } from 'react';
import SignUpSucces from '../components/signUpSucces';
import { animate, motion } from "framer-motion";
import Loading from '../components/loading';


function SignUp() {

  const [signUpSucces, setSignUpSucces] = useState(false)
  const dispatch = useDispatch();
  const {data , loading , error} = useSelector(state => state.userData)



    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch])

  const closeMsg = () => {
    setSignUpSucces(false)
    animate('form', {filter: "blur(0px)"})
  }

  const handleSignUp = async (userData) => {
    axios.post('http://localhost:3001/user/register', userData)
    .then(() => {
      dispatch(fetchUserData());
      setSignUpSucces(true)
      animate('form', {filter: "blur(10px)"})
    }).catch(error => {
      console.error("Registration failed:", error);
    });
  };
    
  return (
    <div className='sign-up-page'>
      <SignUpForm sendData={handleSignUp} data={data}/>
      {signUpSucces && <SignUpSucces onButtonClick={closeMsg}/>}
      {loading && <Loading/>}
    </div>
  )
}

export default SignUp;