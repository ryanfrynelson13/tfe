import classes from './user-info.module.css'
import { SelectHTMLAttributes, useEffect, useId, useState } from 'react'
import { useRecoilState} from 'recoil'
import { userAtom } from '../../../atoms/user.atom'
import useCountries from '../../../hooks/countries/useCountries'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../../../api/users/update-user'
import { Alert }from '@mui/material'
import { createAddress } from '../../../api/users/create-addresses'



const UserInfo = () => {

    const [user, setUser] = useRecoilState(userAtom)
    const navigate = useNavigate()

    const [addressInForm, setAddress] = useState<number | null>(null)
    const [addressFormat, setAddressFormat] = useState<string[]>([])
    const {isLoading, countries} = useCountries()

    const [firstname, setFirstName] = useState<string>('')
    const [lastname, setLastName] = useState<string>('')
    const [country, setCountry] = useState<string>('')
    const [postalCode, setPostalCode] = useState<string>('')
    const [number, setNumber] = useState<string>('')
    const [street, setStreet] = useState<string>('')

    const [displayAlert, setDisplayAlert] = useState<boolean>(false)

    useEffect(() => {
        if(user){
            setAddress(user.addresses.length >0 ? 0 : null)
            setAddressFormat(user.addresses.map(address => address.number + ' ' + address.street))

            setFirstName(user.firstname ?? '')
            setLastName(user.lastname ?? '')
        }        
    }, [user])

    useEffect(() => {
        if(addressInForm !== null){
            setCountry(user?.addresses[addressInForm].country ?? '')
            setPostalCode(user?.addresses[addressInForm].postalCode ?? '')
            setNumber(user?.addresses[addressInForm].number ?? '')
            setStreet(user?.addresses[addressInForm].street ?? '')
        } else {
            setCountry('Belgium')
            setPostalCode('')
            setNumber('')
            setStreet('')
        }
    },[addressInForm])

    const id = useId()

    const addressesMap = addressFormat.map((address, index) => (
        <option key={index} value={index}>{address}</option>
    ))

    const countriesMap = countries?.map((country, index) => (
        <option key={index} value={country}>{country}</option>
    ))
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, setter:React.Dispatch<React.SetStateAction<string>>) => {
        setter(e.target.value)
        setDisplayAlert(false)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault()

        if( firstname.trim() === '' ||
            lastname.trim() === '' ||
            country.trim() === '' ||
            street.trim() === '' ||
            number.trim() === '' ||
            postalCode.trim() === ''
        ){
            setDisplayAlert(true)
            return
        }

        if(user?.firstname === null || user?.lastname === null && firstname !== user?.firstname || lastname !== user?.lastname){
            const userBody = {
                firstname: firstname.trim(),
                lastname: lastname.trim()
            }

            updateUser(userBody)
                .then((user) => {
                    setUser(user)
                })

        }

        if(addressInForm === null) {

            const addressBody = {
                country: country.trim(),
                postalCode: postalCode.trim(),
                street: street.trim(),
                number: number.trim()
            }

            createAddress(addressBody)
                .then((address) => {
                    if(user){
                        setUser({...user, addresses: [...user?.addresses, address]})
                    }
                })
        }

        navigate('/check-out/pay')
    }

    return(
        <div className={classes.info}>
            <h3>Billing Info</h3>
            <form onSubmit={handleSubmit}>
                <h4>User Info</h4>
                <div className={classes.user}>
                    <div>
                        <label htmlFor={"firstname" + id}>First Name:</label>
                        <input type="text" id={"firstname" + id} value={firstname} onChange={(e) => handleChange(e, setFirstName)} />
                    </div>
                    <div>
                        <label htmlFor={"lastname" + id}>Last Name:</label>
                        <input type="text" id={"lastname" + id} value={lastname} onChange={(e) => handleChange(e, setLastName)} />
                    </div>
                </div>
                <h4>Billing Address</h4>
                {
                    addressFormat.length > 0 &&
                    <div>
                        <label htmlFor="addresses">Saved Addresses:</label>
                        <select  onChange={(e) => setAddress(+e.target.value)} name="addresses" id="addresses">
                            {addressesMap}
                        </select>
                    </div>
                }
                <div className={classes.address}>
                    <div>
                        <label>Country:</label>
                        <select value={ country} onChange={(e) => handleChange(e, setCountry)}  disabled={addressInForm !== null}>
                            {countriesMap}
                        </select>                 
                    </div>
                    <div>
                        <label htmlFor={"street" + id}>Street Name:</label>
                        <input type="text" id={"street" + id} value={street} onChange={(e) => handleChange(e, setStreet)} disabled={addressInForm !== null}/>
                    </div>
                    <div className={classes.numbers}>
                        <div>
                            <label htmlFor={"postalCode" + id}>Postal Code:</label>
                            <input type="text" id={"postalCode" + id} value={postalCode} onChange={(e) => handleChange(e, setPostalCode)}  disabled={addressInForm !== null}/>
                        </div>
                        <div>
                            <label htmlFor={"number" + id}>N°:</label>
                            <input type="text" id={"number" + id} value={number} onChange={(e) => handleChange(e, setNumber)} disabled={addressInForm !== null}/>
                        </div>
                    </div>
                    <div>
                        <button type='button' onClick={() => setAddress(null)}>New Address</button>
                    </div>
                </div>
                <div className={classes.proceed}>
                    {displayAlert && <Alert severity="error">Information missing!</Alert>}
                    <button type='submit'>Proceed</button>
                </div>
            </form>
        </div>
    )
}

export default UserInfo