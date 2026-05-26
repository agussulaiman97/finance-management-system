import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts'

const COLORS = [
  '#6366f1',
  '#ef4444',
  '#22c55e',
  '#f59e0b',
  '#06b6d4',
  '#8b5cf6',
]

export default function ExpensePieChart({
  expenses,
}) {

  // =====================================
  // GROUP CATEGORY
  // =====================================

  const groupedData = Object.values(

    expenses.reduce((acc, item) => {

      const existing =
        acc[item.category]

      if (existing) {

        existing.value +=
          Number(item.amount)

      } else {

        acc[item.category] = {

          name: item.category,

          value: Number(item.amount),

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

          Grafik Pengeluaran

        </h2>

        <p className="
          text-slate-500
          mt-1
        ">

          Statistik kategori pengeluaran

        </p>

      </div>

      {/* CHART */}

      <div className="h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={groupedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >

              {
                groupedData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />

                  )
                )
              }

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  )

}