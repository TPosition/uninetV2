module.exports = {
  env: {
    CRYPTO_KEY: "",
    STREAM_KEY: "",
    STREAM_SECRET: ""
  },
  include: [
    "react-file-reader"
  ],
  development: {
    client: 'sqlite3',
    connection: {
      filename: '/prisma/dev.db'
    }
  }
}