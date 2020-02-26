import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import "./style.css"

export default function Signup() {
    const SignUpHandler = function (e) {
        e.preventDefault();
        console.log("Sign up clicked");
    };
    return (
        // <div>component="main" maxWidth="xs"
        <div className={"MasterContainer"}>
            <div>
                <div className={"SignUpForm"}>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form noValidate size={"xs"}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            // autoComplete="current-password"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="re-enter-password"
                            label="Retype Password"
                            type="re-enter-password"
                            id="re-enter-password"
                            // autoComplete="current-password"
                        />
                        <Grid container className={"SignUpText"}>
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={SignUpHandler}
                                >Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </div>

    );
}