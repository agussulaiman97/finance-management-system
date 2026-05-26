import {
  useEffect,
  useState,
} from 'react'

import toast from 'react-hot-toast'

import MainLayout from '../layouts/MainLayout'

import api from '../services/api'

import IncomeForm from '../components/IncomeForm'

import IncomeTable from '../components/IncomeTable'

import EmptyState from '../components/EmptyState'

export default function Income() {

  // =====================================
  // STATE
  // =====================================

  const [incomes, setIncomes] =
    useState([])

  const [categories, setCategories] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  // =====================================
  // GET INCOME
  // =====================================

  const getIncome = async () => {

    try {

      setLoading(true)

      const response =
        await api.get('/transactions')

      const filtered =
        response.data.filter(
          (item) =>
            item.type === 'income'
        )

      setIncomes(filtered)

    } catch (error) {

      console.log(error)

      toast.error(
        'Gagal mengambil data pemasukan'
      )

    } finally {

      setLoading(false)

    }

  }

  // =====================================
  // GET CATEGORIES
  // =====================================

  const getCategories =
    async () => {

      try {

        const response =
          await api.get('/categories')

        // FILTER HANYA INCOME

        const filtered =
          response.data.filter(
            (item) =>
              item.type === 'income'
          )

        setCategories(filtered)

      } catch (error) {

        console.log(error)

      }

    }

  // =====================================
  // LOAD DATA
  // =====================================

  useEffect(() => {

    getIncome()

    getCategories()

  }, [])

  // =====================================
  // CREATE INCOME
  // =====================================

  const createIncome =
    async (data) => {

      try {

        await api.post(
          '/transactions',
          data
        )

        toast.success(
          'Pemasukan berhasil ditambahkan'
        )

        getIncome()

      } catch (error) {

        console.log(error)

        toast.error(
          'Gagal tambah pemasukan'
        )

      }

    }

  // =====================================
  // DELETE INCOME
  // =====================================

  const deleteIncome =
    async (id) => {

      const confirmDelete =
        confirm(
          'Hapus pemasukan?'
        )

      if (!confirmDelete) return

      try {

        await api.delete(
          `/transactions/${id}`
        )

        toast.success(
          'Pemasukan berhasil dihapus'
        )

        getIncome()

      } catch (error) {

        console.log(error)

        toast.error(
          'Gagal hapus pemasukan'
        )

      }

    }

  // =====================================
  // LOADING
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

          Loading...

        </div>

      </MainLayout>

    )

  }

  return (

    <MainLayout>

      {/* HEADER */}

      <div className="
        bg-white
        rounded-3xl
        shadow-sm
        border
        border-slate-100
        p-8
        mb-8
      ">

        <h1 className="
          text-5xl
          font-bold
          text-slate-800
          mb-4
        ">

          Data Pemasukan

        </h1>

        <p className="
          text-slate-500
          text-lg
        ">

          Kelola seluruh pemasukan keuangan

        </p>

      </div>

      {/* FORM */}

      <IncomeForm
        onSubmit={createIncome}
        categories={categories}
      />

      {/* TABLE */}

      {
        incomes.length > 0 ? (

          <IncomeTable
            incomes={incomes}
            onDelete={deleteIncome}
          />

        ) : (

          <EmptyState
            title="Belum Ada Pemasukan"
            subtitle="Tambahkan pemasukan pertama Anda"
          />

        )
      }

    </MainLayout>

  )
}