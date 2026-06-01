import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Client } = pg

const client = new Client({
  connectionString: process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false,
  },
})

async function testDB() {

  try {

    await client.connect()

    console.log('✅ DATABASE CONNECTED')

    const result = await client.query(
      'SELECT NOW()'
    )

    console.log(result.rows)

    await client.end()

  } catch (error) {

    console.log(
      '❌ DB ERROR:',
      error
    )

  }

}

testDB()