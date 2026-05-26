const Transaction =
  require('../models/Transaction')

// =====================================
// GET ALL
// =====================================

exports.getTransactions =
  async (req, res) => {

    try {

      const transactions =
        await Transaction.findAll({
          order: [['id', 'DESC']],
        })

      res.json(transactions)

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          'Gagal mengambil transaksi',
      })

    }
  }

// =====================================
// CREATE
// =====================================

exports.createTransaction =
  async (req, res) => {

    try {

      const {
        category,
        amount,
        type,
      } = req.body

      const transaction =
        await Transaction.create({
          category,
          amount,
          type,
        })

      res.json(transaction)

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          'Gagal tambah transaksi',
      })

    }
  }

// =====================================
// DELETE
// =====================================

exports.deleteTransaction =
  async (req, res) => {

    try {

      await Transaction.destroy({
        where: {
          id: req.params.id,
        },
      })

      res.json({
        message:
          'Transaksi berhasil dihapus',
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          'Gagal hapus transaksi',
      })

    }
  }

  // =========================================
// UPDATE TRANSACTION
// =========================================

exports.updateTransaction =
  async (req, res) => {

    try {

      const { id } = req.params

      const {
        category,
        amount,
        type,
      } = req.body

      const transaction =
        await Transaction.findByPk(id)

      if (!transaction) {

        return res.status(404).json({
          message:
            'Transaksi tidak ditemukan',
        })
      }

      await transaction.update({
        category,
        amount,
        type,
      })

      res.json({
        success: true,
        message:
          'Transaksi berhasil diupdate',
        data: transaction,
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          'Server Error',
      })
    }
  }