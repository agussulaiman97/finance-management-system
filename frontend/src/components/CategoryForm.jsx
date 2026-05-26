import {
  useState,
} from 'react'

import {
  FaPlus,
} from 'react-icons/fa'

export default function CategoryForm({
  onSubmit,
}) {

  const [form, setForm] =
    useState({
      name: '',
      type: 'income',
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

    onSubmit(form)

    setForm({
      name: '',
      type: 'income',
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

      <h2 className="
        text-2xl
        font-bold
        mb-6
      ">

        Tambah Kategori

      </h2>

      <form
        onSubmit={handleSubmit}
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-5
        "
      >

        {/* NAME */}

        <input
          type="text"
          name="name"
          placeholder="Nama kategori"
          value={form.name}
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

        {/* TYPE */}

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
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

          <option value="income">
            Pemasukan
          </option>

          <option value="expense">
            Pengeluaran
          </option>

        </select>

        {/* BUTTON */}

        <button
          type="submit"
          className="
            bg-indigo-600
            hover:bg-indigo-700
            text-white
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

          Tambah

        </button>

      </form>

    </div>

  )
}