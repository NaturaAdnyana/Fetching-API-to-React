import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import './App.css';
import Greeting from './components/Greeting';
import BookList from './components/BookList';

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Anjay</title>
      </Helmet>
      <header className='mx-auto bg-gradient-to-r from-blue-500 to-green-400 px-10 py-5'>
        <Navbar title="Dicoding Books" />
      </header>
      <main className='p-5'>
        <div className='container max-w-screen-md border-2 mx-auto p-2 rounded-xl text-gray-700'>
          <Greeting />
          <BookList />
        </div>
      </main>
      <footer>

      </footer>
    </HelmetProvider>
  );
}

export default App;
