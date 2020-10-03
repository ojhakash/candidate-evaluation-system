import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { DependencyInjector } from "../../dependency-injector/DependencyInjector";
import SnackbarComponent from "../../common/snackbar/SnackbarComponent";

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

class Register extends Component {
  constructor(props) {
    super(props);
    this.viewModel = DependencyInjector.default().provideRegisterUserViewModel();
  }

  onUserRegister = async () => {
    await this.viewModel.onRegisterUser();
    this.setState({ ...this.viewModel.getState() });
  };

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
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  onChange={(event) =>
                    this.viewModel.set("userName", event.target.value)
                  }
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
                this.onUserRegister();
              }}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/admin/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Register);
