import CircularProgress from '@mui/material/CircularProgress';
import classes from './spinner.module.css'

const Spinner = ({height}: {height: string}) => {
    return(
        <div className={classes.spinner} style={{
            height: height
        }}>
            <CircularProgress color='secondary'/>
        </div>
    )
}

export default Spinner