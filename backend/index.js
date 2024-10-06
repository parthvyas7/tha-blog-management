const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000

const routes = require('./routes')
require('./db')
const corsOptions = {
  origin: process.env.FRONTEND_URI || '*',
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(express.json())
app.use(cors(corsOptions))
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
