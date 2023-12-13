import React, { useEffect, useState } from "react";
import { addBasket } from '../redux/ProductSlice'
import {
    Button, Grid, Paper, CardMedia, Typography, CardActions, CardContent,
    InputLabel, FormControl, MenuItem, Select, Rating, Stack
} from '@mui/material';
import { useDispatch } from 'react-redux'

const ProductList = () => {

    const dispatch = useDispatch()

    const [productData, setProductData] = useState([]);
    const [category, setCategory] = React.useState('1');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const getProductList = async () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setProductData(json))
    }

    useEffect(() => {
        getProductList();
    }, []);

    async function searchCategory(value) {
        let searchVal
        if (value === 2) {
            searchVal = 'mensClothing'
        }
        else if (value === 3) {
            searchVal = 'jewelery'
        }
        else if (value === 4) {
            searchVal = 'electronics'
        }
        else if (value === 5) {
            searchVal = 'womensClothing'
        }
        else if (value === 1) {
            getProductList();
        }
        if (searchVal) {
            fetch(`https://fakestoreapi.com/products/category/${searchVal} `)
                .then(res => res.json())
                .then(json => {
                    setProductData(json)
                })
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h2>Ürünler</h2>
                </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Kategori Seçin</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Kategori Seçin"
                        onChange={event => handleChange(event, "Tümü")}
                    >
                        <MenuItem value={1}>Tümü</MenuItem>
                        <MenuItem value={2}>men's clothing</MenuItem>
                        <MenuItem value={3}>jewelery</MenuItem>
                        <MenuItem value={4}>electronics</MenuItem>
                        <MenuItem value={5}>women's clothing</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined" onClick={() => searchCategory(category)}>Search</Button>
            </div>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {productData.map((item, index) => (
                            <Grid key={index} item>
                                <Paper elevation={10} sx={{
                                    background: "#EBE0D0",
                                    maxWidth: 345, height: "100%"
                                }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Category: {item.category}
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        alt=""
                                        height="400"
                                        width="180"
                                        image={item.image}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.description}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {item.price} ₺
                                        </Typography>
                                    </CardContent>
                                    <span>Stok adedi: {item.rating.count}</span>
                                    <Stack spacing={1}>
                                    <Rating name="half-rating-read" defaultValue={item.rating.rate} precision={0.5} readOnly />
    </Stack>
                                    <CardActions>
                                        <div className='align-right'>
                                            <Button style={{
                                                background: "#EC8FD0",
                                            }} size="small" variant="contained"
                                                onClick={() => dispatch(addBasket(item))}
                                            >Sepete Ekle</Button>
                                        </div>
                                    </CardActions>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductList