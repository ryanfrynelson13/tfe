import { useRecoilState } from 'recoil'
import './price-filter.css'
import { filtersAtom } from '../../../atoms/filters.atom'
import { Slider } from '@mui/material'
import usePriceRange from '../../../hooks/events/usePriceRange'

const PriceFilter = () => {
    const [{priceRange},setFilters] = useRecoilState(filtersAtom)
    const defaultRange = usePriceRange()

    const handleChange = (event: Event, newValue: number | number[]) => {
        if(Array.isArray(newValue)){
            setFilters(filters => ({...filters, priceRange: [...newValue]}))
        }
    }
    return(
        <div className='price'>
            <h3>Price Range</h3>
            <div className='slider'>
                <Slider
                    getAriaLabel={() => 'price range'}
                    value={priceRange}
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