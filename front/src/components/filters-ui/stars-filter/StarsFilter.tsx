import { StarBorderOutlined } from "@mui/icons-material"
import { Rating } from "@mui/material"
import classes from './stars-filter.module.css'
import { FiltersProps } from "../../../types/filters/filters-props.type"

const StarsFilter = ({filters, onFilters}: FiltersProps) => {

    const handleChange = (event: React.SyntheticEvent, newValue: number | null) => {
        const newFilters = {...filters, lowestStars: newValue!}
        onFilters(newFilters)
    }

    return(
        <div>
            <h3>Stars</h3>
            <div className={classes.stars}>
                <Rating onChange={handleChange}  name="filter" value={filters.lowestStars} precision={0.5} emptyIcon={
                        <StarBorderOutlined sx={{color: 'white'}}/>
                } />
            </div>
        </div>
    )
}

export default StarsFilter