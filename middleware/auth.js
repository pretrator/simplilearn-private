const jwt=require('jsonwebtoken');
const { JWT_SECRET } = require('./../config');

module.exports = (req,res,next) => {
    const token=req.header('authToken');
    if (!token)
    return res.status(401).json({msg:'no token, authorisation denied'});
    try{
        const decoded=jwt.verify(token, JWT_SECRET);
        req.user=decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg:'token not valid'});
    }
}