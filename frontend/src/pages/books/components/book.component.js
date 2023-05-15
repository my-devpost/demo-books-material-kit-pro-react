import React, { Component } from "react";
import BookDataService from "../services/book.service";
import { withRouter } from "../common/with-router";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import Stack from "@mui/material/Stack";

class Book extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getBook = this.getBook.bind(this);
    this.updateAvailable = this.updateAvailable.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);

    this.state = {
      currentBook: {
        id: null,
        title: "",
        description: "",
        available: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getBook(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentBook: {
          ...prevState.currentBook,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentBook: {
        ...prevState.currentBook,
        description: description,
      },
    }));
  }

  getBook(id) {
    BookDataService.get(id)
      .then((response) => {
        this.setState({
          currentBook: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateAvailable(status) {
    var data = {
      id: this.state.currentBook.id,
      title: this.state.currentBook.title,
      description: this.state.currentBook.description,
      available: status,
    };

    BookDataService.update(this.state.currentBook.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentBook: {
            ...prevState.currentBook,
            available: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateBook() {
    BookDataService.update(this.state.currentBook.id, this.state.currentBook)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The book was updated successfully!",
        });

        this.props.router.navigate("/books");
        toast.success(`The Book was updated successfully`);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteBook() {
    BookDataService.delete(this.state.currentBook.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The Book was deleted successfully",
        });

        this.props.router.navigate("/books");
        toast.success(`The Book was deleted successfully`);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentBook } = this.state;

    return (
      <>
        {currentBook ? (
          <Grid container justifyContent="center" spacing={2}>
            <Grid item lg={4}>
              <MKBox py={12}>
                <Container>
                  <MKTypography display="block" variant="h3" fontWeight="bold" color="text" mb={5}>
                    Book
                  </MKTypography>
                  <MKBox component="form" role="form">
                    <MKBox mb={2}>
                      <MKInput
                        label="Title"
                        value={currentBook.title}
                        onChange={this.onChangeTitle}
                        fullWidth
                      />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput
                        label="Description"
                        value={currentBook.description}
                        onChange={this.onChangeDescription}
                        fullWidth
                      />
                    </MKBox>
                    <MKBox mb={4}>
                      <MKInput
                        disabled
                        label="Availability"
                        value={currentBook.available ? "Available" : "Lent"}
                        onChange={this.onChangeDescription}
                        fullWidth
                      />
                    </MKBox>
                    <Grid container justifyContent="center">
                      <Stack direction="row" alignItems="flex-end" spacing={1}>
                        <MKButton variant="gradient" color="success" onClick={this.updateBook}>
                          update
                        </MKButton>
                        <MKButton variant="gradient" color="error" onClick={this.deleteBook}>
                          delete
                        </MKButton>
                        {currentBook.available ? (
                          <MKButton
                            variant="gradient"
                            color="info"
                            onClick={() => this.updateAvailable(false)}
                          >
                            lent book
                          </MKButton>
                        ) : (
                          <MKButton
                            variant="gradient"
                            color="info"
                            onClick={() => this.updateAvailable(true)}
                          >
                            return to library
                          </MKButton>
                        )}
                      </Stack>
                    </Grid>
                  </MKBox>
                </Container>
              </MKBox>
            </Grid>
          </Grid>
        ) : (
          <div>
            <br />
            <p>Please click on a Book...</p>
          </div>
        )}
      </>
    );
  }
}

Book.propTypes = {
  router: PropTypes.object,
};

export default withRouter(Book);
