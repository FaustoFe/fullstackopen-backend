require('dotenv').config()

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
let DB_URI = process.env.DB_URI
if (NODE_ENV === 'test') {
  DB_URI = process.env.TEST_DB_URI
}

module.exports = {
  PORT, DB_URI, NODE_ENV
}