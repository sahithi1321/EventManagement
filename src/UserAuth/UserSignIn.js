import React, { useState } from 'react';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import api from './api';

const UserSignIn = ({ onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }

      const response = await api.post('/auth/login', { email, password });
      const data = response.data;

      if (!data.token) {
        throw new Error('Authentication failed. No token received.');
      }

      await login(data.token, {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile
      });

      // Redirect after successful login
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading} className="w-100">
        {loading ? (
          <>
            <Spinner as="span" animation="border" size="sm" /> Signing In...
          </>
        ) : 'Sign In'}
      </Button>

      <div className="mt-3 text-center">
        <Button variant="link" onClick={onSwitchToSignUp}>
          Don't have an account? Sign Up
        </Button>
      </div>
    </Form>
  );
};

export default UserSignIn;