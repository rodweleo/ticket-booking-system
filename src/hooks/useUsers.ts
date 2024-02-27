import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore";

export const useUsers = () => {
  const [errorCreatingAccount, setError] = useState({
    code: 0,
    message: "",
  });

  const [errorSigningIn, setLoginError] = useState({
    code: 0,
    message: "",
  });
  const createAccount = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.emailAddress,
        data.password
      );

      const response = await setDoc(
        doc(db, "users", userCredential.user?.uid),
        {
          id: userCredential.user.uid,
          name: data.fullName,
          emailAddress: data.emailAddress,
          createdAt: userCredential.user.metadata.creationTime,
          phoneNumber: data.phoneNumber,
          emailVerified: userCredential.user.emailVerified,
        }
      );

      return response;
    } catch (error: any) {
      const errorCode = error.code;
      //const errorMessage = error.message;
      if (errorCode.includes("weak-password")) {
        setError({
          code: errorCode,
          message: "Password should be at least 6 characters long.",
        });
      }

      return error;
    }
  };

  const signIn = async (data): Promise<string | null> => {
    await signInWithEmailAndPassword(auth, data.emailAddress, data.password)
      .then(() => {
        return "Login Successful. Redirecting...";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage.includes("invalid-credential")) {
          setLoginError({
            code: errorCode,
            message: "Incorrect email address or password.",
          });

          return null;
        }
      });

    return null;
  };
  return { createAccount, errorCreatingAccount, signIn, errorSigningIn };
};
