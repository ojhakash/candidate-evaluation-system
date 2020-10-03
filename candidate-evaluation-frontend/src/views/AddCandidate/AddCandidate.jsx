import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Dropzone from "react-dropzone";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "@material-ui/core/Link";

import { DependencyInjector } from "../../dependency-injector/DependencyInjector";
import SnackbarComponent from "../../common/snackbar/SnackbarComponent";
import Constans from "../../resources/Constans";

import "./AddCandidate.css";

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
  adminLink: {
    position: "fixed",
    top: "1em",
    right: "1em",
  },
});

class AddCandidate extends Component {
  constructor(props) {
    super(props);
    this.viewModel = DependencyInjector.default().provideAddCandidateViewModel();
    this.state = {
      error: false,
    };
  }
  onAddNewCandidate = async () => {
    await this.viewModel.onAddNewCandidate();
    this.setState({
      error: this.viewModel.getState().error,
      success: this.viewModel.getState().success,
    });
  };

  componentWillReceiveProps(nextProps) {}

  render() {
    let { classes } = this.props;
    return (
      <Container component="main" maxWidth="md">
        <Grid container justify="flex-end" className={classes.adminLink}>
          <Grid item>
            <Link href="/admin/login" variant="body2">
              Are you an admin? Please Sign in
            </Link>
          </Grid>
        </Grid>
        {this.state.error && (
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
        {this.state.success && (
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
            <SupervisedUserCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            Candidate Feedback
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Full name"
                  name="name"
                  autoComplete="name"
                  onChange={(event) =>
                    this.viewModel.set("name", event.target.value)
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
                  id="webAddress"
                  label="Web Address"
                  name="webAddress"
                  autoComplete="webAddress"
                  onChange={(event) =>
                    this.viewModel.set("webAddress", event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                Do you like working here?
                <Switch
                  //   checked={false}
                  onChange={() => {
                    this.viewModel.set(
                      "fondOfWorking",
                      !this.viewModel.state.fondOfWorking
                    );
                  }}
                  color="primary"
                  name="fondOfWorking"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="coverLetter"
                  required
                  fullWidth
                  label="Cover letter"
                  multiline
                  rows={6}
                  name="coverLetter"
                  variant="outlined"
                  onChange={(event) =>
                    this.viewModel.set("coverLetter", event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Dropzone
                  onDrop={this.viewModel.onDrop}
                  className="dropzone"
                  multiple={false}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section className="container">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files.Only .pdf files supported.
                        </p>
                      </div>
                      <aside>
                        <h4>Files</h4>
                        <ul>
                          {this.viewModel.state.attachments.map((file) => (
                            <li key={file.name}>
                              {file.name} - {file.size} bytes
                            </li>
                          ))}
                        </ul>
                      </aside>
                    </section>
                  )}
                </Dropzone>
              </Grid>
              <Grid>
                <ReCAPTCHA
                  sitekey={Constans.CAPTCHA_CLIENT_SECERT}
                  onChange={(value) => this.viewModel.set("captcha", value)}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                this.onAddNewCandidate();
              }}
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(AddCandidate);
