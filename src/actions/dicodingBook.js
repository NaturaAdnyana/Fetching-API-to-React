// const baseUrl = 'https://books-api.dicoding.dev';

// export const getBooks = () => {
//   const xhr = new XMLHttpRequest();
//   xhr.onload = function () {
//     const responseJson = JSON.parse(this.responseText);
//     if (responseJson.error) {
//       alert(responseJson.message);
//     }
//     else {
//       renderBooks(responseJson.books);
//     }
//   }
//   xhr.onerror = function () {
//     alert(`Bad Request`);

//   };
//   xhr.open("GET", `${baseUrl}/list`);
//   xhr.send();
// }