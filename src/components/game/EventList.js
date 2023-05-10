import React, { useEffect, useState } from 'react'
import { getEvents, deleteEvent, leaveEvent, joinEvent } from '../../managers/EventManager.js'
import { useNavigate, Link } from 'react-router-dom'



export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents()
        .then(data => 
            setEvents(data))
    }, [])
    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
            navigate({ pathname: "/events/new" })
        }}
            >Register New Event</button>
            {
                
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                            <div className='event__description'>
                             <h2><Link to={`/events/${event.id}/update`}>{event.description}</Link></h2>
                            </div>
                        <div className="event__date">When: {event.date}</div>
                        <div className="event__time">Time: {event.time}</div>
                        <div className="event__organizer">Host by: {event?.organizer?.full_name}</div>
                        <div className="event__attending">Attending: {event?.attendee?.full_name}</div>
                        <div className="event__game">Playing: {event?.game?.title}</div>
                        <button onClick={() => deleteEvent(event.id)}>Delete</button>
                        {event.joined === true ? (
                            <button onClick={() => leaveEvent(event.id)} >Leave Event</button>
                        ) : (
                            <button onClick={() => joinEvent(event.id)}>Join Event</button>
                        )}
                    </section>
                })
            }
            
        </article>
    )
}
