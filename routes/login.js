let express = require('express');
const cors = require('cors')
let router = express.Router();
let loginController = require('../controller/LoginController')

const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}


router.post('/', cors(corsOptions), function (req, res, next) {
    loginController.login(req, res)
});

module.exports = router
