import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebase';

import '../styles/Shared.css'
import '../styles/LoginComponent.css'
import signupUI from '../images/signupUI.png'

const signupStyle = {
    position: 'fixed',
    width: '100%',
    height: '100%'
}
const userLoc = {
    position: 'absolute',
    width: '27.5%',
    height: '5%',
    top: '42.5%',
    right: '15%'
}
const passLoc = {
    position: 'absolute',
    width: '27.5%',
    height: '5%',
    top: '58%',
    right: '15%'
}
const fNameLoc = {
    position: 'absolute',
    width: '27.5%',
    height: '5%',
    top: '34%',
    left: '15%'
}
const lNameLoc = {
    position: 'absolute',
    width: '27.5%',
    height: '5%',
    top: '50%',
    left: '15%'
}
const emailLoc = {
    position: 'absolute',
    width: '27.5%',
    height: '5%',
    top: '66.5%',
    left: '15%'
}
const submitLoc = {
    position: 'absolute',
    color: 'transparent',
    width: '23.5%',
    height: '6.5%',
    top: '81%',
    left: '37.5%'
}

function SignupComponent() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signup } = useAuth();
    const history = useHistory();

    const handleUsernameChange = event => setUsername(event.target.value);
    const handleFirstNameChange = event => setFirstName(event.target.value);
    const handleLastNameChange = event => setLastName(event.target.value);
    const handleEmailChange = event => setEmail(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(username, firstName, lastName, email, password);
        try {
            const res = await signup(email, password);
            console.log(res);
            await db.collection("users").doc(res.user.uid).set({
              username,
              firstName,
              lastName
            });
            console.log("signed up");
            history.push("/home");
        } catch(err) {
            console.log("failed to signup!", err.message);
        }
    }

    return (
        <div>
            {/* <video autoPlay muted loop id="background" className='bgStyle'>
                <source src={background} type="video/mp4"></source>
            </video> */}
            <img src={signupUI} alt="" style={signupStyle}></img>
            <form onSubmit={handleSubmit}>
                <input required type="text" 
                    onChange={handleUsernameChange} value={username}
                    className='inputClass' style={userLoc}>
                </input>
                <input required type="password" 
                    onChange={handlePasswordChange} value={password}
                    className='inputClass' style={passLoc}>
                </input>
                <input required type="text" 
                    onChange={handleFirstNameChange} value={firstName}
                    className='inputClass' style={fNameLoc}>
                </input>
                <input required type="text" 
                    onChange={handleLastNameChange} value={lastName}
                    className='inputClass' style={lNameLoc}>
                </input>
                <input required type="email" 
                    onChange={handleEmailChange} value={email}
                    className='inputClass' style={emailLoc}>
                </input>
                <input type="submit" value='Log In' className='inputClass' style={submitLoc}></input>
            </form>
        </div>
    );

}

export default SignupComponent;