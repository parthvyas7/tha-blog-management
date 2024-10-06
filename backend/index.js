const express = require('express')
const app = express()
const dotenv = require('dotenv');
const port = process.env.PORT || 3000
const cors = require('cors')
dotenv.config();

require('./db')
const routes = require('./routes')

app.use(cors())

app.use(express.json())

app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
