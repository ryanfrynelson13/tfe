import {Pagination as PaginationComponent }from '@mui/material';
import Stack from '@mui/material/Stack';
import  './pagination.css'

type PaginationProps = {
    count: number
    onPage: (page: number) => void
    page: number
}

const Pagination = ({count = 1, onPage, page}: PaginationProps) => {

    return(
        <div className='page'>
             <Stack spacing={2}>
                <PaginationComponent page={page} size='large' onChange={(event: React.ChangeEvent<unknown>, page: number) => {onPage(page)}}  count={Math.floor(count /(24 +1)) +1} variant="outlined" color="secondary"/>
            </Stack>
        </div>
    )
}

export default Pagination