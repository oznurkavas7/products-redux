import React from "react";
import {
    TextField, Container, Box, Paper, Typography
} from '@mui/material';
import { useDispatch } from 'react-redux'
import { loginOperation } from '../redux/ProductSlice'
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch()
    const [inputUserName, setInputUserName] = React.useState("");
    const [inputPassword, setInputPassword] = React.useState("");
    const [tokenStat, setTokenStat] = React.useState(false);
    const navigate = useNavigate();

    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <div>
                    <Paper elevation={10} sx={{ margin: "20px", padding: "16px", bgcolor: "#fafafa" }}>
                        <Typography style={{
                            fontFamily: 'Open Sans',
                            display: 'flex',
                            justifyContent: 'center', color: "#DF362D", fontWeight: "bold"
                        }} variant="h6" gutterBottom>
                            Login
                        </Typography>
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
                            <IconButton disabled={inputUserName === "" || inputPassword === ""} aria-label="Add" style={{
                                background: "#FF8300",
                            }} onClick={() => {
                                dispatch(loginOperation({ name: inputUserName, pass: inputPassword })).then((result) => {
                                    navigate(result.error ? "/login" : "/userpage");
                                    setTokenStat(result.error ? true : false);
                                });
                            }}>
                                <LoginIcon />
                            </IconButton>
                        </div>
                        <div style={{ color: "#DF362D", fontFamily: 'Open Sans',
                        fontWeight: "bold", justifyContent: 'center', 
                        display: tokenStat ? 'flex' : 'none', marginTop: '20px' }}>
                            The login information is incorrect. Please check!
                        </div>
                    </Paper>
                </div>
            </Box>
        </Container>
    )
}

export default Login