import React from "react";
import PropTypes from "prop-types"
import "./App.css";
import DataBook from "./DataBook";
 
const BookShelf = (bookListData) => {
    const {title, books, updateSheft} = bookListData;
   
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => {
                        return (
                            <li key={book.id}>
                                <DataBook book={book} updateSheft = {updateSheft} />
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
    );
};
 
BookShelf.propTypes = {
    books : PropTypes.array,
    updateSheft : PropTypes.func,
    title : PropTypes.string
}
 
export default BookShelf;
 