import React from 'react';
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';

const NavbarComponent = () => {
  return (
    <div>
      <Navbar expand="md" dark className="navbar-bordered">
        <div className="container pt-2 pb-1">
          <NavbarBrand id="navbar-brand" href="/">Todo App</NavbarBrand>
        </div>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
