const mongoose = require('mongoose');

const {NODE_ENV, DB_LOCAL, DB_CUSTOMDEV, DB_ATLAS} = process.env

const DB = {
  // development: DB_ATLAS,
  development: DB_CUSTOMDEV,
  CustomDev: DB_CUSTOMDEV,
  Live: DB_LOCAL
}

mongoose.connect(DB[NODE_ENV]).then(() => {
    console.log("Database Connected")
}).catch((err) => {
    console.log("Error in Database Connection",err)
})

module.exports = mongoose;