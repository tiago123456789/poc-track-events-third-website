const mongoose = require("mongoose")

const eventProjectSchema = new mongoose.Schema({
    name: String,
    token: String,
    domainAllowed: String, 
    accountId: String,
});

module.exports = mongoose.model('event-projects', eventProjectSchema)