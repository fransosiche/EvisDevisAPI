let jwt = require('jsonwebtoken');

module.exports = {
    generatedToken: function (data) {
        return jwt.sign({
            mail: data.mail,
            createdAt: new Date()
        }, process.env.JWT_SECRET_SIGN)
    }
};