import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'

import {
  useEffect,
  useState,
} from 'react'

export default function FinanceChart({
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
  // GROUP DATA
  // =====================================

  const groupedData = {}

  transactions.forEach((item) => {

    if (!groupedData[item.category]) {

      groupedData[item.category] = {
        category: item.category,
        income: 0,
        expense: 0,
      }
    }

    if (item.type === 'income') {

      groupedData[item.category].income +=
        Number(item.amount)

    } else {

      groupedData[item.category].expense +=
        Number(item.amount)
    }

  })

  const chartData =
    Object.values(groupedData)

  // =====================================
  // EMPTY
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

  if (chartData.length === 0) {

    return (

      <div className="
        h-[350px]
        flex
        items-center
        justify-center
        text-slate-400
      ">

        Belum ada data chart

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

        <AreaChart data={chartData}>

          {/* GRADIENT */}

          <defs>

            <linearGradient
              id="income"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#22C55E"
                stopOpacity={0.4}
              />

              <stop
                offset="95%"
                stopColor="#22C55E"
                stopOpacity={0}
              />

            </linearGradient>

            <linearGradient
              id="expense"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#EF4444"
                stopOpacity={0.4}
              />

              <stop
                offset="95%"
                stopColor="#EF4444"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis dataKey="category" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#22C55E"
            fillOpacity={1}
            fill="url(#income)"
            strokeWidth={3}
          />

          <Area
            type="monotone"
            dataKey="expense"
            stroke="#EF4444"
            fillOpacity={1}
            fill="url(#expense)"
            strokeWidth={3}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>

  )
}