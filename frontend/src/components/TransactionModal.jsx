import { useState } from 'react'

export default function TransactionModal({
  onSubmit
}) {

  const [form, setForm] = useState({
    category: '',
    amount: '',
    type: 'income'
  })

  const handleSubmit = (e) => {

    e.preventDefault()

    onSubmit(form)

    setForm({
      category: '',
      amount: '',
      type: 'income'
    })
  }

  return (

    <div className="bg-white rounded-3xl shadow p-6 mb-8">

      <h2 className="text-2xl font-bold mb-6">

        Tambah Transaksi

      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-3 gap-4"
      >

        <input
          type="text"
          placeholder="Kategori"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value
            })
          }
          className="border p-4 rounded-xl"
        />

        <input
          type="number"
          placeholder="Nominal"
          value={form.amount}
          onChange={(e) =>
            setForm({
              ...form,
              amount: e.target.value
            })
          }
          className="border p-4 rounded-xl"
        />

        <select
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value
            })
          }
          className="border p-4 rounded-xl"
        >

          <option value="income">
            Pemasukan
          </option>

          <option value="expense">
            Pengeluaran
          </option>

        </select>

        <button
          className="bg-blue-600 text-white p-4 rounded-xl"
        >

          Simpan

        </button>

      </form>

    </div>

  )
}