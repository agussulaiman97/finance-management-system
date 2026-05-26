import {
  BrowserRouter,
} from 'react-router-dom'

import {
  Toaster,
} from 'react-hot-toast'

import AppRoutes from './routes/AppRoutes'

export default function App() {

  return (

    <BrowserRouter>

      {/* ROUTES */}

      <AppRoutes />

      {/* TOAST */}

      <Toaster
        position="top-right"
      />

    </BrowserRouter>

  )
}