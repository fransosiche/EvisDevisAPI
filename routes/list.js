let express = require('express');
const cors = require('cors')
let router = express.Router();
let listController = require('../controller/ListController')

const corsOptions = {
    origin: [process.env.SITE_LINK, process.env.API_LINK],
    optionsSuccessStatus: 200
}


router.get('/', cors(corsOptions), function (req, res, next) {
    listController.getList(req, res)
});

module.exports = router
