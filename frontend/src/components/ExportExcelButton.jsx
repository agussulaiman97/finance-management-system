import * as XLSX from 'xlsx'

import { saveAs } from 'file-saver'

export default function ExportExcelButton({
  transactions,
}) {

  const exportExcel = () => {

    // =====================================
    // FORMAT DATA
    // =====================================

    const data = transactions.map(
      (item) => ({

        Kategori:
          item.category,

        Nominal:
          item.amount,

        Tipe:
          item.type === 'income'
            ? 'Pemasukan'
            : 'Pengeluaran',

      })
    )

    // =====================================
    // CREATE WORKSHEET
    // =====================================

    const worksheet =
      XLSX.utils.json_to_sheet(data)

    // =====================================
    // CREATE WORKBOOK
    // =====================================

    const workbook =
      XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Laporan'
    )

    // =====================================
    // GENERATE EXCEL BUFFER
    // =====================================

    const excelBuffer =
      XLSX.write(workbook, {

        bookType: 'xlsx',

        type: 'array',

      })

    // =====================================
    // SAVE FILE
    // =====================================

    const fileData = new Blob(
      [excelBuffer],
      {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      }
    )

    saveAs(
      fileData,
      'laporan-keuangan.xlsx'
    )
  }

  return (

    <button
      onClick={exportExcel}
      className="bg-green-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-green-700 transition"
    >

      Export Excel

    </button>
  )
}