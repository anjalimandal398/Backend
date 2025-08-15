const mongoose=require("mongoose");
const jwt = require("jsonwebtoken");
const validator=require("validator");
const bcrypt = require("bcrypt"); 


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
        trim: true
    },
    lastName:{
        type:String,
        trim: true
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address."+value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Invalid password."+value)
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value)
        {
            if(!["male","female","other"].includes (value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    about:{
        type:String, 
        default:" This is a default about the user "
    },
    photoUrl:{
     type:String,
     default:"https://skiblue.co.uk/wp-content/uploads/2015/06/dummy-profile.png",
     validate(value){
        if(!validator.isURL(value)){
            throw new Error("Invalid Photo Url:"+value)
        }
    }
    },
    skills:{
        type:[String],
    }
},{
   timestamps:true, 
}
)
userSchema.methods.getJWT= async function(){
    const user = this;

   const token =await jwt.sign({ _id: user._id }, "DEV@Tinder$790",{
        expiresIn:"15d",
      });
      return token;
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password
   const isPasswordValid=await bcrypt.compare(
    passwordInputByUser,
     passwordHash
    );
    return isPasswordValid;

}



const UserModel=mongoose.model("User",userSchema)


module.exports=UserModel;