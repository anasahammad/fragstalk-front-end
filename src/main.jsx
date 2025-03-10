import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import store from './store/index.js'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>  
    <Toaster />

    <App />
    </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
