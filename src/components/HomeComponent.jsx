import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebase';

import { useDocumentDataOnce } from  'react-firebase-hooks/firestore';

function HomeComponent() {
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const [userDoc, loading] = useDocumentDataOnce(db.collection("users").doc(currentUser.uid));

    const handleClick = () => {
        logout();
        history.push('/login');
    }

    if(loading) {
        return <h2>Loading...</h2>
    }
    else {
        return (
            <>
                <h1>Dashboard!</h1>
                <button onClick={handleClick}>Log out</button>
                <h1>Email: {currentUser.email}</h1>
                <h1>Username: {userDoc.username}</h1>
                <h1>First Name: {userDoc.firstName}</h1>
                <h1>Last Name: {userDoc.lastName}</h1>
            </>
        );
    }
}

export default HomeComponent;