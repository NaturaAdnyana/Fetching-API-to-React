import React from 'react';
import { useEffect, useState, Fragment } from 'react/cjs/react.development';
import { Dialog, Transition } from '@headlessui/react'
import DeleteIcon from '../icons/DeleteIcon';
import EditIcon from '../icons/EditIcon';
import PlusIcon from '../icons/PlusIcon';
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
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [bookTitle, setBookTitle] = useState();
  const [bookAuthor, setBookAuthor] = useState();

  function closeEditModal() {
    setIsOpenEdit(false);
    setBookTitle('');
    setBookAuthor('');
  }
  function openEditModal() {
    setIsOpenEdit(true)
  }

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
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-2 auto-cols-fr'>
        {!value ?
          <RenderingBooks warning={warning} />
          : value.map((book, key) =>
            <div className='p-3 rounded-md bg-blue-200' key={book.id}>
              <h2 className='text-lg font-bold'>{book.title}</h2>
              <p className='text-sm'>{book.author}</p>
              <div className="mt-2 flex justify-end space-x-2">
                <button
                  className='bg-yellow-300 rounded-full hover:bg-yellow-500 p-3 active:animate-spin'
                  onClick={() => {
                    openEditModal();
                    setBookTitle(book.title);
                    setBookAuthor(book.author);
                  }}
                >
                  <EditIcon className='w-4 h-4' />
                </button>
                <button className='bg-red-400 rounded-full hover:bg-red-500 p-3 active:animate-spin'>
                  <DeleteIcon className='w-4 h-4' />
                </button>
              </div>
            </div >
          )
        }
        <div
          className='p-3 rounded-md bg-blue-200 flex justify-center items-center group cursor-pointer hover:bg-blue-300'
          onClick={() => openEditModal()}
        >
          <div
            className='bg-blue-400 rounded-full hover:bg-blue-500 p-3 group-active:animate-ping'
          >
            <PlusIcon className='w-4 h-4' />
          </div>
        </div>
      </div>

      {/* Modals */}
      <Transition appear show={isOpenEdit} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeEditModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white border-2 shadow-xl rounded-2xl text-gray-700">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 bg-indigo-300"
                >
                  <div className='p-3'>Edit Books</div>
                </Dialog.Title>
                <div className="mt-2 py-2 px-6">
                  <form className='space-y-3'>
                    <div>
                      <label htmlFor='book-title'>Title</label>
                      <input
                        id='book-title'
                        type="text"
                        name='title'
                        value={bookTitle || ''}
                        onChange={(e) => {
                          setBookTitle(e.target.value);
                        }}
                        required
                        className='w-full py-1 px-2 border-2 rounded-md'
                        placeholder='book title'
                      />
                    </div>
                    <div>
                      <label htmlFor="">Author</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          setBookAuthor(e.target.value);
                        }}
                        value={bookAuthor || ''}
                        className='w-full py-1 px-2 border-2 rounded-md'
                        placeholder='book author'
                        required
                      />
                    </div>
                  </form>
                </div>

                <div className="mt-4 p-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeEditModal}
                  >
                    Edit this book
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BookList;