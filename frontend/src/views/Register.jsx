import React, { useState, useContext } from "react";
import { AuthenticationContext } from "../auth";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

export function Register() {
  const authContext = useContext(AuthenticationContext);
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
                    })
                    .then()
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
                      console.log(auth.password)
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
                <Link href="\login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright/>
        </Box>
      </Container>
  );
}{}
