import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nameChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const signUp = (e) => {
    e.preventDefault();
    formReset();

    const authEmail = email;
    const authPassword = password;

    createUserWithEmailAndPassword(auth, authEmail, authPassword)
      .then((cred) => {
        console.log(cred.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    formReset();

    const authEmail = email;
    const authPassword = password;

    signInWithEmailAndPassword(auth, authEmail, authPassword)
      .then((cred) => {
        // console.log(cred.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const LogOut = (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        // console.log("Sign out");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
    });
  }, []);

  const formReset = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          onChange={nameChange}
          value={email}
          type="email"
          id="email"
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          onChange={passwordChange}
          value={password}
          type="password"
          id="password"
        ></input>
        <button onClick={signUp} type="submit">
          Sign Up
        </button>
        <button onClick={signIn} type="submit">
          Sign In
        </button>
        <button onClick={LogOut} type="submit">
          Sign Out
        </button>
      </form>
    </div>
  );
}
