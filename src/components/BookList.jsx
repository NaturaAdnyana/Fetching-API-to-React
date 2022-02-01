import React from "react";
import { useEffect, useState, Fragment } from "react/cjs/react.development";
import { Dialog, Transition } from "@headlessui/react";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import PlusIcon from "../icons/PlusIcon";
import CloseButton from "../utilities/CloseButton";

const RenderingBooks = (props) => {
  const elements = [1, 2, 3];
  return (
    <>
      {props.warning ? (
        <h1 className="col-span-2 md:col-span-3 text-center bg-gray-200 text-gray-400 py-8 rounded">
          {props.warning}
        </h1>
      ) : (
        elements.map((value) => (
          <div className="p-3 rounded-md bg-blue-200 animate-pulse" key={value}>
            <div className="space-y-6 py-1">
              <div className="space-y-3">
                <div className="h-2 bg-gray-400 rounded"></div>
                <div className="h-2 bg-gray-400 rounded"></div>
                <div className="h-7 bg-gray-400 rounded"></div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

const BookList = () => {
  const [booksData, setBooksData] = useState({
    warning: "",
    value: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isInsert, setIsInsert] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [bookID, setBookID] = useState();
  const [bookTitle, setBookTitle] = useState();
  const [bookAuthor, setBookAuthor] = useState();

  function closeModal() {
    setIsOpen(false);
    setIsInsert(false);
    setIsEdit(false);
    setBookID("");
    setBookTitle("");
    setBookAuthor("");
  }

  function openAddModal() {
    setIsInsert(true);
    setIsOpen(true);
  }

  function openEditModal() {
    setIsEdit(true);
    setIsOpen(true);
  }

  const baseUrl = "https://books-api.dicoding.dev/";
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch(`${baseUrl}/list`);
        const responseJson = await response.json();
        if (responseJson.error) {
          setBooksData({
            warning: responseJson.message,
            value: "",
          });
        } else {
          setBooksData({
            warning: "",
            value: responseJson.books,
          });
        }
      } catch (error) {
        setBooksData({
          warning: error,
          value: "",
        });
      }
    };
    getBooks();
  }, []);

  const handleSubmit = (e) => {};
  const { warning, value } = booksData;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 auto-cols-fr">
        {!value ? (
          <RenderingBooks warning={warning} />
        ) : (
          value.map((book, key) => (
            <div className="p-3 rounded-md bg-blue-200" key={book.id}>
              <h2 title={book.title} className="text-lg font-bold truncate">
                {book.title}
              </h2>
              <p className="text-sm">
                {book.author} ({book.id})
              </p>
              <div className="mt-2 flex justify-end space-x-2">
                <button
                  className="bg-yellow-300 rounded-full hover:bg-yellow-500 p-3 active:animate-spin"
                  onClick={() => {
                    openEditModal();
                    setBookID(book.id);
                    setBookTitle(book.title);
                    setBookAuthor(book.author);
                  }}
                >
                  <EditIcon className="w-4 h-4" />
                </button>
                <button className="bg-red-400 rounded-full hover:bg-red-500 p-3 active:animate-spin">
                  <DeleteIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
        <div
          className="p-3 rounded-md bg-blue-200 flex justify-center items-center group cursor-pointer hover:bg-blue-300"
          onClick={() => openAddModal()}
        >
          <div className="bg-blue-400 rounded-full hover:bg-blue-500 p-3 group-active:animate-ping">
            <PlusIcon className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Modals */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
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
                  className="text-lg font-medium leading-6 bg-indigo-300 flex justify-between items-center py-3 pl-6 pr-3"
                >
                  <div>
                    {isInsert && "Add New Book"}
                    {isEdit && "Edit Book"}
                  </div>
                  <CloseButton
                    className="active:bg-indigo-500"
                    onClick={() => closeModal()}
                  />
                </Dialog.Title>
                <div
                  className={`transition w-full bg-red-300 py-3 text-center ${
                    warning ? "translate-y-0" : "-translate-y-32"
                  }`}
                >
                  {warning}
                </div>
                <div className="mt-2 py-2 px-6">
                  <form className="space-y-3 pb-3" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="book-id">ID</label>
                      <input
                        id="book-id"
                        type="number"
                        value={bookID || ""}
                        onChange={(e) => {
                          setBookID(e.target.value);
                        }}
                        required
                        className="w-full py-1 px-2 border-2 rounded-md"
                        placeholder="book title"
                      />
                    </div>
                    <div>
                      <label htmlFor="book-title">Title</label>
                      <input
                        id="book-title"
                        type="text"
                        value={bookTitle || ""}
                        onChange={(e) => {
                          setBookTitle(e.target.value);
                        }}
                        required
                        className="w-full py-1 px-2 border-2 rounded-md"
                        placeholder="book title"
                      />
                    </div>
                    <div>
                      <label htmlFor="author">Author</label>
                      <input
                        id="author"
                        type="text"
                        onChange={(e) => {
                          setBookAuthor(e.target.value);
                        }}
                        value={bookAuthor || ""}
                        className="w-full py-1 px-2 border-2 rounded-md"
                        placeholder="book author"
                        required
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="inline-flex justify-center mt-6 w-full py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      >
                        Done
                      </button>
                    </div>
                  </form>
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
