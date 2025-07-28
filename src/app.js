const express=require("express")
const app=express();

app.use('/home',(req,res)=>{
    res.send("This is Home Page");
    
})
app.use('/contact',(req,res)=>{
    res.send("This is Contact Page");
    
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    
})