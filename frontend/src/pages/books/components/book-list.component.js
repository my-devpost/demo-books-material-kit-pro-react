import { Component } from "react";
import BookDataService from "../services/book.service";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import nobooks from "../assets/nobooks.png";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import Stack from "@mui/material/Stack";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";

export default class BookList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveBooks = this.retrieveBooks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBook = this.setActiveBook.bind(this);
    this.removeAllBooks = this.removeAllBooks.bind(this);
    this.searchByTitle = this.searchByTitle.bind(this);

    this.state = {
      books: [],
      currentBook: null,
      currentIndex: 0,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.retrieveBooks();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveBooks() {
    BookDataService.getAll()
      .then((response) => {
        this.setState({
          books: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBooks();
    this.setState({
      currentBook: null,
      currentIndex: -1,
    });
  }

  setActiveBook(book, index) {
    this.setState({
      currentBook: book,
      currentIndex: index,
    });
  }

  removeAllBooks() {
    BookDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        toast.success("All books removed!");
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchByTitle() {
    this.setState({
      currentBook: null,
      currentIndex: -1,
    });

    BookDataService.findByTitle(this.state.searchTitle)
      .then((response) => {
        this.setState({
          books: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, books, currentBook, currentIndex } = this.state;

    return (
      <>
        <MKBox component="section" py={12}>
          <Container>
            <Grid container spacing={1}>
              <Grid item xs={12} lg={3} sx={{ mt: 2 }} />
              <Grid item xs={12} lg={3} sx={{ mt: 2 }}>
                <MKTypography display="block" variant="h3" fontWeight="bold" color="text" mb={1}>
                  Book List
                </MKTypography>
              </Grid>
              <Grid item xs={12} lg={3} sx={{ mt: 2 }}>
                <MKInput label="Search by title" value={searchTitle} fullWidth />
              </Grid>
              <Grid item xs={12} lg={3} sx={{ mt: 2 }}>
                <MKButton color="secondary" onClick={this.searchByTitle}>
                  Search
                </MKButton>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <ul className="list-group">
                {books.length > 0 ? (
                  books.map((book, index) => (
                    <li
                      className={"list-group-item " + (index === currentIndex ? "active" : "")}
                      onClick={() => this.setActiveBook(book, index)}
                      key={index}
                    >
                      <div className="left">{book.title}</div>
                      <div className="right">
                        <Link to={"/books/" + book.id} className="badge badge-warning">
                          Edit
                        </Link>
                      </div>
                    </li>
                  ))
                ) : (
                  <MKBox
                    component="img"
                    src={nobooks}
                    alt="No books"
                    maxWidth="15rem"
                    width="100%"
                    margin="10% 0"
                    display={{ xs: "none", lg: "block" }}
                  />
                )}
              </ul>
            </Grid>
            <Grid container justifyContent="center">
              <Stack direction="row" alignItems="flex-end" spacing={1}>
                <Link to={"/books/add"}>
                  <MKButton color="info"> Add Book </MKButton>
                </Link>
                {books.length > 0 ? (
                  <MKButton color="error" onClick={this.removeAllBooks}>
                    Remove All Books
                  </MKButton>
                ) : (
                  ""
                )}
              </Stack>
            </Grid>
          </Container>
        </MKBox>
        <div className="list row">
          {currentBook ? (
            <div className="col-md-12 mb-5">
              <div className="row books-row">
                <div className="col-3">
                  <div className="cover" />
                </div>
                <div className="col-9">
                  <h4>Book</h4>
                  <div>
                    <label>
                      <strong>Title:</strong>
                    </label>{" "}
                    {currentBook.title}
                  </div>
                  <div>
                    <label>
                      <strong>Description:</strong>
                    </label>{" "}
                    {currentBook.description}
                  </div>
                  <div>
                    <label>
                      <strong>Availability:</strong>
                    </label>{" "}
                    {currentBook.available ? "Available" : "Lent"}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}
