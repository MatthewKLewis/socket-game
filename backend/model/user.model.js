const mongoose = require("../connection");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    character: String,
});

module.exports = mongoose.model("User", userSchema);
