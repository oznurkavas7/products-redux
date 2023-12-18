import React from "react";
import { Link } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import {
    Button, AppBar, Toolbar, Select,
    Box, FormControl, InputLabel, MenuItem
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import { searchCategory } from '../redux/ProductSlice'
import CssBaseline from '@mui/material/CssBaseline';
import ProductList from './ProductList';
import { Routes, Route } from "react-router-dom";

const Header = () => {
    const { basket } = useSelector(state => state.product);
    const dispatch = useDispatch()

    const [category, setCategory] = React.useState('All');
    const [isBasket, setIsBasket] = React.useState(false);

    const handleChange = (event) => {
        setCategory(event);
    };

    const totalQuantity = basket.reduce(
        (total, product) => (total += product.quantity), 0
    )

    const commonStyles = {
        border: 1,
        borderColor: 'text.primary'
    };
    
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" className="appBarColor">
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Link to={"/products"}><Button
                            onClick={() => setIsBasket(false)}
                            style={{
                                background: "#FF8300"
                            }} variant="contained">Products</Button></Link>
                        <Badge badgeContent={totalQuantity} color="primary">
                            <Link to={"/basket"}><Button
                                onClick={() => setIsBasket(true)}
                                style={{
                                    marginLeft: 10,
                                    background: "#FF4500",
                                }} variant="contained">My Basket</Button></Link>
                        </Badge>
                    </Box>
                    <Box sx={{ display: isBasket ? 'none' : 'flex', ...commonStyles }}>
                        <FormControl variant="standard" sx={{ m: 2, minWidth: 200 }}>
                            <InputLabel id="demo-simple-select-label" style={{ color: 'black', fontWeight: 'bold' }}>Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Kategori Seçin"
                                onChange={event => handleChange(event.target.value)}
                            >
                                <MenuItem value={"All"}>All</MenuItem>
                                <MenuItem value={"men's clothing"}>men's clothing</MenuItem>
                                <MenuItem value={"jewelery"}>jewelery</MenuItem>
                                <MenuItem value={"electronics"}>electronics</MenuItem>
                                <MenuItem value={"women's clothing"}>women's clothing</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton aria-label="Tune" onClick={() => dispatch(searchCategory(category))}>
                            <TuneIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<ProductList />}></Route>
                </Routes>
            </Box>
        </Box>
    )
}

export default Header;