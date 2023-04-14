import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useRecoilState} from 'recoil';
import { filtersAtom } from '../../../atoms/filters.atom';
import { Checkbox, FormGroup } from '@mui/material';
import classes from './categories-filter.module.css'

const CategoriesFilter = () => {

    const [filters, setFilters] = useRecoilState(filtersAtom)

    const handleCheck = (e:React.ChangeEvent<HTMLInputElement>) => {
        const catId = e.target.value
        const checked = e.target.checked
        console.log(catId, checked)
        setFilters(filters => ({...filters, categories: checked? [...filters.categories, +catId] :  filters.categories.filter(cat => cat !== +catId)}))
    }

    const isChecked = (value: number) => {
        return filters.categories.some(cat => cat === value)
    }
    return(
        <div className={classes.categories}>
            <FormControl>
                <FormLabel id="categories" sx={{color: 'white', fontFamily: 'inherit', fontSize:'1.2rem', marginBottom: '1ch'}}>Categories</FormLabel>
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