const Transaction =
  require('../models/Transaction')

const ExcelJS =
  require('exceljs')

const PDFDocument =
  require('pdfkit')

// =========================================
// EXPORT PDF
// =========================================

exports.exportExpensePDF =
  async (req, res) => {

    try {

      const expenses =
        await Transaction.findAll({

          where: {
            type: 'expense',
          },

          order: [
            ['createdAt', 'DESC'],
          ],

        })

      const doc =
        new PDFDocument()

      // HEADER DOWNLOAD

      res.setHeader(
        'Content-Type',
        'application/pdf'
      )

      res.setHeader(
        'Content-Disposition',
        'attachment; filename=laporan-pengeluaran.pdf'
      )

      doc.pipe(res)

      // TITLE

      doc
        .fontSize(22)
        .text(
          'Laporan Pengeluaran',
          {
            align: 'center',
          }
        )

      doc.moveDown()

      // TABLE DATA

      expenses.forEach(
        (item, index) => {

          doc
            .fontSize(12)
            .text(
              `${index + 1}. ${item.category} - Rp ${Number(item.amount).toLocaleString('id-ID')}`
            )

        }
      )

      doc.end()

    } catch (error) {

      console.log(error)

      res.status(500).json({

        success: false,
        message:
          'Gagal export PDF',

      })

    }

  }

// =========================================
// EXPORT EXCEL
// =========================================

exports.exportExpenseExcel =
  async (req, res) => {

    try {

      const expenses =
        await Transaction.findAll({

          where: {
            type: 'expense',
          },

          order: [
            ['createdAt', 'DESC'],
          ],

        })

      const workbook =
        new ExcelJS.Workbook()

      const worksheet =
        workbook.addWorksheet(
          'Pengeluaran'
        )

      // HEADER

      worksheet.columns = [

        {
          header: 'Kategori',
          key: 'category',
          width: 30,
        },

        {
          header: 'Nominal',
          key: 'amount',
          width: 20,
        },

        {
          header: 'Catatan',
          key: 'note',
          width: 40,
        },

        {
          header: 'Tanggal',
          key: 'date',
          width: 25,
        },

      ]

      // DATA

      expenses.forEach((item) => {

        worksheet.addRow({

          category:
            item.category,

          amount:
            item.amount,

          note:
            item.note || '-',

          date:
            new Date(
              item.createdAt
            ).toLocaleDateString(
              'id-ID'
            ),

        })

      })

      // DOWNLOAD HEADER

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )

      res.setHeader(
        'Content-Disposition',
        'attachment; filename=laporan-pengeluaran.xlsx'
      )

      await workbook.xlsx.write(
        res
      )

      res.end()

    } catch (error) {

      console.log(error)

      res.status(500).json({

        success: false,
        message:
          'Gagal export Excel',

      })

    }

  }