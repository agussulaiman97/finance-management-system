import {
  useEffect,
  useState,
} from 'react'

import toast from 'react-hot-toast'

import MainLayout from '../layouts/MainLayout'

import api from '../services/api'

import CategoryForm from '../components/CategoryForm'

import CategoryTable from '../components/CategoryTable'

import EmptyState from '../components/EmptyState'

export default function Categories() {

  /*
  =====================================
  STATE
  =====================================
  */

  const [categories, setCategories] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  // FILTER TYPE

  const [filterType, setFilterType] =
    useState('all')

  // SEARCH

  const [search, setSearch] =
    useState('')

  // PAGINATION

  const [currentPage, setCurrentPage] =
    useState(1)

  const itemsPerPage = 5

  /*
  =====================================
  GET CATEGORY
  =====================================
  */

  const getCategories =
    async () => {

      try {

        setLoading(true)

        const response =
          await api.get('/categories')

        setCategories(
          response.data
        )

      } catch (error) {

        console.log(error)

        toast.error(
          'Gagal mengambil kategori'
        )

      } finally {

        setLoading(false)

      }

    }

  useEffect(() => {

    getCategories()

  }, [])

  /*
  =====================================
  CREATE CATEGORY
  =====================================
  */

  const createCategory =
    async (data) => {

      try {

        await api.post(
          '/categories',
          data
        )

        toast.success(
          'Kategori berhasil ditambahkan'
        )

        getCategories()

      } catch (error) {

        console.log(error)

        toast.error(
          'Gagal tambah kategori'
        )

      }

    }

  /*
  =====================================
  DELETE CATEGORY
  =====================================
  */

  const deleteCategory =
    async (id) => {

      const confirmDelete =
        confirm(
          'Hapus kategori?'
        )

      if (!confirmDelete) return

      try {

        await api.delete(
          `/categories/${id}`
        )

        toast.success(
          'Kategori berhasil dihapus'
        )

        getCategories()

      } catch (error) {

        console.log(error)

        toast.error(
          'Gagal hapus kategori'
        )

      }

    }

  /*
  =====================================
  FILTER + SEARCH
  =====================================
  */

  const filteredCategories =
    categories.filter((item) => {

      // FILTER TYPE

      const matchType =
        filterType === 'all'
          ? true
          : item.type === filterType

      // SEARCH

      const matchSearch =
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      return (
        matchType &&
        matchSearch
      )

    })

  /*
  =====================================
  PAGINATION
  =====================================
  */

  const totalPages =
    Math.ceil(
      filteredCategories.length /
      itemsPerPage
    )

  const startIndex =
    (currentPage - 1) *
    itemsPerPage

  const endIndex =
    startIndex +
    itemsPerPage

  const paginatedCategories =
    filteredCategories.slice(
      startIndex,
      endIndex
    )

  /*
  =====================================
  LOADING
  =====================================
  */

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

          Kategori Transaksi

        </h1>

        <p className="
          text-slate-500
          text-lg
        ">

          Kelola seluruh kategori transaksi

        </p>

      </div>

      {/* FILTER + SEARCH */}

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
          md:flex-row
          gap-4
        ">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Cari kategori..."
            value={search}
            onChange={(e) => {

              setSearch(
                e.target.value
              )

              // RESET PAGE
              setCurrentPage(1)

            }}
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
            onChange={(e) => {

              setFilterType(
                e.target.value
              )

              // RESET PAGE
              setCurrentPage(1)

            }}
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
              Semua Kategori
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

      {/* FORM */}

      <CategoryForm
        onSubmit={createCategory}
      />

      {/* TABLE */}

      {
        filteredCategories.length >
        0 ? (

          <>

            <CategoryTable
              categories={
                paginatedCategories
              }
              onDelete={
                deleteCategory
              }
            />

            {/* PAGINATION */}

            {
              totalPages > 1 && (

                <div className="
                  flex
                  justify-center
                  items-center
                  gap-3
                  mt-8
                  flex-wrap
                ">

                  {/* PREV */}

                  <button
                    onClick={() =>
                      setCurrentPage(
                        currentPage - 1
                      )
                    }
                    disabled={
                      currentPage === 1
                    }
                    className="
                      px-5
                      py-3
                      rounded-2xl
                      bg-white
                      border
                      border-slate-200
                      disabled:opacity-40
                    "
                  >

                    Prev

                  </button>

                  {/* PAGE */}

                  {
                    [...Array(totalPages)]
                      .map((_, index) => {

                        const page =
                          index + 1

                        return (

                          <button
                            key={page}
                            onClick={() =>
                              setCurrentPage(page)
                            }
                            className={`
                              w-12
                              h-12
                              rounded-2xl
                              font-semibold
                              transition-all

                              ${
                                currentPage === page
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-white border border-slate-200'
                              }
                            `}
                          >

                            {page}

                          </button>

                        )

                      })
                  }

                  {/* NEXT */}

                  <button
                    onClick={() =>
                      setCurrentPage(
                        currentPage + 1
                      )
                    }
                    disabled={
                      currentPage === totalPages
                    }
                    className="
                      px-5
                      py-3
                      rounded-2xl
                      bg-white
                      border
                      border-slate-200
                      disabled:opacity-40
                    "
                  >

                    Next

                  </button>

                </div>

              )
            }

          </>

        ) : (

          <EmptyState
            title="Belum Ada Kategori"
            subtitle="Tambahkan kategori pertama Anda"
          />

        )
      }

    </MainLayout>

  )
}