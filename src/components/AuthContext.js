import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch the user data on component mount or when the user state changes
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make an API call to retrieve the user data
        const response = await fetch('/userData', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Pass the token from local storage
          }
        });

        if (response.ok) {
          const { user } = await response.json();
          setUser(user);
        } else {
          // Handle error if user data retrieval fails
          console.error('Failed to fetch user data');
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
