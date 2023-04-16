import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Checkbox, FormGroup } from '@mui/material';
import  './categories-filter.css'
import { FiltersProps } from '../../../types/filters/filters-props.type';


const CategoriesFilter = ({filters, onFilters}: FiltersProps) => {

    const handleCheck = (e:React.ChangeEvent<HTMLInputElement>) => {
        const catId = e.target.value
        const checked = e.target.checked
        const newFilters = {...filters, categories: checked? [...filters.categories, +catId] :  filters.categories.filter(cat => cat !== +catId)}
        onFilters(newFilters)
    }

    const isChecked = (value: number) => {
        return filters.categories.some(cat => cat === value)
    }
    return(
        <div className='categories'>
            <FormControl>
                <FormLabel id="categories" sx={{color: 'white', fontFamily: 'inherit', fontSize:'1.4rem', marginBottom: '1ch', fontWeight:'bold'}}>Categories</FormLabel>
                <FormGroup>
                    <FormControlLabel value={1} control={<Checkbox color='secondary' onChange={handleCheck} checked={isChecked(1)} />} label="Concerts" />
                    <FormControlLabel value={2} control={<Checkbox color='secondary' onChange={handleCheck} checked={isChecked(2)} />} label="Festivals" />
                    <FormControlLabel value={3} control={<Checkbox color='secondary' onChange={handleCheck} checked={isChecked(3)} />} label="Sports"  />
                    <FormControlLabel value={4} control={<Checkbox color='secondary' onChange={handleCheck} checked={isChecked(4)} />} label="Exhibitions" />
                    <FormControlLabel value={5} control={<Checkbox color='secondary' onChange={handleCheck} checked={isChecked(5)} />} label="Museum" />
                    <FormControlLabel value={6} control={<Checkbox color='secondary' onChange={handleCheck} checked={isChecked(6)} />} label="History"/>
                    <FormControlLabel value={7} control={<Checkbox color='secondary' onChange={handleCheck} checked={isChecked(7)} />} label="Dancing" />
                    <FormControlLabel value={8} control={<Checkbox color='secondary' onChange={handleCheck} checked={isChecked(8)} />} label="Movies" />
                    <FormControlLabel value={9} control={<Checkbox color='secondary' onChange={handleCheck} checked={isChecked(9)} />} label="Food"/>
                    <FormControlLabel value={10} control={<Checkbox color='secondary' onChange={handleCheck} checked={isChecked(10)} />} label="Social"/>
                </FormGroup>
            </FormControl>
        </div>
    )
}

export default CategoriesFilter