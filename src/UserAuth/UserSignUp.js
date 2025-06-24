import React, { useState } from 'react';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from './AuthContext';

const UserSignUp = ({ onSuccess, onSwitchToSignIn }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Password validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords don't match");
      }

      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(formData.password)) {
        throw new Error('Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character');
      }

      // Remove confirmPassword before sending
      const { confirmPassword, ...userData } = formData;

      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Updated to match backend response structure
      login(data.token, {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile
      });
      
      onSuccess();
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          maxLength={16}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          maxLength={16}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mobile</Form.Label>
        <Form.Control
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
          pattern="\d{10}"
          title="Please enter a 10-digit mobile number"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
        />
        <Form.Text>
          Must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button type="submit" className="w-100 mb-3" disabled={loading}>
        {loading ? (
          <>
            <Spinner as="span" animation="border" size="sm" /> Creating Account...
          </>
        ) : (
          'Sign Up'
        )}
      </Button>
      <div className="text-center">
        <Button variant="link" onClick={onSwitchToSignIn}>
          Already have an account? Sign In
        </Button>
      </div>
    </Form>
  );
};

export default UserSignUp;