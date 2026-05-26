import {
  useState,
} from 'react'

import {
  FaPlus,
} from 'react-icons/fa'

export default function ExpenseForm({
  onSubmit,
  categories,
}) {

  // =====================================
  // STATE
  // =====================================

  const [loading, setLoading] =
    useState(false)

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

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      // VALIDATION

      if (
        !form.category ||
        !form.amount
      ) {

        return alert(
          'Kategori dan nominal wajib diisi'
        )

      }

      try {

        setLoading(true)

        // SUBMIT TO PARENT

        await onSubmit({

          ...form,

          amount: Number(
            form.amount
          ),

          type: 'expense',

        })

        // RESET FORM

        setForm({

          category: '',

          amount: '',

          note: '',

        })

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }

    }

  // =====================================
  // FORMAT RUPIAH PREVIEW
  // =====================================

  const formatRupiah = (
    number
  ) => {

    if (!number) return 'Rp 0'

    return new Intl.NumberFormat(
      'id-ID',
      {

        style: 'currency',

        currency: 'IDR',

      }
    ).format(number)

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

      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className="
        mb-6
      ">

        <h2 className="
          text-2xl
          font-bold
          text-slate-800
        ">

          Tambah Pengeluaran

        </h2>

        <p className="
          text-slate-500
          mt-2
        ">

          Tambahkan transaksi
          pengeluaran baru

        </p>

      </div>

      {/* ===================================== */}
      {/* EMPTY CATEGORY WARNING */}
      {/* ===================================== */}

      {
        categories.length === 0 && (

          <div className="
            bg-red-50
            border
            border-red-200
            text-red-600
            p-4
            rounded-2xl
            mb-6
          ">

            Belum ada kategori
            pengeluaran.
            Tambahkan kategori dulu.

          </div>

        )
      }

      {/* ===================================== */}
      {/* FORM */}
      {/* ===================================== */}

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
          disabled={
            categories.length === 0
          }
          className="
            border
            border-slate-200
            p-4
            rounded-2xl
            outline-none
            focus:ring-2
            focus:ring-red-500
            bg-white
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

        <div>

          <input
            type="number"
            name="amount"
            placeholder="Nominal"
            value={form.amount}
            onChange={handleChange}
            required
            className="
              w-full
              border
              border-slate-200
              p-4
              rounded-2xl
              outline-none
              focus:ring-2
              focus:ring-red-500
            "
          />

          {/* PREVIEW */}

          <p className="
            mt-2
            text-sm
            text-slate-500
          ">

            {
              formatRupiah(
                form.amount
              )
            }

          </p>

        </div>

        {/* NOTE */}

        <textarea
          name="note"
          placeholder="Catatan transaksi"
          rows="3"
          value={form.note}
          onChange={handleChange}
          className="
            md:col-span-2
            border
            border-slate-200
            p-4
            rounded-2xl
            outline-none
            focus:ring-2
            focus:ring-red-500
          "
        />

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="
            md:col-span-2
            bg-red-500
            hover:bg-red-600
            disabled:bg-red-300
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

          {
            loading
              ? 'Menyimpan...'
              : 'Simpan Pengeluaran'
          }

        </button>

      </form>

    </div>

  )

}