export default function ExpensePagination({

  currentPage,
  totalPages,
  setCurrentPage,

}) {

  // =====================================
  // PREV PAGE
  // =====================================

  const prevPage = () => {

    if (currentPage > 1) {

      setCurrentPage(
        currentPage - 1
      )

    }

  }

  // =====================================
  // NEXT PAGE
  // =====================================

  const nextPage = () => {

    if (currentPage < totalPages) {

      setCurrentPage(
        currentPage + 1
      )

    }

  }

  return (

    <div className="
      flex
      items-center
      justify-between
      mt-8
      gap-5
      flex-wrap
    ">

      {/* INFO */}

      <div className="
        text-slate-500
        font-medium
      ">

        Halaman {currentPage} dari {totalPages}

      </div>

      {/* BUTTON */}

      <div className="
        flex
        items-center
        gap-3
      ">

        {/* PREV */}

        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="
            px-5
            py-3
            rounded-2xl
            border
            border-slate-200
            bg-white
            disabled:opacity-50
          "
        >

          Prev

        </button>

        {/* PAGE NUMBER */}

        {
          [...Array(totalPages)].map(
            (_, index) => (

              <button
                key={index}
                onClick={() =>
                  setCurrentPage(
                    index + 1
                  )
                }
                className={`
                  w-12
                  h-12
                  rounded-2xl
                  font-semibold
                  transition-all
                  ${
                    currentPage ===
                    index + 1
                      ? `
                        bg-indigo-600
                        text-white
                      `
                      : `
                        bg-white
                        border
                        border-slate-200
                      `
                  }
                `}
              >

                {index + 1}

              </button>

            )
          )
        }

        {/* NEXT */}

        <button
          onClick={nextPage}
          disabled={
            currentPage === totalPages
          }
          className="
            px-5
            py-3
            rounded-2xl
            border
            border-slate-200
            bg-white
            disabled:opacity-50
          "
        >

          Next

        </button>

      </div>

    </div>

  )

}