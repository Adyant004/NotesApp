import { create } from 'zustand';

interface AuthState {
  authUser: string | null;
}

interface AuthActions {
  setAuthUser: (authUser: string | null) => void;
}

type AuthContext = AuthState & AuthActions;

const useAuthContext = create<AuthContext>((set) => ({
  authUser: localStorage.getItem('note-user') || null,
  setAuthUser: (authUser) => set({ authUser }),
}));

export default useAuthContext;
