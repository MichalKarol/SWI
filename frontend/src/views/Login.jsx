import React, { useState, useContext } from "react";
import { AuthenticationContext } from "../auth";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from "react-router-dom";
import {BlueLink} from "../components/StyledComponents";

export function Login() {
    const authContext = useContext(AuthenticationContext);
    const history = useHistory();
    const [auth, setAuth] = useState({
        username: "",
        password: "",
    });

    function Copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">
                    SWI project
                </Link>
                {new Date().getFullYear()}
            </Typography>
        );
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={(event) => {
                        fetch(`/api/login`, {
                            method: "POST",
                            body: JSON.stringify(auth),
                            headers: [["Content-Type", "application/json"]],
                        })
                            .then((res) => res.json())
                            .then((res) => {
                                setAuth({username: "", password: ""});
                                authContext.setToken(res.token);
                            })
                            .then()
                            .catch(() => {
                                // setError
                            });

                        event.preventDefault();
                    }}
                >
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
                        value={auth.username}
                        onChange={(e) => {
                            const value = e.target.value;
                            setAuth((s) => ({...s, username: value}));
                        }}
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
                        value={auth.password}
                        onChange={(e) => {
                            const value = e.target.value;
                            setAuth((s) => ({...s, password: value}));
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/*<Link href="#" variant="body2">*/}
                            {/*  Forgot password?*/}
                            {/*</Link>*/}
                        </Grid>
                        <Grid item>
                            <Link
                                onClick={() => history.push("/register")}
                                variant="body2"
                            >
                                <a href={"/register"}>Don't have an account? Sign Up</a>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}
