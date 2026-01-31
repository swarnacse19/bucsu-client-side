import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxios();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setRoleLoading(false);
      return;
    }

    axiosSecure
      .get(`/users/${user.email}`)
      .then(res => {
        setRole(res.data?.role);
      })
      .catch(() => setRole(null))
      .finally(() => setRoleLoading(false));
  }, [user, axiosSecure]);

  return { role, roleLoading };
};

export default useUserRole;
