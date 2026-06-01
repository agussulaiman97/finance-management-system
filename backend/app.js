import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import expenseRoutes from './routes/expenseRoutes.js'

/*
========================================
DATABASE
========================================
*/

import sequelize from './config/database.js'

/*
========================================
MODELS
========================================
*/

import Category from './models/Category.js'
import Transaction from './models/Transaction.js'

dotenv.config()

const app = express()

/*
========================================
MIDDLEWARE
========================================
*/

app.use(cors())

app.use(express.json())

/*
========================================
EXPENSE ROUTES
========================================
*/

app.use('/api/expenses', expenseRoutes)

/*
========================================
ROOT API
========================================
*/

app.get('/', (req, res) => {

  res.json({
    success: true,
    message: 'Finance API Running',
  })

})

/*
========================================
GET ALL TRANSACTIONS
========================================
*/

app.get('/api/transactions', async (req, res) => {

  try {

    const transactions = await Transaction.findAll({

      order: [['createdAt', 'DESC']],

    })

    res.json(transactions)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }

})

/*
========================================
ADD TRANSACTION
========================================
*/

app.post('/api/transactions', async (req, res) => {

  try {

    const {

      type,
      category,
      amount,
      note,

    } = req.body

    /*
    ========================================
    VALIDATION
    ========================================
    */

    if (!type || !category || !amount) {

      return res.status(400).json({

        success: false,
        message: 'Data transaksi belum lengkap',

      })

    }

    /*
    ========================================
    CREATE TRANSACTION
    ========================================
    */

    const newTransaction = await Transaction.create({

      type,
      category,
      amount,
      note: note || '-',

    })

    res.json({

      success: true,
      message: 'Transaksi berhasil ditambahkan',
      data: newTransaction,

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,
      message: error.message,

    })

  }

})

/*
========================================
DELETE TRANSACTION
========================================
*/

app.delete('/api/transactions/:id', async (req, res) => {

  try {

    const { id } = req.params

    await Transaction.destroy({

      where: { id },

    })

    res.json({

      success: true,
      message: 'Transaksi berhasil dihapus',

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,
      message: error.message,

    })

  }

})

/*
========================================
GET ALL CATEGORIES
========================================
*/

app.get('/api/categories', async (req, res) => {

  try {

    const categories = await Category.findAll({

      order: [['createdAt', 'DESC']],

    })

    res.json(categories)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,
      message: error.message,

    })

  }

})

/*
========================================
ADD CATEGORY
========================================
*/

app.post('/api/categories', async (req, res) => {

  try {

    const { name, type } = req.body

    /*
    ========================================
    VALIDATION
    ========================================
    */

    if (!name || !type) {

      return res.status(400).json({

        success: false,
        message: 'Nama kategori dan type wajib diisi',

      })

    }

    /*
    ========================================
    CREATE CATEGORY
    ========================================
    */

    const newCategory = await Category.create({

      name,
      type,

    })

    res.json({

      success: true,
      message: 'Kategori berhasil ditambahkan',
      data: newCategory,

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,
      message: error.message,

    })

  }

})

/*
========================================
DELETE CATEGORY
========================================
*/

app.delete('/api/categories/:id', async (req, res) => {

  try {

    const { id } = req.params

    await Category.destroy({

      where: { id },

    })

    res.json({

      success: true,
      message: 'Kategori berhasil dihapus',

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,
      message: error.message,

    })

  }

})

/*
========================================
EXPORT PDF
========================================
*/

app.get('/api/export/expense/pdf', async (req, res) => {

  try {

    const filePath = path.join(

      process.cwd(),
      'exports',
      'laporan-pengeluaran.pdf'

    )

    /*
    ========================================
    CREATE EXPORT FOLDER
    ========================================
    */

    fs.mkdirSync(

      path.dirname(filePath),
      { recursive: true }

    )

    /*
    ========================================
    DUMMY PDF
    ========================================
    */

    fs.writeFileSync(

      filePath,
      'Laporan PDF Pengeluaran'

    )

    /*
    ========================================
    DOWNLOAD FILE
    ========================================
    */

    res.download(filePath)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,
      message: 'Export PDF gagal',

    })

  }

})

/*
========================================
EXPORT EXCEL
========================================
*/

app.get('/api/export/expense/excel', async (req, res) => {

  try {

    const filePath = path.join(

      process.cwd(),
      'exports',
      'laporan-pengeluaran.xlsx'

    )

    /*
    ========================================
    CREATE EXPORT FOLDER
    ========================================
    */

    fs.mkdirSync(

      path.dirname(filePath),
      { recursive: true }

    )

    /*
    ========================================
    DUMMY EXCEL
    ========================================
    */

    fs.writeFileSync(

      filePath,
      'Laporan Excel Pengeluaran'

    )

    /*
    ========================================
    DOWNLOAD FILE
    ========================================
    */

    res.download(filePath)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,
      message: 'Export Excel gagal',

    })

  }

})

/*
========================================
404 HANDLER
========================================
*/

app.use((req, res) => {

  res.status(404).json({

    success: false,
    message: 'API Route Not Found',

  })

})

/*
========================================
START SERVER
========================================
*/

const PORT = process.env.PORT || 5000

async function startServer() {

  try {

    /*
    ========================================
    CONNECT DATABASE
    ========================================
    */

    await sequelize.authenticate()

    console.log('✅ PostgreSQL Connected')

    /*
    ========================================
    SYNC DATABASE
    ========================================
    */

    await sequelize.sync()

    console.log('✅ Database Sync Success')

    /*
    ========================================
    RUN SERVER
    ========================================
    */

    app.listen(PORT, () => {

      console.log('=================================')
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`🌐 API URL: http://localhost:${PORT}`)
      console.log('=================================')

    })

  } catch (error) {

    console.log(
      '❌ Database Error:',
      error.message
    )

  }

}

startServer()