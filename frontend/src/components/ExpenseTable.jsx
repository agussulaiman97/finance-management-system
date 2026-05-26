import { useState } from 'react'
import {
  FaTrash,
  FaEdit,
  FaInbox,
} from 'react-icons/fa'

export default function ExpenseTable({
  expenses,
  onDelete,
  onEdit,
}) {

  /*
  ========================================
  PAGINATION
  ========================================
  */

  const ITEMS_PER_PAGE = 5

  const [currentPage, setCurrentPage] =
    useState(1)

  const totalPages = Math.ceil(
    expenses.length / ITEMS_PER_PAGE
  )

  const startIndex =
    (currentPage - 1) *
    ITEMS_PER_PAGE

  const endIndex =
    startIndex + ITEMS_PER_PAGE

  const currentExpenses =
    expenses.slice(
      startIndex,
      endIndex
    )

  // =========================================
  // FORMAT TANGGAL
  // =========================================

  const formatDate = (dateValue) => {

    if (!dateValue) return '-'

    const date = new Date(dateValue)

    if (isNaN(date.getTime())) {
      return '-'
    }

    return date.toLocaleDateString(
      'id-ID',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
    )

  }

  // =========================================
  // FORMAT RUPIAH
  // =========================================

  const formatRupiah = (number) => {

    return new Intl.NumberFormat(
      'id-ID'
    ).format(number)

  }

  return (

    <div className="
      bg-white
      rounded-3xl
      shadow-sm
      border
      border-slate-100
      overflow-hidden
    ">

      {/* HEADER */}

      <div className="
        p-6
        border-b
        border-slate-100
        flex
        items-center
        justify-between
      ">

        <div>

          <h2 className="
            text-2xl
            font-bold
            text-slate-800
          ">

            Data Pengeluaran

          </h2>

          <p className="
            text-slate-500
            mt-1
          ">

            Daftar seluruh transaksi pengeluaran

          </p>

        </div>

        <div className="
          text-sm
          text-slate-400
        ">

          Total:
          <span className="
            ml-2
            font-bold
            text-slate-700
          ">

            {expenses.length}

          </span>

        </div>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="p-5 text-left">
                Kategori
              </th>

              <th className="p-5 text-left">
                Nominal
              </th>

              <th className="p-5 text-left">
                Catatan
              </th>

              <th className="p-5 text-left">
                Tanggal
              </th>

              <th className="p-5 text-center">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {
              expenses.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="
                      p-16
                      text-center
                    "
                  >

                    <div className="
                      flex
                      flex-col
                      items-center
                      justify-center
                    ">

                      <div className="
                        w-24
                        h-24
                        rounded-full
                        bg-slate-100
                        flex
                        items-center
                        justify-center
                        text-slate-400
                        text-4xl
                        mb-5
                      ">

                        <FaInbox />

                      </div>

                      <h3 className="
                        text-2xl
                        font-bold
                        text-slate-700
                        mb-2
                      ">

                        Belum ada data pengeluaran

                      </h3>

                      <p className="
                        text-slate-400
                      ">

                        Tambahkan transaksi baru
                        untuk mulai mencatat
                        pengeluaran

                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                currentExpenses.map((item) => (

                  <tr
                    key={item.id}
                    className="
                      border-t
                      border-slate-100
                      hover:bg-slate-50
                    "
                  >

                    {/* CATEGORY */}

                    <td className="p-5">

                      <div className="
                        inline-flex
                        px-4
                        py-2
                        rounded-2xl
                        bg-red-100
                        text-red-500
                        font-semibold
                      ">

                        {item.category}

                      </div>

                    </td>

                    {/* AMOUNT */}

                    <td className="
                      p-5
                      font-bold
                      text-red-500
                    ">

                      Rp {
                        formatRupiah(
                          item.amount
                        )
                      }

                    </td>

                    {/* NOTE */}

                    <td className="
                      p-5
                      text-slate-600
                    ">

                      {item.note || '-'}

                    </td>

                    {/* DATE */}

                    <td className="
                      p-5
                      text-slate-500
                    ">

                      {
                        formatDate(
                          item.createdAt || item.date
                        )
                      }

                    </td>

                    {/* ACTION */}

                    <td className="p-5">

                      <div className="
                        flex
                        items-center
                        justify-center
                        gap-3
                      ">

                        {/* EDIT */}

                        <button
                          onClick={() =>
                            onEdit(item)
                          }
                          className="
                            w-10
                            h-10
                            rounded-xl
                            bg-indigo-100
                            hover:bg-indigo-500
                            hover:text-white
                            text-indigo-500
                            flex
                            items-center
                            justify-center
                            transition-all
                          "
                        >

                          <FaEdit />

                        </button>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            onDelete(item.id)
                          }
                          className="
                            w-10
                            h-10
                            rounded-xl
                            bg-red-100
                            hover:bg-red-500
                            hover:text-white
                            text-red-500
                            flex
                            items-center
                            justify-center
                            transition-all
                          "
                        >

                          <FaTrash />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )
            }

          </tbody>

        </table>

      </div>
      /*
========================================
PAGINATION BUTTON
========================================
*/

<div className="
  flex
  items-center
  justify-between
  p-5
  border-t
  border-slate-100
">

  {/* PREV */}

  <button
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage(
        currentPage - 1
      )
    }
    className="
      px-4
      py-2
      rounded-xl
      border
      border-slate-200
      disabled:opacity-40
    "
  >

    Prev

  </button>

  {/* INFO */}

  <div className="
    text-sm
    text-slate-500
  ">

    Halaman

    <span className="
      mx-2
      font-bold
      text-slate-800
    ">

      {currentPage}

    </span>

    dari {totalPages || 1}

  </div>

  {/* NEXT */}

  <button
    disabled={
      currentPage === totalPages
      ||
      totalPages === 0
    }
    onClick={() =>
      setCurrentPage(
        currentPage + 1
      )
    }
    className="
      px-4
      py-2
      rounded-xl
      border
      border-slate-200
      disabled:opacity-40
    "
  >

    Next

  </button>

</div>
    </div>

  )

}