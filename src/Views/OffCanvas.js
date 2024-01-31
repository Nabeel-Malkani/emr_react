import React from 'react';
import { Offcanvas } from 'react-bootstrap';

const OffcanvasComponent = ({ show, onHide }) => {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p>Content goes here.</p>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasComponent;
