import { Link } from "react-router-dom"
import classes from './signup-container.module.css'
import Signup from "../../../components/auth/signup/Signup"

const SignupContainer = () => {
  return (
    <div className={classes["signup-page"]}>
      <h2>Create an Account</h2>
      <div className={classes["signup-form"]}>
        <Signup />
      </div>
      <div>
        <p>Already have an account <Link to={'/auth/login'} className={classes.login}>login here</Link> </p>
      </div>
    </div>
  )
}

export default SignupContainer