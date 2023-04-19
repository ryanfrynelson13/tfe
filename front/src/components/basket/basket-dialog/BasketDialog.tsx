import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@mui/material'
import { useRecoilState } from 'recoil';
import { basketAtom } from '../../../atoms/basket.atom';
import BasketProduct from '../basket-product/BasketProduct';
import './dialog.css'

const BasketDialog = () => {

    const [basket, setBasket] = useRecoilState(basketAtom)
    const [open, setOpen] = useState<boolean>(false)

    const handleClickOpen = () => {
        if(basket.products.length === 0) return
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        const filtered  = basket.products.filter(product => product.tickets.some(ticket => ticket.nb > 0)? {...product} :false)
        setBasket({...basket, products: filtered.map(product => ({...product, tickets: product.tickets.filter(ticket => ticket.nb > 0)})) })
    }

    const productsMap = basket.products?.map(product => (
        <BasketProduct key={product.sessionId} {...product}/>
    ))

    return (
        <>
            <Button variant="text" color='inherit' onClick={handleClickOpen}>
                <Badge badgeContent={basket.products.length} color='primary' overlap='circular'>
                    <FontAwesomeIcon 
                        style={{
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '1.8rem',
                            padding: '6px 6px'
                        }} 
                        border={true}
                        icon={faBasketShopping}
                    />
                </Badge>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{
                    width: '28vw',
                    backgroundColor: 'white',
                    paddingLeft: '0',
                    paddingRight: '0'
                }}>Basket</DialogTitle>
                <DialogContent sx={{
                    width: '28vw',
                    paddingLeft: '0',
                    paddingRight: '0'
                }}>
                    {productsMap}  
                </DialogContent>     
                <DialogActions>
                    <div>
                        <p className='total'>
                            {basket.total.toFixed(2)}€
                        </p>
                    </div> 
                    <div>
                        <Button onClick={handleClose}>Close</Button>
                        <Button onClick={() => {
                                handleClose()
                            }
                        }>Buy</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default BasketDialog