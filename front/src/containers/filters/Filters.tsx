import clsx from 'clsx'
import CategoriesFilter from '../../components/filters-ui/categories-filter/CategoriesFilter'
import classes from './filters.module.css'
import PriceFilter from '../../components/filters-ui/price-filter/PriceFilter'
import StarsFilter from '../../components/filters-ui/stars-filter/StarsFilter'


type FiltersProps = {
    display: boolean
}

const borderClass = clsx([classes.filter, classes.border])

const Filters = ({display}: FiltersProps) => {
   
    return(
        <>
            {
                display && 
                <div className={classes.absolute}>
                    <div className={classes.relative}>
                        <div className={classes.modal}>
                            <div className={classes.filter}>
                                <CategoriesFilter />
                            </div>
                            <div className={borderClass}>
                                <PriceFilter />
                            </div>
                            <div className={classes.filter}>
                                <StarsFilter />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
       
    )
}

export default Filters