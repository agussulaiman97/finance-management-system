import {
  FaBell,
  FaSearch,
} from 'react-icons/fa'

export default function Header() {

  return (

    <header className="
      sticky
      top-0
      z-40
      bg-white/80
      backdrop-blur-lg
      border-b
      border-slate-200
      px-6
      py-4
    ">

      <div className="
        flex
        items-center
        justify-between
        gap-5
      ">

        {/* SEARCH */}

        <div className="
          hidden
          md:flex
          items-center
          bg-slate-100
          rounded-2xl
          px-4
          py-3
          w-full
          max-w-md
        ">

          <FaSearch className="
            text-slate-400
          " />

          <input
            type="text"
            placeholder="Cari menu..."
            className="
              bg-transparent
              outline-none
              px-3
              w-full
            "
          />

        </div>

        {/* RIGHT */}

        <div className="
          flex
          items-center
          gap-5
        ">

          {/* NOTIFICATION */}

          <button className="
            relative
            bg-slate-100
            p-3
            rounded-2xl
          ">

            <FaBell />

            <span className="
              absolute
              top-1
              right-1
              w-2
              h-2
              bg-red-500
              rounded-full
            " />

          </button>

          {/* USER */}

          <div className="
            flex
            items-center
            gap-3
          ">

            <img
              src="https://i.pravatar.cc/100"
              alt=""
              className="
                w-12
                h-12
                rounded-2xl
                object-cover
              "
            />

            <div className="hidden md:block">

              <h2 className="
                font-semibold
                text-slate-800
              ">

                Agus Sulaiman

              </h2>

              <p className="
                text-sm
                text-slate-500
              ">

                Administrator

              </p>

            </div>

          </div>

        </div>

      </div>

    </header>

  )
}