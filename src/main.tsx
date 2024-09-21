import ReactDOM from 'react-dom/client'
import './index.css'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { App } from './App.tsx';
import { AuthProvider } from './components/ui/use-auth-client.tsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  </Router>,
)
