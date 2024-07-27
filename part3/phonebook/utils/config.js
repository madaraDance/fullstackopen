const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
require('dotenv').config()

module.exports = {
  MONGODB_URI,
  PORT
}
