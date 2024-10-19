const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/farmStand").then(()=>{console.log("connection is established")}).catch(err=>{console.log(err)})
const Product=require("./models/Product")

Product.insertMany([{name:"apple",price:100,category:'fruit'},{name:"Brinjal",price:40,category:'vegetable'}])
.then(data=>{console.log(data)})
.catch(err=>{console.log(err)})