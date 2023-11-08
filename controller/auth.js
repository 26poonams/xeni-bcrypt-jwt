const UserModel = require('../model/user');

const bcrypt = require('bcrypt');
const bcryptConfig=require("../config/bcrypt.config");

const {generateJWTToken}=require("../helpers"); 

exports.signup=async(req,res) => {
  try{
    const {email,firstName,lastName,phone,username,password}=req.body;
    if(!email || !firstName || !lastName || !phone || !username || !password )throw new Error("payload missing");

    const user1 = await UserModel.findOne({email:email});
    if(user1)throw new Error("user already exists with same email");

    const hash = bcrypt.hashSync(password,bcryptConfig.saltRounds);
    const user2 = new UserModel({email,firstName,lastName,phone,username,password:hash});
    const user3 =await user2.save();
    if (!user3)throw new Error("something gone wrong");

    const token = generateJWTToken(username);
    res.clearCookie("token");
    res.cookie("token", token, { httpOnly: true }).status(200).json({message:"Signup Successful"});
  }catch(err){
    res.status(500).json({ message: `Error while signup ${err.message}` });
  }

}


exports.login = async (req, res) => {
  try{
    const {username,password}=req.body;
    console.log(username,password);
    if(!username || !password )throw new Error("payload missing");

    const user1 = await UserModel.findOne({username:username});
    console.log(user1);
    if(!user1)throw new Error("user doesn't exists");

    const match = await bcrypt.compare(password, user1.password);
    console.log(match);
    if(!match)throw new Error("password is wrong");

    const token = generateJWTToken(username);
    res.clearCookie("token");
    res.cookie("token", token, { httpOnly: true }).status(200).json({message:"Login Successful"});
  }catch(err){
    res.status(500).json({ message: `Error while login ${err.message}` });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({message:"Logout Successful"});
};