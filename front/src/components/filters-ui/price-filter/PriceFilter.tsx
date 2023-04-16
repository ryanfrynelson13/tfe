import { useRecoilState } from 'recoil'
import './price-filter.css'
import { filtersAtom } from '../../../atoms/filters.atom'
import { Slider } from '@mui/material'
import usePriceRange from '../../../hooks/events/usePriceRange'
import { FiltersProps } from '../../../types/filters/filters-props.type'

const PriceFilter = ({filters, onFilters}: FiltersProps) => {
    const defaultRange = usePriceRange()

    const handleChange = (event: Event, newValue: number | number[]) => {
        if(Array.isArray(newValue)){
            const newFilters = {...filters, priceRange: [...newValue]}
            onFilters(newFilters)
        }
    }
    return(
        <div className='price'>
            <h3>Price Range</h3>
            <div className='slider'>
                <Slider
                    getAriaLabel={() => 'price range'}
                    value={filters.priceRange}
                    min={defaultRange[0]}
                    max={defaultRange[1]}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    color='secondary'
                />
            </div>
        </div>
    )
}

export default PriceFilter