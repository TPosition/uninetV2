module.exports = {
  env: {
    CRYPTO_KEY: ""
  },
  "include": [
    "react-file-reader"
  ],
  development: {
    client: 'sqlite3',
    connection: {
      filename: '/prisma/dev.db'
    }
  }
}