import React from 'react';
import CloseIcon from './../icons/CloseIcon.jsx';

const CloseButton = (props) => {
  return (
    <div>
      <button type="button" className={`transition rounded-full p-2 inline-flex items-center justify-center text-gray-400 focus:outline-none active:text-gray-700 ${props.className}`} onClick={props.onClick}>
        <span className="sr-only">Close menu</span>
        <CloseIcon className='h-5 w-5' />
      </button>
    </div>
  );
};

export default CloseButton;