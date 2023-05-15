import { Component } from "react";
import { toast } from "react-toastify";
import BookDataService from "../services/book.service";
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";

import { withRouter } from "../common/with-router";

class BookAdd extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.newBook = this.newBook.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      available: false,
      submitted: false,
    };

    // this.navigate = useNavigate();
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  saveBook() {
    const data = {
      title: this.state.title,
      description: this.state.description,
    };

    BookDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          available: response.data.available,
          submitted: false,
        });
        toast.success(`The Book ${response.data.title} was added!`);
        this.props.router.navigate("/books");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newBook() {
    this.setState({
      id: null,
      title: "",
      description: "",
      available: false,
      submitted: false,
    });
  }

  render() {
    const { submitted, title, description } = this.state;

    return (
      <>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item lg={4}>
            <MKBox py={12}>
              <Container>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput label="Title" value={title} onChange={this.onChangeTitle} fullWidth />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      label="Description"
                      value={description}
                      onChange={this.onChangeDescription}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton
                      variant="gradient"
                      color="info"
                      size="large"
                      onClick={this.saveBook}
                      fullWidth
                    >
                      add book
                    </MKButton>
                  </MKBox>
                </MKBox>
                <div className="submit-form">
                  {submitted ? (
                    <div>
                      <h4>The Book was added</h4>
                      <button className="btn btn-success" onClick={this.newBook}>
                        Add another Book
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Container>
            </MKBox>
          </Grid>
        </Grid>
      </>
    );
  }
}

BookAdd.propTypes = {
  router: PropTypes.object,
};

export default withRouter(BookAdd);
