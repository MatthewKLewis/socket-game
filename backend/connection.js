const mongoose = require("mongoose");

mongoose.Promise = Promise;

//Needs to be changed on deployment
let mongoURI = "mongodb://localhost/game";

// if (process.env.NODE_ENV === "production") {
//     mongoURI = process.env.DB_URL;
// } else {
//     mongoURI = "mongodb://localhost/gundam";
// }

mongoose
    .connect(mongoURI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(instance =>
        console.log(`Connected to db`)
    )
    .catch(err => console.log("Connection Failed.", err));

module.exports = mongoose;