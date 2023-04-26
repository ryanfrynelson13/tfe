
import classes from './event-form.module.css'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../../../atoms/user.atom'
import { useEffect, useState } from 'react'
import {LocationType} from '../../../types/locations/location.type'
import useCountries from '../../../hooks/countries/useCountries'
import * as dayjs from 'dayjs'
import { Alert }from '@mui/material'
import axios from 'axios'
import { USERS_URLS } from '../../../enums/users-urls.enum'
import { getToken } from '../../../utils/token.util'
import { createLocation } from '../../../api/events/create-location'
import { useCategories } from '../../../hooks/events/useCategories'
import { createEvent } from '../../../api/events/create-event'
import { useNavigate } from 'react-router-dom'

const EventForm = () => {

    const user = useRecoilValue(userAtom)
    const navigate = useNavigate()

    const {isLoading, countries} = useCountries()
    const {categories} = useCategories()

    const [locations, setLocations] = useState<LocationType[]>([])
    const [currLocation, setCurrLocation] = useState<number | null>(null)

    useEffect(() => {
        if(user){
            setLocations([...user.locations!])
            if(user.locations!.length > 0){
                setCurrLocation(0)
            }
        }
        if(categories.length > 0){
            setCategory(categories[0].id.toString())
        }
    },[])

    useEffect(() => {
        if(currLocation !== null){
            setLocation(locations[currLocation].name ?? '')
            setCountry(locations[currLocation].country ?? '')
            setPostalCode(locations[currLocation].postalCode ?? '')
            setNumber(locations[currLocation].number ?? '')
            setStreet(locations[currLocation].street ?? '')
        } else {
            setLocation('')
            setCountry('Belgium')
            setPostalCode('')
            setNumber('')
            setStreet('')
        }
    },[currLocation])

    const [category, setCategory] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [intro, setIntro] = useState<string>('')
    const [startDate, setStartDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
    const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
    const [duration, setDuration] = useState<string>('5')
    const [places, setPlaces] = useState<string>('1')
    const [description, setDesc] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [country, setCountry] = useState<string>('')
    const [postalCode, setPostalCode] = useState<string>('')
    const [number, setNumber] = useState<string>('')
    const [street, setStreet] = useState<string>('')

    const [errors, setErrors] = useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, setter:React.Dispatch<React.SetStateAction<string>>) => {
        setter(e.target.value)
    }

    const handleStartDate = (e: React.ChangeEvent<HTMLInputElement >) => {
        setStartDate(e.target.value)
        if(dayjs(e.target.value).isAfter(dayjs(endDate))){
            setEndDate(e.target.value)
        }
    }

    const handleEndDate =  (e: React.ChangeEvent<HTMLInputElement >) => {
        setEndDate(e.target.value)
    }

    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(
            title.trim() === ''||
            intro.trim() === '' ||
            description.trim() === ''||
            location.trim() === '' ||
            street.trim() === ''||
            postalCode.trim() === ''||
            number.trim() === ''
        ){
            setErrors('fill in none optional fields')
            return
        }

        if(
            dayjs().isAfter(dayjs(startDate).add(1, 'day')) ||
            dayjs(startDate).isAfter(dayjs(endDate))
        ){
            console.log(dayjs().subtract(1, 'D').isAfter(dayjs(startDate)) )
            setErrors('invalid dates')
            return
        }

        if(+duration < 5){
            setErrors('duration must be at least 5mins')
            return
        }

        if(+places < 1){
            setErrors('no tickets')
            return
        }

        let locationId: number

        if(currLocation !== null){
            locationId = locations[currLocation].id!
        } else {
            const body= {
                name: location,
                country,
                postalCode,
                street,
                number
            }
            
            const data = await createLocation(body)
            locationId = data.id!
        }

        const body = {
            locationId,
            categoryId: +category,
            event: {
                title,
                intro,
                description,
                endDate: dayjs(endDate).toISOString(),
                startDate: dayjs(startDate).toISOString(),
                duration: +duration,
                places: +places
            }
        }
        const data = await createEvent(body)

        console.log(data)
        navigate('tickets', {state: {eventId: data.id}})
        
    }


    const locationsMap = locations.map((location, index) => (
        <option key={index} value={index}>{location.name}</option>
    ))

    const countriesMap = countries?.map((country, index) => (
        <option key={index} value={country}>{country}</option>
    ))

    const categoriesMap = categories?.map(cat => (
        <option key={cat.id} value={cat.id}>{cat.category}</option>
    ))

    return(
        <div className={classes.event}>
            <h2>Create New Event</h2>
            <form onSubmit={handleSubmit}>
                <div className={classes.info}>
                    <h3>Event Info</h3>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input value={title} onChange={(e) => handleChange(e, setTitle)} id='title' type="text" />
                    </div>
                    <div>
                        <label htmlFor="image">Image Url</label>
                        <p className={classes.nb}>*Leave empty if you want a randomly generated picture</p>
                        <input value={image} onChange={(e) => handleChange(e, setImage)} id='image' type="text" />
                    </div>
                    <div>
                        <label htmlFor="intro">Intro</label>
                        <textarea value={intro} onChange={(e) => handleChange(e, setIntro)} className={classes.intro} maxLength={200}  id="intro" />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea value={description} onChange={(e) => handleChange(e, setDesc)} className={classes.desc} id="description" />
                    </div>    
                    <div>
                        <label htmlFor="category">Category</label>
                        <select  onChange={(e) => setCategory(categories.find(cat => cat.id === +e.target.value)?.category ?? '')} id="locations">
                            {categoriesMap}
                        </select>
                    </div>                 
                </div>
              <div className={classes.logistics}>
                <div >
                        <h3>Logistics</h3>
                        <div>
                            <label htmlFor="start-date">Start Date:</label>
                            <input value={startDate} onChange={handleStartDate} min={dayjs().format('YYYY-MM-DD')} id='start-date' type="date" />
                        </div>
                        <div>
                            <label htmlFor="end-date">End Date:</label>
                            <input value={endDate} onChange={handleEndDate} min={startDate} id='end-date' type="date" />
                        </div>
                        <div>
                            <label htmlFor="duration">Duration(in minutes)</label>
                            <input id='duration' value={duration} onChange={(e) => handleChange(e, setDuration)} type="number" min={5} />
                        </div>
                        <div>
                            <label htmlFor="places">Number of available Tickets</label>
                            <input id='places' value={places} onChange={(e) => handleChange(e, setPlaces)} type="number" min={1} />
                        </div>
                    </div>
                    <div>
                        <h3>Location</h3>
                        {
                            locations.length > 0 &&
                            <div>
                                <label htmlFor="locations">Your Locations:</label>
                                <select  onChange={(e) => setCurrLocation(+e.target.value)} id="locations">
                                    {locationsMap}
                                </select>
                            </div>
                        }
                        <div>
                            <label htmlFor={"location"}>Location Name:</label>
                            <input type="text" id={"location"} value={location} onChange={(e) => handleChange(e, setLocation)} disabled={currLocation !== null}/>
                        </div> 
                        <div>
                            <label>Country:</label>
                            <select value={ country} onChange={(e) => handleChange(e, setCountry)}  disabled={currLocation !== null}>
                                {countriesMap}
                            </select>                 
                        </div>
                        <div>
                            <label htmlFor={"street"}>Street Name:</label>
                            <input type="text" id={"street"} value={street} onChange={(e) => handleChange(e, setStreet)} disabled={currLocation !== null}/>
                        </div>                
                        <div>
                            <label htmlFor={"postalCode"}>Postal Code:</label>
                            <input type="text" id={"postalCode"} value={postalCode} onChange={(e) => handleChange(e, setPostalCode)}  disabled={currLocation !== null}/>
                        </div>
                        <div>
                            <label htmlFor={"number"}>N°:</label>
                            <input type="text" id={"number"} value={number} onChange={(e) => handleChange(e, setNumber)} disabled={currLocation !== null}/>
                        </div>
                        <div>
                            <button type='button' onClick={() => setCurrLocation(null)}>New Location</button>
                        </div>
                    </div>
              </div>
              <div className={classes.proceed}>
                    {errors !== '' && <Alert severity="error">{errors}</Alert>}
                    <button type='submit'>Proceed</button>
                </div>
            </form>
        </div>
    )
}

export default EventForm