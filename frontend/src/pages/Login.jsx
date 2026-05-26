import { useState } from 'react'

import api from '../services/api'

export default function Login() {

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response =
        await api.post(
          '/auth/login',
          {
            email,
            password,
          }
        )

      console.log(response.data)

      // =========================
      // SAVE TOKEN
      // =========================

      localStorage.setItem(
        'token',
        response.data.token
      )

      localStorage.setItem(
        'user',
        JSON.stringify(
          response.data.user
        )
      )

      alert('Login berhasil')

      window.location.href =
        '/dashboard'

    } catch (error) {

      console.log(error)

      alert('Login gagal')

    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md"
      >

        <h1 className="text-4xl font-bold mb-8 text-center">
          Finance Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-4 rounded-xl mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-4 rounded-xl mb-6"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="w-full bg-blue-600 text-white p-4 rounded-xl"
        >
          LOGIN
        </button>

      </form>

    </div>
  )
}