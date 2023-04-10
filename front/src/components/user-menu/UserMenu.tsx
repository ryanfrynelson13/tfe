import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import classes from './user-menu.module.css'
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../../atoms/user.atom';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {

    const navigate = useNavigate()

    const setUser = useSetRecoilState(userAtom)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
      setAnchorEl(null);
    }

    const logout = () => {
        localStorage.clear()
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
                fontFamily:'inherit'
            }}
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={() =>{
                handleClose()
                logout()
             }}><FontAwesomeIcon icon={faRightFromBracket}/><p className={classes.logout}> Logout</p></MenuItem>
        </Menu>
      </>
    )
}

export default UserMenu