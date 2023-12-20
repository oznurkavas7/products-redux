import React, { useEffect } from "react";
import {
    TextField, Container, Box, Paper, Divider, Grid
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { getUserApi } from '../redux/ProductSlice'
import { styled } from '@mui/material/styles';

const UserPage = () => {
    const { userApi } = useSelector(state => state.product);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch((getUserApi()))
    }, []);

    const Root = styled('div')(({ theme }) => ({
        width: '100%',
        ...theme.typography.body2,
        '& > :not(style) ~ :not(style)': {
            marginTop: theme.spacing(2),
        },
    }));

    return (
        <Box m={2} pt={3}>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        <Paper elevation={10} sx={{ padding: "16px", margin: "20px", bgcolor: "#fafafa"}}>
                            <Root>
                                <Divider  style={{ color: "#DF362D",fontWeight: "bold"}}>Personal</Divider>
                                <Grid container direction={"column"} spacing={3}>
                                    <Grid item>
                                        <TextField
                                            id="filled-read-only-input"
                                            label="Username"
                                            defaultValue={userApi?.username}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="filled-read-only-input"
                                            label="Firstname"
                                            defaultValue={userApi?.name.firstname}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="filled-read-only-input"
                                            label="Lastname"
                                            defaultValue={userApi?.name.lastname}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="filled"
                                        />
                                    </Grid>
                                </Grid>
                            </Root>
                        </Paper>
                        <Paper elevation={10} sx={{  padding: "16px", margin: "20px" }}>
                            <Root>
                                <Divider style={{ color: "#DF362D",fontWeight: "bold"}}>Contact</Divider>
                                <Grid container direction={"column"} spacing={3}>
                                    <Grid item>
                                        <TextField
                                            id="filled-read-only-input"
                                            label="Email"
                                            defaultValue={userApi?.email}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="filled-read-only-input"
                                            label="Phone"
                                            defaultValue={userApi?.phone}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="filled"
                                        />
                                    </Grid>
                                </Grid>

                            </Root>
                        </Paper>
                        <Paper elevation={10} sx={{ padding: "16px", margin: "20px", bgcolor: "#fafafa" }}>
                            <Root>
                                <Divider style={{ color: "#DF362D",fontWeight: "bold"}}>Address</Divider>
                                <Grid container direction={"column"} spacing={3}>
                                    <Grid item>
                                        <TextField
                                            id="filled-read-only-input"
                                            label="City"
                                            defaultValue={userApi?.address.city}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="filled-read-only-input"
                                            label="Street"
                                            defaultValue={userApi?.address.street}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="filled-read-only-input"
                                            label="Zip"
                                            defaultValue={userApi?.address.zipcode}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="filled"
                                        />
                                    </Grid>
                                </Grid>
                            </Root>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Box>


    )
}

export default UserPage
