const express=require("express")
const app=express()
const path=require("path")
app.set("views",path.join(__dirname,"views"))
app.set("view engine",'ejs')
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
const Product=require("./models/Product")
app.use(express.urlencoded({extended:true}))

app.listen(3000,()=>{
    console.log("listening port no 3000")
   
})
app.get("/products",async(req,res)=>{
    const Products=await Product.find({})
    console.log(Products)
    res.render("./Products/index",{Products})
    
})
app.get("/products/:id",async(req,res)=>
{
    const {id}=req.params
    const product=await Product.findById(id)
    res.render("./Products/show",{product})
    console.log(product)
})
app.get("/new",(req,res)=>{
   res.render("./Products/newProduct")
})
app.post("/Products",async(req,res)=>{

    const newPro=new Product(req.body)
    await newPro.save()
    console.log(newPro)
    res.redirect(`Products/${newPro._id}`)
    
})

app.get("/Products/edit/:id",async (req,res)=>{
    const {id}=req.params
    const product=await Product.findById(id)
    res.render("./Products/edit",{product})
})

app.put("/Products/:id",async(req,res)=>{
    console.log(req.body)
    const {id}=req.params
    const product =await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    
    res.redirect(`/Products/${id}`)
})

app.delete("/Products/:id",async(req,res)=>{
    const {id}=req.params
    const deletedproduct=await Product.findByIdAndDelete(id)
    res.redirect("/Products")
})
const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/farmStand").then(()=>{console.log("connection is established")}).catch(err=>{console.log(err)})
