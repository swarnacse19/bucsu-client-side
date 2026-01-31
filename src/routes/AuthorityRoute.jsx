import React, { Children } from 'react';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loading from '../loading/Loading';

const AuthorityRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role } = useUserRole();

    if (loading) {
        return <Loading></Loading>;
    }

    if (!user || role !== 'authority') {
        return <Navigate to="/forbidden"></Navigate>
    }

    return children;
};

export default AuthorityRoute;