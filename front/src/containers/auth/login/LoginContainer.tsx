import { Link } from "react-router-dom"
import classes from './login-container.module.css'
import Login from "../../../components/auth/login/Login"

const LoginContainer = () => {
  return (
    <div className={classes["login-page"]}>
      <h2>Login to Account</h2>
      <div className={classes["login-form"]}>
        <Login />
      </div>
      <div>
        <p>Don't have an account <Link to={'/auth/register'} className={classes['sign-up']}>signup here</Link> </p>
      </div>
    </div>
  )
}

export default LoginContainer