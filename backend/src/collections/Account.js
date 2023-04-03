const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    name: String,
    token: String
});

module.exports = mongoose.model('accounts', accountSchema)