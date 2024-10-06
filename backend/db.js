const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_ATLAS_URI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.log(err));