import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const PrivateRoute = ({ component: Component, user, roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(user);
        if (user !== null && roles.includes(user.role)) {
          return <Component {...rest} {...props} />;
        }

        return (
          <Redirect
            to={{
              pathname: "/signin",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default connect(mapStateToProps)(PrivateRoute);
