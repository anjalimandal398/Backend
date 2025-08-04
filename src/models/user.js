const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        max:50,
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
        trim: true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18,
        required: true
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
     default:"https://skiblue.co.uk/wp-content/uploads/2015/06/dummy-profile.png"
    },
    skills:{
        type:[String],
    }
},{
   timestamps:true, 
}
)

const UserModel=mongoose.model("User",userSchema)


module.exports=UserModel;