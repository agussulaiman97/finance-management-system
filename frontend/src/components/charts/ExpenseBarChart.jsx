import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

export default function ExpenseBarChart({
  expenses,
}) {

  // =====================================
  // GROUP DATA BY DATE
  // =====================================

  const groupedData = Object.values(

    expenses.reduce((acc, item) => {

      const date =
        new Date(
          item.createdAt
        ).toLocaleDateString(
          'id-ID',
          {
            day: '2-digit',
            month: 'short',
          }
        )

      if (acc[date]) {

        acc[date].total +=
          Number(item.amount)

      } else {

        acc[date] = {

          date,

          total:
            Number(item.amount),

        }

      }

      return acc

    }, {})

  )

  return (

    <div className="
      bg-white
      rounded-3xl
      p-6
      shadow-sm
      border
      border-slate-100
    ">

      {/* HEADER */}

      <div className="mb-6">

        <h2 className="
          text-2xl
          font-bold
          text-slate-800
        ">

          Grafik Bulanan

        </h2>

        <p className="
          text-slate-500
          mt-1
        ">

          Statistik pengeluaran harian

        </p>

      </div>

      {/* CHART */}

      <div className="h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={groupedData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="date"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="total"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  )

}