import { useState } from "react"
import toast from "react-hot-toast";
import useAuthContext from "../zustand/useAuthContext";

type loginInterface = {
    username: string,
    password: string
}

const useLogin = () => {

    const [loading,setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async({ username,password }: loginInterface) => {
        if(!username || !password) {
            toast.error('All fields must be filled!')
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/login',{
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({username,password})
            })

            const data = await res.json();

            if(data.message) {
                throw new Error(data.message)
            }

            localStorage.setItem('note-user',JSON.stringify(data));
            setAuthUser(data);

        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

  return { loading,login } 
}

export default useLogin
