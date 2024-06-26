import { useState } from "react"
import useAuthContext from "../zustand/useAuthContext";
import toast from "react-hot-toast";


const useLogout = () => {
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const logout = async() => {

        setLoading(true);
        try {
            const res = await fetch('/api/auth/logout',{
                method: "POST",
                headers: { "Content-Type" : "application/json" }
            })

            localStorage.removeItem('note-user');
            setAuthUser(null);
            await res.json()

        } catch (error: any) {
            toast.error(error.message);            
        } finally {
            setLoading(false);
        }
        
    }

  return {loading,logout}
}

export default useLogout
