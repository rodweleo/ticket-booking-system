import { useContext, useEffect } from 'react';
import './App.css'

import { Outlet, useNavigate } from 'react-router';
import { NavBar } from './components/ui/NavBar';
import { AuthContext } from './context/AuthContext';


const App = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    /*if (authContext.user === null) {
      navigate("/login")
    }*/
  }, [])

  return <main className="flex flex-1 overflow-hidden">
    <NavBar />
    <main className="px-2.5 flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 w-full">
      <Outlet />
    </main>

  </main>
};

export default App;
