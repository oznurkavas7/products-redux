import React from "react";
import { Link } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import {
    Button, Container
} from '@mui/material';
import { useSelector } from 'react-redux'

const Header = () => {
    const { basket } = useSelector(state => state.product);

    const totalQuantity = basket.reduce(
        (total, product) => (total += product.quantity), 0
    )
    return (
        <Container>
            <header>
                <div className="myButtonHeader">
                    <Link to={"/products"}><Button style={{
                        float: "right",
                        background: "#FF0080"
                    }} variant="contained">Ürünler</Button></Link>
                      <Badge badgeContent={totalQuantity} color="primary">
                      <Link to={"/basket"}><Button style={{
                        marginLeft: 10,
                        float: "right",
                        background: "#A91B60",
                    }} variant="contained">Sepetim</Button></Link> </Badge>
                </div>
            </header>
        </Container>
    )
}

export default Header;