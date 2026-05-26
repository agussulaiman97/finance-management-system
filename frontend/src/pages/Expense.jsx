import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import toast from 'react-hot-toast'

import {
  FaFileExcel,
  FaFilePdf,
  FaRedo,
  FaSearch,
  FaWallet,
} from 'react-icons/fa'

import MainLayout from '../layouts/MainLayout'

import api from '../services/api'

import ExpenseForm from '../components/ExpenseForm'
import ExpenseTable from '../components/ExpenseTable'

export default function Expense() {

  // =========================================
  // STATE
  // =========================================

  const [expenses, setExpenses] =
    useState([])

  const [categories, setCategories] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState('')

  // =========================================
  // GET EXPENSES
  // =========================================

  const fetchExpenses = async () => {

    try {

      setLoading(true)

      const response =
        await api.get('/transactions')

      // FIX RESPONSE
      const data =
        Array.isArray(response.data)
          ? response.data
          : response.data.data || []

      const filtered =
        data.filter(
          (item) =>
            item.type === 'expense'
        )

      setExpenses(filtered)

    } catch (error) {

      console.log(error)

      toast.error(
        'Gagal mengambil data'
      )

    } finally {

      setLoading(false)

    }

  }

  // =========================================
  // GET CATEGORIES
  // =========================================

  const fetchCategories = async () => {

    try {

      const response =
        await api.get('/categories')

      // FIX RESPONSE
      const data =
        Array.isArray(response.data)
          ? response.data
          : response.data.data || []

      const filtered =
        data.filter(
          (item) =>
            item.type === 'expense'
        )

      setCategories(filtered)

    } catch (error) {

      console.log(error)

    }

  }

  // =========================================
  // FIRST LOAD
  // =========================================

  useEffect(() => {

    fetchExpenses()

    fetchCategories()

  }, [])

  // =========================================
  // CREATE EXPENSE
  // =========================================

  const createExpense =
    async (formData) => {

      try {

        await api.post(
          '/transactions',
          {
            ...formData,
            type: 'expense',
          }
        )

        toast.success(
          'Pengeluaran berhasil ditambahkan'
        )

        fetchExpenses()

      } catch (error) {

        console.log(error)

        toast.error(
          'Gagal menambah pengeluaran'
        )

      }

    }

  // =========================================
  // DELETE EXPENSE
  // =========================================

  const deleteExpense =
    async (id) => {

      const confirmDelete =
        confirm(
          'Yakin ingin menghapus data?'
        )

      if (!confirmDelete) return

      try {

        await api.delete(
          `/transactions/${id}`
        )

        toast.success(
          'Data berhasil dihapus'
        )

        fetchExpenses()

      } catch (error) {

        console.log(error)

        toast.error(
          'Gagal menghapus data'
        )

      }

    }

  // =========================================
  // SEARCH FILTER
  // =========================================

  const filteredExpenses =
    useMemo(() => {

      return expenses.filter(
        (item) =>
          item.category
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      )

    }, [expenses, search])

  // =========================================
  // SUMMARY
  // =========================================

  const totalExpense =
    filteredExpenses.reduce(
      (acc, item) =>
        acc + Number(item.amount),
      0
    )

  // =========================================
  // EXPORT PDF
  // =========================================

  const exportPDF = () => {

    window.open(
      'http://localhost:5000/api/export/expense/pdf',
      '_blank'
    )

  }

  // =========================================
  // EXPORT EXCEL
  // =========================================

  const exportExcel = () => {

    window.open(
      'http://localhost:5000/api/export/expense/excel',
      '_blank'
    )

  }

  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <MainLayout>

        <div className="
          h-[70vh]
          flex
          items-center
          justify-center
          text-xl
          font-semibold
        ">

          Loading...

        </div>

      </MainLayout>

    )

  }

  // =========================================
  // RENDER
  // =========================================

  return (

    <MainLayout>

      {/* HEADER */}

      <div className="
        bg-white
        rounded-3xl
        p-10
        shadow-sm
        border
        border-slate-100
        mb-8
      ">

        <h1 className="
          text-5xl
          font-black
          text-slate-800
          mb-4
        ">

          Data Pengeluaran

        </h1>

        <p className="
          text-slate-500
          text-xl
        ">

          Kelola seluruh pengeluaran keuangan secara realtime dan modern

        </p>

      </div>

      {/* SUMMARY */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        mb-10
      ">

        {/* TOTAL */}

        <div className="
          bg-white
          rounded-3xl
          p-8
          shadow-sm
          border
          border-slate-100
          flex
          justify-between
          items-center
        ">

          <div>

            <p className="
              text-slate-500
              mb-2
            ">

              Total Pengeluaran

            </p>

            <h2 className="
              text-5xl
              font-black
              text-red-500
            ">

              Rp {totalExpense.toLocaleString('id-ID')}

            </h2>

          </div>

          <div className="
            w-20
            h-20
            rounded-3xl
            bg-red-100
            flex
            items-center
            justify-center
            text-red-500
            text-4xl
          ">

            <FaWallet />

          </div>

        </div>

        {/* TOTAL TRANSAKSI */}

        <div className="
          bg-white
          rounded-3xl
          p-8
          shadow-sm
          border
          border-slate-100
        ">

          <p className="
            text-slate-500
            mb-2
          ">

            Total Transaksi

          </p>

          <h2 className="
            text-5xl
            font-black
            text-slate-800
          ">

            {filteredExpenses.length}

          </h2>

        </div>

        {/* TOTAL KATEGORI */}

        <div className="
          bg-white
          rounded-3xl
          p-8
          shadow-sm
          border
          border-slate-100
        ">

          <p className="
            text-slate-500
            mb-2
          ">

            Total Kategori

          </p>

          <h2 className="
            text-5xl
            font-black
            text-indigo-500
          ">

            {categories.length}

          </h2>

        </div>

      </div>

      {/* ACTION */}

      <div className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-5
        mb-8
      ">

        <div>

          <h2 className="
            text-4xl
            font-black
            text-slate-800
            mb-2
          ">

            Manajemen Pengeluaran

          </h2>

          <p className="
            text-slate-500
          ">

            Kelola transaksi realtime

          </p>

        </div>

        <div className="
          flex
          gap-4
          flex-wrap
        ">

          <button
            onClick={() => {
              fetchExpenses()
              fetchCategories()
            }}
            className="
              px-6
              py-4
              rounded-2xl
              bg-white
              shadow-sm
              border
              border-slate-200
              font-semibold
              flex
              items-center
              gap-3
            "
          >

            <FaRedo />

            Refresh

          </button>

          <button
            onClick={exportPDF}
            className="
              px-6
              py-4
              rounded-2xl
              bg-red-500
              text-white
              font-semibold
              flex
              items-center
              gap-3
            "
          >

            <FaFilePdf />

            Export PDF

          </button>

          <button
            onClick={exportExcel}
            className="
              px-6
              py-4
              rounded-2xl
              bg-green-500
              text-white
              font-semibold
              flex
              items-center
              gap-3
            "
          >

            <FaFileExcel />

            Export Excel

          </button>

        </div>

      </div>

      {/* FORM */}

      <ExpenseForm
        onSubmit={createExpense}
        categories={categories}
      />

      {/* SEARCH */}

      <div className="
        bg-white
        rounded-3xl
        p-6
        shadow-sm
        border
        border-slate-100
        my-8
      ">

        <div className="relative">

          <FaSearch
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Cari kategori..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              h-16
              rounded-2xl
              border
              border-slate-200
              pl-14
              pr-5
              outline-none
              text-lg
            "
          />

        </div>

      </div>

      {/* TABLE */}

      <ExpenseTable
        expenses={filteredExpenses}
        onDelete={deleteExpense}
      />

    </MainLayout>

  )

}