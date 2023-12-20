import React, { useEffect } from "react";
import {
    TextField, Container, Box, Paper
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { loginOperation } from '../redux/ProductSlice'
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { tokenStatus } = useSelector(state => state.product);
    const dispatch = useDispatch()
    const [inputUserName, setInputUserName] = React.useState("");
    const [inputPassword, setInputPassword] = React.useState("");
    const navigate = useNavigate();

    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <div>
                    <Paper elevation={10} sx={{ margin: "20px", padding: "16px", bgcolor: "#fafafa" }}>
                        <div style={{ justifyContent: 'center', display: 'flex' }}>
                            <TextField
                                style={{ width: 400 }}
                                required
                                id="outlined-required"
                                label="User Name"
                                placeholder="User Name..."
                                value={inputUserName}
                                onInput={(e) => setInputUserName(e.target.value)}
                                onChange={(e) => setInputUserName(e.target.value)}
                            />
                        </div>
                        <div style={{ justifyContent: 'center', display: 'flex', marginTop: "20px" }}>
                            <TextField
                                style={{ width: 400 }}
                                required
                                id="outlined-required"
                                label="Password"
                                placeholder="Password..."
                                value={inputPassword}
                                onInput={(e) => setInputPassword(e.target.value)}
                                onChange={(e) => setInputPassword(e.target.value)}
                            />
                        </div>
                        <div style={{ justifyContent: 'center', display: 'flex', marginTop: '20px' }}>
                            <IconButton aria-label="Add" style={{
                                fontFamily: 'Open Sans',
                                background: "#FF8300",
                            }} onClick={() => {
                                dispatch(loginOperation({ name: "derek", pass: "jklg*_56" })) //name: "derek", pass: "jklg*_56"
                                navigate("/userpage"); //tokenStatus
                            }
                            }>
                                <LoginIcon />
                            </IconButton>
                        </div>
                    </Paper>
                </div>
            </Box>
        </Container>
    )
}

export default Login