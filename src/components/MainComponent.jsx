import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebase';

import { useDocumentDataOnce } from  'react-firebase-hooks/firestore';


import '../styles/Shared.css'
import '../styles/MainComponent.css'
import mainImage from '../images/mainUI.png'
import msgIcon from '../images/msgIcon.png'
import goBtn from '../images/goButton.png'
import mainBackground from '../images/background2.mp4'

const mainStyle = {
    position: 'absolute',
    margin: 'auto',
    height: '100%',
    width: '100%'
}
const lButtonLoc = {
    position: 'absolute',
    background: 'transparent',
    color: 'transparent',
    border: 'none',
    width: '10%',
    height: '7%',
    top: '1%',
    right: '5.5%'
}
const ULLoc = {
    position: 'absolute',
    width: '16%',
    maxHeight: '40%',
    overflow: 'auto',
    color: 'white',
    top: '25%',
    left: '10%'
}
const dateLoc ={
    position: 'absolute',
    top: '18%',
    right: '10%'
}
const dayLoc ={
    position: 'absolute',
    fontSize: '2vw',
    top: '14%',
    right: '20%'
}
const cenLoc = {
    position: 'relative',
    fontSize: '2vw',
    display: 'block',
    marginLeft: 'auto',
    top: '25vw'
}
const cenLoc2 = {
    position: 'relative',
    fontSize: '4vw',
    display: 'block',
    marginLeft: 'auto',
    top: '17vw'
}
const notLoc = {
    position: 'absolute',
    top: '11%',
    left: '9%'
}
const mButtonLoc = {
    position: 'absolute',
    background: 'transparent',
    color: 'transparent',
    border: 'none',
    width: '3%',
    height: '6%',
    top: '11%',
    left: '34%'
}
const selectStyle = {
    position: 'absolute',
    background: 'transparent',
    textAlign: 'center',
    border: 'none',
    fontSize: '1.5vw',
    fontFamily: 'cursive',
    color: 'white',
    width: '20%',
    height: '5%',
    top: '73%',
    left: '9%'
}
const scheduleBtnStyle = {
    position: 'absolute',
    background: 'transparent',
    border: 'none',
    width: '8%',
    height: '14%',
    bottom: '14%',
    left: '15%'
}

const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const retrieveDate = () => { var t = new Date(); return (Months[t.getMonth()])+" "+t.getDate(); }
const retrieveDay = () => { var t = new Date(); return ( Days[t.getDay()]); }

const retrieveTime = () => { 
    var t = new Date(); var m = ""+t.getMinutes();  //TODO, Clock is not live; Records time at the time page is accessed
    if(m.length<2) m="0"+m;
    return ( t.getHours()+":"+m); 
}

const topics = ["Meditation", "Exercise", "Chat", "Nap", "Eat"]

function MainComponent() {
    const [selectedTopic, setSelectedTopic] = useState(topics[0]);
    const { currentUser, logout } = useAuth();
    const [userDoc, loading] = useDocumentDataOnce(db.collection("users").doc(currentUser.uid));
    const history = useHistory();

    const retrieveGreeting = () => { return "Hello, "+ userDoc.username; }

    const handleLogoutClick = () => {
        logout();
        history.push('/login');
    }
    
    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.vale);
    }

    const startChat = (name) => { 
        // alert("Start chat function, with "+name); 
        history.push('/chats/7pZoVO41Vs6ZvBnl8AFi');
    } 

    const handleEditSchedule = (event) => {
        alert("Route to calendar component here"); //TODO
    }


    if(loading) {
        return <h2>Loading...</h2>
    }
    else {
        return (
            <div>
                <video autoPlay muted loop id="background" className='bgStyle' style={{width:'100%',height:'100%',objectFit:'cover'}}>
                    <source src={mainBackground} type="video/mp4"></source>
                </video>
                <img src={mainImage} alt="" style={mainStyle}></img>
                <button onClick={handleLogoutClick} style={lButtonLoc}>Log out</button>
                <ul style={ULLoc}>
                    {userDoc.contacts && userDoc.contacts.map((contact, idx) => {
                        return (
                            <li key={idx}>
                                <button className='buttonStyle' 
                                    onClick={() => startChat(contact)}> 
                                    {contact} 
                                </button>
                                <input type="image" src={msgIcon} alt="" className='icon' 
                                    onClick={() => startChat(contact)}>
                                </input>
                            </li>
                        );
                    })}
                </ul>
                <label className='calStyle' style={dateLoc}> {retrieveDate()} </label>
                <label className='calStyle' style={dayLoc}> {retrieveDay()} </label>
                <label className='calStyle' style={cenLoc}> {retrieveGreeting()} </label>
                <label className='calStyle' style={cenLoc2}> {retrieveTime()} </label>
                <label className='notification' style={notLoc}> Your next meeting is in 7 days </label>
                <button onClick={handleEditSchedule} style={scheduleBtnStyle}></button>
                {/* <label className='notification' style={notLoc}> {this.retrieveNotifications()} </label> */}
                {/*
                <select onChange={handleTopicChange} value={selectedTopic} style={selectStyle}>
                        {topics.map((topic, idx) => <option key={idx} value={topic} className='selectOption'>{topic}</option> )}
                </select>*/}
                {/* { this.state.meeting ? <div><img src={goBtn} style={mButtonLoc}></img><button onClick={this.startMeeting} style={mButtonLoc}>Go</button></div> : null} */}
            </div>
        );
    }
}

export default MainComponent;

// ******************************
 
//     /*State Explanations
//         'currUser': should be username of currently logged in user, will render on the greeting
//         'meeting': temporary boolean value for whether a meeting is occurring right now; 'true' makes the 'Go to group meeting' button render on the page => See retrieveNotifications()
//         'topics': String array for dropdown menu; List of the types of help; Will render each topic on the dropdown menu
//         'userTopic': What topic the user has saved as the type of help they are seeking, for showing default selected choice in dropdown menu
//         'contacts': String array of usernames the user has added, will render each entry on the left
//     */
//     state = { currUser: 'default user', meeting: true, topics: ["Group Meditation", "Group Mediation"], userTopic: "", contacts: ["Bob", "Joe"] }

//     startMeeting(){ alert("Start meeting function here"); } //TODO, Route to (group) chat
//     ///

//     retrieveNotifications(){    
//         //TODO, would grab nearest meeting date from database and check if meeting is occurring now; Change this.setState{ meeting: true } if so => will show meeting button

//         if(this.state.meeting){
//             return "Your next meeting is now!"
//         }
//         else
//             return "Your next meeting is in..." //TODO, difference between current date and date of meeting goes here
//     }
//     ///

//         //TODO: Add dropdown menu for type of help sought after
//         return ( <div>
//             {/* <video autoPlay muted loop id="background" className='bgStyle'>
//                 <source src={backgroundMp4} type="video/mp4"></source>
//             </video> */}
//             <img src={mainImage} alt="" style={mainStyle}></img>
//             <button onClick={this.logOut} style={lButtonLoc}>Log out</button>
//             <ul style={ULLoc}> { this.state.contacts.map(this.populateList, this)}</ul>
//             <label className='calStyle' style={dateLoc}> {this.retrieveDate()} </label>
//             <label className='calStyle' style={dayLoc}> {this.retrieveDay()} </label>
//             <label className='calStyle' style={cenLoc}> {this.retrieveGreeting()} </label>
//             <label className='calStyle' style={cenLoc2}> {this.retrieveTime()} </label>
//             <label className='notification' style={notLoc}> {this.retrieveNotifications()} </label>
//             <select onChange={this.updateTopicState} style={selectStyle}> { this.state.topics.map(this.populateTopics, this) } </select>
//             { this.state.meeting ? <div><img src={goBtn} style={mButtonLoc}></img><button onClick={this.startMeeting} style={mButtonLoc}>Go</button></div> : null}
//         </div> );
//     }
// }
 
// export default MainComponent;