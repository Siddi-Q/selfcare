import React, { useState } from 'react';
import { useDocumentData, useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/firestore';

import '../styles/Shared.css'
import '../styles/LoginComponent.css'
import '../styles/ChatComponent.css'
import chatUI from '../images/chatUI.png'

const UIStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%'
}
const messageInputLoc = {
    position: 'absolute',
    width: '59%',
    height: '3%',
    bottom: '15.75%',
    color: 'black',
    left: '28.5%'
}
const sendBtnLoc = {
    position: 'absolute',
    color: 'transparent',
    width: '7%',
    height: '7.5%',
    bottom: '14%',
    right: '4%'
}
const leaveBtnLoc = {
    position: 'absolute',
    width: '10%',
    height: '7.5%',
    top: '6%',
    right: '2.5%'
}
const listLoc ={
    position: 'absolute',
    top: '20%',
    left: '4%'
}
const chatBoxStyle = {
    position:'absolute',
    overflow: 'auto',
    wordWrap: 'break-word',
    width: '70%',
    maxWidth: '70%',
    height: '63%',
    top: '10%',
    right: '3.5%'
}

function ChatComponent(props) {
    const { currentUser } = useAuth();
    const [messageDoc, loading] = useDocumentData(db.collection("chats").doc(props.match.params.id));
    const [userDoc, loadingUserDoc] = useDocumentDataOnce(db.collection("users").doc(currentUser.uid));
    const [message, setMessage] = useState('');
    const history = useHistory();

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const leave = () => { 
        history.push('/home');
     }

    const send = async () => { 
        await db.collection("chats").doc(props.match.params.id).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                member_id: currentUser.uid,
                member_username: userDoc.username,
                message: message
            })
        });
        setMessage('');
    }

    if(loading || loadingUserDoc) {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            {/* <video autoPlay muted loop id="background" className='bgStyle'>
                <source src={background} type="video/mp4"></source>
            </video> */}
            <img src={chatUI} alt="" style={UIStyle}></img>
            <input type="text" value={message} onChange={handleMessageChange} className='inputClass' style={messageInputLoc} ></input>
            <input type="reset" onClick={send} className='inputClass' style={sendBtnLoc}></input>
            <button onClick={leave} className='inputClass' style={leaveBtnLoc}></button>
            <ul style={listLoc}>
                {messageDoc["members"].map((member, idx) => <li key={idx} className='listItem'> {member["member_username"]} </li>)}
            </ul>
            <p className="listItem" style={chatBoxStyle}>
                {messageDoc["messages"].map((message, idx) => <p key={idx} className='listItem'> {message.message + " - " + message.member_username} </p>)}
            </p>
        </div>
    );
}

export default ChatComponent;

// ********************************************

// import React, { Component } from 'react';
// import './Shared.css'
// import './LoginComponent.css'
// import './ChatComponent.css'
// import background from './resources/background4.mp4';
// import chatUI from './resources/chatUI.png'
// class ChatComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.updateDraftState = this.updateDraftState.bind(this);
//         this.send = this.send.bind(this);
//       }
//     /*State Explanation
//         'message': currently drafted message, see send()
//         'userList': should be String array of usernames currently in the chat room, renders each entry on the left
//         'messageLog': String array chat log of previously sent(and received) messages, will render each entry on the right of webpage
//     */
//     state = { message: "", userList: ["WhosJoe", "Anonymouse"], messageLog: ["Anonymouse: yo who the fuck is joe???", "WhosJoe: shut the fuck up overused joke"]}
//     updateDraftState(e) { this.setState({message: e.target.value}); }

//     ///
//     send(){ alert("Send message function here; Message contents: '"+this.state.message+"'"); //TODO, send the message contents(this.state.message)
//         this.setState({ message: "" });
//     }
    
//     leave(){ alert("Leave function here"); }    //TODO, Route back to dashboard
//     ///

//     populateList(username){
//         return(<li className='listItem'> {username} </li>);
//     }
//     populateChat(message){
//         return(<p className='listItem'> {message} </p>);
//     }
//     submit(e){e.preventDefault();}  //Prevent enter key from sending the "form"(Leads to leaving the page)
//     render() { 
//         const UIStyle = {
//             position: 'absolute',
//             width: '100%',
//             height: '100%'
//         }
//         const messageInputLoc = {
//             position: 'absolute',
//             width: '59%',
//             height: '3%',
//             bottom: '15.75%',
//             color: 'black',
//             left: '28.5%'
//         }
//         const sendBtnLoc = {
//             position: 'absolute',
//             color: 'transparent',
//             width: '7%',
//             height: '7.5%',
//             bottom: '14%',
//             right: '4%'
//         }
//         const leaveBtnLoc = {
//             position: 'absolute',
//             width: '10%',
//             height: '7.5%',
//             top: '6%',
//             right: '2.5%'
//         }
//         const listLoc ={
//             position: 'absolute',
//             top: '20%',
//             left: '4%'
//         }
//         const chatBoxStyle = {
//             position:'absolute',
//             overflow: 'auto',
//             wordWrap: 'break-word',
//             width: '70%',
//             maxWidth: '70%',
//             height: '63%',
//             top: '10%',
//             right: '3.5%'
//         }
//         return ( <div>
//             <video autoPlay muted loop id="background" className='bgStyle'>
//                 <source src={background} type="video/mp4"></source>
//             </video>
//             <img src={chatUI} alt="" style={UIStyle}></img>
//             <form onSubmit={this.submit}>
//                 <input type="text" onChange={this.updateDraftState} className='inputClass' style={messageInputLoc} ></input>
//                 <input type="reset" onClick={() => {this.send()}} className='inputClass' style={sendBtnLoc}></input>
//             </form>
//             <button onClick={this.leave} className='inputClass' style={leaveBtnLoc}></button>
//             <ul style={listLoc}> { this.state.userList.map(this.populateList, this)}</ul>
//             <p className="listItem" style={chatBoxStyle}> {this.state.messageLog.map(this.populateChat, this)} </p>
//         </div> );
//     }
// }
 
// export default ChatComponent;