const User = require("./model/user.model");
const Room = require("./model/room.model");
const levelOne = require('./levels')

dummyLevel = {
  name: "levelOne",
  tileArray: levelOne
}

dummyAccounts = [
  {
    username: "matthew",
    password: "1234",
    character: "milo",
  },
  {
    username: "alexis",
    password: "1234",
    character: "varya",
  },
];

User.findByIdAndDelete().then(() => {
  dummyAccounts.forEach((item) => {
    User.create(item)
      .then((item) => {
        console.log(item);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

Room.findByIdAndDelete().then(() => {
  Room.create(dummyLevel)
    .then((level) => {
      console.log(level.name);
    })
    .catch((err) => {
      console.log(err);
    });
});
