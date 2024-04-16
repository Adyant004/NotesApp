import { useState } from "react"
import useAuthContext from "../zustand/useAuthContext";
import toast from "react-hot-toast";

type signupType = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

const useSignup = () => {

    const [loading,setLoading] = useState<boolean>(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({username,email,password,confirmPassword}: signupType) => {

        if(!username || !email || !password || !confirmPassword) {
            toast.error("All field must be filled!")
            return;
        }

        if(password !== confirmPassword) {
            toast.error("Passwords don't match!")
            return;
        }

        setLoading(true);
        try {

            const res = await fetch('/api/auth/signup',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username,email,password,confirmPassword})
            })

            const data = await res.json();

            if(data.message) {
                throw new Error(data.message);
            }

            localStorage.setItem('note-user',JSON.stringify(data));
            setAuthUser(data);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

  return {loading, signup} 
}

export default useSignup
