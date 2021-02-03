const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectID,
	name : String,
	combien : Number,
	theDay: Date,
	triggerTag : [String,String,String,String,String],
	triggerCheck : [Boolean,Boolean,Boolean,Boolean,Boolean]
});

module.exports = mongoose.model("Event", eventSchema);