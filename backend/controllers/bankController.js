const Bank =
  require('../models/Bank')

// =====================================
// GET BANK
// =====================================

exports.getBanks =
  async (req, res) => {

    try {

      const banks =
        await Bank.findAll({

          order: [
            ['id', 'DESC'],
          ],

        })

      res.json(banks)

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          'Server Error',
      })
    }
  }

// =====================================
// CREATE BANK
// =====================================

exports.createBank =
  async (req, res) => {

    try {

      const {
        name,
        account_number,
        balance,
      } = req.body

      const bank =
        await Bank.create({

          name,

          account_number,

          balance,

        })

      res.json({

        success: true,

        data: bank,

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          'Server Error',
      })
    }
  }

// =====================================
// DELETE BANK
// =====================================

exports.deleteBank =
  async (req, res) => {

    try {

      const { id } =
        req.params

      await Bank.destroy({

        where: { id },

      })

      res.json({

        success: true,

        message:
          'Bank berhasil dihapus',

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          'Server Error',
      })
    }
  }