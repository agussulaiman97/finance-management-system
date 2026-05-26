import { useEffect, useState } from 'react'

import {
  FaTimes,
  FaSave,
} from 'react-icons/fa'

export default function EditExpenseModal({
  isOpen,
  onClose,
  onUpdate,
  expense,
  categories,
}) {

  // =====================================
  // STATE
  // =====================================

  const [formData, setFormData] =
    useState({
      category: '',
      amount: '',
      note: '',
    })

  // =====================================
  // SET DATA
  // =====================================

  useEffect(() => {

    if (expense) {

      setFormData({
        category:
          expense.category || '',

        amount:
          expense.amount || '',

        note:
          expense.note || '',
      })
    }

  }, [expense])

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    })
  }

  // =====================================
  // HANDLE SUBMIT
  // =====================================

  const handleSubmit = (e) => {

    e.preventDefault()

    onUpdate({
      ...expense,
      ...formData,
    })
  }

  // =====================================
  // CLOSE IF NOT OPEN
  // =====================================

  if (!isOpen) return null

  return (

    <div className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
      backdrop-blur-sm
      p-4
    ">

      {/* MODAL */}

      <div className="
        bg-white
        w-full
        max-w-2xl
        rounded-3xl
        shadow-2xl
        overflow-hidden
      ">

        {/* HEADER */}

        <div className="
          flex
          items-center
          justify-between
          p-6
          border-b
        ">

          <div>

            <h2 className="
              text-2xl
              font-bold
              text-slate-800
            ">

              Edit Pengeluaran

            </h2>

            <p className="
              text-slate-500
              mt-1
            ">

              Update transaksi pengeluaran

            </p>

          </div>

          <button
            onClick={onClose}
            className="
              w-10
              h-10
              rounded-xl
              bg-slate-100
              hover:bg-red-100
              flex
              items-center
              justify-center
              transition-all
            "
          >

            <FaTimes />

          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* CATEGORY */}

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-2xl
              px-5
              py-4
              outline-none
            "
            required
          >

            <option value="">
              Pilih Kategori
            </option>

            {
              categories.map((item) => (

                <option
                  key={item.id}
                  value={item.name}
                >

                  {item.name}

                </option>

              ))
            }

          </select>

          {/* AMOUNT */}

          <input
            type="number"
            name="amount"
            placeholder="Nominal"
            value={formData.amount}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-2xl
              px-5
              py-4
              outline-none
            "
            required
          />

          {/* NOTE */}

          <textarea
            name="note"
            placeholder="Catatan"
            value={formData.note}
            onChange={handleChange}
            rows="5"
            className="
              w-full
              border
              rounded-2xl
              px-5
              py-4
              outline-none
              resize-none
            "
          />

          {/* BUTTON */}

          <div className="
            flex
            justify-end
            gap-3
          ">

            <button
              type="button"
              onClick={onClose}
              className="
                px-6
                py-3
                rounded-2xl
                bg-slate-200
                hover:bg-slate-300
                font-semibold
              "
            >

              Batal

            </button>

            <button
              type="submit"
              className="
                px-6
                py-3
                rounded-2xl
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                font-semibold
                flex
                items-center
                gap-2
              "
            >

              <FaSave />

              Update

            </button>

          </div>

        </form>

      </div>

    </div>

  )
}