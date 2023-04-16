import { useId, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import classes from './signup.module.css'
import { useForm, SubmitHandler } from "react-hook-form"


import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import SignupForm from "../../../types/auth/signup-form.type"

const signupSchema = yup.object({
    email: yup.string().required().email().typeError('no valid email'),
    password: yup.string().required(),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'passwords must match'),
    username: yup.string().required(),
})

const Signup = () => {
  
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: 'test@test.be',
            password: 'retour',
            confirmPassword: 'retour',
            username: 'ret',
        },
        resolver: yupResolver(signupSchema)
    })

    const id = useId()

    const navigate = useNavigate()

    const handleSignup: SubmitHandler<SignupForm> = (userInfo) => {
        const body = {
            user: {
                username: userInfo.username,
                email: userInfo.email,
                password: userInfo.password,
            },
            permissionId: 3
        }

        axios.post('http://localhost:3000/auth/register',body)
            .then(res => {
                localStorage.setItem('access_token', JSON.stringify(res.data.access_token))
                navigate(-1)
            })
            .catch(err => console.log(err))

    }

    return (
        <>
            <h2>Personnal Info</h2>
            <form className={classes['sign-up']} onSubmit={handleSubmit(handleSignup)}>
                <div>
                    <label htmlFor={"email" + id}>Email:</label>
                    <input type="text" id={"email" + id} {...register('email')}/>
                </div>
                <div>
                    <label htmlFor={"password" + id}>Password:</label>
                    <input type="password" id={"password" + id} {...register('password')}/>
                </div>
                <div>
                    <label htmlFor={"confirmPassword" + id}>Confirm Password:</label>
                    <input type="password" id={"confirmPassword" + id} {...register('confirmPassword')}/>
                </div>
                <div>
                    <label htmlFor={"username" + id}>Username:</label>
                    <input type="text" id={"username" + id} {...register('username')}/>
                </div>
                <button type="submit">Sign up</button>
            </form>
        </>
    )
}

export default Signup