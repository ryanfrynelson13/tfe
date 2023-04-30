import React, { useState } from "react"
import classes from './tickets-form.module.css'
import { Alert }from '@mui/material'
import { useLocation, useNavigate } from "react-router-dom"
import { createTickets } from "../../../api/events/create-tickets"

const TicketsForm = () => {

    const {state} = useLocation()
    const{eventId} = state

    const navigate = useNavigate()

    const [formState, setFormState] = useState([
        {
            type: 'Adult',
            checked: true,
            price: 0
        },
        {
            type: 'Kid',
            checked: true,
            price: 0
        },
        {
            type: 'Senior',
            checked: true,
            price: 0
        },
        {
            type: 'Handicapped',
            checked: true,
            price: 0
        }
    ])
    const [displayAlert, setDisplayAlert] = useState<boolean>(false)

    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let temp = [...formState]
        temp[index] = {
            ...temp[index],
            price: +e.target.value
        }
        setFormState(temp)
        setDisplayAlert(false)
    }

    const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let temp = [...formState]
        temp[index] = {
            ...temp[index],
            checked: e.target.checked
        }
        setFormState(temp)
        setDisplayAlert(false)
    }

    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        for(const form of formState){
            if(form.checked && form.price <= 0){
                setDisplayAlert(true)
                return
            }
        }

        const res = await createTickets(eventId, formState)

        if(res === 'done'){
            navigate('/event-maker/dashboard/sessions', {state:{eventId}})
        }

    } 
    return(
        <div className={classes.tickets}>
            <h2>Tickets Available</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input onChange={(e) => handleChangeCheck(e, 0)} type="checkbox" checked={formState[0].checked} />
                    <label htmlFor="">{formState[0].type}</label>
                    <input onChange={(e) => handleChangePrice(e, 0)} type="number" value={formState[0]?.price} />
                    <p>€</p>
                </div>
                <div>
                    <input onChange={(e) => handleChangeCheck(e, 1)} type="checkbox"  checked={formState[1].checked} />
                    <label htmlFor="">{formState[1].type}</label>
                    <input onChange={(e) => handleChangePrice(e, 1)} type="number" value={formState[1]?.price} />
                    <p>€</p>
                </div>
                <div>
                    <input onChange={(e) => handleChangeCheck(e, 2)} type="checkbox"  checked={formState[2].checked} />
                    <label htmlFor="">{formState[2].type}</label>
                    <input onChange={(e) => handleChangePrice(e, 2)} type="number" value={formState[2]?.price} />
                    <p>€</p>
                </div>
                <div>
                    <input onChange={(e) => handleChangeCheck(e, 3)} type="checkbox"  checked={formState[3].checked} />
                    <label htmlFor="">{formState[3].type}</label>
                    <input onChange={(e) => handleChangePrice(e, 3)} type="number" value={formState[3]?.price} />
                    <p>€</p>
                </div>
                <div className={classes.proceed}>
                    {displayAlert && <Alert severity="error">'incorrect tickets</Alert>}
                    <button type='submit'>Proceed</button>
                </div>
            </form>
        </div>
    )
}

export default TicketsForm