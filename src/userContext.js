// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    // Try to get userId from cookies on component mount
    const storedUserId = document.cookie.replace(
      /(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    console.log('Stored UserId:', storedUserId); // Log the storedUserId

    try {
      // Use decodeURIComponent to properly decode the storedUserId
      return storedUserId ? JSON.parse(decodeURIComponent(storedUserId)) : null;
    } catch (error) {
      console.error('Error parsing storedUserId:', error);
      return null; // Return null if there is an error during parsing
    }
  });

  // Update cookies when userId changes
  useEffect(() => {
    const secureCookieOptions = '; Secure; SameSite=Strict';

    document.cookie = `userId=${encodeURIComponent(JSON.stringify(userId))}${secureCookieOptions}`;
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export const getUser = () => {
  const storedUserId = document.cookie.replace(
    /(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );

  console.log('Stored UserId:', storedUserId); // Log the storedUserId

  try {
    return storedUserId ? JSON.parse(decodeURIComponent(storedUserId)) : null;
  } catch (error) {
    console.error('Error parsing storedUserId:', error);
    return null;
  }
};

export const setUser = (userId) => {
  const secureCookieOptions = '; Secure; SameSite=Strict';
  document.cookie = `userId=${encodeURIComponent(JSON.stringify(userId))}${secureCookieOptions}`;
};
