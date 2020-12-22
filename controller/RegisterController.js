const users = require('../models/users')
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt.utils");

let auth = {
    register: function (req, res) {
        users.findOne({mail: req.body.mail}, function (err, user) {
            if (err) {
                res.status(500).json(err)
            }
            if (user) {
                res.status(202).json({
                    message: 'Cet adresse mail est déjà liée a un compte'
                })
            } else {
                let data = req.body
                let saltRound = 10;
                bcrypt.genSalt(saltRound, function (err, salt) {
                    if (err) {
                        console.log(err)
                        res.status(500).json({
                            message: 'Une erreur est survenue lors du cryptage du mot de passe, salt',
                            error: err
                        })
                    } else {
                        bcrypt.hash(data.password, salt, function (err, pswd) {
                            if (err) {
                                console.log(err)
                                res.status(500).json({
                                    message: 'Une erreur est survenue lors du cryptage du mot de passe, hash',
                                    error: err
                                })
                            } else {
                                data.password = pswd;
                                const newUser = new users({
                                    password: data.password,
                                    mail: data.mail,
                                    name: data.name,
                                    surname: data.surname
                                });
                                newUser.save(function (err) {
                                    if (err) {
                                        console.dir(err)
                                        res.status(500).json({
                                            message: 'Une erreur est survenue',
                                            error: err.toString()
                                        })
                                    } else {
                                        res.status(201).json({
                                            message: 'L\'utilisateur à été ajouté avec succès'
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }).lean(true)
    }
};
module.exports = auth