const mongo = require('mongoose')
    , Schema = mongo.Schema


const list_schema = new Schema({
    name: {type: String},
    description: {type: String},
    price: {type: Number},
    image: {type: String},
})

const list = mongo.model('lists', list_schema)

module.exports = list
