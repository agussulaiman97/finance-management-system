import {
  FaArrowDown,
  FaArrowUp,
  FaUniversity,
  FaFilePdf,
} from 'react-icons/fa'

import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'

export default function QuickActions() {

  const navigate = useNavigate()

  // =====================================
  // MENU ACTION
  // =====================================

  const actions = [
    {
      title: 'Tambah Pemasukan',
      icon: <FaArrowDown />,
      color: 'bg-green-500',
      path: '/income',
    },
    {
      title: 'Tambah Pengeluaran',
      icon: <FaArrowUp />,
      color: 'bg-red-500',
      path: '/expense',
    },
    {
      title: 'Export PDF',
      icon: <FaFilePdf />,
      color: 'bg-indigo-500',
      path: '/reports',
    },
    {
      title: 'Rekening Bank',
      icon: <FaUniversity />,
      color: 'bg-orange-500',
      path: '/bank',
    },
  ]

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        bg-white
        rounded-3xl
        shadow-sm
        border
        border-slate-100
        p-6
      "
    >

      {/* HEADER */}

      <div className="
        flex
        items-center
        justify-between
        mb-6
      ">

        <div>

          <h2 className="
            text-2xl
            font-bold
            text-slate-800
          ">

            Quick Action

          </h2>

          <p className="
            text-slate-500
          ">

            Shortcut menu keuangan

          </p>

        </div>

      </div>

      {/* ACTION LIST */}

      <div className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-4
      ">

        {actions.map(
          (item, index) => (

            <button
              key={index}
              onClick={() =>
                navigate(item.path)
              }
              className="
                p-5
                rounded-3xl
                border
                border-slate-100
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                text-left
                group
                bg-slate-50
              "
            >

              <div className={`
                w-16
                h-16
                rounded-2xl
                flex
                items-center
                justify-center
                text-white
                text-2xl
                mb-5
                shadow-lg
                ${item.color}
              `}>

                {item.icon}

              </div>

              <h3 className="
                font-semibold
                text-slate-700
                text-lg
                group-hover:text-indigo-600
                transition-all
              ">

                {item.title}

              </h3>

            </button>

          )
        )}

      </div>

    </motion.div>

  )
}