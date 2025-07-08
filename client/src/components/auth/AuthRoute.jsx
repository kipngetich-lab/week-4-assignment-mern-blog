import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/posts',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;