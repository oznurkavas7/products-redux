import React, { useEffect } from "react";
import { addBasket, getProductApi, closeAlert, handleOpen } from '../redux/ProductSlice'
import {
    Button, Grid, Paper, Typography, CardContent, Alert,
    Snackbar, Stack, CardActionArea,
    FormControl, InputLabel, MenuItem, Select, Box
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import Badge from '@mui/material/Badge';
import ProductDetail from "./ProductDetail";
import { searchCategory } from '../redux/ProductSlice'

const ProductList = () => {
    const { productList, basket, showAlert, token } = useSelector(state => state.product);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch((getProductApi()))
    }, []);

    const [category, setCategory] = React.useState('All');

    const handleChange = (event) => {
        setCategory(event);
    };

    const commonStyles = {
        fontFamily: 'Open Sans',
        display: "flex",
        justifyContent: "center"
    };

    return (
        <div>
            <Box sx={{ ...commonStyles }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label"
                        style={{
                            fontFamily: 'Open Sans',
                            color: 'black', fontWeight: 'bold'
                        }}>Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        onChange={(event) => {
                            handleChange(event.target.value)
                            dispatch(searchCategory(event.target.value))
                        }}
                    >
                        <MenuItem value={"All"}>All</MenuItem>
                        <MenuItem value={"men's clothing"}>men's clothing</MenuItem>
                        <MenuItem value={"jewelery"}>jewelery</MenuItem>
                        <MenuItem value={"electronics"}>electronics</MenuItem>
                        <MenuItem value={"women's clothing"}>women's clothing</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {productList.map((item, index) => (
                            <Grid key={index} item>
                                <Paper elevation={10} sx={{
                                    maxWidth: 345, width: 300, height: "100%",
                                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                                }}>
                                    <Grid container justifyContent="end">
                                        {basket?.map((basketList, indexBasket) => (
                                            <Badge style={{ display: token !== null ? undefined : "none" }}
                                                key={indexBasket} badgeContent={basketList.id === item.id ? 'x' + basketList.quantity : null} color="primary">
                                            </Badge>
                                        ))}
                                    </Grid>
                                    <CardActionArea onClick={() => dispatch(handleOpen(item))}>
                                        <img src={item.image} alt='' style={{ objectFit: "contain", maxHeight: "100px", width: "100%" }}></img>
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {item.title}
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="div" style={{ color: "#DF362D", marginTop: '10px', fontWeight: "bold" }}>
                                                {item.price} ₺
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardContent>
                                        <div style={{ display: token === null ? 'none' : undefined }}>
                                            <Button style={{
                                                fontFamily: 'Open Sans',
                                                background: "#DF362D",
                                            }} size="small" variant="contained"
                                                onClick={() => dispatch(addBasket(item))}
                                            >Add to Basket</Button>
                                        </div>
                                        <Stack>
                                            <Snackbar open={showAlert} autoHideDuration={4000} onClose={() => dispatch(closeAlert())}>
                                                <Alert onClose={() => dispatch(closeAlert())} severity="success" sx={{  fontFamily: 'Open Sans', width: '100%' }}>
                                                    Product added to basket!
                                                </Alert>
                                            </Snackbar>
                                        </Stack>
                                    </CardContent>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <ProductDetail></ProductDetail>
        </div>
    )
}

export default ProductList