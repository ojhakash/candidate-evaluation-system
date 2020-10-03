import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { DependencyInjector } from "../../dependency-injector/DependencyInjector";
import SnackbarComponent from '../../common/snackbar/SnackbarComponent';

const useStyles = (theme) => ({
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
});

class Signin extends Component {
  constructor(props) {
    super(props);
    this.viewModel = DependencyInjector.default().provideSigninUserViewModel();
  }

  onSigninUser= async ()=>{
    await this.viewModel.onSigninUser();
    this.setState({...this.viewModel.getState()})
    if(this.state.success){
      this.props.routerProps.history.push('/dashboard');
    }
  }

  render() {
    let { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        {this.viewModel.state.error && (
          <SnackbarComponent
            className={"snackbar-error"}
            message={this.viewModel.state.error.message}
            vertical={"top"}
            horizontal={"right"}
            open={true}
            onClose={() => {
              this.setState({ error: false });
              this.viewModel.set("error", null);
              this.viewModel.set("success", null);
            }}
          />
        )}
        {this.viewModel.state.success && (
          <SnackbarComponent
            className={"snackbar-success"}
            message={this.viewModel.state.success}
            vertical={"top"}
            horizontal={"right"}
            open={true}
            onClose={() => {
              this.setState({ error: false });
              this.viewModel.set("error", null);
              this.viewModel.set("success", null);
            }}
          />
        )}
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) =>
                    this.viewModel.set("email", event.target.value)
                  }
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
                  onChange={(event) =>
                    this.viewModel.set("password", event.target.value)
                  }
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                this.onSigninUser();
              }}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/admin/register" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Signin);
