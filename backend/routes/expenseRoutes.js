import express from 'express'

const router = express.Router()

/*
========================================
GET ALL EXPENSES
========================================
*/

router.get('/', async (req, res) => {

  try {

    res.json({

      success: true,
      message: 'Expense API Running',

    })

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    })

  }

})

export default router