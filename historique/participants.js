const mongoose = require("mongoose");

const participantSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectID,
	participant: String,
	idDiscord : String,
	valeur: Number,
	howManyGuess: Number,
	lastGuess: Date,
	todayGuess: Number,
	eventGuess: Number,
	inARow: Number,
	joker : Number,
	shinyCharm : Number,
	spotted : Number,
	created : Date,
	howManyWin : Number,
	didIGetEvent : Date
});

module.exports = mongoose.model("Participant", participantSchema);