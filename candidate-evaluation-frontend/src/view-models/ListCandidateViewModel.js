import React from "react";

import BaseViewModel from "./BaseViewModel";
import PictureAsPdf from "@material-ui/icons/PictureAsPdf";

function createData(
  name,
  email,
  webAddress,
  attachment,
  fondOfWorking,
  attachmentFile
) {
  let data = {
    name,
    email,
    webAddress,
    attachment,
    fondOfWorking,
    attachmentFile,
  };
  return data;
}

export default class ListCandidateViewModel extends BaseViewModel {
  constructor(candidateRepository) {
    super();
    this.candidateRepository = candidateRepository;
    this.state = this.defaultState();
  }

  defaultState() {
    return {
      page: 0,
      rowsPerPage: 10,
      rowsPerPageOptions: [10, 25, 100],
      tableRows: [],
      pdfurl: "",
      open: false,
      rating: 0,
    };
  }

  handleCloseModal() {
    this.setState({ ...this.state, showModal: false });
  }

  handleOpen = () => {
    this.setState({ ...this.state, open: true });
  };

  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ page: 0, rowsPerPage: +event.target.value });
  };

  handleOpenModal(candidate) {
    this.setState({ showModal: true });
  }

  getColumns() {
    const columns = [
      { id: "name", label: "Name", minWidth: 100 },
      { id: "email", label: "Email", minWidth: 180 },
      {
        id: "webAddress",
        label: "Web Address",
        minWidth: 200,
      },
      {
        id: "attachment",
        label: "Attachment",
        minWidth: 100,
        align: "center",
      },
      {
        id: "fondOfWorking",
        label: "Fond Of Working",
        minWidth: 100,
        align: "center",
      },
    ];
    return columns;
  }

  async getAllCandidates(rating = 0) {
    let result = await this.candidateRepository.getCandidates(rating);
    if (result.code !== 200) {
      return result;
    }
    let candidates = result.data;

    let tableRows = candidates.map((candidate) => {
      let fondOfWorking;
      if(candidate.fondOfWorking =='true'){
        fondOfWorking = "Yes"
      }else{
        fondOfWorking = "No"
      }
      return createData(
        candidate.name,
        candidate.email,
        candidate.webAddress,
        <PictureAsPdf />,
        fondOfWorking,
        candidate.attachment
      );
    });
    this.setState({ tableRows });
    return result;
  }
}
