import classes from './user-info.module.css'
import { useForm, SubmitHandler } from "react-hook-form"
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useEffect, useId, useState } from 'react'
import { useRecoilState} from 'recoil'
import { userAtom } from '../../atoms/user.atom'
import useCountries from '../../hooks/countries/useCountries'
import { UserInfoForm } from '../../types/forms/user-info.type'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../../api/users/update-user'


const userInfoSchema = yup.object({
    firstname: yup.string().required().typeError('no first name'),
    lastname: yup.string().required().typeError('no last name'),
    country: yup.string().required(),
    postalCode: yup.string().required(),
    number: yup.string().required(),
    street: yup.string().required()
})



const UserInfo = () => {

    const [user, setUser] = useRecoilState(userAtom)
    const navigate = useNavigate()

    const [addressInForm, setAddress] = useState<number | null>(null)
    const [addressFormat, setAddressFormat] = useState<string[]>([])
    const [displayAlert, setDisplayAlert] = useState<boolean>(false)
    const {isLoading, countries} = useCountries()

    useEffect(() => {
        if(user){
            setAddress(user.addresses.length >0 ? 0 : null)
            setAddressFormat(user.addresses.map(address => address.number + ' ' + address.street))
            reset({
                firstname: user?.firstname ?? '',
                lastname: user?.lastname ?? '',
            })
        }        
    }, [user])

    useEffect(() => {
        if(addressInForm !== null){
          
            reset({              
                country: user?.addresses[addressInForm].country,
                postalCode: user?.addresses[addressInForm].postalCode,
                number: user?.addresses[addressInForm].number,
                street: user?.addresses[addressInForm].street
            })
        } else {
            reset({
                country: 'Belgium',
                postalCode: '',
                number: '',
                street: ''
            })
        }
    },[addressInForm])

    const id = useId()

    const addressesMap = addressFormat.map((address, index) => (
        <option key={index} value={index}>{address}</option>
    ))

    const countriesMap = countries?.map((country, index) => (
        <option key={index} value={country}>{country}</option>
    ))

    const {register, handleSubmit, formState: {errors},reset} = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            country: '',
            postalCode: '',
            number: '',
            street: '',
        },
        resolver: yupResolver(userInfoSchema)
    })

    const handleForm: SubmitHandler<UserInfoForm> = (userInfo) => {
        if(user?.firstname === null || user?.lastname === null){
            const userBody = {
                firstname: userInfo.firstname,
                lastname: userInfo.lastname
            }

             updateUser(userBody)
                .then((data) => {
                    setUser({...user, firstname: data.firstname, lastname: data.lastname})
                    console.log(user)
                })

        }
        navigate('/sales/pay')
    }

    return(
        <div className={classes.info}>
            <h3>Billing Info</h3>
            <form onSubmit={handleSubmit(handleForm)}>
                <h4>User Info</h4>
                <div className={classes.user}>
                    <div>
                        <label htmlFor={"firstname" + id}>First Name:</label>
                        <input type="text" id={"firstname" + id} {...register('firstname')}/>
                    </div>
                    <div>
                        <label htmlFor={"lastname" + id}>Last Name:</label>
                        <input type="text" id={"lastname" + id} {...register('lastname')}/>
                    </div>
                </div>
                <h4>Billing Address</h4>
                {
                    addressFormat.length > 0 &&
                    <div>
                        <label htmlFor="addresses">Saved Addresses:</label>
                        <select  onChange={e => setAddress(+e.target.value)} name="addresses" id="addresses">
                            {addressesMap}
                        </select>
                    </div>
                }
                <div className={classes.address}>
                    <div>
                        <label>Country:</label>
                        <select  {...register('country')} id="" disabled={addressInForm !== null}>
                            {countriesMap}
                        </select>
                    </div>
                    <div>
                        <label htmlFor={"street" + id}>Street Name:</label>
                        <input type="text" id={"street" + id} {...register('street')} disabled={addressInForm !== null}/>
                    </div>
                    <div className={classes.numbers}>
                        <div>
                            <label htmlFor={"postalCode" + id}>Postal Code:</label>
                            <input type="text" id={"postalCode" + id} {...register('postalCode')} disabled={addressInForm !== null}/>
                        </div>
                        <div>
                            <label htmlFor={"number" + id}>N°:</label>
                            <input type="text" id={"number" + id} {...register('number')} disabled={addressInForm !== null}/>
                        </div>
                    </div>
                    <div>
                        <button type='button' onClick={() => setAddress(null)}>New Address</button>
                    </div>
                </div>
                <div className={classes.proceed}>
                    <button type='submit'>Proceed</button>
                </div>
            </form>
        </div>
    )
}

export default UserInfo