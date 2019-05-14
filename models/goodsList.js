/**
 * @authors Your Name (you@example.org)
 * @date    2018-11-23 16:24:04
 * @version $Id$
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
	'sort':Number,
	'age':Number,
	'title':String,
	'value':Number,
    'phone':Number,
    'address':String,
    'describe':String,
    'date':String,
    'image':String
});

module.exports = mongoose.model('goodslist',blogSchema);