import React, { Component, Fragment } from "react";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import {
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { DependencyInjector } from "../../dependency-injector/DependencyInjector";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import SupervisedUserCircleRounded from "@material-ui/icons/SupervisedUserCircleRounded";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Comment from "../../components/comment/Comment";
import Rating from "@material-ui/lab/Rating";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = (theme) => ({
  root: {
    width: "100%",
    marginTop: "2em",
    padding: "2em",
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

class CandidateDetails extends Component {
  constructor(props) {
    super(props);
    this.viewModel = DependencyInjector.default().provideCandidateDetailsViewModel();
    this.state = {
      error: false,
    };
  }

  async componentDidMount() {
    await this.getCandidateDetails();
  }

  async getCandidateDetails() {
    let result = await this.viewModel.getCadidateDetails(
      this.props.routerProps.match.params.candidateId
    );
    if (result.code == 401) {
      this.props.routerProps.history.push("/admin/login");
    }
    this.setState({ ...this.state, ...this.viewModel.getState() });
  }

  async addComment() {
    await this.viewModel.addComment();
    await this.getCandidateDetails();
  }
  async addRating(rating) {
    await this.viewModel.addRating(rating);
    await this.getCandidateDetails();
  }
  render() {
    let { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <SupervisedUserCircleRounded className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Candidate Details
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="lg">
          <Card className={classes.root}>
            <div>
              <Grid
                container
                justify="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid spacing={2} item xl={12}>
                  <div>
                    <b>Name</b>: {this.viewModel.getState().name}
                  </div>
                </Grid>
                <Grid spacing={2} item xl={12}>
                  <div>
                    <b>Email</b>: {this.viewModel.getState().email}
                  </div>
                </Grid>
              </Grid>
              <Grid
                container
                justify="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid spacing={2} item xl={12}>
                  <div>
                    <b>IP</b>: {this.viewModel.getState().ip}
                  </div>
                </Grid>
                <Grid spacing={2} item xl={12}>
                  <div>
                    <b>Location</b>: {this.viewModel.getState().location}
                  </div>
                </Grid>
              </Grid>
              <Grid
                container
                justify="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid spacing={2} item xl={12}>
                  <div>
                    <b>Web Address</b>: {this.viewModel.getState().webAddress}
                  </div>
                </Grid>
              </Grid>
              <Grid
                container
                justify="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid spacing={2} item xl={12}>
                  <div>
                    <b>Cover Letter</b>: {this.viewModel.getState().coverLetter}
                  </div>
                </Grid>
              </Grid>
              <Grid
                container
                justify="flex-end"
                alignItems="flex-end"
                spacing={2}
              >
                <b>Rating :</b>
                <Rating
                  name="read-only"
                  value={this.viewModel.getState().rating}
                  readOnly
                />
              </Grid>
            </div>
          </Card>
          <Grid container justify="space-between">
            <Grid>
              <Typography variant="h6" color="inherit" noWrap>
                Comments
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h6" color="inherit" noWrap>
                Give A Rating to the Candidate
              </Typography>
              <Rating
                name="read-only"
                value={this.viewModel.getState().myGivenRating}
                onChange={(e)=>{ this.addRating(e.target.value) }}
              />
            </Grid>
          </Grid>

          <Grid
            style={{
              maxHeight: "40em",
              overflowX: "hidden",
              overflowY: "scroll",
            }}
          >
            <ThemeProvider theme={darkTheme}>
              <Comment comments={this.viewModel.getState().comments} />
            </ThemeProvider>
          </Grid>
          <Grid
            justify="space-between"
            alignItems="stretch"
            container
            item
            xs={12}
          >
            <Grid xs={10}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="commenText"
                label="Comment Text"
                name="commenText"
                autoComplete="commenText"
                onChange={(event) =>
                  this.viewModel.set("commentText", event.target.value)
                }
              />
            </Grid>
            <Grid>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
                onClick={(e) => {
                  this.addComment();
                }}
              >
                Comment
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}
export default withStyles(useStyles, { withTheme: true })(CandidateDetails);
