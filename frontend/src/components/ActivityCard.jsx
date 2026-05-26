import {
  FaArrowDown,
  FaArrowUp,
} from 'react-icons/fa'

export default function ActivityCard({
  transactions,
}) {

  const latest =
    transactions.slice(0, 5)

  return (

    <div className="
      bg-white
      rounded-3xl
      shadow-sm
      border
      border-slate-100
      p-6
    ">

      <div className="mb-6">

        <h2 className="
          text-2xl
          font-bold
          text-slate-800
        ">

          Aktivitas Terbaru

        </h2>

        <p className="
          text-slate-500
        ">

          Riwayat transaksi terakhir

        </p>

      </div>

      <div className="
        flex
        flex-col
        gap-5
      ">

        {latest.map((item) => (

          <div
            key={item.id}
            className="
              flex
              items-center
              justify-between
            "
          >

            <div className="
              flex
              items-center
              gap-4
            ">

              <div className={`
                w-12
                h-12
                rounded-2xl
                flex
                items-center
                justify-center
                text-white
                ${
                  item.type ===
                  'income'
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }
              `}>

                {
                  item.type ===
                  'income'
                    ? <FaArrowDown />
                    : <FaArrowUp />
                }

              </div>

              <div>

                <h3 className="
                  font-semibold
                  text-slate-700
                ">

                  {item.category}

                </h3>

                <p className="
                  text-sm
                  text-slate-500
                ">

                  {
                    new Date(
                      item.createdAt
                    ).toLocaleDateString(
                      'id-ID'
                    )
                  }

                </p>

              </div>

            </div>

            <div className={`
              font-bold
              ${
                item.type ===
                'income'
                  ? 'text-green-500'
                  : 'text-red-500'
              }
            `}>

              Rp {
                Number(
                  item.amount
                ).toLocaleString()
              }

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}