// Import the functions you need from the SDKs you need

import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,

  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,

  projectId: process.env.NEXT_PUBLIC_PROJECTID,

  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,

  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGEID,

  appId: process.env.NEXT_PUBLIC_APPID,
}

// Initialize Firebase
// Check if there are apps, if not initialize it.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// get DB
const db = getFirestore()

// get authentication
const auth = getAuth()

export default app
export { auth, db }
