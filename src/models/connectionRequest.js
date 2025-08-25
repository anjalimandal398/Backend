const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema(
    {
        fromUserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",                     //reference to the user collection
            required:true,
        },
        toUserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User", 
            required:true,
        },
        status:{
            type:String,
            required:true,
            enum:{
                values:["ignored","interested","rejected","accepted"],
                message:`{VALUE} is incorrect schema type `
            },
        },
    },
    {
        timestamps:true,
    }
);


//connectionRequest.find(fromUserId:7846328830945, toUserId:4652498u638276) //random Id hai bhai samjne ke liye bs 
connectionRequestSchema.index({fromUserId: 1, toUserId: 1})


//pre method
connectionRequestSchema.pre("save", function(next){
    const connectionRequest=this
    //check "toUserId" is same as "fromUserId";
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("ConNot send connection req to yourSelf LOL...")
       }
    next();
})



const connectionRequestModel= new mongoose.model(
    "connectionRequest",
    connectionRequestSchema)


module.exports=connectionRequestModel;