const express = require('express')

const router = express.Router()

const authMiddleware =
  require('../middleware/authMiddleware')

const {

  getBanks,

  createBank,

  deleteBank,

} = require(
  '../controllers/bankController'
)

// =====================================
// GET
// =====================================

router.get(
  '/',
  authMiddleware,
  getBanks
)

// =====================================
// CREATE
// =====================================

router.post(
  '/',
  authMiddleware,
  createBank
)

// =====================================
// DELETE
// =====================================

router.delete(
  '/:id',
  authMiddleware,
  deleteBank
)

module.exports = router