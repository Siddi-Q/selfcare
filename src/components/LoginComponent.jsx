import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

import '../styles/Shared.css'
import '../styles/LoginComponent.css'
import loginImage from '../images/Login.png'

const loginStyle = {
    position: 'absolute',
    width: '16%',
    height: '50%',
    left: '10%',
    top: '25%'
}
const uInputLoc = {
    position: 'absolute',
    left: '11.5%',
    top: '45%'
}
const pInputLoc = {
    position: 'absolute',
    left: '11.5%',
    top: '58%'
}
const submitLoc = {
    position: 'absolute',
    color: 'transparent',
    width: '4.5%',
    height: '3%',
    left: '20.25%',
    top: '63.5%'
}
const signupLoc = {
    position: 'absolute',
    color: 'transparent',
    left: '12.5%',
    top: '69%',
    width: '2.5vw',
    height: '2vw'
}

function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const history = useHistory();

    const handleEmailChange = event => setEmail(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email, password);
        try {
            await login(email, password);
            console.log("logged in");
            history.push("/home");
        } catch(err) {
            alert("Incoorect username or password!");
            console.log("failed to signin", err.message);
        }
    }
 
    return (
        <div>
            {/* <video autoPlay muted loop id="background" className='bgStyle'>
                <source src={backgroundMp4} type="video/mp4"></source>
            </video> */}
            <img src={loginImage} alt="" style={loginStyle}></img>
            <form onSubmit={handleSubmit}>
                <input required type="email" 
                    onChange={handleEmailChange} value={email} 
                    className='inputClass' style={uInputLoc}>
                </input>
                <input required type="password" 
                    onChange={handlePasswordChange} value={password} 
                    className='inputClass' style={pInputLoc}>
                </input>
                <input type="submit" value='Log In' className='inputClass' style={submitLoc}></input>
            </form>
            <Link to='/signup' className='inputClass' style={signupLoc} />
        </div>
    );
}

export default LoginComponent;