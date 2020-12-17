const mongoose = require("../connection");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: String,
    tileArray: []
});

module.exports = mongoose.model("Room", roomSchema);
