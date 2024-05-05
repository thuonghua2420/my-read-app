import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import PropTypes from "prop-types"
 
const DataBook = (dataBook) => {
    const { book, updateSheft, checkSearch } = dataBook;
 
    const sheftBook = [
        { id: 1, value: "currentlyReading", showName: "Currently Reading" },
        { id: 2, value: "wantToRead", showName: "Want to Read" },
        { id: 3, value: "read", showName: "Read" },
        { id: 4, value: "none", showName: "None" }
    ]
 
    const changeSheft = event => {
        let sheft = event.target.value;
        if (sheft !== "move") {
            if (checkSearch) {
                BooksAPI.update(book, event.target.value);
            } else {
                BooksAPI.update(book, sheft).then(() =>
                    updateSheft(book, sheft)
                );
            }
        }
    }

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${book.imageLinks && book.imageLinks.thumbnail}")`
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select onChange={event => changeSheft(event)} defaultValue={book.shelf}>
                        <option value="move" disabled>
                            Move to...
                        </option>
                        {sheftBook.map(option => {
                            return (
                                <option key={option.id} value={option.value}>
                                    {option.showName}
                                </option>
                            )
                        })}
 
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors"> {book.authors}</div>
        </div>
    );
};
 
DataBook.propTypes = {
    book : PropTypes.object,
    updateSheft : PropTypes.func,
    checkSearch : PropTypes.bool
}
 
export default DataBook;