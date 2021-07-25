const { check, validationResult } = require("express-validator");

module.exports = {
    login: [ check('email','please enter a valid email').isEmail(),
             check('password','password is required').exists() ],
    register: [
        check('email','please enter a valid email').isEmail(),
        check('password','please enter the password more than 6 characters').isLength({min:6})
    ],
    buy: [check('courseId', 'Please Provide CourseId').isNumeric()]
}

