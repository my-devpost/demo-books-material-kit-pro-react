import { Component } from "react";
import BookDataService from "../services/book.service";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import nobooks from "../assets/nobooks.png";
import cover from "../assets/not-available.png";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import Stack from "@mui/material/Stack";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";

import PropTypes from "prop-types";
import Table from "examples/Tables/Table";

import MKAvatar from "components/MKAvatar";

function Book({ title, description }) {
  return (
    <MKBox display="flex" alignItems="center" px={1} py={0.5}>
      <MKBox display="flex" flexDirection="column" pl={1}>
        <MKTypography variant="button" fontWeight="medium">
          {title}
        </MKTypography>
        <MKTypography variant="caption" color="secondary">
          {description}
        </MKTypography>
      </MKBox>
    </MKBox>
  );
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

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
    // const { searchTitle, books, currentBook, currentIndex } = this.state;
    const { searchTitle, books, currentBook } = this.state;

    const columns = [
      { name: "book", align: "left" },
      { name: "action", align: "right" },
    ];

    let rows = [];
    books.map((book, index) => {
      rows.push({
        book: <Book title={book.title} description={book.description} />,
        action: (
          <MKTypography
            component="a"
            href={"/books/" + book.id}
            variant="caption"
            color="secondary"
            fontWeight="medium"
            pr={3}
          >
            Edit
          </MKTypography>
        ),
        key: { index },
      });
    });

    // const rows = [
    //   {
    //     book: <Book title="111" description="111" />,
    //     action: (
    //       <MKTypography
    //         component="a"
    //         href="/books/1"
    //         variant="caption"
    //         color="secondary"
    //         fontWeight="medium"
    //         pr={3}
    //       >
    //         Edit
    //       </MKTypography>
    //     ),
    //   },
    //   {
    //     book: <Book title="111" description="111" />,
    //     action: (
    //       <MKTypography
    //         component="a"
    //         href="/books/2"
    //         variant="caption"
    //         color="secondary"
    //         fontWeight="medium"
    //         pr={3}
    //       >
    //         Edit
    //       </MKTypography>
    //     ),
    //   },
    //   {
    //     book: <Book title="111" description="111" />,
    //     action: (
    //       <MKTypography
    //         component="a"
    //         href="/books/3"
    //         variant="caption"
    //         color="secondary"
    //         fontWeight="medium"
    //         pr={3}
    //       >
    //         Edit
    //       </MKTypography>
    //     ),
    //   },
    // ];

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
                <MKInput
                  label="Search by title"
                  value={searchTitle}
                  onChange={this.onChangeSearchTitle}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} lg={3} sx={{ mt: 2 }}>
                <MKButton color="secondary" onClick={this.searchByTitle}>
                  Search
                </MKButton>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" py={5}>
              {currentBook ? (
                <Container>
                  <Grid container item xs={12} lg={10} mx="auto">
                    <MKAvatar src={cover} alt="bookname" shadow="md" variant="rounded" />
                    <MKBox pl={2} lineHeight={0}>
                      <MKTypography
                        component="h6"
                        variant="button"
                        fontWeight="medium"
                        gutterBottom
                      >
                        {currentBook.title}
                      </MKTypography>
                      <MKTypography component="h6" variant="caption" color="text">
                        {currentBook.description}
                      </MKTypography>
                      <MKTypography variant="button" color="text">
                        {currentBook.available ? "Available" : "Lent"}
                      </MKTypography>
                    </MKBox>
                  </Grid>
                </Container>
              ) : (
                ""
              )}
            </Grid>
            <Grid container justifyContent="center" py={5}>
              {books.length > 0 ? (
                <Container>
                  <Grid container item xs={12} lg={10} mx="auto">
                    <Table columns={columns} rows={rows} />
                  </Grid>
                </Container>
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
      </>
    );
  }
}
