import React, { use } from 'react';
import { AuthContext } from "../context/AuthContext";

function useAuth() {
  const authData = use(AuthContext);
  return authData;
}

export default useAuth;