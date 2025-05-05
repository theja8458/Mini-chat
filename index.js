const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))

const mongoose = require('mongoose');

main().then(res=>{
    console.log("Connection Successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsaap');

};



//index Route
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find({});
    // console.log(chats);
    res.render("index.ejs",{chats});

})

//new chat
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

//create route
app.post("/chats",(req,res)=>{
  let  {from,to,msg} = req.body;
 let newCht = new Chat({
  from:from,
  msg:msg,
  to:to,
  create_at:new Date()   
 });
//  console.log(newCht);
newCht.save().then(res=>{
    console.log("Chat was created");
}).catch(err=>{
    console.log(err);
})
 res.redirect("/chats");
});

//edit route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

//update rout
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
   let{msg:newMsg} = req.body;
//    console.log(newMsg);
   let updatedChat = await Chat.findByIdAndUpdate(id,{msg: newMsg},{runValidators: true,new : true});
   console.log(updatedChat);
   res.redirect("/chats");
});

//delete route
app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});
app.get("/",(req,res)=>{
    res.send("Rott is working");
});
app.listen(port,()=>{
    console.log(`you are listenig  post ${port}`);
});