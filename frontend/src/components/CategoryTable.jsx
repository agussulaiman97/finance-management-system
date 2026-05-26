import {
  FaTrash,
} from 'react-icons/fa'

export default function CategoryTable({
  categories,
  onDelete,
}) {

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

          Data Kategori

        </h2>

        <p className="
          text-slate-500
          mt-2
        ">

          Seluruh kategori transaksi

        </p>

      </div>

      {/* TABLE */}

      <div className="
        overflow-x-auto
      ">

        <table className="
          w-full
        ">

          {/* HEADER */}

          <thead className="
            bg-slate-50
          ">

            <tr>

              <th className="
                p-5
                text-left
              ">

                Nama Kategori

              </th>

              <th className="
                p-5
                text-left
              ">

                Tipe

              </th>

              <th className="
                p-5
                text-left
              ">

                Dibuat

              </th>

              <th className="
                p-5
                text-center
              ">

                Aksi

              </th>

            </tr>

          </thead>

          {/* BODY */}

          <tbody>

            {
              categories.length > 0 ? (

                categories.map((item) => (

                  <tr
                    key={item.id}
                    className="
                      border-t
                      border-slate-100
                      hover:bg-slate-50
                    "
                  >

                    {/* NAME */}

                    <td className="
                      p-5
                      font-semibold
                      text-slate-700
                    ">

                      {item.name}

                    </td>

                    {/* TYPE */}

                    <td className="p-5">

                      <span className={`
                        px-4
                        py-2
                        rounded-xl
                        text-sm
                        font-semibold
                        ${
                          item.type ===
                          'income'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }
                      `}>

                        {
                          item.type ===
                          'income'
                            ? 'Pemasukan'
                            : 'Pengeluaran'
                        }

                      </span>

                    </td>

                    {/* DATE */}

                    <td className="
                      p-5
                      text-slate-500
                    ">

                      {
                        item.createdAt
                          ? new Date(
                              item.createdAt
                            ).toLocaleDateString(
                              'id-ID'
                            )
                          : '-'
                      }

                    </td>

                    {/* ACTION */}

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

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="
                      py-10
                      text-center
                      text-slate-400
                    "
                  >

                    Data kategori tidak ditemukan

                  </td>

                </tr>

              )
            }

          </tbody>

        </table>

      </div>

    </div>

  )
}