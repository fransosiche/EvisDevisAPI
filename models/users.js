const mongo = require('mongoose')
    , Schema = mongo.Schema
/**
 * Type :
 *  0 - User contact
 *  1 - User agent
 *  2 - Admin
 */
const users_schema = new Schema({
    name: { type: String },
    surname: { type: String },
    password: { type: String },
    mail: { type: String}
})

const users = mongo.model('users', users_schema)

module.exports = users
