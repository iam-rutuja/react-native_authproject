
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');


exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            res.status(400).json({
                error: "user exist"
            })
        }
        else {
            let token = jwt.sign({ name, email, password }, process.env.SIGNUP_SECRET_KEY);
            try {
                let user = new User({ name, email, password });
                user.save()
                res.status(200).json({
                    token,
                    message: 'Signup success.Please signin',
                })

            } catch (error) {
                res.status(400).json({
                    error: 'Error saving user in database. Try signup again'
                })
            }
        }



    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "signup error"
        })

    }


}

exports.signin = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (user) {
            let isMatch = await bcrypt.compare(password, user.password)
            // console.log(user)
            if (isMatch) {

                let token = jwt.sign({ _id: user._id }, process.env.SIGNIN_SECRET_KEY)
                const { _id, name, email, role } = user;
                res.status(200).json({
                    token,
                    message: 'Signin Sucess',
                    user: { _id, name, email, role }
                })
            } else {
                res.status(400).json({
                    error: 'Password or email doest not matach'
                })
            }

        } else {
            res.status(400).json({
                error: 'User not found'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

}

