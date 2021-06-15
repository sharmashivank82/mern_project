const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");

require('../db/conn');
const User = require("../model/userSchema");

router.get("/",(req,res)=>{
    res.send("hello world from the home page ...");
});


// router.get('/contact',(req,res)=>{
//     res.send("this is a contact page ...")
// })

// router.get('/signin',(req,res)=>{
//     res.send("this is a signin page ...")
// })

//store the data in the database by promise

// router.post('/register',(req,res)=>{
//     const {name,email,phone,work,password,cpassword} = req.body;
//     if(!name||!email||!phone||!work||!password||!cpassword)
//         return res.status(422).json({error:"Please Filled all the fields"});

//     User.findOne({email:email})        //check whether the email is registered or not 
//     .then((userExist)=>{
//         if(userExist){                     // if exist then simply return the error message
//             return res.status(422).json({error:"Email is already in use"});
//         }
//             const user = new User({name,email,phone,work,password,cpassword});      //create the instance of user

//         user.save().then(()=>{                                                             // then save the data in database
//             res.status(201).json({message:"user registered successfully"});                 //return the registration message
//         }).catch((err)=>res.status(500).json({error:"Some technical issue is arises ."}))       //if error arise by the server then return the error
//     }).catch(err=>{console.log(err);});            //if findone() will not run then they catch the error
// })

//Async await method that's why i not used promise i used Async and await

router.post('/register',async(req,res)=>{
    const {name,email,phone,work,password,cpassword} = req.body;
    if(!name ||!email ||!phone || !work || !password || !cpassword)
    {
        return res.status(422).json({message:"please filled all the details"});
    }
    
    try{
        const useristhere = await User.findOne({email:email});
        if(useristhere){
            return res.status(422).json({message:"Email is already in use"});
        }
        if(password!==cpassword){
            return res.status(422).json({message:"Confirm Password is not matching"});
        }
        
        const user = new User({name,email,phone,work,password,cpassword});
        //run pre save middleware define in userschema

        await user.save();
        //run post save middleware define in userschema

        res.status(201).json({message:"user registered successfully"});
    }
    catch(err){
        console.log(err);
        res.json({message:"error occured"});
    }
})

//login system 
router.post('/signin',async (req,res)=>{
    try{
        let token;
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"please filled the data"});
        }
        
        const userLogin = await User.findOne({email:email}); //we get the whole document

        const isMatch = await bcrypt.compare(password.toString(),userLogin.password);

        token = await userLogin.generateToken();  //define in userschema file

        res.cookie("jwttoken",token,{
            expires:new Date(Date.now()+258920000),
            httpOnly:true
        });

        if(isMatch===true && userLogin.email===email)
            res.status(202).json({message:"You enter into the system perfectly"});
        else
            res.status(400).json({message:"Invalid Login details"});
    }
    catch(err)
    {
        res.status(502).json({message:"Server Error"});
    }
})

//authenticate the about us page 

router.get('/about',authenticate,(req,res)=>{
    res.send(req.rootUser);
})

//get the user data for the contact us page
router.get('/getdata',authenticate,(req,res)=>{
    res.send(req.rootUser);
})

//handle the contactus page
router.post('/contact',authenticate,async(req,res)=>{
    try{
        const {name,email,phone,message} = req.body;
        
        if(!name || !email || !phone ||!message){
            console.log("error in contact form");
            res.json({error:"please filled all the details"});
        }
        const userContact = await User.findOne({_id:req.userID});
        if(userContact)
        {
            const usermessage = await userContact.addMessage(name,email,phone,message);
            await userContact.save();
            res.status(201).json({message:"user contact successfull"});
        }
        else
        {
            console.log("we not find the user");
        }
    }
    catch(err)
    {
        console.log(err);
    }
})


router.get('/logout',(req,res)=>{
    res.clearCookie('jwttoken',{path:'/'}) //if nothing happen then they redirect to the home page
    res.status(200).send('user logout');
})

module.exports = router;