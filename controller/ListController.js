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
    },
    addItem(req, res) {
        let data = req.body
        console.log(req)
        const newItem = new list({
            name: data.name,
            description: data.description,
            price: data.price,
            image: data.image
        });
        newItem.save(function (err) {
            if (err) {
                console.dir(err)
                res.status(500).json({
                    message: 'Une erreur est survenue',
                    error: err.toString()
                })
            } else {
                res.status(201).json({
                    message: 'Le produit à été ajouté avec succès'
                })
            }
        })
    }
}

module.exports = auth