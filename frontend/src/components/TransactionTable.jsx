import {
  FaTrash,
} from 'react-icons/fa'

export default function TransactionTable({
  transactions,
  onDelete,
}) {

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

          Semua Transaksi

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

              <th className="
                text-left
                p-5
                text-slate-500
              ">

                Kategori

              </th>

              <th className="
                text-left
                p-5
                text-slate-500
              ">

                Jenis

              </th>

              <th className="
                text-left
                p-5
                text-slate-500
              ">

                Jumlah

              </th>

              <th className="
                text-left
                p-5
                text-slate-500
              ">

                Tanggal

              </th>

              <th className="
                text-center
                p-5
                text-slate-500
              ">

                Aksi

              </th>

            </tr>

          </thead>

          <tbody>

            {transactions.map(
              (item) => (

                <tr
                  key={item.id}
                  className="
                    border-t
                    border-slate-100
                    hover:bg-slate-50
                    transition-all
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
                  ">

                    <span className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-semibold
                      ${
                        item.type ===
                        'income'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }
                    `}>

                      {item.type}

                    </span>

                  </td>

                  <td className="
                    p-5
                    font-semibold
                  ">

                    {formatRupiah(
                      item.amount
                    )}

                  </td>

                  <td className="
                    p-5
                    text-slate-500
                  ">

                    {
                      new Date(
                        item.createdAt
                      ).toLocaleDateString(
                        'id-ID'
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
                        transition-all
                      "
                    >

                      <FaTrash />

                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  )
}