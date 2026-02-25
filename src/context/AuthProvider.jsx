import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from "../firebase/firebase.init";
import axios from 'axios';

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }
  const signIn = async (email, password) => {
    setLoading(true);
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;

  };
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };
  const logOut = async () => {
    await signOut(auth);
    localStorage.removeItem("accessToken");
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const res = await axios.get(`https://bucsu-server-side.vercel.app/users/${currentUser.email}`);
          if (res.data) {
            setUser({ ...currentUser, ...res.data });
          } else {
            setUser(currentUser);
          }
        } catch (error) {
          console.error("Failed to fetch user data", error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    logOut,
    signIn,
    loading,
    setLoading,
    updateUser,
    resetPassword,
    signInWithGoogle
  };
  return <AuthContext value={authData}>
    {children}
  </AuthContext>
}

export default AuthProvider;