import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ReactModal from "react-modal";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CssBaseline from "@material-ui/core/CssBaseline";
import SupervisedUserCircleRounded from "@material-ui/icons/SupervisedUserCircleRounded";

import { DependencyInjector } from "../../dependency-injector/DependencyInjector";

import "./ListCandidate.css";
import { Grid } from "@material-ui/core";

const useStyles = (theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

class ListCandidate extends Component {
  constructor(props) {
    super(props);
    this.viewModel = DependencyInjector.default().provideListCandidateViewModel();
    this.state = { ...this.viewModel.getState() };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  async filterByRating(rating){
    await this.viewModel.getAllCandidates(rating);
    this.viewModel.set("rating",rating)
    this.setState({ ...this.viewModel.getState() });
  }

  handleOpenModal(candidate) {
    this.viewModel.handleOpenModal();
    this.setState({ ...this.viewModel.getState() }, () => {
      setImmediate(() => {
        if (!candidate.attachmentFile) {
          return;
        }
        const b64 = candidate.attachmentFile.split(",");
        if (b64[1]) {
          var obj = document.createElement("object");
          obj.style.width = "100%";
          obj.style.height = "570pt";
          obj.style.marginTop = "2em";
          obj.type = "application/pdf";
          obj.data = b64;
          var pdfViewer = document.getElementById("pdfViewer");
          pdfViewer.appendChild(obj);
        }
      });
    });
  }

  handleCloseModal() {
    this.viewModel.handleCloseModal();
    this.setState({ ...this.viewModel.getState() });
  }

  handleOpen = () => {
    this.viewModel.handleOpen();
    this.setState({ ...this.viewModel.getState() });
  };

  handleClose = () => {
    this.viewModel.handleClose();
    this.setState({ ...this.viewModel.getState() });
  };

  async componentDidMount() {
    let result = await this.viewModel.getAllCandidates();
    if (result.code == 401) {
      this.props.routerProps.history.push("/admin/login");
    }
    this.setState({ ...this.viewModel.getState() });
  }

  handleChangePage = (event, newPage) => {
    this.viewModel.handleChangePage(event, newPage);
    this.setState({ ...this.viewModel.getState() });
  };

  handleChangeRowsPerPage = (event) => {
    this.viewModel.handleChangeRowsPerPage(event);
    this.setState({ ...this.viewModel.getState() });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <SupervisedUserCircleRounded className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Candidate Layout
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="lg">
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
          >
            <Button
              autoFocus
              style={{ float: "right", marginTop: "1em" }}
              onClick={this.handleCloseModal}
              color="primary"
            >
              Close
            </Button>
            <div id="pdfViewer"></div>
          </ReactModal>
          <Grid container justify="flex-end" lg={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                Rating
              </InputLabel>
              <Select
                labelId="controlled-open-select-label"
                id="controlled-open-select"
                value={this.viewModel.getState().rating}
                onChange={(event) => {
                  this.filterByRating(event.target.value)
                }}
              >
                <MenuItem value={0}>
                  <em>All</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {this.viewModel.getColumns().map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.tableRows
                    .slice(
                      this.state.page * this.state.rowsPerPage,
                      this.state.page * this.state.rowsPerPage +
                        this.state.rowsPerPage
                    )
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.email}
                        >
                          {this.viewModel.getColumns().map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                  if (column.id == "attachment") {
                                    this.handleOpenModal(row);
                                  } else {
                                    this.props.routerProps.history.push(
                                      `/candidate/${row["email"]}`
                                    );
                                  }
                                }}
                              >
                                {value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={this.state.rowsPerPageOptions}
              component="div"
              count={this.state.tableRows.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={(event, newPage) => {
                this.handleChangePage(event, newPage);
              }}
              onChangeRowsPerPage={(event) => {
                this.handleChangeRowsPerPage(event);
              }}
            />
          </Paper>
        </Container>
      </Fragment>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(ListCandidate);
