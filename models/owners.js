/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-06-18 20:30:46
 * @version $Id$
 */

/**
 * @authors Your Name (you@example.org)
 * @date    2018-11-23 16:24:04
 * @version $Id$
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usersSchema = new Schema({
    'owner':String,
	'like':Array
});

module.exports = mongoose.model('users',usersSchema);