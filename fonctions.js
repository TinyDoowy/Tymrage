const Participant = require("./historique/participants.js");
const Event = require("./historique/event.js");
const mongoose = require("mongoose");
var auth = require('./auth.json');
mongoose.connect('mongodb://localhost/Tymrage',{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);


module.exports.create = async (message) => {

    ///////////////////////////////////
    // BLOCK de gestion d'event GUESS//
    ///////////////////////////////////
        var ficheEvent = await Event.findOne({name: "DoowyPowaa"});
        // si pas de fiche existante, on créé la fiche
        if (!ficheEvent) {var ficheEvent = await trigger.createEvent(message,0);}

        var fetchedCombien = ficheEvent.combien;
        var fetchedTheDay = ficheEvent.theDay;

	    if (message.createdAt.getDate()==fetchedTheDay.getDate()&&message.createdAt.getMonth()==fetchedTheDay.getMonth()&&message.createdAt.getFullYear()==fetchedTheDay.getFullYear()){
	        console.log("le dernier event était aujourd'hui, et existante ou pas, on update la quantité.");
	        var QuantityEvent = fetchedCombien;
	        }else {
	        console.log("le dernier event était trop vieux, on reset la date et la quantité.");
	        fetchedTheDay = Date();
	        var QuantityEvent = 0;
	        await Event.findOneAndUpdate({name: "DoowyPowaa"}, {combien : 0, theDay : fetchedTheDay});
	        console.log(fetchedCombien);
    	}


	return new Promise(resolve => {

		const hePlays = new Participant({
		_id : mongoose.Types.ObjectId(),
		participant: message.author.username,
		idDiscord : message.author.id,
		valeur: Math.floor(Math.random() * auth.RangeMax),
		howManyGuess: 3,
		lastGuess: Date(),
		todayGuess: 0-parseInt(QuantityEvent),
		inARow: 1,
		joker : 0,
		shinyCharm : 0,
		spotted : 0,
		created : Date(),
		howManyWin : 0,
		didIGetEvent : Date()
		});

	hePlays.save().then(result => console.log("ma nouvelle fiche : "+result)).catch(err => console.log(err));

	resolve(hePlays);
	
	});
}


module.exports.createEvent = async (message, quantity) => {

	return new Promise(resolve => {

		const bigEvent = new Event({
		_id : mongoose.Types.ObjectId(),
		name : "DoowyPowaa",
		combien : quantity,
		theDay: Date(),
		triggerTag : ["herbizarre","ivysaur","フシギソウ","bisaknosp","doowy the best"],
		triggerCheck : [false,false,false,false,false]
		});

	bigEvent.save().then(result => console.log("mon event du jour : "+result)).catch(err => console.log(err));

	resolve(bigEvent);
	
	});
}



function Datum(todate){
    var day = todate;

    var nextdate = new Date(day);
    nextdate.setDate(day.getDate() + 1);

    return nextdate;
}

