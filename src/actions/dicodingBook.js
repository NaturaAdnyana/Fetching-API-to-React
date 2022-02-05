const baseUrl = "https://books-api.dicoding.dev";

let booksResult = {
  message: "",
  value: "",
};

export const getBooks = async () => {
  try {
    const response = await fetch(`${baseUrl}/list`);
    const responseJson = await response.json();
    if (responseJson.error) {
      booksResult = {
        message: responseJson.message,
        value: "",
      };
    } else {
      booksResult = {
        message: "",
        value: responseJson.books,
      };
    }
  } catch (error) {
    booksResult = {
      message: error.message,
      value: "",
    };
  }
  return booksResult;
};

export const insertBook = async (bookID, bookTitle, bookAuthor) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "12345",
      },
      body: JSON.stringify({
        id: bookID,
        title: bookTitle,
        author: bookAuthor,
      }),
    };

    const response = await fetch(`${baseUrl}/add`, options);
    const responseJson = await response.json();
    console.log(responseJson);
    booksResult = {
      message: responseJson.message,
      value: responseJson.book,
    };
  } catch (error) {
    booksResult = {
      message: error.message,
      value: "",
    };
  }
  return booksResult;
};

export const updateBook = async (bookID, bookTitle, bookAuthor) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "12345",
      },
      body: JSON.stringify({
        id: bookID,
        title: bookTitle,
        author: bookAuthor,
      }),
    };
    const response = await fetch(`${baseUrl}/edit/${bookID}`, options);
    const responseJson = await response.json();
    console.log(responseJson);
    booksResult = {
      message: responseJson.message,
      value: responseJson.book,
    };
  } catch (error) {
    booksResult = {
      message: error.message,
      value: "",
    };
  }
  return booksResult;
};

export const removeBook = async (bookID) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "X-Auth-Token": "12345",
      },
    };
    const response = await fetch(`${baseUrl}/delete/${bookID}`, options);
    const responseJson = await response.json();
    console.log(responseJson);
    booksResult = {
      message: responseJson.message,
      value: "",
    };
  } catch (error) {
    booksResult = {
      message: error.message,
      value: "",
    };
  }
  return booksResult;
};
