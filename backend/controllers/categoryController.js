const Category =
  require('../models/Category')

/* =====================================
   GET CATEGORY
===================================== */

exports.getCategories =
  async (req, res) => {

    try {

      const categories =
        await Category.findAll({
          order: [
            ['createdAt', 'DESC'],
          ],
        })

      res.json(categories)

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          'Gagal mengambil kategori',
      })

    }

  }

/* =====================================
   CREATE CATEGORY
===================================== */

exports.createCategory =
  async (req, res) => {

    try {

      const {
        name,
        type,
      } = req.body

      const category =
        await Category.create({
          name,
          type,
        })

      res.status(201).json(
        category
      )

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          'Gagal tambah kategori',
      })

    }

  }

/* =====================================
   DELETE CATEGORY
===================================== */

exports.deleteCategory =
  async (req, res) => {

    try {

      const category =
        await Category.findByPk(
          req.params.id
        )

      if (!category) {

        return res
          .status(404)
          .json({
            message:
              'Kategori tidak ditemukan',
          })
      }

      await category.destroy()

      res.json({
        message:
          'Kategori berhasil dihapus',
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          'Gagal hapus kategori',
      })

    }

  }