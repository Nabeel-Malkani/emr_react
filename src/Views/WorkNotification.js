import React from 'react';
import { Offcanvas } from 'react-bootstrap';

const WorkNotification = ({ show, onHide }) => {
  return (
    <Offcanvas show={show} onHide={onHide} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p>Content goes here.</p>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default WorkNotification;
