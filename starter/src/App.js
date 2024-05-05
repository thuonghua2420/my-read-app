import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
 
function App() {
  const [books, setBooks] = useState([]);
 
  const bookShelf = [
    { id: 1, title: "Currently Reading", type: "currentlyReading" },
    { id: 2, title: "Want to Read", type: "wantToRead" },
    { id: 3, title: "Read", type: "read" }
  ];
 
  useEffect(() => {
    BooksAPI.getAll().then(allBooks => {
      setBooks(allBooks);
    });
  }, []);
 
  const updateSheft = (book, shelf) => {
    const newBooks = books.map(newBook => {
      if(book.id === newBook.id){
        book.shelf = shelf;
        return book;
      }
      return newBook;
    })
    setBooks(newBooks);
  }
 
  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {bookShelf.map((shelf) => {
                let listBook = books && books.filter(book => book && book.shelf === shelf.type)
                return (
                  <BookShelf key={shelf.id} title={shelf.title} books={listBook} updateSheft = {updateSheft} />
                )
              })}
            </div>
          </div>
          <div className="open-search">
            <Link to={`search`}>Add a book</Link>
          </div>
        </div>
    </div>
  );
}
 
export default App;