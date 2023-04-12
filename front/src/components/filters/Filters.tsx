import classes from './filters.module.css'
import ReactCSSTransitionGroup from 'react-transition-group';

type FiltersProps = {
    display: boolean
}

const Filters = ({display}: FiltersProps) => {
    return(
        <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}          
            transitionLeaveTimeout={300}
        >
            <div className={classes.absolute}>
                <div className={classes.modal}>

                </div>
            </div>
        </ReactCSSTransitionGroup>
            
    )
}

export default Filters