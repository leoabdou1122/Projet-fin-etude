import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { validateName, validateEmail, validatePassword, validatePasswordMatch, validatePhoneNumber } from '../utils/formValidation';
import { animate, motion } from "framer-motion";


function SignUpForm({sendData, data}) {

    const [firstName, setFirstName] = useState({
        value : '',
        errorMsg : null
    })
    const [lastName, setLastName] = useState({
        value : '',
        errorMsg : null
    })
    const [email, setEmail] = useState({
        value : '',
        errorMsg : null
    })
    const [phoneNumber, setPhoneNumber] = useState({
        value : '',
        errorMsg : null
    })
    const [password, setPassword] = useState({
        value : '',
        showPassword: false,
        errorMsg : null
    })
    const [cpassword, setCpassword] = useState({
        value : '',
        showPassword: false,
        errorMsg : null
    })

    const showPassword = () => {
      setPassword({...password, showPassword : !password.showPassword})
    }
    
    const showCpassword = () => {
      setCpassword({...cpassword, showPassword : !cpassword.showPassword})
    }
    
    const handelChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        switch (name) {
            case 'firstName':
                setFirstName({...firstName, value : value})
                break;
            case 'lastName':
                setLastName({...lastName, value : value})
                break;
            case 'email':
                setEmail({...email, value : value})
                break;
            case 'phoneNumber':
                setPhoneNumber({...phoneNumber, value : value})
                break;
            case 'password':
                setPassword({...password, value : value})
                break;
            case 'cpassword':
                setCpassword({...cpassword, value : value})
                break;
            default :

        }
    }

    const handelSubmit = (event) => {
        event.preventDefault();

        const firstnameError = validateName(firstName.value);
        const lastnameError = validateName(lastName.value);
        const emailError = validateEmail(email.value);
        const phoneNumberError = validatePhoneNumber(phoneNumber.value);
        const passwordError = validatePassword(password.value);
        const cpasswordError = validatePassword(cpassword.value);
        const passwordsMatchError = validatePasswordMatch(password.value, cpassword.value);

        setFirstName({...firstName, errorMsg : firstnameError})
        setLastName({...lastName, errorMsg : lastnameError})
        setEmail({...email, errorMsg : emailError})
        setPhoneNumber({...phoneNumber, errorMsg : phoneNumberError})
        setPassword({...password, errorMsg : passwordError})
        setCpassword({...cpassword, errorMsg : cpasswordError})
        setCpassword({...cpassword, errorMsg : passwordsMatchError})

        if (!firstnameError && !lastnameError && !emailError && !phoneNumberError && !passwordError && !cpasswordError && !passwordsMatchError) {
          const isEmailInArray = data.some((user) => user.Email === email.value)

          if (isEmailInArray){
            setEmail({...email, errorMsg : 'This email already existe'})
          }else {
              const userData = {
                "FirstName": firstName.value,
                "LastName": lastName.value,
                "Email": email.value,
                "Password": password.value,
                "PhoneNumber": phoneNumber.value,
              }
              sendData(userData)
            }
        }
    }
  return (
    <motion.form onSubmit={handelSubmit} 
    initial={{ opacity: 0, scale: 0.7 }} 
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01]}} >
        <div className='sign-up-section'>
            <h2>Sign Up</h2>
            <div className='sign-up-form'>
              <div>
                <input type='text' id="fname" name="firstName" value={firstName.value}  placeholder='First name' onChange={handelChange} />
                {firstName.errorMsg && <span className='error-msg'>{firstName.errorMsg}</span>}
              </div>
              <div>
                <input type='text' id="lname" name="lastName" value={lastName.value}  placeholder='Last name' onChange={handelChange}/>
                {lastName.errorMsg && <span className='error-msg'>{lastName.errorMsg}</span>}
              </div>
              <div>
                <input type='text' id="email" name="email" value={email.value} placeholder='Email' onChange={handelChange}/>                
                {email.errorMsg && <span className='error-msg'>{email.errorMsg}</span>}
              </div>
              <div>
                <input type='text' id="phoneNumber" name="phoneNumber" value={phoneNumber.value} placeholder='Phone Number' onChange={handelChange}/>
                {phoneNumber.errorMsg && <span className='error-msg'>{phoneNumber.errorMsg}</span>}
              </div>
              <div>
                <div className='password-input'>
                  <input type={!password.showPassword ? 'password' : 'text'} id="password"  value={password.value} name="password" placeholder='Password' onChange={handelChange}/>
                  {password.showPassword 
                  ? <BsEyeSlash className='showPassword' onClick={showPassword}/> 
                  : <BsEye className='showPassword' onClick={showPassword}/>}
                </div>
                {password.errorMsg && <span className='error-msg'>{password.errorMsg}</span>}
              </div>
              <div>
                <div className='password-input'>
                  <input type={!cpassword.showPassword ? 'password' : 'text'} id="cpassword"  value={cpassword.value} name="cpassword" placeholder='Confirme Password' onChange={handelChange}/>
                  {cpassword.showPassword 
                  ? <BsEyeSlash className='showPassword' onClick={showCpassword}/> 
                  : <BsEye className='showPassword' onClick={showCpassword}/>}
                </div>
                {cpassword.errorMsg && <span className='error-msg'>{cpassword.errorMsg}</span>}
              </div>
              <input type='submit' value='Sign Up' />
              <span>Already have an account? <Link to='/Signin'>Sign in</Link></span>
            </div>
        </div>
    </motion.form>
  )
}

export default SignUpForm;