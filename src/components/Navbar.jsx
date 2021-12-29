import React from 'react';

const Navbar = (props) => {
  return (
      <nav className="text-white font-bold textShadow-center">
        {props.title ?? props.title}
      </nav>
  );
};

export default Navbar;