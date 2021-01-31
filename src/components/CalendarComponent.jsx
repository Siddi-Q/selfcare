import React, { useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import calendarBackground from '../images/background5.mp4'
import submitButton from '../images/submitButton.png'
import backButton from '../images/backButton.png'
import banner from '../images/calendarBanner.png'
import overlay from '../images/transOverlay.png'

const selectStyle = {
    position: 'relative',
    display: 'block',
    background: 'transparent',
    textAlign: 'center',
    fontSize: '1.5vw',
    fontFamily: 'cursive',
    color: 'black',
    width: '20%',
    height: '5%',
    marginTop: '1vw',
    marginLeft: 'auto',
    marginRight: 'auto'
}
const submitStyle = {
    position: 'relative',
    display: 'block',
    marginTop: '1vw',
    marginLeft: 'auto',
    marginRight: 'auto',
    background: 'transparent',
    textAlign: 'center',
    fontSize: '1.5vw',
    fontFamily: 'cursive',
    width: '20%',
    height: '5%'
}
const backStyle = {
    position: 'absolute',
    background: 'transparent',
    width: '20%',
    height: '5%',
    top: '0%',
    left: '0%'
}
const bannerStyle = {
    position: 'relative',
    display: 'block',
    width: '25%',
    height: '10%',
    marginTop: '1vw',
    marginLeft: 'auto',
    marginRight: 'auto'
}
const overlayStyle = {
    position: 'fixed',
    objectFit: 'cover',
    width: '100%',
    height: '100%'
}

function CalendarComponent(){
    const [calendarWeekends, setCalendarWeekends] = useState(true);
    const [calendarEvents, setCalendarEvents] = useState([]);                               //TODO: Load saved events from database
    const [userTopic, setUserTopic] = useState('');                                         //TODO: Load saved user topic from database
    const [topicsList, setTopicsList] = useState(["Group Meditation", "Group Mediation"]);  //TODO: Load list of topics from database
    const calendarComponentRef = React.createRef();
    const handleDateClick = event => {
        const eventName = prompt('Enter name of event')
        const timeStart = prompt('Enter start time in 24hr format')
        try{
            const newString = timeStart.split(":")
            
            //this.setState({timeStart : timeStart, eventName : eventName})
            //const [timeStart, setTimeStart] = useState(timeStart);
            //const [eventName, setEventName] = useState(eventName);
            const click = event.date
            const year = click.getFullYear()
            const month = click.getMonth()
            const day = click.getDate()
            const hour = newString[0]
            const min = newString[1]
            const clickDay = new Date(year, month, day, hour, min, 0,0)
            /*
            this.setState({
                                            // add new event data
                calendarEvents: calendarEvents.concat({
                                            // creates a new array
                title: eventName,
                start: clickDay,
                allDay: false,
                })
            });*/
            setCalendarEvents(calendarEvents.concat({title: eventName,start: clickDay,allDay: false,}));
        }
        catch(e) { console.log(e); }    //Reaching this means user cancelled enter event info, catch prevents page from crashing
      };
        const populateTopics = (topicName) => {
            if(topicName==userTopic)
                return(<option className='selectOption' value={topicName} selected>{topicName}</option>);
            else
                return(<option className='selectOption' value={topicName}>{topicName}</option>);
        }
        //TODO: Submit button => Save user input and route back to home
        const handleSubmit = (event) => {
            alert("Thanks for submitting");
        }
        //TODO: Back button => Return user to home, don't save changes
        const handleBack = (event) => {
            alert("Back button function");
        }
    return(<div>
        <video autoPlay muted loop id="background" className='bgStyle' style={{width:'100%',height:'100%',objectFit:'cover'}}>
                <source src={calendarBackground} type="video/mp4"></source>
        </video>
        <img src={overlay} alt="" style={overlayStyle} className='bgStyle'></img>
        <img src={banner} alt="" style={bannerStyle}></img>
        <select onChange={setUserTopic} style={selectStyle}> { topicsList.map(populateTopics, this) } </select>
        <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={calendarComponentRef}
            weekends={calendarWeekends}
            events={calendarEvents}
            dateClick={handleDateClick}
          />
        <input type="image" src={backButton} onClick={handleBack} style={backStyle}></input>
        <input type="image" src={submitButton} onClick={handleSubmit} style={submitStyle}></input>
    </div>);
}
export default CalendarComponent;