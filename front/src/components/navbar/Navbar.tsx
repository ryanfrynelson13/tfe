import { NavLink, useNavigate } from 'react-router-dom'
import classes from './navbar.module.css'
import useSearch from '../../hooks/events/useSearch'
import { useEffect, useState } from 'react'
import Dropdown from '../dropdown/Dropdown'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../../atoms/user.atom'
import UserMenu from '../user-menu/UserMenu'
import logo from '../../assets/images/ES_Logo.png'
import BasketDialog from '../basket/basket-dialog/BasketDialog'

const Navbar = () => {

    const navigate = useNavigate()
    const user = useRecoilValue(userAtom)

    const [search, setSearch] = useState<string>('')
    const [inputFocus, setInputFocus] = useState<boolean>(false)
    const {events} = useSearch(search,'6')

    // useEffect(() => {

    // },[user])

    const handleBlur = () => {
        setTimeout(()=> {
            setInputFocus(false)
        }, 100)
    }

    return (
        <nav className={classes.navbar}>
            <div>
                <NavLink style={{
                    width: '8vw',
                    height: '10vh'
                }} to={''} className={classes['logo-link']}>
                    <img className={classes.logo} src={logo} alt="" />
                </NavLink>
            </div>
            <div>
                <NavLink 
                    to='' 
                    className={({isActive}) => isActive ? classes.active : undefined }
                >
                    Home
                </NavLink>
                <NavLink 
                    to='/categories' 
                    className={({isActive}) => isActive ? classes.active : undefined }
                >
                    Categories
                </NavLink>
                {
                    user?.permission.id === 2 &&
                    <NavLink 
                        to='/event-maker/dashboard'
                        className={({isActive}) => isActive ? classes.active : undefined }
                    >
                        DashBoard
                    </NavLink>
                }
            </div>
            <div className={classes['nav-right']}>
                <div className={classes.search}>
                    <form>
                        <div>
                            <input onFocus={() => setInputFocus(true)} onBlur={handleBlur} type="text" autoComplete='off' name="search" id="search" placeholder='Events...' value={search} onChange={(e) => setSearch(e.target.value)}/>
                            <button type='submit'>Search</button>
                        </div>
                        {events.length > 0 && inputFocus && <Dropdown items={events}/>}
                    </form>
                </div>          
                <div className={classes.icon}>
                    <BasketDialog />
                </div>
                <div className={classes.icon}>
                    {
                        user ?  
                        <UserMenu />
                        :
                        <p onClick={() => navigate('/auth/login')}>Login</p>
                    }
                   
                </div>
           
            </div>
        </nav>
    )
}

export default Navbar