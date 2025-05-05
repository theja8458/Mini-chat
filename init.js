const mongoose = require('mongoose');
const Chat = require("./models/chat.js");


main().then(res=>{
    console.log("Connection Successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsaap');

};

let allChats = [{
    from:"neha",
    to:"priya",
    msg:"Send me your exam sheets",
    create_at: new Date()
  },
  {
    from:"rohit",
    to:"mohit",
    msg:"Teach me js callbacks",
    create_at: new Date()
  },
  {
    from:"amit",
    to:"sunit",
    msg:"all the best!",
    create_at: new Date()
  },
  {
    from:"anita",
    to:"ramesh",
    msg:"bring me some fruits",
    create_at: new Date()
  },
  {
    from:"tony",
    to:"peter",
    msg:"Love you 3000",
    create_at: new Date()
  }
];
  
  Chat.insertMany(allChats);