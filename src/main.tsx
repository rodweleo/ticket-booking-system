import ReactDOM from 'react-dom/client'
import './index.css'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { App } from './App.tsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './components/ui/use-auth-client.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <App />
            <ToastContainer />
        </AuthProvider>
      </QueryClientProvider>
  </Router>,
)
