import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

const UserPaymentContainer = () => {
  const user = useContext(AuthContext);

  // State and effect hooks to fetch payment data for the logged-in user
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        // Make an API call to fetch the payment data for the logged-in user
        const response = await fetch('/paymentData', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Pass the token from local storage
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPaymentData(data);
        } else {
          // Handle error if payment data retrieval fails
          console.error('Failed to fetch payment data');
          setPaymentData(null);
        }
      } catch (error) {
        console.error('Error fetching payment data:', error);
        setPaymentData(null);
      }
    };

    fetchPaymentData();
  }, []);

  // Render the payment data or a loading indicator based on the state
  if (paymentData) {
    return (
      <div>
        <h1>Welcome, {user.name}!</h1>
        {/* Render the payment data */}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default UserPaymentContainer;
