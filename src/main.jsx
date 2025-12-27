import { StrictMode } from 'react'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './routes/Routes.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'react-hot-toast';
import { createRoot } from 'react-dom/client';
import StripeProvider from './components/StripeProvider/StripeProvider';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StripeProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={2000} />
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          duration: 3000,
          style: {
            background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
            color: '#fff',
            fontWeight: '600',
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(255, 107, 53, 0.3)',
            padding: '16px',
            fontSize: '14px',
            border: 'none'
          },
          success: {
            style: {
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              boxShadow: '0 8px 16px rgba(34, 197, 94, 0.3)'
            },
            icon: '✨'
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              boxShadow: '0 8px 16px rgba(239, 68, 68, 0.3)'
            },
            icon: '⚠️'
          }
        }} 
      />
    </StripeProvider>
  </StrictMode>,
)



