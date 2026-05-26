import { motion } from 'framer-motion'

export default function SummaryCard({
  title,
  amount,
  color,
  icon,
  growth = '0%',
}) {

  const formatRupiah = (number) => {

    return new Intl.NumberFormat(
      'id-ID',
      {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }
    ).format(number)

  }

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        p-6
        shadow-sm
        border
        border-slate-100
        bg-white
      "
    >

      {/* BACKGROUND BLUR */}

      <div
        className={`
          absolute
          top-0
          right-0
          w-32
          h-32
          opacity-10
          rounded-full
          blur-3xl
          ${color}
        `}
      />

      <div className="
        flex
        justify-between
        items-start
      ">

        <div>

          <p className="
            text-slate-500
            text-sm
            font-medium
            mb-3
          ">

            {title}

          </p>

          <h2 className="
            text-3xl
            font-bold
            text-slate-800
          ">

            {formatRupiah(amount)}

          </h2>

          <div className="
            mt-4
            flex
            items-center
            gap-2
          ">

            <span className="
              text-green-500
              text-sm
              font-semibold
            ">

              ↑ {growth}

            </span>

            <span className="
              text-slate-400
              text-sm
            ">

              bulan ini

            </span>

          </div>

        </div>

        <div
          className={`
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            text-white
            text-2xl
            shadow-lg
            ${color}
          `}
        >

          {icon}

        </div>

      </div>

    </motion.div>

  )
}