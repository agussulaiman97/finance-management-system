import { useEffect, useState }
from 'react'

import toast from 'react-hot-toast'

import MainLayout
from '../layouts/MainLayout'

import api from '../services/api'

export default function Bank() {

  const [banks, setBanks] =
    useState([])

  const [name, setName] =
    useState('')

  const [
    accountNumber,
    setAccountNumber,
  ] = useState('')

  const [balance, setBalance] =
    useState('')

  // =====================================
  // GET BANKS
  // =====================================

  const getBanks = async () => {

    try {

      const response =
        await api.get('/banks')

      setBanks(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  useEffect(() => {

    getBanks()

  }, [])

  // =====================================
  // CREATE BANK
  // =====================================

  const createBank =
    async (e) => {

      e.preventDefault()

      try {

        await api.post('/banks', {

          name,

          account_number:
            accountNumber,

          balance,

        })

        toast.success(
          'Bank berhasil ditambah'
        )

        setName('')

        setAccountNumber('')

        setBalance('')

        getBanks()

      } catch (error) {

        console.log(error)

        toast.error(
          'Gagal tambah bank'
        )

      }
    }

  // =====================================
  // DELETE BANK
  // =====================================

  const deleteBank =
    async (id) => {

      try {

        await api.delete(
          `/banks/${id}`
        )

        toast.success(
          'Bank berhasil dihapus'
        )

        getBanks()

      } catch (error) {

        console.log(error)

      }
    }

  return (

    <MainLayout>

      <h1 className="text-4xl font-bold mb-8">

        Rekening Bank

      </h1>

      {/* FORM */}

      <form
        onSubmit={createBank}
        className="bg-white p-6 rounded-3xl shadow-lg mb-8"
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Nama Bank"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border p-4 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Nomor Rekening"
            value={accountNumber}
            onChange={(e) =>
              setAccountNumber(
                e.target.value
              )
            }
            className="border p-4 rounded-2xl"
          />

          <input
            type="number"
            placeholder="Saldo"
            value={balance}
            onChange={(e) =>
              setBalance(
                e.target.value
              )
            }
            className="border p-4 rounded-2xl"
          />

        </div>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl mt-4"
        >

          Simpan Bank

        </button>

      </form>

      {/* TABLE */}

      <div className="bg-white rounded-3xl shadow-lg overflow-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-4 text-left">
                Bank
              </th>

              <th className="p-4 text-left">
                Rekening
              </th>

              <th className="p-4 text-left">
                Saldo
              </th>

              <th className="p-4 text-left">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {banks.map((item) => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="p-4">

                  {item.name}

                </td>

                <td className="p-4">

                  {item.account_number}

                </td>

                <td className="p-4">

                  Rp {
                    Number(
                      item.balance
                    ).toLocaleString()
                  }

                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteBank(
                        item.id
                      )
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-xl"
                  >

                    Hapus

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  )
}