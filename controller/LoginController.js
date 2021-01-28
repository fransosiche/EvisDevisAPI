const users = require('../models/users')
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt.utils");

let auth = {
    login(req, res) {
        users.findOne({mail: req.body.mail.toLowerCase()}, function (err, user) {
            if (err) {
                res.status(500).json({
                    message: "Une erreur serveur est survenue",
                    error: err
                })
            } else if (!user) {
                console.log(user)
                console.log(req.body.mail)
                res.status(500).json({
                    message: "Cette adresse mail n'est associée à aucun compte",
                    error: err
                })
            } else {
                bcrypt.compare(req.body.password, user.password, function (error, result) {
                    if (error) {
                        console.dir(error)
                        res.status(500).json({
                            message: 'Une erreur est survenue',
                            error: error
                        })
                    } else {
                        if (result) {
                            res.status(200).json({
                                token: jwtUtils.generatedToken(req.body)
                            })
                        } else {
                            console.log('error')
                            res.status(401).json({
                                message: 'Le mot de passe est incorrect',
                                error: error
                            })
                        }
                    }
                })
            }
        }).lean(true)
    }
}

module.exports = auth