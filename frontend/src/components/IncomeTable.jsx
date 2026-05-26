import {
  FaTrash,
  FaInbox,
} from 'react-icons/fa'

export default function IncomeTable({
  incomes,
  onDelete,
}) {

  // =========================================
  // FORMAT RUPIAH
  // =========================================

  const formatRupiah = (
    number
  ) => {

    return new Intl.NumberFormat(
      'id-ID',
      {
        style: 'currency',
        currency: 'IDR',
      }
    ).format(number)

  }

  // =========================================
  // FORMAT DATE
  // =========================================

  const formatDate = (
    dateValue
  ) => {

    if (!dateValue) return '-'

    const date =
      new Date(dateValue)

    if (
      isNaN(date.getTime())
    ) {
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
      ">

        <h2 className="
          text-2xl
          font-bold
          text-slate-800
        ">

          Data Pemasukan

        </h2>

      </div>

      {/* TABLE */}

      <div className="
        overflow-x-auto
      ">

        <table className="
          w-full
        ">

          <thead className="
            bg-slate-50
          ">

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

              <th className="
                p-5
                text-center
              ">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {
              incomes.length === 0 ? (

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

                        Belum ada data pemasukan

                      </h3>

                    </div>

                  </td>

                </tr>

              ) : (

                incomes.map((item) => (

                  <tr
                    key={item.id}
                    className="
                      border-t
                      border-slate-100
                      hover:bg-slate-50
                    "
                  >

                    <td className="
                      p-5
                      font-medium
                    ">

                      {item.category}

                    </td>

                    <td className="
                      p-5
                      text-green-600
                      font-semibold
                    ">

                      {
                        formatRupiah(
                          item.amount
                        )
                      }

                    </td>

                    <td className="
                      p-5
                      text-slate-500
                    ">

                      {item.note || '-'}

                    </td>

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

                    <td className="
                      p-5
                      text-center
                    ">

                      <button
                        onClick={() =>
                          onDelete(item.id)
                        }
                        className="
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          p-3
                          rounded-xl
                        "
                      >

                        <FaTrash />

                      </button>

                    </td>

                  </tr>

                ))

              )
            }

          </tbody>

        </table>

      </div>

    </div>

  )

}