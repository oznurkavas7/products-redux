import React from "react";
import { Link } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import {
    AppBar, Toolbar, Box
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../redux/ProductSlice'
import CssBaseline from '@mui/material/CssBaseline';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import CategoryIcon from '@mui/icons-material/Category';
import image1 from "../shop-icon.png";

const Header = () => {
    const { basket, token } = useSelector(state => state.product);
    const dispatch = useDispatch()

    const totalQuantity = basket.reduce(
        (total, product) => (total += product.quantity), 0
    )

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" className="appBarColor">
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Link to={"/products"}>
                            <IconButton aria-label="Add" style={{
                                fontFamily: 'Open Sans',
                                background: "#FF8300",
                            }}  >
                                <CategoryIcon />
                            </IconButton>
                        </Link>
                        <Badge style={{ display: token !== null ? undefined : "none" }} badgeContent={totalQuantity} color="primary">
                            <Link to={"/basket"}>
                                <IconButton aria-label="Add" style={{
                                    fontFamily: 'Open Sans',
                                    marginLeft: 10,
                                    background: "#FF4500",
                                    display: token === null ? 'none' : undefined
                                }}  >
                                    <ShoppingCartIcon />
                                </IconButton>

                            </Link>
                        </Badge>
                        <Link to={"/login"}>
                            <IconButton aria-label="Add" style={{
                                fontFamily: 'Open Sans',
                                background: "#FF4500",
                                marginLeft: 10,
                                display: token === null ? undefined : "none"
                            }}  >
                                <LoginIcon />
                            </IconButton>
                        </Link>
                    </Box>
                    <Box>
                    <img style={{ width: 60, height: 60, marginTop: "10px"}} src={image1} alt="" />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Link to={"/userpage"}>
                            <IconButton aria-label="Add" style={{
                                fontFamily: 'Open Sans',
                                background: "#FF8300",
                                marginLeft: 10,
                                display: token !== null ? undefined : "none"
                            }}>
                                <AccountCircleIcon />
                            </IconButton></Link>

                        <Link to={"/login"}>
                            <IconButton aria-label="Add" style={{
                                fontFamily: 'Open Sans',
                                background: "#FF4500",
                                marginLeft: 10,
                                display: token !== null ? undefined : "none"
                            }} onClick={() => dispatch(logOut())}>
                                <LogoutIcon />
                            </IconButton>
                        </Link>
                    </Box>

                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ p: 1 }}>
                <Toolbar />

            </Box>
        </Box>
    )
}

export default Header;