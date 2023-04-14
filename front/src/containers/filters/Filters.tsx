import CategoriesFilter from '../../components/filters-ui/categories-filter/CategoriesFilter'
import classes from './filters.module.css'


type FiltersProps = {
    display: boolean
}

const Filters = ({display}: FiltersProps) => {
   
    return(
        <>
            {
                display && 
                <div className={classes.absolute}>
                    <div className={classes.relative}>
                        <div className={classes.modal}>
                            <CategoriesFilter />
                        </div>
                    </div>
                </div>
            }
        </>
       
    )
}

export default Filters