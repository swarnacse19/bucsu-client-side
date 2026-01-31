import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { getIdToken } from "firebase/auth";
import { auth } from "../firebase/firebase.init"; 

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000`,
});


const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const token = await getIdToken(auth.currentUser, true); // force refresh
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error.response?.status;

        if (status === 403) {
          navigate("/forbidden");
        } else if (status === 401) {
          logOut()
            .then(() => {
              navigate("/login");
            })
            .catch(() => {});
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors when user or component changes
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, navigate, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;