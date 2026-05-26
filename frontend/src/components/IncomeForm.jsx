import {
  useState,
} from 'react'

import {
  FaPlus,
} from 'react-icons/fa'

export default function IncomeForm({
  onSubmit,
  categories,
}) {

  // =====================================
  // STATE
  // =====================================

  const [form, setForm] =
    useState({
      category: '',
      amount: '',
      note: '',
    })

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    })

  }

  // =====================================
  // HANDLE SUBMIT
  // =====================================

  const handleSubmit = (e) => {

    e.preventDefault()

    onSubmit({
      ...form,
      type: 'income',
    })

    // RESET FORM

    setForm({
      category: '',
      amount: '',
      note: '',
    })

  }

  return (

    <div className="
      bg-white
      rounded-3xl
      shadow-sm
      border
      border-slate-100
      p-6
      mb-8
    ">

      {/* HEADER */}

      <div className="mb-6">

        <h2 className="
          text-2xl
          font-bold
          text-slate-800
        ">

          Tambah Pemasukan

        </h2>

        <p className="
          text-slate-500
        ">

          Tambahkan data pemasukan baru

        </p>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
        "
      >

        {/* CATEGORY */}

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="
            border
            border-slate-200
            p-4
            rounded-2xl
            outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        >

          <option value="">
            Pilih Kategori
          </option>

          {categories.map((item) => (

            <option
              key={item.id}
              value={item.name}
            >

              {item.name}

            </option>

          ))}

        </select>

        {/* AMOUNT */}

        <input
          type="number"
          name="amount"
          placeholder="Nominal"
          value={form.amount}
          onChange={handleChange}
          required
          className="
            border
            border-slate-200
            p-4
            rounded-2xl
            outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        />

        {/* NOTE */}

        <textarea
          name="note"
          placeholder="Catatan"
          value={form.note}
          onChange={handleChange}
          rows="4"
          className="
            md:col-span-2
            border
            border-slate-200
            p-4
            rounded-2xl
            outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        />

        {/* BUTTON */}

        <button
          type="submit"
          className="
            md:col-span-2
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            py-4
            rounded-2xl
            font-semibold
            flex
            items-center
            justify-center
            gap-3
            transition-all
          "
        >

          <FaPlus />

          Simpan Pemasukan

        </button>

      </form>

    </div>

  )
}