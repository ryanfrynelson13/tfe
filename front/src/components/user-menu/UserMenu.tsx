import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import './user-menu.css'
import { useRecoilState } from 'recoil';
import { userAtom } from '../../atoms/user.atom';
import { useNavigate } from 'react-router-dom';
import { WidthFull } from '@mui/icons-material';

const UserMenu = () => {

    const navigate = useNavigate()

    const [user, setUser] = useRecoilState(userAtom)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
      setAnchorEl(null);
    }

    const logout = () => {
        localStorage.removeItem('access_token')
        setUser(undefined)
        navigate('/')
    }
    return(
        <>
         <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            <FontAwesomeIcon
                style={{
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '1.8rem',
                    padding: '6px 12px',
                    color: 'white'
                }} 
                border={true}
                icon={faUser}
            />
        </Button>
        <Menu
            sx={{
                fontFamily:'inherit',
                Width: '10vw'
            }}
            id="basic-menu"            
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem sx={{
                backgroundColor: '#03002e',
                cursor: 'default',
                color: 'white'
                }}
                disabled            
            >{user?.username}</MenuItem>
            <MenuItem onClick={() => {
                navigate('/profile')
                handleClose()
            }}>Profile</MenuItem>
             <MenuItem onClick={() => {
                navigate('/profile/orders')
                handleClose()
            }}>My Orders</MenuItem>
            <MenuItem onClick={() => {
                navigate('/profile/my-events')
                handleClose()
            }}>My Events</MenuItem>
            <MenuItem onClick={() => {
                navigate('/profile/favorites')
                handleClose()
            }}>Favorites</MenuItem>
            <MenuItem onClick={() => {
                navigate('/profile/reviews')
                handleClose()
            }}>My Reviews</MenuItem>
            <MenuItem onClick={() =>{
                handleClose()
                logout()
             }}><FontAwesomeIcon icon={faRightFromBracket}/><p className='logout'> Logout</p></MenuItem>
        </Menu>
      </>
    )
}

export default UserMenu