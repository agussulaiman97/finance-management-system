import {
  FaChartPie,
  FaMoneyBillWave,
  FaWallet,
  FaUniversity,
  FaFileInvoiceDollar,
  FaCog,
  FaTags,
} from 'react-icons/fa'

import {
  NavLink,
} from 'react-router-dom'

export default function Sidebar() {

  // =====================================
  // MENU
  // =====================================

  const menus = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <FaChartPie />,
    },

    {
      name: 'Pemasukan',
      path: '/income',
      icon: <FaMoneyBillWave />,
    },

    {
      name: 'Pengeluaran',
      path: '/expense',
      icon: <FaWallet />,
    },

    {
      name: 'Kategori',
      path: '/categories',
      icon: <FaTags />,
    },

    {
      name: 'Bank',
      path: '/bank',
      icon: <FaUniversity />,
    },

    {
      name: 'Laporan',
      path: '/reports',
      icon: <FaFileInvoiceDollar />,
    },

    {
      name: 'Pengaturan',
      path: '/settings',
      icon: <FaCog />,
    },
  ]

  return (

    <aside className="
      hidden
      lg:flex
      flex-col
      w-72
      bg-slate-900
      text-white
      min-h-screen
      p-6
      border-r
      border-slate-800
    ">

      {/* ===================================== */}
      {/* LOGO */}
      {/* ===================================== */}

      <div className="mb-10">

        <h1 className="
          text-3xl
          font-bold
          bg-gradient-to-r
          from-indigo-400
          to-violet-400
          bg-clip-text
          text-transparent
        ">

          Finance App

        </h1>

        <p className="
          text-slate-400
          mt-2
        ">

          Premium Finance Dashboard

        </p>

      </div>

      {/* ===================================== */}
      {/* MENU */}
      {/* ===================================== */}

      <div className="
        flex
        flex-col
        gap-3
      ">

        {menus.map(
          (menu, index) => (

            <NavLink
              key={index}
              to={menu.path}
              className={({
                isActive,
              }) => `
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                transition-all
                font-medium
                ${
                  isActive
                    ? `
                      bg-indigo-600
                      shadow-lg
                    `
                    : `
                      hover:bg-slate-800
                      text-slate-300
                    `
                }
              `}
            >

              {/* ICON */}

              <span className="
                text-xl
              ">

                {menu.icon}

              </span>

              {/* TEXT */}

              <span>

                {menu.name}

              </span>

            </NavLink>

          )
        )}

      </div>

      {/* ===================================== */}
      {/* FOOTER */}
      {/* ===================================== */}

      <div className="
        mt-auto
        pt-10
      ">

        <div className="
          bg-slate-800
          rounded-3xl
          p-5
        ">

          <h3 className="
            font-bold
            mb-2
          ">

            Finance Management

          </h3>

          <p className="
            text-sm
            text-slate-400
          ">

            Modern Premium Dashboard
            untuk mengelola seluruh
            keuangan Anda.

          </p>

        </div>

      </div>

    </aside>

  )
}