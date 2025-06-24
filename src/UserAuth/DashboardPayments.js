import React, { useState, useEffect } from 'react';
import { Table, Badge, Alert, Spinner, Button } from 'react-bootstrap';
import { getAllPayments } from '../API/api';
import { useAuth } from '../UserAuth/AuthContext';

const DashboardPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getAllPayments();
        if (response.success) {
          // Filter payments by current user
          const userPayments = response.data.filter(
            payment => payment.userId === currentUser._id
          );
          setPayments(userPayments);
        } else {
          setError(response.message || 'Failed to fetch payment history');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch payment history');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [currentUser._id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusVariant = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'refunded': return 'warning';
      case 'pending': return 'secondary';
      default: return 'info';
    }
  };

  const handlePrint = (payment) => {
    const printContent = `
      <h2>Payment Receipt</h2>
      <p><strong>Transaction ID:</strong> ${payment._id}</p>
      <p><strong>Event:</strong> ${payment.eventName || 'N/A'}</p>
      <p><strong>Amount:</strong> ${payment.currency === 'INR' ? '₹' : '$'}${payment.amount}</p>
      <p><strong>Date:</strong> ${formatDate(payment.paymentDate)}</p>
      <p><strong>Status:</strong> ${payment.status}</p>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Payment Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #333; }
            p { margin: 10px 0; }
          </style>
        </head>
        <body>
          ${printContent}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 1000);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="dashboard-payments">
      <h2 className="mb-4">Payment History</h2>
      
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : payments.length === 0 ? (
        <Alert variant="info">No payment history found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Event</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment._id}>
                <td>{payment.eventName || 'N/A'}</td>
                <td>
                  {payment.currency === 'INR' ? '₹' : '$'}
                  {payment.amount}
                </td>
                <td>
                  {payment.paymentDate 
                    ? formatDate(payment.paymentDate) 
                    : 'N/A'}
                </td>
                <td>
                  <Badge bg={getStatusVariant(payment.status)}>
                    {payment.status}
                  </Badge>
                </td>
                <td>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => handlePrint(payment)}
                  >
                    Print
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default DashboardPayments;