import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ChangeEventHandler, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Rating } from '@mui/material';

type ReviewDialogProps = {
    currStars: number
    currComment: string
    update: (stars: number, comment: string) => void
}

const ReviewDialog = ({currStars, currComment, update}: ReviewDialogProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const [stars, setStars] = useState<number | null>(currStars)
    const [comment, setComment] = useState<string>(currComment)

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleStars = (event: React.SyntheticEvent, newValue: number | null) => {
    setStars(newValue)
  }

  const handleUpdate = () => {

  }

  return (
    <>
      <Button variant="text" color='inherit' onClick={handleClickOpen}>
            <FontAwesomeIcon 
                    style={{
                        fontSize: '1.2rem',
                        marginLeft: '0.5ch',
                        cursor: 'pointer'
                    }} icon={faPencil}
                />
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Review</DialogTitle>
            <DialogContent>
                <DialogContentText>
                   <Rating value={stars} onChange={handleStars}/>
                </DialogContentText>
                <TextField
                    sx={{
                        width: '20vw'
                    }}
                    multiline={true}
                    value={comment}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Comment"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={(e) => { setComment(e.target.value)}}
                />
            </DialogContent>     
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => {
                        handleClose()
                        update(stars!, comment)
                    }
                }>Update</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default ReviewDialog