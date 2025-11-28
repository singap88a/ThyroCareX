import React from 'react';

const ProtectedAdminRoute = ({ children }) => {
  // Direct access without authentication
  return children;
};

export default ProtectedAdminRoute;
