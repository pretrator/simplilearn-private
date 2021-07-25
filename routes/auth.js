const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const { JWT_SECRET, SALTING_ROUNDS, JWT_EXPIRATION_TIME } = require('./../config');
const { validationResult }=require('express-validator')
const bcrypt = require('bcryptjs');
const { login, register } = require('../inputValidations');

router.get('/',auth, async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch(err){
        console.error(err.message);
        res.status(500).send('server error')
    }
});

router.post('/login', login,
    async(req, res) => {
        console.log(req.body)
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return(res.status(400).json({
                errors: errors.array()
            }));
        }
         const { email, password } = req.body
         try {
              let user = await User.findOne({ email });
              if (!user) {
                return res
                  .status(400)
                  .json({ errors: [{ msg: "invalid credentials" }] });
              }

              const isMatch = await bcrypt.compare(password, user.password);
              if(!isMatch){
                  return res.status(400).json({errors:[{msg:'invalid credentials'}]});
              }
              const payload={
                  user:{
                      id:user.id
                  }
              };
              await jwt.sign(
                  payload,
                  JWT_SECRET,
                  {expiresIn:JWT_EXPIRATION_TIME},
                  (err,token)=>{
                      if(err) throw err;
                      res.json({token});
                    }
                );
            }catch(err){
                console.error(err.message);
                res.status(500).send('server error')
         }
        });


router.post('/signup', register,
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return(res.status(400).json({
                errors:errors.array()
            }));
        }
         const { email, password}=req.body
         try{
              let user = await User.findOne({ email });
              if (user) {
                return res
                  .status(400)
                  .json({ errors: [{ msg: "user already exist" }] });
              }

              user=new User({
                  email,
                  password
              });

              const salt=await bcrypt.genSalt(SALTING_ROUNDS);
              user.password=await bcrypt.hash(password,salt);
              await user.save();

              const payload={
                  user:{
                      id:user.id
                  }
              };
              jwt.sign(
                  payload,
                  JWT_SECRET,
                  {expiresIn:JWT_EXPIRATION_TIME},
                  (err,token)=>{
                      if(err) throw err;
                      res.json({token});
                    }
                );
            } catch(err){
                console.error(err.message);
                res.status(500).send('server error')
         }
        });

module.exports=router;