const jwt=require("jsonwebtoken");
const jwtConfig=require("../config/jwt.config");

const generateJWTToken = (username) => {
    const token = jwt.sign({username},jwtConfig.secret,{expiresIn:"1440m"});
    return token;
};

module.exports={generateJWTToken}