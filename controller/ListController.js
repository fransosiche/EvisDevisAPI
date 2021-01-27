const list = require('../models/list')

let auth = {
    getList(req, res) {
        list.find(function (err, doc) {
            if (err) {
                res.status(500).json({
                    message: 'Internal Server Error',
                    errror: err,
                    stack: err.stack
                })
            } else {
                res.status(200).json(doc)
            }
        })
    }
}

module.exports = auth