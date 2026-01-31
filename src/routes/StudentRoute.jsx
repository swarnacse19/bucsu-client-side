import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/users/role?email=${user.email}`)
      .then(res => {
        setRole(res.data.role);
        setRoleLoading(false);
      })
      .catch(() => setRoleLoading(false));
  }, [user, axiosSecure]);

  if (loading || roleLoading) return <p>Checking access...</p>;

  if (role !== "student") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default StudentRoute;
