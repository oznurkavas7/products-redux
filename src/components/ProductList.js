import React, { useEffect } from "react";
import { addBasket, getProductApi, closeAlert } from '../redux/ProductSlice'
import {
    Button, Grid, Paper, Typography, Dialog, DialogActions, DialogContent,
    CardContent, Rating, Alert, Snackbar, Stack, CardActionArea, DialogTitle, Box
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';


const ProductList = () => {
    const { productList, basket, showAlert } = useSelector(state => state.product);
    const [open, setOpen] = React.useState(null);
    const handleOpen = (item) => setOpen(item);
    const handleClose = () => setOpen(null);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch((getProductApi()))
    }, []);

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    return (
        <div>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {productList.map((item, index) => (
                            <Grid key={index} item>
                                <Paper elevation={10} sx={{
                                    background: "#fff",
                                    maxWidth: 345, width: 300, height: "100%",
                                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                                }}>
                                    {basket?.map((basketList, indexBasket) => (
                                        <Badge key={indexBasket} badgeContent={basketList.id === item.id ? 'x' + basketList.quantity : null} color="primary">
                                        </Badge>
                                    ))}
                                    <CardActionArea onClick={() => handleOpen(item)}>
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
                                        <div>
                                            <Button style={{
                                                background: "#DF362D",
                                            }} size="small" variant="contained"
                                                onClick={() => dispatch(addBasket(item))}
                                            >Add to Basket</Button>
                                        </div>
                                        <Stack>
                                            <Snackbar open={showAlert} autoHideDuration={4000} onClose={() => dispatch(closeAlert())}>
                                                <Alert onClose={() => dispatch(closeAlert())} severity="success" sx={{ width: '100%' }}>
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

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open !== null}
                style={{ maxWidth: "1000px", maxHeight: "calc(100% - 30px)", margin: "auto" }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <Typography> <b>{open?.title}</b></Typography>
                    <Box
                        sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Rating
                            name="half-rating-read"
                            value={open?.rating.rate}
                            readOnly
                            precision={0.5}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        <Box sx={{ ml: 2 }}>{open?.rating.rate}</Box>
                    </Box>
                    <Typography> Category: {open?.category}</Typography>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item>
                            <img src={open?.image} alt='' style={{ objectFit: "contain", maxHeight: "100px", width: "100%" }}></img>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom>
                                        {open?.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Typography gutterBottom variant="h6" component="div" style={{ color: "#DF362D", marginRight: '5px', marginTop: '5px', fontWeight: "bold" }}>
                        {open?.price} ₺
                    </Typography> |
                    <Button style={{ background: "#DF362D", marginLeft: "5px" }} size="small" variant="contained" autoFocus onClick={() => {
                        dispatch(addBasket(open ?? null));
                        handleClose();
                    }}>
                        Add to Basket
                    </Button>
                </DialogActions>
                <div style={{ display: "flex", justifyContent: "flex-end", marginRight: '5px', marginBottom: '5px' }}>Stock Count: {open?.rating.count} </div>
            </BootstrapDialog>
        </div>
    )
}

export default ProductList