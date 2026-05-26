import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

// =====================================
// PAGES
// =====================================

import Dashboard from '../pages/Dashboard'

import Income from '../pages/Income'

import Expense from '../pages/Expense'

import Categories from '../pages/Categories'

// =====================================
// TEMPORARY PAGES
// =====================================

const Bank = () => {

  return (

    <div className="
      text-2xl
      font-bold
    ">

      Halaman Bank

    </div>

  )

}

const Reports = () => {

  return (

    <div className="
      text-2xl
      font-bold
    ">

      Halaman Laporan

    </div>

  )

}

const Settings = () => {

  return (

    <div className="
      text-2xl
      font-bold
    ">

      Halaman Pengaturan

    </div>

  )

}

// =====================================
// APP ROUTES
// =====================================

export default function AppRoutes() {

  return (

    <Routes>

      {/* DEFAULT */}

      <Route
        path="/"
        element={
          <Navigate to="/dashboard" />
        }
      />

      {/* DASHBOARD */}

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* INCOME */}

      <Route
        path="/income"
        element={<Income />}
      />

      {/* EXPENSE */}

      <Route
        path="/expense"
        element={<Expense />}
      />

      {/* CATEGORIES */}

      <Route
        path="/categories"
        element={<Categories />}
      />

      {/* BANK */}

      <Route
        path="/bank"
        element={<Bank />}
      />

      {/* REPORTS */}

      <Route
        path="/reports"
        element={<Reports />}
      />

      {/* SETTINGS */}

      <Route
        path="/settings"
        element={<Settings />}
      />

    </Routes>

  )
}