import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { FaUserTie } from 'react-icons/fa';

const NavBar = () => {
  


    // const HandelToSignout = () =>{
    //   userLogout()

    // }


  

    return (
        <div>
            <Navbar className='shadow-lg' collapseOnSelect expand="lg" bg="light" variant="light">
              <Container>
                <Navbar.Brand href="" className='d-flex align-items-center'>
                            <img
                        src="https://www.codeinbound.com/assets/images/logo.png"
                    
                        height="65"
                        className="d-inline-block align-top image-fluid"
                        alt="Easy Learner"
                        />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <Link className='nav-link' to='/'>Order</Link>
                    <Link className='nav-link' to='/customarySurvey'>Customary Survey</Link>
                    <Link className='nav-link' to="/blog">Blog</Link>
                    
                  </Nav>
                  <Nav>
                  
                  
                    <Nav>
                    {
                        // user?.uid?
                        //     <Nav.Link className='nav-link mx-2 ' onClick={HandelToSignout}>Sign Out</Nav.Link>
                        //      : <Link className='nav-link mx-2' to="/login">Login</Link>
                    }
                    </Nav>
                    <Nav.Link>
                          {
                        //     user?.uid? <Image height='35' width='35' className='header-img'   src={user?.photoURL} title={user?.displayName} roundedCircle	/>
                           <FaUserTie className='fs-3' />
                          }
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;