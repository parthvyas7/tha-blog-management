const express = require('express')
const app = express()
const dotenv = require('dotenv');
const port = process.env.PORT || 3000
const cors = require('cors')
dotenv.config();

require('./db')
const routes = require('./routes')
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
