import ReactDOM from 'react-dom/client'
import './index.css'
import {
  BrowserRouter,
} from "react-router-dom";
import { AuthProvider } from './AuthProvider.tsx';
import { App } from './App.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
)
