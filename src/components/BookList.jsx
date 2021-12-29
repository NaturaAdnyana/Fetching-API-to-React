import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
// import { getBooks } from '../actions/dicodingBook';

const RenderingBooks = (props) => {
  const elements = [1, 2, 3];
  return (
    <>
      {props.warning ?
        // <h1 className='col-span-2 md:col-span-3 text-center bg-red-300 py-2 rounded'>{props.warning}</h1>
        <h1 className='col-span-2 md:col-span-3 text-center bg-gray-200 text-gray-400 py-8 rounded'>{props.warning}</h1>
        :
        elements.map((value) =>
          <div
            className='p-3 rounded-md bg-blue-200 animate-pulse'
            key={value}
          >
            <div className="space-y-6 py-1">
              <div className="space-y-3">
                <div className="h-2 bg-gray-400 rounded"></div>
                <div className="h-2 bg-gray-400 rounded"></div>
                <div className="h-7 bg-gray-400 rounded"></div>
              </div>
            </div >
          </div>
        )
      }
    </>
  )
}

const BookList = () => {
  const [booksData, setBooksData] = useState({
    warning: "",
    value: "",
  });
  useEffect(() => {
    const baseUrl = 'https://books-api.dicoding.dev';
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const responseJson = JSON.parse(this.responseText);
      if (responseJson.error) {
        setBooksData({
          warning: responseJson.message,
          value: null,
        });
      }
      else {
        const data = responseJson.books;
        setBooksData({
          warning: null,
          value: data,
        });
      }
    }
    xhr.onerror = function () {
      setBooksData({
        warning: 'Whoops! something went wrong ⚠',
        value: null,
      });
    };
    xhr.open("GET", `${baseUrl}/list`);
    xhr.send();
  }, []);
  const { warning, value } = booksData;
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-2 auto-cols-fr'>
      {!value ?
        <RenderingBooks warning={warning} />
        : value.map((book, key) =>
          <div className='p-3 rounded-md bg-blue-200' key={book.id}>
            <h2 className='text-lg'>{book.title}</h2>
            <p className='text-sm'>{book.author}</p>
            <button className='py-1 bg-red-400 mt-2 rounded-md w-full hover:bg-red-500'>Hapus</button>
          </div >
        )
      }
    </div>
  );
};

export default BookList;