import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import {
  useEffect,
  useState,
} from 'react'

const COLORS = [
  '#4F46E5',
  '#22C55E',
  '#EF4444',
  '#F59E0B',
  '#06B6D4',
]

export default function ExpensePieChart({
  transactions = [],
}) {

  // =====================================
  // MOUNT FIX
  // =====================================

  const [mounted, setMounted] =
    useState(false)

  useEffect(() => {

    const timer = setTimeout(() => {

      setMounted(true)

    }, 300)

    return () =>
      clearTimeout(timer)

  }, [])

  // =====================================
  // FILTER
  // =====================================

  const expenseData =
    transactions.filter(
      (item) =>
        item.type === 'expense'
    )

  // =====================================
  // GROUP
  // =====================================

  const grouped = {}

  expenseData.forEach((item) => {

    if (!grouped[item.category]) {

      grouped[item.category] = 0
    }

    grouped[item.category] +=
      Number(item.amount)

  })

  const data =
    Object.keys(grouped).map(
      (key) => ({
        name: key,
        value: grouped[key],
      })
    )

  // =====================================
  // LOADING
  // =====================================

  if (!mounted) {

    return (

      <div className="
        h-[350px]
        flex
        items-center
        justify-center
      ">

        Loading Chart...

      </div>

    )
  }

  // =====================================
  // EMPTY
  // =====================================

  if (data.length === 0) {

    return (

      <div className="
        h-[350px]
        flex
        items-center
        justify-center
        text-slate-400
      ">

        Belum ada data pengeluaran

      </div>

    )
  }

  return (

    <div className="
      w-full
      h-[350px]
      relative
    ">

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie
            data={data}
            innerRadius={70}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
          >

            {data.map(
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
            )}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>

  )
}