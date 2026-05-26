import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

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
DUMMY DATABASE
========================================
*/

let categories = [
  {
    id: 1,
    name: 'Belanja bulanan',
    type: 'expense',
    createdAt: new Date(),
  },
]

let transactions = [
  {
    id: 1,
    type: 'expense',
    category: 'Belanja bulanan',
    amount: 250000,
    note: '-',
    date: '2026-05-24',
  },

  {
    id: 2,
    type: 'expense',
    category: 'bayar wifi',
    amount: 300000,
    note: '-',
    date: '2026-05-23',
  },
]

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
GET TRANSACTIONS
========================================
*/

app.get('/api/transactions', (req, res) => {

  res.json(transactions)

})

/*
========================================
ADD TRANSACTION
========================================
*/

app.post('/api/transactions', (req, res) => {

  try {

    const newTransaction = {
  id: Date.now(),

  type: req.body.type,

  category: req.body.category,

  amount: Number(req.body.amount),

  note: req.body.note || '-',

  // FIX INVALID DATE
  createdAt: new Date(),

  // FIX COMPATIBILITY
  date: new Date(),
}

    transactions.unshift(newTransaction)

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

app.delete('/api/transactions/:id', (req, res) => {

  try {

    const id = Number(req.params.id)

    transactions = transactions.filter(
      (item) => item.id !== id
    )

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
GET CATEGORIES
========================================
*/

app.get('/api/categories', (req, res) => {

  res.json(categories)

})

/*
========================================
ADD CATEGORY
========================================
*/

app.post('/api/categories', (req, res) => {

  try {

    const { name, type } = req.body

    if (!name || !type) {

      return res.status(400).json({
        success: false,
        message: 'Nama dan type wajib diisi',
      })

    }

    const newCategory = {
      id: Date.now(),
      name,
      type,
      createdAt: new Date(),
    }

    categories.unshift(newCategory)

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

app.delete('/api/categories/:id', (req, res) => {

  try {

    const id = Number(req.params.id)

    categories = categories.filter(
      (item) => item.id !== id
    )

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
    CREATE FOLDER EXPORTS
    ========================================
    */

    fs.mkdirSync(
      path.dirname(filePath),
      { recursive: true }
    )

    /*
    ========================================
    DUMMY PDF FILE
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
    CREATE FOLDER EXPORTS
    ========================================
    */

    fs.mkdirSync(
      path.dirname(filePath),
      { recursive: true }
    )

    /*
    ========================================
    DUMMY EXCEL FILE
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

app.listen(PORT, () => {

  console.log('=================================')
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`🌐 API URL: http://localhost:${PORT}`)
  console.log('=================================')

})