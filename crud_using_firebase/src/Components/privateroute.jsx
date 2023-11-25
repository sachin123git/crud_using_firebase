import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { database } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const PrivateRoute = ({ element }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(database, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return user ? element : <Navigate to="/" />;
};

export default PrivateRoute;
