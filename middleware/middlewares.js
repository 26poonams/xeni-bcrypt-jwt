const jwt=require('jsonwebtoken');
const {generateJWTToken}=require("../helpers"); 
const jwtConfig=require("../config/jwt.config");

//will check whether jwt token is valid or not
const isLoggedIn = async (req,res,next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error();
    next();
  } catch (err) {
    //Incase of expired jwt or invalid token kill the token and clear the cookie
    res.clearCookie("token");
    return res.status(401).json({message:"Invalid access"});
  }
};

module.exports={isLoggedIn}