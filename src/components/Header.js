import React from "react";
import { Link } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import {
    Button, AppBar, Toolbar, Box
} from '@mui/material';
import { useSelector } from 'react-redux'

const Header = () => {
    const { basket } = useSelector(state => state.product);

    const totalQuantity = basket.reduce(
        (total, product) => (total += product.quantity), 0
    )
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className="appBarColor">
                <Toolbar >
                    <div className="myButtonHeader">
                        <Link to={"/products"}><Button style={{
                            float: "right",
                            background: "#FF8300"
                        }} variant="contained">Ürünler</Button></Link>
                        <Badge badgeContent={totalQuantity} color="primary">
                            <Link to={"/basket"}><Button style={{
                                marginLeft: 10,
                                float: "right",
                                background: "#FF4500",
                            }} variant="contained">Sepetim</Button></Link> </Badge>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>


    )
}

export default Header;