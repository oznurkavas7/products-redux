import React, { useEffect, useState } from "react";
import { addBasket } from '../redux/ProductSlice'
import {
    Button, Grid, Paper, Typography, CardActions, CardContent,
    InputLabel, FormControl, MenuItem, Select, Rating
} from '@mui/material';
import { useDispatch } from 'react-redux'
import TuneIcon from '@mui/icons-material/Tune';
import IconButton from '@mui/material/IconButton';

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
            <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', marginTop: "80px", marginRight: "150px" }}>
                <FormControl variant="standard" sx={{ m: 2, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Kategori Seçin"
                        onChange={event => handleChange(event, "All")}
                    >
                        <MenuItem value={1}>All</MenuItem>
                        <MenuItem value={2}>men's clothing</MenuItem>
                        <MenuItem value={3}>jewelery</MenuItem>
                        <MenuItem value={4}>electronics</MenuItem>
                        <MenuItem value={5}>women's clothing</MenuItem>
                    </Select>
                </FormControl>
                <IconButton aria-label="Tune" onClick={() => searchCategory(category)}>
                    <TuneIcon />
                </IconButton>
            </div>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {productData.map((item, index) => (
                            <Grid key={index} item>
                                <Paper elevation={10} sx={{
                                    background: "#fff",
                                    maxWidth: 345, width: 300, height: "100%",
                                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                                }}>
                                    <img src={item.image} alt='' style={{ objectFit: "contain", maxHeight: "100px", width: "100%" }}></img>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {item.title}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div" style={{ color: "#DF362D", marginTop: '10px' }}>
                                            {item.price} ₺
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Typography gutterBottom variant="h7" component="div" style={{ marginLeft: '10px', marginRight: '10px' }}>
                                            {item.rating.rate}
                                        </Typography>
                                        <Rating name="half-rating-read" defaultValue={item.rating.rate} precision={0.5} readOnly />
                                    </CardActions>
                                    <CardContent>
                                        <div>
                                            <Button style={{
                                                background: "#DF362D",
                                            }} size="small" variant="contained"
                                                onClick={() => dispatch(addBasket(item))}
                                            >Sepete Ekle</Button>
                                        </div>
                                    </CardContent>
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