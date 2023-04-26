import { useState } from "react"
import classes from './tickets-form.module.css'

const TicketsForm = () => {

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

    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let temp = [...formState]
        temp[index] = {
            ...temp[index],
            price: +e.target.value
        }
        setFormState(temp)
    }

    const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let temp = [...formState]
        temp[index] = {
            ...temp[index],
            checked: e.target.checked
        }
        setFormState(temp)
    }
    return(
        <div className={classes.tickets}>
            <h2>Tickets Available</h2>
            <form>
                <div>
                    <input onChange={(e) => handleChangeCheck(e, 0)} type="checkbox" checked={formState[0].checked} />
                    <label htmlFor="">{formState[0].type}</label>
                    <input onChange={(e) => handleChangePrice(e, 0)} type="number" min={0} />
                    <p>€</p>
                </div>
                <div>
                    <input onChange={(e) => handleChangeCheck(e, 1)} type="checkbox"  checked={formState[1].checked} />
                    <label htmlFor="">{formState[1].type}</label>
                    <input onChange={(e) => handleChangePrice(e, 1)} type="number" min={0} />
                    <p>€</p>
                </div>
                <div>
                    <input onChange={(e) => handleChangeCheck(e, 2)} type="checkbox"  checked={formState[2].checked} />
                    <label htmlFor="">{formState[2].type}</label>
                    <input onChange={(e) => handleChangePrice(e, 2)} type="number" min={0} />
                    <p>€</p>
                </div>
                <div>
                    <input onChange={(e) => handleChangeCheck(e, 3)} type="checkbox"  checked={formState[3].checked} />
                    <label htmlFor="">{formState[3].type}</label>
                    <input onChange={(e) => handleChangePrice(e, 3)} type="number" min={0} />
                    <p>€</p>
                </div>
            </form>
        </div>
    )
}

export default TicketsForm