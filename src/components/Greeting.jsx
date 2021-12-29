import React, { useState } from 'react';
import CloseButton from '../utilities/CloseButton';
import { saveUser } from '../actions/saveUser';
import { useEffect } from 'react/cjs/react.development';
import RenameIcon from '../icons/RenameIcon';
import PaperPlaneIcon from '../icons/PaperPlaneIcon';

const GreetToUser = (props) => {
  const [rename, setRename] = useState();
  const handleRename = () => {
    setRename(<GreetToGuest value={props.sayHi} />)
  }
  return (
    <>
      {rename ? rename :
        <h1 className='flex justify-center items-center'>
          Welcome back
          <b className='ml-1'>{props.sayHi}</b>
          <button className='ml-1 text-gray-600' onClick={handleRename}>
            <RenameIcon className='w-4 h-4' />
          </button>
        </h1>
      }
    </>
  );
};

const GreetToGuest = (props) => {
  const [username, setUsername] = useState(props.value);
  const [sayHi, setSayHi] = useState();
  const handleSubmit = (e) => {
    saveUser(username);
    e.preventDefault();
    setSayHi(<GreetToUser sayHi={username} />)
  }
  useEffect(() => {
    console.log(username);
  }, [username]);
  return (
    <>
      {sayHi ? sayHi :
        <label className='flex justify-center items-center'>
          <span><strong>Hola!</strong> What's your name? </span>
          <form onSubmit={handleSubmit} className='ml-5 flex relative'>
            <input
              autoFocus={true}
              type="text"
              name="name"
              id="price"
              className="focus:outline-none w-full p-2 sm:text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-gray-400"
              placeholder="Asep"
              onChange={(e) => {
                setUsername(e.target.value)
              }}
              onFocus={(e) => {
                e.target.select();
              }}
              value={username}
            />
            <button type='submit' className='absolute top-1/2 -translate-y-1/2 right-2'>
              <PaperPlaneIcon className='w-5 h-5 text-gray-400 rotate-90 hover:text-gray-700' />
            </button>
          </form>
        </label>
      }
    </>
  );
};


const Greeting = (props) => {
  const getUsername = localStorage.getItem('USERNAME');
  const [removeGreet, setRemoveGreet] = useState(false);
  const hideAlert = () => {
    setRemoveGreet(true);
  }
  return (
    <>
      {!removeGreet &&
        <div className='bg-emerald-200 py-2 px-5 pr-2 rounded-lg flex justify-between items-center mb-2'>
          <div className=''>
            {getUsername ? <GreetToUser sayHi={getUsername} /> : <GreetToGuest />}
          </div>
          <CloseButton onClick={() => hideAlert()} />
        </div>
      }
    </>
  )
};

export default Greeting;