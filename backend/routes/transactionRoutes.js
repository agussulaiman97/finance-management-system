const express = require('express')

const router = express.Router()

// =====================================
// MIDDLEWARE
// =====================================

const authMiddleware =
  require('../middleware/authMiddleware')

// =====================================
// CONTROLLER
// =====================================

const {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} = require(
  '../controllers/transactionController'
)

// =====================================
// GET ALL TRANSACTIONS
// =====================================

router.get(
  '/',
  authMiddleware,
  getTransactions
)

// =====================================
// CREATE TRANSACTION
// =====================================

router.post(
  '/',
  authMiddleware,
  createTransaction
)

// =====================================
// UPDATE TRANSACTION
// =====================================

router.put(
  '/:id',
  authMiddleware,
  updateTransaction
)

// =====================================
// DELETE TRANSACTION
// =====================================

router.delete(
  '/:id',
  authMiddleware,
  deleteTransaction
)

// =====================================
// EXPORT
// =====================================

module.exports = router