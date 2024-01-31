import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useUser } from '../userContext';
import ltImage from '../img/LT.jpg';
import axios from 'axios';
import OffcanvasComponent from './OffCanvas';
import WorkNotification from './WorkNotification';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons CSS

function NavScrollExample() {
  const { userId } = useUser();
  console.log("UserId from UserContext in Navitem", userId);
  const [menuData, setMenuData] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showWorkNotification, setShowWorkNotification] = useState(false);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(`https://localhost:44376/Home/MenuPartial/?userId=${userId}`);
        setMenuData(response.data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
  }, []);

  const handleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const handleWorkNotification = () => {
    setShowWorkNotification(!showWorkNotification)
  }

  const renderSubMenuItems = (subMenuItems) => {
    return subMenuItems.map((subMenuItem) => (
      <NavDropdown.Item key={subMenuItem.MenuId} href={subMenuItem.MenuUrl}>
        {subMenuItem.MenuName}
      </NavDropdown.Item>
    ));
  };

  const renderMenuItems = (menuItems) => {
    return menuItems.map((menuItem) => (
      <React.Fragment key={menuItem.MenuId}>
        {menuItem.SubMenuItems.length > 0 ? (
          <NavDropdown title={menuItem.MenuName} id={`navbarScrollingDropdown-${menuItem.MenuId}`}>
            {renderSubMenuItems(menuItem.SubMenuItems)}
          </NavDropdown>
        ) : (
          <Nav.Link href={menuItem.MenuUrl}>{menuItem.MenuName}</Nav.Link>
        )}
      </React.Fragment>
    ));
  };

  const renderMainMenus = () => {
    return menuData
      .filter((menuItem) => menuItem.ParentId === null)
      .map((mainMenu) => renderMenuItems([mainMenu]));
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary px-2">
        <Container fluid>
          <Navbar.Brand href="/admin/dashboard">
            <img
              alt=""
              src={ltImage}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            EMR
          </Navbar.Brand>
          <Nav.Link onClick={handleWorkNotification} style={{marginRight: '10px'}}>
              <i className="bi bi-clipboard" style={{ color: 'black' }}></i>
            </Nav.Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              {renderMainMenus()}
            </Nav>
            <Nav.Link onClick={handleOffcanvas}>
              <i className="bi bi-clipboard" style={{ color: 'black' }}></i>
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <OffcanvasComponent show={showOffcanvas} onHide={handleOffcanvas} />
      <WorkNotification show={showWorkNotification} onHide={handleWorkNotification}/>
    </div>
  );
}

export default NavScrollExample;
