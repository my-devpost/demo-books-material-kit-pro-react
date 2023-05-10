import React, { Component } from "react";
import BookDataService from "../services/book.service";
import { Link } from "react-router-dom";

export default class BookList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveBooks = this.retrieveBooks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBook = this.setActiveBook.bind(this);
    this.removeAllBooks = this.removeAllBooks.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      Book: [],
      currentBook: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveBook();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveBooks() {
    BookDataService.getAll()
      .then(response => {
        this.setState({
          Book: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBook();
    this.setState({
      currentBook: null,
      currentIndex: -1
    });
  }

  setActiveBook(Book, index) {
    this.setState({
      currentBook: Book,
      currentIndex: index
    });
  }

  removeAllBooks() {
    BookDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentBook: null,
      currentIndex: -1
    });

    BookDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          Book: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, Book, currentBook, currentIndex } = this.state;

    return (
      <div className="list row">
      </div>
    );
  }
}