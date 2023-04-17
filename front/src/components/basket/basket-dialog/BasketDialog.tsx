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

const BasketDialog = () => {

    const [basket, setBasket] = useRecoilState(basketAtom)
    const [open, setOpen] = useState<boolean>(false)

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
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
                    width: '25vw',
                    backgroundColor: 'white'
                }}>Basket</DialogTitle>
                <DialogContent sx={{
                    width: '25vw'
                }}>
                    {productsMap}                
                </DialogContent>     
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={() => {
                            handleClose()
                        }
                    }>Buy</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default BasketDialog