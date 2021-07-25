const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { validationResult }=require('express-validator')
const bcrypt = require('bcryptjs');
const { buy } = require('../inputValidations');
const { route } = require('./auth');

router.post('/buy', buy, auth, async(req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return(res.status(400).json({
                errors:errors.array()
            }));
        }
        const user = await User.update({_id: req.user.id }, { $addToSet :{ courses: req.body.courseId }});
        res.json(user)
    } catch(err){
        console.error(err.message);
        res.status(500).send('server error')
    }
});

router.get('/bought', auth, async (req, res) => {
    const user = await User.findById(req.user.id, { courses: 1 });
    res.json(user);
})
module.exports = router;