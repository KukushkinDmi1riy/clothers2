import React, {useState} from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';


import { SignInContainer, SignInTitle, ButtonsBarContainer} from './sign-in.styles'

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'

// import './sign-in.styles.scss'

const SignIn = ({googleSignInStart, emailSignInStart}) =>  {

    const [userCredentials, setCredetials] = useState({email: '', password: ''})

    const {email, password} = userCredentials
   
   const handleSubmit = async (event) => {
        event.preventDefault()
        emailSignInStart(email, password)
    }

    const handleChange = (event) => {
        const {value, name} = event.target;
        setCredetials({...userCredentials, [name]: value})
    }

        return (
            <SignInContainer>
                <SignInTitle>I already have an account</SignInTitle>
                <span>Sign in with your email and password</span>

                    <form onSubmit={handleSubmit}>
                        <FormInput 
                            handleChange={handleChange}
                            name="email"
                            type="email"
                            value={email} 
                            label="email"
                            required />
                        
                        <FormInput 
                            handleChange={handleChange}
                            name="password"
                            type="password" 
                            value={password} 
                            label="password"
                            required/>
                        
                            <ButtonsBarContainer>
                            <CustomButton type="submit"> SIGN IN</CustomButton>
                            <CustomButton type="button" onClick = {googleSignInStart} isGoogleSignIn> SIGN IN with Google</CustomButton>
                            </ButtonsBarContainer>
                          
                        
                    </form>

            </SignInContainer>
        )
    }

const mapDispatchToProps = (dispatch)=> ({
    googleSignInStart: ()=> dispatch(googleSignInStart()),
    emailSignInStart: (email, password)=>dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);