import * as React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";

export default class SnackbarComponent extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: this.props.vertical,
          horizontal: this.props.horizontal,
        }}
        open={this.props.open}
        onClose={this.handleClose}
        autoHideDuration={
          this.props.autoHideDuration
            ? this.props.autoHideDuration
            : this.props.className === "snackbar-success"
            ? 2000
            : 3500
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
      >
        <SnackbarContent
          className={this.props.className}
          message={
            <span
              id="message-id"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {this.props.className === "snackbar-success" ? (
                <CheckCircleIcon
                  style={{
                    fontSize: "20px",
                    marginRight: "10px",
                    position: "relative",
                    top: 0,
                  }}
                />
              ) : (
                <ErrorIcon
                  style={{
                    fontSize: "20px",
                    marginRight: "10px",
                    position: "relative",
                    top: 0,
                  }}
                />
              )}

              {this.props.message}
            </span>
          }
        />
      </Snackbar>
    );
  }
}
