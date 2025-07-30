const mongoose = require("mongoose");

const connectDB = async() => {
   await mongoose.connect("mongodb+srv://anjali:OqkoaD9gpyn7D3dQ@cluster0.nsb6jlw.mongodb.net/DevTinder");         // DB?retryWrites=true&w=majority
}



module.exports=connectDB;