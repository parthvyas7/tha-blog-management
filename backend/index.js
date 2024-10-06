const express = require('express')
const app = express()
const dotenv = require('dotenv');
const port = process.env.PORT || 3000
const cors = require('cors')
dotenv.config();

require('./db')

app.use(cors())

app.use(express.json())

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
