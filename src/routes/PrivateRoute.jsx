import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import Loading from "../loading/Loading";
import useAuth from "../hooks/useAuth";

function PrivateRoute() {
  const { user, loading } = useAuth();
  const location = useLocation()
  if (loading) {
    return <Loading></Loading>
  }
  if(!user){
    return <Navigate state={location.pathname} to="/login"></Navigate>
  }
  return <Outlet />;;
}

export default PrivateRoute;