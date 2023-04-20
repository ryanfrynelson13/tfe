import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import classes from './login.module.css'
import { userAtom } from "../../../atoms/user.atom"
import { useSetRecoilState } from "recoil"

const Login = () => {

  const setUser = useSetRecoilState(userAtom)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigate = useNavigate()

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault()

    if(email.trim() === '' || password.trim() === '') return

    try {
      const {data} = await axios.post('http://localhost:3000/auth/login', {
        email,
        password
      })
      localStorage.setItem('access_token', JSON.stringify(data.access_token))
      setUser(data.user)
      navigate(-1)
    } catch (error) {
     console.log(error) 
    }
  } 
  return (
    <form className={classes.login} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} />
        </div>
        <button type="submit">Log in</button>
    </form>
  )
}

export default Login