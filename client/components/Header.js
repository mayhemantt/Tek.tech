import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import Router from 'next/router'
import {APP_NAME} from '../config'
import Link from 'next/link'
import {signout, isAuth} from '../actions/auth'
import NProgress from 'nprogress'
import Search from './blog/Search'


Router.onRouteChangeStart=url=> NProgress.start()
Router.onRouterChangeComplete= url => NProgress.done()
Router.onRouterChangeError=url=> NProgress.done()

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <Navbar color="light" light expand="md">
        <Link href="/">
           <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>

           <React.Fragment>
              <NavItem>
                <Link href="/blogs">
                <NavLink style={{cursor:'pointer'}}>Blogs</NavLink>
                </Link>
              </NavItem>
            </React.Fragment>
            {!isAuth()&& <React.Fragment>
              <NavItem>
                <Link href="/signin">
                <NavLink style={{cursor:'pointer'}}>Sigin</NavLink>
                </Link>
            </NavItem>
            <NavItem>
                <Link href="/signup">
                <NavLink style={{cursor:'pointer'}}>Signup</NavLink>
                </Link>
            </NavItem>
              </React.Fragment>}
            {isAuth() && isAuth().role===0 &&(
              <NavItem>
                <Link href="/user">  
              <NavLink style={{cursor:'pointer'}} >
                {`${isAuth().name}`}
              </NavLink>
              </Link>
              </NavItem>)}
            {isAuth() && isAuth().role===1 && (
              <NavItem>
                <Link href="/admin">  
              <NavLink style={{cursor:'pointer'}} >
                {`${isAuth().name}`}
              </NavLink>
              </Link>
              </NavItem>) }
            { isAuth() && (
              <NavItem>
              <NavLink style={{cursor:'pointer'}} onClick={()=>signout(()=> Router.replace(`/signin`))}>Signout</NavLink>
              </NavItem>)}

              {isAuth() && isAuth().role===1 && (
              <NavItem>
                <Link href="/admin/crud/blog">  
              <NavLink className="btn btn-primary text-light"  style={{cursor:'pointer'}} >
                Create Blog
              </NavLink>
              </Link>
              </NavItem>) }
              { isAuth() && isAuth().role === 0 &&(
              <NavItem>
                <Link href="/user/crud/create">
                <NavLink className="btn btn-primary text-light" style={{cursor:'pointer'}}>Write a blog</NavLink>
                </Link>
              </NavItem>)}
          </Nav>
          {/* <NavbarText>
            <Link href="/about">
              <a>About</a>
            </Link>
          </NavbarText> */}
        </Collapse>
      </Navbar>
      <Search />
    </React.Fragment>
  );
}

export default Header;
