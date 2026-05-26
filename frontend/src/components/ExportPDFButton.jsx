import jsPDF from 'jspdf'

import autoTable from 'jspdf-autotable'

export default function ExportPDFButton({
  transactions,
}) {

  const exportPDF = () => {

    const doc = new jsPDF()

    // =====================================
    // TITLE
    // =====================================

    doc.setFontSize(20)

    doc.text(
      'Laporan Keuangan',
      14,
      20
    )

    // =====================================
    // DATE
    // =====================================

    doc.setFontSize(11)

    doc.text(
      `Tanggal: ${new Date().toLocaleDateString()}`,
      14,
      30
    )

    // =====================================
    // TABLE
    // =====================================

    const tableColumn = [
      'Kategori',
      'Nominal',
      'Tipe',
    ]

    const tableRows = []

    transactions.forEach((item) => {

      const row = [

        item.category,

        `Rp ${Number(
          item.amount
        ).toLocaleString()}`,

        item.type === 'income'
          ? 'Pemasukan'
          : 'Pengeluaran',

      ]

      tableRows.push(row)
    })

    autoTable(doc, {

      head: [tableColumn],

      body: tableRows,

      startY: 40,

    })

    // =====================================
    // SAVE PDF
    // =====================================

    doc.save(
      'laporan-keuangan.pdf'
    )
  }

  return (

    <button
      onClick={exportPDF}
      className="bg-red-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-red-700 transition"
    >

      Export PDF

    </button>

  )
}