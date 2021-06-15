const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true           //we defined the userschema(thestructure of the document)
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[
        {
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true           //we defined the userschema(thestructure of the document)
            },
            phone:{
                type:Number,
                required:true
            },
            message:{
                type:String,
                required:true
            }
        }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});

//define pre save middleware

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8);
        this.cpassword = await bcrypt.hash(this.cpassword,8);
    }
    next();
})

//we generate the jwt token
userSchema.methods.generateToken = async function()
{
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

userSchema.methods.addMessage = async function(name,email,phone,message)
{
    try{
        this.messages = this.messages.concat({name,email,phone,message});
        await this.save();
        return this.message; 
    }
    catch(err){
        console.log(err)
    }
}


const User = mongoose.model('USER',userSchema) //the variable name is always start with capital letter

module.exports = User;