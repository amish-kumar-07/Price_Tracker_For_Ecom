'use client';
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [userEmail, setuserEmail] = useState(null);
  const [Tracking_Frequency, setTracking_Frequency] = useState(3);

  const value = {
    userId,
    userEmail,
    Tracking_Frequency,
    setUserId,
    setuserEmail,
    setTracking_Frequency,
    clearUserId: () => setUserId(null),
    clearEmail: () => setuserEmail(null),
    clearTrackingFrequency: () => setTracking_Frequency(null), // ✅ FIXED
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
