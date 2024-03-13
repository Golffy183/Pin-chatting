import { Navigate } from 'react-router-dom';

const RoutePrivate = ({ isAuth, to, children }: any) => {
  return isAuth ? children : <Navigate to={to || '/'} replace />;
};

export default RoutePrivate;
