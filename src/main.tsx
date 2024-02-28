import ReactDOM from 'react-dom/client'
import './index.css'
import {
  BrowserRouter,
} from "react-router-dom";
import { AuthProvider } from './providers/AuthProvider.tsx';
import { App } from './App.tsx';
import { UserProvider } from './providers/UserProvider.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </AuthProvider>,
)
