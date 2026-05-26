import { useEffect, useState } from 'react'

import toast from 'react-hot-toast'

import { motion } from 'framer-motion'

import {
  FaWallet,
  FaArrowDown,
  FaArrowUp,
  FaPlus,
  FaFileInvoiceDollar,
  FaSyncAlt,
} from 'react-icons/fa'

import MainLayout from '../layouts/MainLayout'

import api from '../services/api'

import SummaryCard from '../components/SummaryCard'

import TransactionTable from '../components/TransactionTable'

import TransactionModal from '../components/TransactionModal'

import FinanceChart from '../components/FinanceChart'

import ExpensePieChart from '../components/ExpensePieChart'

import RecentTransaction from '../components/RecentTransaction'

import ExportPDFButton from '../components/ExportPDFButton'

import ExportExcelButton from '../components/ExportExcelButton'

import QuickActions from '../components/QuickActions'

import ActivityCard from '../components/ActivityCard'

import EmptyState from '../components/EmptyState'

export default function Dashboard() {

  // =====================================
  // STATE
  // =====================================

  const [transactions, setTransactions] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState('')

  const [filterType, setFilterType] =
    useState('all')

  // =====================================
  // GET TRANSACTION
  // =====================================

  const getTransactions = async () => {

    try {

      setLoading(true)

      const response =
        await api.get('/transactions')

      setTransactions(response.data)

    } catch (error) {

      console.log(error)

      toast.error(
        'Gagal mengambil transaksi'
      )

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {

    getTransactions()

  }, [])

  // =====================================
  // SUMMARY
  // =====================================

  const totalIncome =
    transactions
      .filter(
        (item) =>
          item.type === 'income'
      )
      .reduce(
        (a, b) =>
          a + Number(b.amount),
        0
      )

  const totalExpense =
    transactions
      .filter(
        (item) =>
          item.type === 'expense'
      )
      .reduce(
        (a, b) =>
          a + Number(b.amount),
        0
      )

  const balance =
    totalIncome - totalExpense

  // =====================================
  // GREETING
  // =====================================

  const getGreeting = () => {

    const hour =
      new Date().getHours()

    if (hour >= 4 && hour < 12) {

      return 'Selamat Pagi, Agus 👋'
    }

    if (hour >= 12 && hour < 15) {

      return 'Selamat Siang, Agus ☀️'
    }

    if (hour >= 15 && hour < 18) {

      return 'Selamat Sore, Agus 🌤️'
    }

    return 'Selamat Malam, Agus 🌙'
  }

  // =====================================
  // FILTER TRANSACTION
  // =====================================

  const filteredTransactions =
    transactions.filter((item) => {

      const matchSearch =
        item.category
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const matchType =
        filterType === 'all'
          ? true
          : item.type === filterType

      return (
        matchSearch &&
        matchType
      )
    })

  // =====================================
  // CREATE TRANSACTION
  // =====================================

  const createTransaction =
    async (data) => {

      try {

        await api.post(
          '/transactions',
          data
        )

        toast.success(
          'Transaksi berhasil ditambahkan'
        )

        getTransactions()

      } catch (error) {

        console.log(error)

        toast.error(
          'Gagal tambah transaksi'
        )

      }
    }

  // =====================================
  // DELETE TRANSACTION
  // =====================================

  const deleteTransaction =
    async (id) => {

      const confirmDelete =
        confirm(
          'Yakin ingin menghapus transaksi?'
        )

      if (!confirmDelete) return

      try {

        await api.delete(
          `/transactions/${id}`
        )

        toast.success(
          'Transaksi berhasil dihapus'
        )

        getTransactions()

      } catch (error) {

        console.log(error)

        toast.error(
          'Gagal menghapus transaksi'
        )

      }
    }

  // =====================================
  // LOADING STATE
  // =====================================

  if (loading) {

    return (

      <MainLayout>

        <div className="
          h-[70vh]
          flex
          items-center
          justify-center
        ">

          <div className="text-center">

            <div className="
              w-16
              h-16
              border-4
              border-indigo-500
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
              mb-5
            " />

            <h1 className="
              text-2xl
              font-bold
              text-slate-700
            ">

              Loading Dashboard...

            </h1>

          </div>

        </div>

      </MainLayout>

    )
  }

  return (

    <MainLayout>

      {/* ===================================== */}
      {/* HERO SECTION */}
      {/* ===================================== */}

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
          bg-gradient-to-r
          from-indigo-600
          to-violet-600
          rounded-3xl
          p-8
          mb-8
          text-white
          shadow-xl
        "
      >

        <div className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-6
        ">

          {/* LEFT */}

          <div>

            <h1 className="
              text-4xl
              font-bold
              mb-3
            ">

              {getGreeting()}

            </h1>

            <p className="
              text-indigo-100
              text-lg
              max-w-2xl
            ">

              Kelola pemasukan,
              pengeluaran,
              dan laporan keuangan
              dengan lebih mudah,
              modern, dan realtime.

            </p>

          </div>

          {/* RIGHT */}

          <div className="
            flex
            flex-wrap
            gap-4
          ">

            {/* TAMBAH */}

            <button className="
              bg-white
              text-indigo-600
              px-5
              py-3
              rounded-2xl
              font-semibold
              flex
              items-center
              gap-2
              hover:scale-105
              transition-all
            ">

              <FaPlus />

              Tambah Transaksi

            </button>

            {/* REPORT */}

            <button className="
              bg-indigo-500
              px-5
              py-3
              rounded-2xl
              font-semibold
              flex
              items-center
              gap-2
              hover:bg-indigo-400
              transition-all
            ">

              <FaFileInvoiceDollar />

              Lihat Laporan

            </button>

            {/* REFRESH */}

            <button
              onClick={getTransactions}
              className="
                bg-white/20
                px-5
                py-3
                rounded-2xl
                font-semibold
                flex
                items-center
                gap-2
                hover:bg-white/30
                transition-all
              "
            >

              <FaSyncAlt />

              Refresh

            </button>

          </div>

        </div>

      </motion.div>

      {/* ===================================== */}
      {/* SUMMARY */}
      {/* ===================================== */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
        mb-8
      ">

        <SummaryCard
          title="Total Pemasukan"
          amount={totalIncome}
          color="bg-green-500"
          icon={<FaArrowDown />}
          growth="+12%"
        />

        <SummaryCard
          title="Total Pengeluaran"
          amount={totalExpense}
          color="bg-red-500"
          icon={<FaArrowUp />}
          growth="+5%"
        />

        <SummaryCard
          title="Total Saldo"
          amount={balance}
          color="bg-indigo-500"
          icon={<FaWallet />}
          growth="+8%"
        />

      </div>

      {/* ===================================== */}
      {/* CHART SECTION */}
      {/* ===================================== */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        mb-8
      ">

        {/* FINANCE CHART */}

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
            xl:col-span-2
            bg-white
            rounded-3xl
            shadow-sm
            p-6
            border
            border-slate-100
          "
        >

          <div className="mb-6">

            <h2 className="
              text-2xl
              font-bold
              text-slate-800
            ">

              Grafik Arus Keuangan

            </h2>

            <p className="
              text-slate-500
            ">

              Statistik pemasukan
              dan pengeluaran

            </p>

          </div>

          <FinanceChart
            transactions={transactions}
          />

        </motion.div>

        {/* PIE CHART */}

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
            p-6
            border
            border-slate-100
          "
        >

          <h2 className="
            text-2xl
            font-bold
            text-slate-800
            mb-6
          ">

            Kategori Pengeluaran

          </h2>

          <ExpensePieChart
            transactions={transactions}
          />

        </motion.div>

      </div>

      {/* ===================================== */}
      {/* QUICK ACTION */}
      {/* ===================================== */}

      <div className="mb-8">

        <QuickActions />

      </div>

      {/* ===================================== */}
      {/* ACTIVITY */}
      {/* ===================================== */}

      <div className="mb-8">

        <ActivityCard
          transactions={transactions}
        />

      </div>

      {/* ===================================== */}
      {/* EXPORT */}
      {/* ===================================== */}

      <div className="
        flex
        flex-wrap
        justify-end
        gap-4
        mb-8
      ">

        <ExportPDFButton
          transactions={transactions}
        />

        <ExportExcelButton
          transactions={transactions}
        />

      </div>

      {/* ===================================== */}
      {/* FILTER */}
      {/* ===================================== */}

      <div className="
        bg-white
        rounded-3xl
        shadow-sm
        border
        border-slate-100
        p-6
        mb-8
      ">

        <div className="
          flex
          flex-col
          lg:flex-row
          gap-4
        ">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Cari transaksi..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              flex-1
              border
              border-slate-200
              p-4
              rounded-2xl
              outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />

          {/* FILTER */}

          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value)
            }
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

            <option value="all">
              Semua Transaksi
            </option>

            <option value="income">
              Pemasukan
            </option>

            <option value="expense">
              Pengeluaran
            </option>

          </select>

        </div>

      </div>

      {/* ===================================== */}
      {/* MODAL */}
      {/* ===================================== */}

      <TransactionModal
        onSubmit={createTransaction}
      />

      {/* ===================================== */}
      {/* TABLE */}
      {/* ===================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >

        {
          filteredTransactions.length > 0 ? (

            <TransactionTable
              transactions={
                filteredTransactions
              }
              onDelete={
                deleteTransaction
              }
            />

          ) : (

            <EmptyState
              title="Belum Ada Transaksi"
              subtitle="Tambahkan transaksi pertama Anda untuk mulai mengelola keuangan."
            />

          )
        }

      </motion.div>

      {/* ===================================== */}
      {/* RECENT TRANSACTION */}
      {/* ===================================== */}

      <div className="mt-8">

        <RecentTransaction
          transactions={transactions}
        />

      </div>

    </MainLayout>

  )
}