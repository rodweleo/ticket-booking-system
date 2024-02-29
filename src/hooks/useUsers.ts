import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { User } from "../utils/interfaces";
import { FieldValues } from "react-hook-form";

export const useUsers = () => {
  const authContext = useContext(AuthContext);
  const [activeUser, setActiveUser] = useState<User | null>();
  const [errorCreatingAccount, setError] = useState({
    code: 0,
    message: "",
  });

  const [errorSigningIn, setLoginError] = useState({
    code: 0,
    message: "",
  });

  const fetchUserById = async (userId: string) => {
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
    const fetchUser = () => {
      const userId = JSON.parse(
        sessionStorage.getItem("eventvista-access-token")!
      );

      if (userId) {
        fetchUserById(userId).then((userDetails) => {
          const response = userDetails as User;
          setActiveUser(response);
        });
      } else {
        setActiveUser(null);
      }
    };

    fetchUser();
  }, []);

  const createAccount = async (data: FieldValues) => {
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
          role: "user",
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

  const signIn = async (data: FieldValues) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        data.emailAddress,
        data.password
      );

      const userId = response.user.uid;

      sessionStorage.setItem("eventvista-access-token", JSON.stringify(userId));

      //RETRIEVE THE DETAILS OF THE USER USING THE ID
      const sessionToken = JSON.parse(
        sessionStorage.getItem("eventvista-access-token")!
      );
      if (sessionToken) {
        const userDetails = await fetchUserById(sessionToken);
        setActiveUser(userDetails as User);
        return userDetails as User;
      } else {
        return null;
      }
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
      sessionStorage.removeItem("eventvista-access-token");
    });
  };

  return {
    createAccount,
    errorCreatingAccount,
    signIn,
    errorSigningIn,
    activeUser,
    signOut,
    fetchUserById,
  };
};
