export default function RecentTransaction({
  transactions,
}) {

  const latest =
    transactions.slice(0, 5)

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h1 className="text-2xl font-bold mb-6">

        Transaksi Terbaru

      </h1>

      {

        latest.length === 0 ? (

          <div className="text-slate-400">

            Belum ada transaksi

          </div>

        ) : (

          latest.map((item) => (

            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >

              <div>

                <h1 className="font-bold">

                  {item.category}

                </h1>

                <p className="text-sm text-slate-500">

                  {

                    item.type === 'income'
                      ? 'Pemasukan'
                      : 'Pengeluaran'

                  }

                </p>

              </div>

              <div
                className={
                  item.type === 'income'
                    ? 'text-green-600 font-bold'
                    : 'text-red-600 font-bold'
                }
              >

                Rp
                {' '}
                {Number(
                  item.amount
                ).toLocaleString()}

              </div>

            </div>

          ))

        )

      }

    </div>

  )
}