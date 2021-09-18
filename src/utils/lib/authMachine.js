/* eslint-disable no-unused-vars */
// authMachine.js

import { createMachine, assign } from "xstate"
import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_KEY}`,
  authDomain: `${import.meta.env.VITE_FIREBASE_DOMAIN}`,
  projectId: `${import.meta.env.VITE_FIREBASE_PROJECT}`,
  storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGE}`,
  messagingSenderId: `${import.meta.env.VITE_FIREBASE_SENDERID}`,
  appId: `${import.meta.env.VITE_FIREBASE_APPID}`,
}
// Initialize Firebase
initializeApp(firebaseConfig)
const authMachine = createMachine(
  {
    id: "auth",
    // we want to start by checking if
    // user is logged in when page loads
    initial: "checkAuth",
    // context is where you keep state
    context: {
      auth: null,
      user: null,
      error: null,
    },
    // all possible authentication states
    states: {
      checkAuth: {
        // when entering a state invoke
        // the authChecker service
        invoke: {
          id: "authChecker",
          src: "checkLogin",
          onDone: { target: "signedIn", actions: "setAuth" },
          onError: {
            target: "signedOut.failure",
            actions: ["setError", "clearAuth"],
          },
        },
        on: {
          LOGIN: { target: "signingIn" },
        },
      },
      signedIn: {},
      // signedOut has two sub-states
      // we will transition to failure in
      // case of wrong password, username
      // or network error
      signedOut: {
        initial: "ok",
        states: {
          ok: { type: "final" },
          failure: {},
        },
        on: {
          LOGIN: { target: "signingIn" },
        },
      },
      signingIn: {
        invoke: {
          id: "authenticator",
          src: "login",
          onDone: {
            target: "checkAuth",
            // clear error if successful login
            actions: "clearError",
          },
          onError: {
            // transition to failure state
            // and set an error
            target: "signedOut.failure",
            actions: "setError",
          },
        },
      },
    },
  },
  {
    actions: {
      clearAuth: assign({ user: null, auth: null }),
      clearError: assign({ error: null }),
      // put Firebase auth object on context
      setAuth: assign({ auth: (_, event) => event.data }),
      // put user on context in loading service
      setUser: assign({ user: (_, event) => event.data }),
      setError: assign({
        error: (_, event) => event.data,
      }),
    },
    services: {
      checkLogin: () => {
        return new Promise((resolve, reject) => {
          const auth = getAuth()
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe()

            return user ? resolve(user) : reject()
          })
        })
      },
      login: (_, event) => {
        if (event.provider === "google") {
          const provider = new GoogleAuthProvider()
          const auth = getAuth()

          provider.setCustomParameters({
            prompt: "select_account",
          })

          return signInWithRedirect(auth, provider)
        }
      },
    },
  }
)
export const logout = async () => {
  const auth = getAuth()
  await signOut(auth)
}
export default authMachine
