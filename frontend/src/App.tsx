import './App.css'
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Navbar from './components/Navbar/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import useAuthContext from './zustand/useAuthContext';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';

function App() {

   const { authUser } = useAuthContext();

  return (
    <div className='flex flex-col w-full font-Noto h-screen justify-between items-center'>
      <Navbar />
      <Routes>
        <Route path='/' element={ authUser ? <Home /> : <Navigate to={'/login'} /> } />
        <Route path='/signup' element={ authUser ? <Navigate to={'/'} /> : <Signup /> } />
        <Route path='/login' element={ authUser ? <Navigate to={'/'} /> : <Login /> } />
      </Routes>
      <Toaster />
      <ToastContainer />
    </div>
  )
}

export default App
