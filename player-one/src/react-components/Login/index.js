import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import "./style.css"

export default function SignIn() {
    const SignInHandler = function (event) {
        event.preventDefault();
        console.log("Sign in clicked");
    };
    return (
        // <div>component="main" maxWidth="xs"
        <div className={"MasterContainer"}>
            <div>
                <div className={"SignInForm"}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form noValidate>
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
                            autoComplete="current-password"
                        />
                        <Grid container className={"SignInText"}>
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={SignInHandler}
                                >Sign In
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </div>

    );
}