import Sidebar from '../components/Sidebar'

import Header from '../components/Header'

import MobileSidebar from '../components/MobileSidebar'

export default function MainLayout({
  children,
}) {

  return (

    <div className="
      min-h-screen
      bg-slate-100
      flex
    ">

      {/* ===================================== */}
      {/* SIDEBAR DESKTOP */}
      {/* ===================================== */}

      <Sidebar />

      {/* ===================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================== */}

      <div className="
        flex-1
        flex
        flex-col
        min-h-screen
        w-full
      ">

        {/* ===================================== */}
        {/* HEADER */}
        {/* ===================================== */}

        <Header />

        {/* ===================================== */}
        {/* PAGE CONTENT */}
        {/* ===================================== */}

        <main className="
          flex-1
          p-4
          md:p-6
          lg:p-8
          overflow-y-auto
          pb-24
        ">

          {children}

        </main>

      </div>

      {/* ===================================== */}
      {/* MOBILE SIDEBAR */}
      {/* ===================================== */}

      <MobileSidebar />

    </div>

  )
}