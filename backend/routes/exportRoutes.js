const express =
  require('express')

const router =
  express.Router()

const {

  exportExpensePDF,
  exportExpenseExcel,

} = require(
  '../controllers/exportController'
)

// =========================================
// PDF
// =========================================

router.get(
  '/expense/pdf',
  exportExpensePDF
)

// =========================================
// EXCEL
// =========================================

router.get(
  '/expense/excel',
  exportExpenseExcel
)

module.exports = router