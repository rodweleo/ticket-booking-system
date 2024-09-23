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
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Celo } from "@thirdweb-dev/chains";
import { MetaMaskProvider } from "@metamask/sdk-react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Lyte",
          url: window.location.href,
        },
        infuraAPIKey: import.meta.env.VITE_REACT_APP_INFURA_LYTE_API_KEY,
      }}
    >
    <ThirdwebProvider activeChain={Celo}>
      <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer/>
      </QueryClientProvider>
    </ThirdwebProvider>
    </MetaMaskProvider>
  </Router>,
)
