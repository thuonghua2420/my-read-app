import React, { useState, useRef } from "react";
import * as BooksAPI from "./BooksAPI";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import DataBook from "./DataBook";
 
const BookSearch = () => {
  const [searchBook, setSearchBook] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const debounceSearch = useRef(debounce(value => search(value), 200)).current;
 
  const handleChange = (event) => {
    let value = event.target.value;
    setQuery(value);
    debounceSearch(value);
  }
 
  const search = (query) => {
    if (query) {
      BooksAPI.search(query).then(books => {
        if (!books.error) {
          BooksAPI.getAll().then(myBooks => {
            setSearchBook(setShelves(books, myBooks));
          });
        } else {
          setSearchBook([]);
        }
      });
    } else {
      setSearchBook([]);
    }
  }
 
  const setShelves = (books, addBooks) => {
 
    return books.map(book => {
      for (let i = 0; i < addBooks.length; i++) {
        if (addBooks[i].id === book.id) {
          return { ...book, shelf: addBooks[i].shelf };
        }
      }
 
      return { ...book, shelf: "none" };
    });
  };
 
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" onClick={() => navigate(-1)}>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={e => handleChange(e)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchBook.map((book) => {
            return (
              <li>
                <DataBook key={book.id} book={book} checkSearch/>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  );
};
 
export default BookSearch;