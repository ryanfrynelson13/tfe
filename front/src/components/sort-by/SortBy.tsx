import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { SelectChangeEvent } from '@mui/material/Select';
import './select.css'

type SortByProps = {
    order: string
    onSort: (order: string) => void
}

const SortBy = ({order, onSort}: SortByProps) => {

    const handleChange = (e: SelectChangeEvent) => {
        onSort(e.target.value)
    }
    return(
        <FormControl sx={{ m: 1, minWidth: 120,}} size="small">
            <InputLabel sx={{color: 'white'}} id="sortBy">Sort By</InputLabel>
            <Select
                labelId="sortBy"
                id="sortBy"
                value={order}
                label="SortBy"
                onChange={handleChange}
                sx={{
                    color: 'white',
                    borderColor: 'white'
                }}
            >
                <MenuItem value={'date'}>Date</MenuItem>
                <MenuItem value={'price'}>Price (Low-High)</MenuItem>
                <MenuItem value={'price'}>Price (High-Low)</MenuItem>
                <MenuItem value={'stars'}>Stars</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SortBy