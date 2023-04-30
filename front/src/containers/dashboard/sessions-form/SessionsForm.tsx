import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import classes from './sessions.module.css'
import { createSession } from "../../../api/events/create-session"


const SessionsForm = () => {

    const {state} = useLocation()
    const {eventId} = state

    const [display, setDisplay] = useState<boolean>(true)

    const [solo, setSolo] = useState<boolean>(false)

    const [startTime, setStartTime] = useState<string>('')

    const changeDisplay = (check: string) => {
        if(check === 'yes'){
            setSolo(true)
        }
        setDisplay(false)
    }

    const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) =>{
        console.log(e.target.value)
    }

    const handleSolo =async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(startTime === ''){
            return
        }

        const data  = await createSession(eventId, startTime)
        console.log(data)
    }

    return display?(
        <div className={classes.sessions}>
            <h2>One Time Event</h2>
            <div className={classes.display}>
                <button onClick={() => changeDisplay('yes')}>Yes</button>
                <button onClick={() => changeDisplay('no')}>No</button>
            </div>
        </div>
    ) : solo? (
        <div className={classes.sessions}>
            <form onSubmit={handleSolo}>
                <label htmlFor="">Start Time</label>
                <input onChange={handleChangeTime} type="time" />             
                <div>
                    <button>Create</button>
                </div>
            </form>           
        </div>
    ) :
    (
        <div>
            multiple
        </div>
    )
}

export default SessionsForm