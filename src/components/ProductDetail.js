import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import React, { useEffect } from "react";
import { addBasket, handleClose } from '../redux/ProductSlice'
import {
    Button, Grid, Typography, Dialog, DialogActions, 
    DialogContent, Rating, DialogTitle, Box, Container
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetail = () => {
    const { openDetail, basket, token } = useSelector(state => state.product);
    const dispatch = useDispatch()
    
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
            <BootstrapDialog
                onClose={() => dispatch(handleClose())}
                aria-labelledby="customized-dialog-title"
                open={openDetail !== null}
                style={{ maxWidth: "1000px", maxHeight: "calc(100% - 30px)", margin: "auto" }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <Typography> <b>{openDetail?.title}</b></Typography>
                    <Box
                        sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Rating
                            name="half-rating-read"
                            value={openDetail?.rating.rate}
                            readOnly
                            precision={0.5}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        <Box sx={{ ml: 2 }}>{openDetail?.rating.rate}</Box>
                    </Box>
                    <Typography> Category: {openDetail?.category}</Typography>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => dispatch(handleClose())}
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
                            <img src={openDetail?.image} alt='' style={{ objectFit: "contain", maxHeight: "100px", width: "100%" }}></img>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom>
                                        {openDetail?.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Typography gutterBottom variant="h6" component="div" style={{ color: "#DF362D", marginRight: '5px', marginTop: '5px', fontWeight: "bold" }}>
                        {openDetail?.price} ₺
                    </Typography> |
                    <Button style={{ display: token === null ? 'none' : undefined,
                    fontFamily: 'Open Sans', background: "#DF362D", marginLeft: "5px" }} size="small" variant="contained" autoFocus 
                    onClick={() => {
                        dispatch(addBasket(openDetail ?? null));
                        dispatch(handleClose());
                    }}> Add to Basket
                    </Button>
                </DialogActions>
                <div style={{ display: "flex", justifyContent: "flex-end", marginRight: '5px', marginBottom: '5px' }}>
                    Stock Count: {openDetail?.rating.count} 
                    {basket?.map((basketList, indexBasket) => {
                         if(basketList.id === openDetail?.id) {
                            return (<div key={indexBasket} style={{ marginLeft: "5px" }}> | Basket Count: {basketList.quantity}</div>)
                         }
                         else return;
                        })}
                </div>
            </BootstrapDialog>
        </div>
    )
}

export default ProductDetail