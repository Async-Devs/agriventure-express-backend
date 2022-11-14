const jwt = require("jsonwebtoken");
require("dotenv").config();

const authToken = async (req,res,next)=>{
    const token = req.header("x-auth-token");

    if(!token){
        res.status(401).json({
            success: false,
            msg: "Token not found"
        });
    }

    try {
        const user = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        next();
    }catch (error){
        res.status(403).json({
            success: false,
            msg: "Invalid found"
        });
    }


}

module.exports = authToken;
