const mongoose = require('mongoose');

const connectDB = async () => {
   await mongoose.connect("mongodb+srv://anmolreshi19:b9RnTis5ZXKElxWc@node-anmol.eezwi.mongodb.net/devTinder");
}



module.exports = connectDB;
