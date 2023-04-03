const mongoose = require("mongoose")

const eventTrackedSchema = new mongoose.Schema({
    event: String,
    accountId: String,
    eventProjectId: String,
    browserSession: String,
    ip: String,
    userAgent: String,
    originalUrl: String,
    data: mongoose.SchemaTypes.Mixed
});

module.exports = mongoose.model('evens_tracked', eventTrackedSchema)