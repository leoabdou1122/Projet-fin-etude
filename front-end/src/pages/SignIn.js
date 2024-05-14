import React from 'react'
import SignInForm from '../components/SignInForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../redux/slices/userSlices';
import { useEffect } from 'react';
import Loading from '../components/loading';

function SignIn() {
  
  const dispatch = useDispatch();
  const {data , loading , error} = useSelector(state => state.userData)

    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch])
  
    
  return (
    <div className='sign-in-page'>
      <SignInForm data={data} />
      {loading && <Loading/>}
    </div>
  )
}

export default SignIn;