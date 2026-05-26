import {
  FaInbox,
} from 'react-icons/fa'

import { motion } from 'framer-motion'

export default function EmptyState({
  title,
  subtitle,
}) {

  return (

    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="
        bg-white
        rounded-3xl
        shadow-sm
        border
        border-slate-100
        p-12
        text-center
      "
    >

      {/* ICON */}

      <div className="
        w-28
        h-28
        bg-slate-100
        rounded-full
        flex
        items-center
        justify-center
        mx-auto
        mb-6
      ">

        <FaInbox className="
          text-5xl
          text-slate-400
        " />

      </div>

      {/* TITLE */}

      <h2 className="
        text-3xl
        font-bold
        text-slate-700
        mb-3
      ">

        {title}

      </h2>

      {/* SUBTITLE */}

      <p className="
        text-slate-500
        max-w-md
        mx-auto
      ">

        {subtitle}

      </p>

    </motion.div>

  )
}