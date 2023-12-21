import { useSelector, useDispatch } from 'react-redux'
import { removeBasket, addBasket } from '../redux/ProductSlice'
import {
    TableContainer, Paper, TableRow, TableCell, TableBody, Table, Typography, Container
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import image2 from "../basket-icon.png";

const BasketList = () => {
    const { basket } = useSelector(state => state.product);
    const dispatch = useDispatch()

    const totalPrice = basket.reduce(
        (total, product) => (total += product.price * product.quantity), 0
    )

    return (
        <div>
            {basket.length > 0 ? <TableContainer component={Paper} >
                <Table sx={{ bgcolor: "#fafafa", margin: 'auto' }} aria-label="simple table">
                    <TableBody>
                        {basket.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell size='small' align="left"><img style={{ objectFit: "contain", maxHeight: "100px", width: "100%" }} src={item.image} alt=''></img></TableCell>
                                <TableCell size='small' align="left">{item.title}</TableCell>
                                <TableCell size='small' align="right" style={{ color: "#DF362D", fontWeight: "bold" }}>{item.price} ₺</TableCell>

                                <TableCell size='small' align="right">
                                    <IconButton aria-label="delete" style={{ padding: "none", outline: 'auto' }} onClick={() => dispatch(removeBasket(item))}>
                                        {item.quantity === 1 ? <DeleteIcon /> : <RemoveIcon />}
                                    </IconButton>
                                </TableCell>

                                <TableCell size='small' align="right" style={{ padding: "none" }} >{item.quantity}</TableCell>

                                <TableCell size='small' align="right">
                                    <IconButton aria-label="Add" style={{ padding: "none", outline: 'auto' }} onClick={() => dispatch(addBasket(item))}>
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell align="right" colSpan={2}>Total</TableCell>
                            <TableCell align="right" style={{ color: "#DF362D", fontWeight: "bold" }}>{totalPrice.toFixed(2)} ₺</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer> : <Container style={{
                display: 'flex', 
                justifyContent: 'center', 
                flexFlow: "column",
                alignItems: "center",
                position: "absolute",
                right: "0",
                left: "0",
                top: "0",
                bottom: "0"
            }}>
                <img style={{ width: 100, height: 100 }} src={image2} alt="" />
                <Typography style={{ color: "#DF362D", fontWeight: "bold", fontFamily: 'Open Sans' }} variant="h4" gutterBottom>
                    Basket is Empty!
                </Typography></Container>}
        </div>
    )
}

export default BasketList