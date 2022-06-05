import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  User,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import { auth } from '../firebase'

interface IAuth {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const router = useRouter()

  //   This is to check, on load, whether user is logged in or not
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //   logged in ...
        setUser(user)
        setLoading(false)
      } else {
        //   not logged in
        setUser(null)
        setLoading(true)
        router.push('/login')
      }

      setInitialLoading(false)
    })
  }, [auth])

  //   functions
  const signUp = async (email: string, password: string) => {
    setLoading(true)

    // Register the user and save it to the db
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // set our user
        setUser(userCredential.user)
        // push the user to homepage
        router.push('/')
        setLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)

    // Register the user and save it to the db
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // set our user
        setUser(userCredential.user)
        // push the user to homepage
        router.push('/')
        setLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)

    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const memoedValue = useMemo(
    () => ({ user, signUp, signIn, error, loading, logout }),
    [user, loading, error]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context comopnent.
export default function useAuth() {
  return useContext(AuthContext)
}
