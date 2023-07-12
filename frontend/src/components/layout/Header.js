import React from "react";
import { Navbar, Nav, Button, NavDropdown, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/header.css";

const Header = () => {
  // Replace "userNickname" with the actual user's nickname
  const userNickname = "John Doe";

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      variant='dark'
      style={{ backgroundColor: "green", marginBottom: "20px" }}
    >
      <Container>
        <Navbar.Brand href='/'>PlantMate</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='search' className='nav-link'>
              식물 검색
            </Nav.Link>
            <Nav.Link href='community' className='nav-link'>
              커뮤니티
            </Nav.Link>
            <NavDropdown
              title='내 식물 관리'
              id='my-plants-dropdown'
              className='nav-link'
            >
              <NavDropdown.Item href='/my-plants' className='nav-link select'>
                내식물
              </NavDropdown.Item>
              <NavDropdown.Item
                href='growth-journal'
                className='nav-link select'
              >
                내 식물 성장일지
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Button variant='light' className='mr-2 transparent-button'>
              {userNickname}님
            </Button>
            <Button variant='light' className='transparent-button'>
              회원정보
            </Button>
            <Button variant='light' className='transparent-button'>
              로그아웃
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
