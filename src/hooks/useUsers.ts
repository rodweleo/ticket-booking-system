import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { DocumentData, doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

export const useUsers = () => {
  const authContext = useContext(AuthContext);
  const [activeUser, setActiveUser] = useState<
    DocumentData | null | undefined
  >();
  const [errorCreatingAccount, setError] = useState({
    code: 0,
    message: "",
  });

  const [errorSigningIn, setLoginError] = useState({
    code: 0,
    message: "",
  });

  const fetchUserById = async (userId) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      const user = docSnap.data();
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      fetchUserById(user?.uid).then((userDetails) => {
        setActiveUser(userDetails);
      });
    } else {
      setActiveUser(null);
    }
  }, [auth]);

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

  const signIn = async (data) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        data.emailAddress,
        data.password
      );

      const userId = response.user.uid;
      //RETRIEVE THE DETAILS OF THE USER USING THE ID
      const userDetails = fetchUserById(userId);

      //AFTER GETTING THE DETAILS OF THE ACTIVE USER

      return userDetails;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorMessage.includes("invalid-credential")) {
        setLoginError({
          code: errorCode,
          message: "Incorrect email address or password.",
        });

        return null;
      }
    }
  };

  const signOut = () => {
    authContext.signOut().then(() => {
      setActiveUser(null);
    });
  };
  return {
    createAccount,
    errorCreatingAccount,
    signIn,
    errorSigningIn,
    activeUser,
    signOut,
  };
};
