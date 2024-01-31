import axios from 'axios';
import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import baseURL from "../baseURL"
import { useUser } from '../userContext';
import { useNavigate } from "react-router-dom";

const LoginCard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const { setUserId } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}Account/Login`, {
        email: email,
        password: password,
      });
      
      console.log("Response on login", response.data);
      if (response.data) {
        // Authentication successful, store the userId in state
        setUserId(response.data);
        navigate("/home/dashboard", { state: { userId: response.data } });
        console.log("State from inside function-->",response.data )
        console.log("Login successful!");
      } else {
        // Authentication failed, show an error message
        setError(response.data.message || "Authentication failed");
      }
      // Handle successful login, e.g., redirect or set user state
    } catch (error) {
      console.error("Error while logging in", error);
      setError("An unexpected error occurred. Please try again.");
      // Handle login error, e.g., show an error message to the user
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
      <Card className="p-3" style={{ width: '35%' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Medical Services Login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
            {error && (
                        {error}
                  )}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginCard;
