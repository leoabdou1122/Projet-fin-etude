import React, { useState } from 'react'
import { animate, motion } from "framer-motion";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/formValidation';
import axios from 'axios';
import Cookies from 'js-cookie';


function SignInForm({data }) {

    const [email, setEmail] = useState({
        value : '',
        errorMsg : null
    })
    const [password, setPassword] = useState({
        value : '',
        showPassword: false,
        errorMsg : null
    })
    const showPassword = () => {
        setPassword({...password, showPassword : !password.showPassword})
    }

  const handelChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

      switch (name) {
        case 'email':
            setEmail({...email, value : value})
            console.log(value)
            break;
        case 'password':
            setPassword({...password, value : value})
            break;
        default :

    }
  }


  const handelSubmit = async (e) => {
    e.preventDefault();

    const emailError =  validateEmail(email.value);
    const passwordError =  validatePassword(password.value);
    const isEmailInArray =  data.some((user) => user.Email === email.value)

    setEmail({...email, errorMsg : emailError});
    setPassword({...password, errorMsg : passwordError})
    if (!isEmailInArray) {
      setEmail({...email, errorMsg : 'This email is not existe'})
    }
    console.log(email.errorMsg)
    console.log(password.errorMsg)

    if(!emailError && !passwordError){
        
      const userData = {
        "email": email.value,
        "password": password.value,
      }
      try {
        await axios.post('http://localhost:3001/user/login', userData, { withCredentials: true });
       const expirationTimeInDays = 1;
       const expirationDate = new Date();
       expirationDate.setDate(expirationDate.getDate() + expirationTimeInDays);
       Cookies.set('isLogin', true, {
         expires: expirationDate,
         path: '/',
       });
       window.location.reload();
     } catch {
       console.error('password incorect');
       // Handle other potential errors (e.g., network issues)
       setPassword({...password, errorMsg : 'Password Incorrect'})

     }
    }
  }


  return (
    <motion.form initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01]
      }} onSubmit={handelSubmit}>
        <div className='sign-in-section'>
            <h2>Sign In</h2>
            <div className='sign-in-form'>
              <div>
                <input type='text' id="email" name="email" value={email.value} placeholder='Email' onChange={handelChange}/>                
                {email.errorMsg && <span className='error-msg'>{email.errorMsg}</span>}
              </div>
            <div>
              <div className='password-input'>
                <input type={!password.showPassword ? 'password' : 'text'} id="password" value={password.value}   name="password" placeholder='Password' onChange={handelChange}/>
                {password.showPassword 
                  ? <BsEyeSlash className='showPassword' onClick={showPassword}/> 
                  : <BsEye className='showPassword' onClick={showPassword}/>}
              </div>
              {password.errorMsg && <span className='error-msg'>{password.errorMsg}</span>}
            </div>
            <span>Forgot your password?</span>
            <input type='submit' value='Sign in'/>
            <span className='goToSignUP'>Don't have an account? <Link to='/signUp'>Sign Up</Link></span>
          </div>
        </div>
      </motion.form>
  )
}

export default SignInForm;