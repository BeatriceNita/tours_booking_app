const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

//Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

module.exports = {
    register: (req, res) => {
        //Form validation
        const { errors, isValid } = validateRegisterInput(req.body);

        //Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        //search in the collections the first user whose email is the one typed in
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    return res.status(400).json({ email: "Email already exists" });
                } else {
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        role: req.body.role,
                        age: req.body.age
                    });

                    //Hash password before saving in DB
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err));
                        });
                    });
                }
            });

    },

    login: (req, res) => {
        //Form validation
        const { errors, isValid } = validateLoginInput(req.body);

        //Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const email = req.body.email;
        const password = req.body.password;

        //Find user by email
        User.findOne({ email: email })
            .then(user => {
                //Check if user exists
                if (!user) {
                    return res.status(404).json({ emailnotfound: "Email not found" });
                }

                //Check password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            //User matched
                            //Create JWT Payload
                            const payload = {
                                id: user.id,
                                name: user.username,
                                role: user.role
                            };

                            //Sign token
                            jwt.sign(payload,
                                keys.secretOrKey,
                                {
                                    expiresIn: 31556926 //1 year in seconds
                                },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    });
                                }
                            );
                        } else {
                            return res.status(400).json({ passwordincorrect: "Password incorrect" });
                        }
                    });
            });
    }
}