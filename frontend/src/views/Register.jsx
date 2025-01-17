import React, { useState, useContext } from "react";
import { AuthenticationContext } from "../auth";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LinkStyle from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

export function Register() {
    const authContext = useContext(AuthenticationContext);
    const history = useHistory();
    const [auth, setAuth] = useState({
        username: "",
        password: "",
        last_name: "",
        first_name: "",
        email: "",
    });

    function Copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {"Copyright © "}
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(3),
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
                    Sign up
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={(event) => {
                        fetch(`/api/register`, {
                            method: "POST",
                            body: JSON.stringify(auth),
                            headers: [["Content-Type", "application/json"]],
                        })
                            .then((res) => res.json())
                            .then((res) => {
                                setAuth({username: "", password: ""});
                                authContext.setToken(res.token);
                                history.push("/search");
                            })
                            .catch(() => {
                                // setError
                            });

                        event.preventDefault();
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="fname"
                                autoFocus
                                value={auth.first_name}
                                onChange={(e) => {
                                    console.log(auth);
                                    const value = e.target.value;
                                    setAuth((s) => ({...s, first_name: value}));
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={auth.last_name}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setAuth((s) => ({...s, last_name: value}));
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={auth.email}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setAuth((s) => ({...s, email: value}));
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <LinkStyle variant="body2">
                                <Link to="/login">Already have an account? Sign in</Link>
                            </LinkStyle>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}
