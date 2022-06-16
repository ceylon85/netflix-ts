//custom hooks
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
}

const AuthContext = createContext<IAuth>({
    // async => 객체 반환
    user: null,
    signUp: async () => { },
    signIn: async () => { },
    logout: async () => { },
    error: null,
    loading: false,
})

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loading, setLoding] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const signUp = async (email: string, password: string) => {
        setLoding(true);

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user)
                router.push('/')
                setLoding(false)
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoding(false))
    }
    const signIn = async (email: string, password: string) => {
        setLoding(true);

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user)
                router.push('/')
                setLoding(false)
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoding(false))
    }

    const logout = async () => {
        setLoding(true)

        signOut(auth).then(() => {
            setUser(null) // 사용자 권한 제거
        }).catch((error) => alert(error.message))
            .finally(() => setLoding(false))
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )

}

export default useAuth