import { useSelector, useDispatch } from 'react-redux'
import { removeBasket, addBasket } from '../redux/ProductSlice'
import {
    TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const BasketList = () => {
    const { basket } = useSelector(state => state.product);
    const dispatch = useDispatch()

    const totalPrice = basket.reduce(
        (total, product) => (total += product.price * product.quantity), 0
    )

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h2>Sepetim</h2>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 1050, margin: 'auto' }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Ürün</TableCell>
                            <TableCell align="left">Başlık</TableCell>
                            <TableCell align="left">Kategori</TableCell>
                            <TableCell align="right">Fiyat</TableCell>
                            <TableCell align="right">Adet</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left"><img width={180} height={180} src={item.image} alt=''></img></TableCell>
                                <TableCell align="left">{item.title}</TableCell>
                                <TableCell align="left">{item.category}</TableCell>
                                <TableCell align="right">{item.price} ₺</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="delete" onClick={() => dispatch(removeBasket(item))}>
                                        <RemoveIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="Add" onClick={() => dispatch(addBasket(item))}>
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={2}>Sepet Tutarı</TableCell>
                            <TableCell align="right">{totalPrice.toFixed(2)} ₺</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default BasketList