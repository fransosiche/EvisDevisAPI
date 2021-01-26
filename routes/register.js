let express = require('express');
const cors = require('cors')
let router = express.Router();
let registerController = require('../controller/RegisterController')

const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}

router.post('/', cors(corsOptions), function (req, res, next) {
    console.log('testest')
    registerController.register(req, res)
});


module.exports = router;