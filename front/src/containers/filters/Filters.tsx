import clsx from 'clsx'
import CategoriesFilter from '../../components/filters-ui/categories-filter/CategoriesFilter'
import classes from './filters.module.css'
import PriceFilter from '../../components/filters-ui/price-filter/PriceFilter'
import StarsFilter from '../../components/filters-ui/stars-filter/StarsFilter'
import { useRecoilState } from 'recoil'
import { filtersAtom } from '../../atoms/filters.atom'
import { useEffect, useState } from 'react'
import { displayFilters } from '../../atoms/display-filters.atom'
import {Transition} from 'react-transition-group';

const borderClass = clsx([classes.filter, classes.border])

const Filters = () => {

    const [display, setDisplay] = useRecoilState(displayFilters)
    const [filters, setFilters] = useRecoilState(filtersAtom)
    const [tempFilters, setTempFilters] = useState<Filters>(filters)

    useEffect(() => {
        setTempFilters(filters)
    }, [filters])

    const handleClose = () => {
        setDisplay(false)
        setFilters(tempFilters)
    }

    const handleUpdateFilters = (filters: Filters) => {
        setTempFilters(filters)
    }

    const absClass = clsx([!display && classes.hide, display && classes.absolute])

    const modalClass = clsx([classes.modal, display && classes['modal-open']])
    
   
    return(
        <>
            {
                // display && 
                // <div className={classes.absolute} onClick={handleClose}>
                //     <div className={classes.modal} onClick={e => e.stopPropagation()}>
                //         <div className={classes.filter}>
                //             <CategoriesFilter filters={tempFilters} onFilters={handleUpdateFilters}/>
                //         </div>
                //         <div className={borderClass}>
                //             <PriceFilter filters={tempFilters} onFilters={handleUpdateFilters}/>
                //         </div>
                //         <div className={classes.filter}>
                //             <StarsFilter filters={tempFilters} onFilters={handleUpdateFilters}/>
                //         </div>        
                //     </div>
                // display && 
                <div className={absClass} onClick={handleClose}>
                    <div className={modalClass} onClick={e => e.stopPropagation()}>
                        <div className={classes.filter}>
                            <CategoriesFilter filters={tempFilters} onFilters={handleUpdateFilters}/>
                        </div>
                        <div className={borderClass}>
                            <PriceFilter filters={tempFilters} onFilters={handleUpdateFilters}/>
                        </div>
                        <div className={classes.filter}>
                            <StarsFilter filters={tempFilters} onFilters={handleUpdateFilters}/>
                        </div>        
                    </div>
                </div>
               
            }
        </>
       
    )
}

export default Filters