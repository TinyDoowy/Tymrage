var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var trigger = require('./fonctions.js');
const Participant = require("./historique/participants.js");
const Event = require("./historique/event.js");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client();
bot.login(auth.token);
bot.on('ready', function () {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});



const prefixGuess = "guess";
const prefixMonStatut = "ma fiche";
const prefixStatut = "fiche";
const prefixUse = "service";
const prefixJoker = "joker";
const prefixCC = "charm";
const prefixLoupe = "loupe";
const prefixGive = "give";
const prefixtake = "take";
const prefixSudo = "sudo";
const prefixShop = "ma boutique";
const prefixRandom = "mon random";
const prefixMonTuto = "mon tuto";
const prefixPoint = ".";
const prefixAll = "all";
const prefixCheck = "check";
const prefixSet = "set";
const prefixAdmin = "admin";

var MaxManyGuess = 15;
var MaxInARow = 7;
var colorEmbed = "#166727"; //green
//var colorEmbed = "#123456"; //bleu nuit
var actif = ["none","none","none","none","none"];
var setting = ["","","","",""];

bot.on('message', async function (message, user) {

petitMessage = message.content.toLowerCase()

// arrête la lecture du message si l'auteur est le bot.
if (message.author.bot) return;
if (message.channel.id!=auth.Pap.channelTirage&&message.channel.id!=auth.Pap.channelAdmin) return;
if (!message.member.roles.cache.has(auth.Pap.roleTirage)) return;

//message.author.lastMessageID

    ////////////////////////////////
    // BLOCK de commandes secrète //
    ////////////////////////////////
        var ficheEvent = await Event.findOne({name: "DoowyPowaa"});
        // si pas de fiche existante, on créé la fiche
        if (!ficheEvent) {var ficheEvent = await trigger.createEvent(message,0);}

        var fetchedTriggerTag = ficheEvent.triggerTag;
        var fetchedTriggerCheck = ficheEvent.triggerCheck;
        var k;
        for (k=0; k<5; k++){

            // Un joueur trigger un des Guess secret
            if(petitMessage.startsWith(prefixGuess)&&petitMessage.includes(fetchedTriggerTag[k])&&fetchedTriggerCheck[k]==false){

                await setTimeout(function() {message.delete()}, 1);

                console.log((k+1));

                const NicknameOut = await bot.users.fetch(auth.doowy);

                var PourCent = Random100();
                console.log("PourCent : "+PourCent);

                switch(k){
                    case 0 :
                        fetchedTriggerCheck[k] = true;
                        console.log("coucou "+k);
                        await Event.findOneAndUpdate({name: "DoowyPowaa"}, {triggerCheck : fetchedTriggerCheck});
                    break;
                    case 1 :
                        fetchedTriggerCheck[k] = true;
                        console.log("coucou "+k);
                        await Event.findOneAndUpdate({name: "DoowyPowaa"}, {triggerCheck : fetchedTriggerCheck});

                    break;
                    case 2 :
                        fetchedTriggerCheck[k] = true;
                        console.log("coucou "+k);
                        await Event.findOneAndUpdate({name: "DoowyPowaa"}, {triggerCheck : fetchedTriggerCheck});

                    break;
                    case 3 :
                        fetchedTriggerCheck[k] = true;
                        console.log("coucou "+k);
                        await Event.findOneAndUpdate({name: "DoowyPowaa"}, {triggerCheck : fetchedTriggerCheck});

                    break;
                    case 4 :
                        fetchedTriggerCheck[k] = true;
                        console.log("coucou "+k);
                        await Event.findOneAndUpdate({name: "DoowyPowaa"}, {triggerCheck : fetchedTriggerCheck});

                    break;
                    default :
                        console.log("oups");
                    break;
                }

                    var ficheCollect = await Participant.findOne({idDiscord: message.author.id});

                    // si pas de fiche existante, on créé la fiche
                    if (!ficheCollect) { 
                        var ficheCollect = await trigger.create(message);
                        }

                        //récupérer toutes les infos importantes à traiter
                        var fetchedName = ficheCollect.participant;
                        var fetchedHowManyGuess = ficheCollect.howManyGuess;
                        var fetchedLastGuess = ficheCollect.lastGuess;
                        var fetchedTodayGuess = ficheCollect.todayGuess;
                        var fetchedInARow = ficheCollect.inARow;
                        var fetchedJoker = ficheCollect.joker;
                        var fetchedShinyCharm = ficheCollect.shinyCharm;
                        var fetchedSpotted = ficheCollect.spotted;
                        var fetchedHowManyWin = ficheCollect.howManyWin;
                        var fetchedCreated = ficheCollect.created;

                        var CharmLevel1 = ":black_heart:";
                        var CharmLevel2 = ":black_heart:";
                        var CharmLevel3 = ":black_heart:";
                        var LoupeLevel1 = ":black_heart:";
                        var LoupeLevel2 = ":black_heart:";
                        var LoupeLevel3 = ":black_heart:";

                        switch (fetchedShinyCharm){
                            case 0 :
                            break;
                            case 1 :
                                CharmLevel1 = ":yellow_heart:";
                            break;
                            case 2 :
                                CharmLevel1 = ":yellow_heart:";
                                CharmLevel2 = ":orange_heart:";
                            break;
                            case 3 :
                                CharmLevel1 = ":yellow_heart:";
                                CharmLevel2 = ":orange_heart:";
                                CharmLevel3 = ":heart:";
                            break;
                            default : 
                                CharmLevel1 = ":angry:";
                                CharmLevel2 = ":rage:";
                                CharmLevel3 = ":face_with_symbols_over_mouth:";
                            break;
                        }

                        switch (fetchedSpotted){
                            case 0 :
                            break;
                            case 1 :
                                LoupeLevel1 = ":yellow_heart:";
                            break;
                            case 2 :
                                LoupeLevel1 = ":yellow_heart:";
                                LoupeLevel2 = ":orange_heart:";
                            break;
                            case 3 :
                                LoupeLevel1 = ":yellow_heart:";
                                LoupeLevel2 = ":orange_heart:";
                                LoupeLevel3 = ":heart:";
                            break;
                            default : 
                                LoupeLevel1 = ":angry:";
                                LoupeLevel2 = ":rage:";
                                LoupeLevel3 = ":face_with_symbols_over_mouth:";
                            break;
                        }



                if(PourCent<=5){
                    console.log("Level Up Charm");
                    if (fetchedShinyCharm<3){
                        fetchedShinyCharm++;
                        NicknameOut.send(message.author.username+" a gagné un Level Up de Charm Joker grâce au Guess secret : n°"+(k+1)+" ``"+fetchedTriggerTag[k]+"``\rLe Guess secret a été désactivé. Pour le changer (et le réactiver), merci de taper ``admin set "+(k+1)+"`` suivi du nouveau Guess secret dans le salon #just_for_me du serveur Pap&Co.").then(msg => msg.delete({ timeout: 10000 }));
                        message.author.send("Tu as gagné un Level Up de Charm Joker grâce à un des Guess secret").then(msg => msg.delete({ timeout: 10000 }));
                    }else if (fetchedSpotted<3){
                        fetchedSpotted++;
                        NicknameOut.send(message.author.username+" a gagné un Level Up de Charm Joker.\rMais son Charm Joker était déjà au Level Max.\rDonc "+message.author.username+" a gagné un Level Up de Bonus Loupe grâce au Guess secret : n°"+(k+1)+" ``"+fetchedTriggerTag[k]+"``\rLe Guess secret a été désactivé. Pour le changer (et le réactiver), merci de taper ``admin set "+(k+1)+"`` suivi du nouveau Guess secret dans le salon #just_for_me du serveur Pap&Co.").then(msg => msg.delete({ timeout: 10000 }));
                        message.author.send("Tu as gagné un Level Up de Bonus Loupe grâce à un des Guess secret").then(msg => msg.delete({ timeout: 10000 }));
                    }else{
                        fetchedJoker++;
                        NicknameOut.send(message.author.username+" a gagné un Level Up de Charm Joker.\rMais son Charm Joker était déjà au Level Max.\rDonc "+message.author.username+" a gagné un Level Up de Bonus Loupe.\rMais son Bonus Loupe était déjà au Level Max.\rDonc "+message.author.username+" a gagné un Joker grâce au Guess secret : n°"+(k+1)+" ``\rLe Guess secret a été désactivé. Pour le changer (et le réactiver), merci de taper ``admin set "+(k+1)+"`` suivi du nouveau Guess secret dans le salon #just_for_me du serveur Pap&Co."+fetchedTriggerTag[k]+"``").then(msg => msg.delete({ timeout: 10000 }));
                        message.author.send("Tu as gagné un Joker grâce à un des Guess secret").then(msg => msg.delete({ timeout: 10000 }));
                    }
                    await Participant.findOneAndUpdate({idDiscord: message.author.id}, {shinyCharm:fetchedShinyCharm, spotted:fetchedSpotted, joker:fetchedJoker});
                }else if(PourCent<=10){
                    console.log("Level Up Loupe");
                    if (fetchedSpotted<3){
                        fetchedSpotted++;
                        NicknameOut.send(message.author.username+" a gagné un Level Up de Bonus Loupe grâce au Guess secret : n°"+(k+1)+" ``"+fetchedTriggerTag[k]+"``\rLe Guess secret a été désactivé. Pour le changer (et le réactiver), merci de taper ``admin set "+(k+1)+"`` suivi du nouveau Guess secret dans le salon #just_for_me du serveur Pap&Co.").then(msg => msg.delete({ timeout: 10000 }));
                        message.author.send("Tu as gagné un Level Up de Bonus Loupe grâce à un des Guess secret").then(msg => msg.delete({ timeout: 10000 }));
                    }else if (fetchedShinyCharm<3){
                        fetchedShinyCharm++;
                        NicknameOut.send(message.author.username+" a gagné un Level Up de Bonus Loupe.\rMais son Bonus Loupe était déjà au Level Max.\rDonc "+message.author.username+" a gagné un Level Up de Charm Joker grâce au Guess secret : n°"+(k+1)+" ``"+fetchedTriggerTag[k]+"``\rLe Guess secret a été désactivé. Pour le changer (et le réactiver), merci de taper ``admin set "+(k+1)+"`` suivi du nouveau Guess secret dans le salon #just_for_me du serveur Pap&Co.").then(msg => msg.delete({ timeout: 10000 }));
                        message.author.send("Tu as gagné un Level Up de Charm Joker grâce à un des Guess secret").then(msg => msg.delete({ timeout: 10000 }));
                    }else{
                        fetchedJoker++;
                        NicknameOut.send(message.author.username+" a gagné un Level Up de Bonus Loupe.\rMais son Bonus Loupe était déjà au Level Max.\rDonc "+message.author.username+" a gagné un Level Up de Charm Joker.\rMais son Charm Joker était déjà au Level Max.\rDonc "+message.author.username+" a gagné un Joker grâce au Guess secret : n°"+(k+1)+" ``"+fetchedTriggerTag[k]+"``\rLe Guess secret a été désactivé. Pour le changer (et le réactiver), merci de taper ``admin set "+(k+1)+"`` suivi du nouveau Guess secret dans le salon #just_for_me du serveur Pap&Co.").then(msg => msg.delete({ timeout: 10000 }));
                        message.author.send("Tu as gagné un Joker grâce à un des Guess secret").then(msg => msg.delete({ timeout: 10000 }));
                    }
                    await Participant.findOneAndUpdate({idDiscord: message.author.id}, {shinyCharm:fetchedShinyCharm, spotted:fetchedSpotted, joker:fetchedJoker});
                }else if(PourCent<=35){
                    console.log("+1 Joker");
                    fetchedJoker++;
                    await Participant.findOneAndUpdate({idDiscord: message.author.id}, {joker:fetchedJoker});
                    NicknameOut.send(message.author.username+" a gagné un Joker grâce au Guess secret : n°"+(k+1)+" ``"+fetchedTriggerTag[k]+"``\rLe Guess secret a été désactivé. Pour le changer (et le réactiver), merci de taper ``admin set "+(k+1)+"`` suivi du nouveau Guess secret dans le salon #just_for_me du serveur Pap&Co.").then(msg => msg.delete({ timeout: 10000 }));
                    message.author.send("Tu as gagné un Joker grâce à un des Guess secret").then(msg => msg.delete({ timeout: 10000 }));
                }else if(PourCent<=50){
                    console.log("+Max Guess");
                    fetchedTodayGuess = fetchedTodayGuess-fetchedHowManyGuess;
                    await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:fetchedTodayGuess});
                    NicknameOut.send(message.author.username+" a gagné "+fetchedHowManyGuess+" Guess grâce au Guess secret : n°"+(k+1)+" ``"+fetchedTriggerTag[k]+"``\rCes Guess ne sont valables qu'aujourd'hui.\rLe Guess secret a été désactivé. Pour le changer (et le réactiver), merci de taper ``admin set "+(k+1)+"`` suivi du nouveau Guess secret dans le salon #just_for_me du serveur Pap&Co.").then(msg => msg.delete({ timeout: 10000 }));
                    message.author.send("Tu as gagné "+fetchedHowManyGuess+" Guess grâce à un des Guess secret\r***ATTENTION*** Ces Guess ne sont valables qu'aujourd'hui !").then(msg => msg.delete({ timeout: 10000 }));
                }else if(PourCent<=75){
                    console.log("+3 Guess");
                    fetchedTodayGuess = fetchedTodayGuess-3;
                    await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:fetchedTodayGuess});
                    NicknameOut.send(message.author.username+" a gagné 3 Guess grâce au Guess secret : n°"+(k+1)+" ``"+fetchedTriggerTag[k]+"``\rCes Guess ne sont valables qu'aujourd'hui.\rLe Guess secret a été désactivé. Pour le changer (et le réactiver), merci de taper ``admin set "+(k+1)+"`` suivi du nouveau Guess secret dans le salon #just_for_me du serveur Pap&Co.").then(msg => msg.delete({ timeout: 10000 }));
                    message.author.send("Tu as gagné 3 Guess grâce à un des Guess secret\r***ATTENTION*** Ces Guess ne sont valables qu'aujourd'hui !").then(msg => msg.delete({ timeout: 10000 }));
                }else if(PourCent<=90){
                    console.log("+2 Guess");
                    fetchedTodayGuess = fetchedTodayGuess-2;
                    await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:fetchedTodayGuess});
                    NicknameOut.send(message.author.username+" a gagné 2 Guess grâce au Guess secret : n°"+(k+1)+" ``"+fetchedTriggerTag[k]+"``\rCes Guess ne sont valables qu'aujourd'hui.\rLe Guess secret a été désactivé. Pour le changer (et le réactiver), merci de taper ``admin set "+(k+1)+"`` suivi du nouveau Guess secret dans le salon #just_for_me du serveur Pap&Co.").then(msg => msg.delete({ timeout: 10000 }));
                    message.author.send("Tu as gagné 2 Guess grâce à un des Guess secret\r***ATTENTION*** Ces Guess ne sont valables qu'aujourd'hui !").then(msg => msg.delete({ timeout: 10000 }));
                }else{
                    console.log("+1 Guess");
                    fetchedTodayGuess = fetchedTodayGuess-1;
                    await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:fetchedTodayGuess});
                    NicknameOut.send(message.author.username+" a gagné 1 Guess grâce au Guess secret : n°"+(k+1)+" ``"+fetchedTriggerTag[k]+"``\rCe Guess n'est valable qu'aujourd'hui.\rLe Guess secret a été désactivé. Pour le changer (et le réactiver), merci de taper ``admin set "+(k+1)+"`` suivi du nouveau Guess secret dans le salon #just_for_me du serveur Pap&Co.").then(msg => msg.delete({ timeout: 10000 }));
                    message.author.send("Tu as gagné 1 Guess grâce à un des Guess secret\r***ATTENTION*** Ce Guess n'est valable qu'aujourd'hui !").then(msg => msg.delete({ timeout: 10000 }));
                }

                return;
            }

            
        }
    
    //////////////////////////////////////////////////////////////
    //BLOCK effacement des messages (staff instant, joueur 5sec)//
    //////////////////////////////////////////////////////////////
    if(message.channel.id==auth.Pap.channelTirage){
        if(!petitMessage.startsWith(prefixPoint)){
            if(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff)){
                await setTimeout(function() {message.delete()}, 10);
            }else{
                await setTimeout(function() {message.delete()}, 5000);
            }
        }
    }

    //////////////////////////////
    //BLOCK commande MA BOUTIQUE//
    //////////////////////////////
    if (petitMessage.startsWith(prefixShop)){

        var ficheCollect = await Participant.findOne({idDiscord: message.author.id});

        // si pas de fiche existante, on créé la fiche
        if (!ficheCollect) { 
            return message.reply(" désolé ! Mais vous n'avez pas encore de fiche de participation, veuillez tapez ``"+prefixGuess+"`` suivi d'un nombre entre 0 et "+(auth.RangeOhneCC-1)+" pour commencer à jouer.\rBonne chance :four_leaf_clover: !").then(msg => msg.delete({ timeout: 15000 }));
        }

            var fetchedJoker = ficheCollect.joker;
            var fetchedShinyCharm = ficheCollect.shinyCharm;
            var fetchedSpotted = ficheCollect.spotted;

            var CharmLevel1 = ":black_heart:";
            var CharmLevel2 = ":black_heart:";
            var CharmLevel3 = ":black_heart:";
            var LoupeLevel1 = ":black_heart:";
            var LoupeLevel2 = ":black_heart:";
            var LoupeLevel3 = ":black_heart:";

            switch (fetchedShinyCharm){
                case 0 :
                    textLevelCharm="1 Joker";
                break;
                case 1 :
                    CharmLevel1 = ":yellow_heart:";
                    textLevelCharm="2 Jokers";
                break;
                case 2 :
                    CharmLevel1 = ":yellow_heart:";
                    CharmLevel2 = ":orange_heart:";
                    textLevelCharm="3 Jokers";
                break;
                case 3 :
                    CharmLevel1 = ":yellow_heart:";
                    CharmLevel2 = ":orange_heart:";
                    CharmLevel3 = ":heart:";
                    textLevelCharm="Level Max atteint";
                break;
                default : 
                    CharmLevel1 = ":angry:";
                    CharmLevel2 = ":rage:";
                    CharmLevel3 = ":face_with_symbols_over_mouth:";
                    textLevelCharm="Charm Cheatée";
                break;
            }

            switch (fetchedSpotted){
                case 0 :
                    textLevelLoupe="1 Joker";
                break;
                case 1 :
                    LoupeLevel1 = ":yellow_heart:";
                    textLevelLoupe="2 Jokers";
                break;
                case 2 :
                    LoupeLevel1 = ":yellow_heart:";
                    LoupeLevel2 = ":orange_heart:";
                    textLevelLoupe="3 Jokers";
                break;
                case 3 :
                    LoupeLevel1 = ":yellow_heart:";
                    LoupeLevel2 = ":orange_heart:";
                    LoupeLevel3 = ":heart:";
                    textLevelLoupe="Level Max atteint";
                break;
                default : 
                    LoupeLevel1 = ":angry:";
                    LoupeLevel2 = ":rage:";
                    LoupeLevel3 = ":face_with_symbols_over_mouth:";
                    textLevelLoupe="Loupe Cheatée";
                break;
            }


                    const attachment = new Discord.MessageAttachment('./Images/Boutique.png');

                    const exampleEmbed = new Discord.MessageEmbed()
                    .setColor(colorEmbed)
                    .setTitle("Bienvenue dans la Boutique __"+message.author.username+"__")
                    .setAuthor("Animée par **Tymaël** et programmée par **Doowy**")
                    .setDescription("Ivysaur has wares, if you have coin !!\rIci, tu peux décider quoi faire de tes Jokers.\r```Ton solde de Joker : "+fetchedJoker+"```\rEn quoi souhaites-tu les convertir ?\r")
                    .addFields(
                        { name : `Charm Joker <:Charm:`+auth.Pap.emoteCharm+`>`, value : CharmLevel1+" "+CharmLevel2+" "+CharmLevel3, inline : true},
                        { name : `La Loupe :mag:`, value : LoupeLevel1+" "+LoupeLevel2+" "+LoupeLevel3, inline : true},
                        { name : `Ask Tym'`, value :"<:Oeuf:"+auth.Pap.emoteOeuf+"> :sparkles: :boxing_glove: :grey_question:", inline : true}
                    )
                    .addFields(
                        { name : `Prix du level up`, value : textLevelCharm, inline : true},
                        { name : `Prix du level up`, value : textLevelLoupe, inline : true},
                        { name : `Prix d'un stuff`, value : "1 Joker", inline : true}
                    )
                    .setThumbnail(message.author.avatarURL())
                    .setImage(`attachment://Boutique.png`)
                    .setFooter("*Ce message s'auto-détruira dans 1 minute ;) !*");


                    message.channel.send({files:[attachment], embed: exampleEmbed}).then(msg => msg.delete({ timeout: 60000 }));
    return;
    //fin prefix boutique
    }



    ///////////////////////////
    //BLOCK commande MON TUTO//
    ///////////////////////////
    if (petitMessage.startsWith(prefixMonTuto)){

        const NicknameOut = await bot.users.fetch(auth.tym);

            var CharmLevel1 = ":yellow_heart: :black_heart: :black_heart:";
            var CharmLevel2 = ":yellow_heart: :orange_heart: :black_heart:";
            var CharmLevel3 = ":yellow_heart: :orange_heart: :heart:";
            var LoupeLevel1 = ":yellow_heart: :black_heart: :black_heart:";
            var LoupeLevel2 = ":yellow_heart: :orange_heart: :black_heart:";
            var LoupeLevel3 = ":yellow_heart: :orange_heart: :heart:";

                    const attachment = new Discord.MessageAttachment('./Images/Tuto.png');

                    const exampleEmbed = new Discord.MessageEmbed()
                    .setColor(colorEmbed)
                    .setTitle("Bienvenue dans le Tuto du Tymrage au Sort !")
                    .setAuthor("Animée par **Tymaël** et programmée par **Doowy**")
                    .setDescription(`
                                \`\`\`Les commandes qui vous sont accessibles \`\`\` \`\``+prefixGuess+`\`\` suivi d'un nombre dans votre intervalle pour obtenir des Jokers.
                                \`\``+prefixMonStatut+`\`\` vous permet de voir l'état de votre fiche à l'instant de la saisie.
                                \`\``+prefixShop+`\`\` vous permet de connaître l'état de votre boutique afin d'organiser de futurs achats.
                                \`\``+prefixRandom+`\`\` vous permet de faire automatiquement vos \`\``+prefixGuess+`\`\` du jour.
                                __Toutes les \`\``+prefixGuess+`\`\` sont alors consommés sans possibilité de connaître les valeurs tirés.__
                                \`\`\`Les accessoires à collectionner :\`\`\``)
                    .addFields({name:"Chaque accessoire offre un Bonus qui vous facilite la collecte de Joker.", value:"Vous pouvez débloquer jusqu'à 3 Level Up par accessoire avec des Jokers.\Chaque Level de Charm Joker réduit l'intervalle de génération de votre valeur.\rLe Bonus Loupe vous donne des indices si votre ``"+prefixGuess+"`` est a un certain pourcentage de votre valeur."})
                    .addFields(
                        { name : `Charm Joker <:Charm:`+auth.Pap.emoteCharm+`>`, value : CharmLevel1, inline : true},
                        { name : `Charm Joker <:Charm:`+auth.Pap.emoteCharm+`>`, value : CharmLevel2, inline : true},
                        { name : `Charm Joker <:Charm:`+auth.Pap.emoteCharm+`>`, value : CharmLevel3, inline : true},
                        )                    
                    .addFields(
                        { name : `Intervalle réduit de`, value : auth.Stat.Level1Charm, inline : true},
                        { name : `Intervalle réduit de`, value : auth.Stat.Level2Charm, inline : true},
                        { name : `Intervalle réduit de`, value : auth.Stat.Level3Charm, inline : true},
                        )
                    .addFields(
                        { name : `La Loupe :mag:`, value : LoupeLevel1, inline : true},
                        { name : `La Loupe :mag:`, value : LoupeLevel2, inline : true},
                        { name : `La Loupe :mag:`, value : LoupeLevel3, inline : true},
                        )                    
                    .addFields(
                        { name : `Indice si `, value : "éloigné de "+auth.Stat.Level1PourCent+"%", inline : true},
                        { name : `Indice si `, value : "proche de "+auth.Stat.Level2PourCent+"%", inline : true},
                        { name : `Indice si `, value : "proche de "+auth.Stat.Level3PourCent+"%", inline : true},
                        )
                    .addFields({name:`Les Levels Up coûtent de plus en plus cher (1, 2 et 3 Jokers par accessoire).`,value:`
                        Pour obtenir des Jokers, il vous suffit de faire \`\``+prefixGuess+`\`\` suivi d'un nombre de votre intervalle et de tomber juste.
                        Votre valeur est individuelle et ne change pas tant que vous ne la trouvez pas, mais change quand vous achetez un Level de Charm Joker.
                        `})
                    .addFields({name:`Comment dépenser ses Jokers ?`,value:`
                        Pour consommer vos Jokers, il suffit de contacter <@`+NicknameOut.id+`> par MP afin de faire votre commande.
                        Vous pouvez alors demander des Level Ups pour l'accessoire de votre choix.
                        Ou lui réclamer des lots spéciaux : Reste de Breed, Pokemon Prêt à Combattre, Shiny ou même le Pokémon de la prochaine distrib.`})
                    .setThumbnail(NicknameOut.avatarURL())
                    .setImage(`attachment://Tuto.png`)
                    .setFooter("*Artiste : TheArtcade on Etsy*","https://i.etsystatic.com/isla/70c35a/30170293/isla_500x500.30170293_iqmb14le.jpg?version=0");


                    message.author.send({files:[attachment], embed: exampleEmbed}).then(msg => msg.delete({ timeout: 60000 }));
    return;
    //fin prefix mon tuto
    }


    /////////////////////////////
    //BLOCK commande MON RANDOM//
    /////////////////////////////
    if (petitMessage.startsWith(prefixRandom)){

        const NicknameOut = await bot.users.fetch(auth.tym);

        var ficheCollect = await Participant.findOne({idDiscord: message.author.id});

        // si pas de fiche existante, on créé la fiche
        if (!ficheCollect) { 
            var ficheCollect = await trigger.create(message);
            }

            //récupérer toutes les infos importantes à traiter
            var fetchedValeur = ficheCollect.valeur;
            var fetchedHowManyGuess = ficheCollect.howManyGuess;
            var fetchedLastGuess = ficheCollect.lastGuess;
            var fetchedTodayGuess = ficheCollect.todayGuess;
            var fetchedInARow = ficheCollect.inARow;
            var fetchedJoker = ficheCollect.joker;
            var fetchedShinyCharm = ficheCollect.shinyCharm;
            var fetchedSpotted = ficheCollect.spotted;
            var fetchedHowManyWin = ficheCollect.howManyWin;
            var howManyRandom = 0;
            var newGuess = 0;
            var rangeJoueur = 0;
            var tempPourCent = 0;

            var CharmLevel1 = ":black_heart:";
            var CharmLevel2 = ":black_heart:";
            var CharmLevel3 = ":black_heart:";
            var LoupeLevel1 = ":black_heart:";
            var LoupeLevel2 = ":black_heart:";
            var LoupeLevel3 = ":black_heart:";

            switch (fetchedShinyCharm){
                case 0 :
                break;
                case 1 :
                    CharmLevel1 = ":yellow_heart:";
                break;
                case 2 :
                    CharmLevel1 = ":yellow_heart:";
                    CharmLevel2 = ":orange_heart:";
                break;
                case 3 :
                    CharmLevel1 = ":yellow_heart:";
                    CharmLevel2 = ":orange_heart:";
                    CharmLevel3 = ":heart:";
                break;
                default : 
                    CharmLevel1 = ":angry:";
                    CharmLevel2 = ":rage:";
                    CharmLevel3 = ":face_with_symbols_over_mouth:";
                break;
            }

            switch (fetchedSpotted){
                case 0 :
                break;
                case 1 :
                    LoupeLevel1 = ":yellow_heart:";
                break;
                case 2 :
                    LoupeLevel1 = ":yellow_heart:";
                    LoupeLevel2 = ":orange_heart:";
                break;
                case 3 :
                    LoupeLevel1 = ":yellow_heart:";
                    LoupeLevel2 = ":orange_heart:";
                    LoupeLevel3 = ":heart:";
                break;
                default : 
                    LoupeLevel1 = ":angry:";
                    LoupeLevel2 = ":rage:";
                    LoupeLevel3 = ":face_with_symbols_over_mouth:";
                break;
            }

            ///////////////////////////////////////////////
            //BLOCK pour étudier le niveau du Charm Joker//
            ///////////////////////////////////////////////

            switch (fetchedShinyCharm){
            case 0 : 
                newGuess = Math.floor(Math.random() * auth.RangeMax);
                rangeJoueur = auth.RangeMax;break;
                case 1 : 
                    newGuess = Math.floor(Math.random() * (auth.RangeMax-auth.Stat.Level1Charm));
                    rangeJoueur = (auth.RangeMax-auth.Stat.Level1Charm);break;
                case 2 : 
                    newGuess = Math.floor(Math.random() * (auth.RangeMax-auth.Stat.Level2Charm));
                    rangeJoueur = (auth.RangeMax-auth.Stat.Level2Charm);break;
                case 3 : 
                    newGuess = Math.floor(Math.random() * (auth.RangeMax-auth.Stat.Level3Charm));
                    rangeJoueur = (auth.RangeMax-auth.Stat.Level3Charm);break;
                default :
                    const NicknameOut = await bot.users.fetch(message.author.id);

                    bot.users.fetch(auth.tym).then((user) => {
                        user.send("Attention ! "+NicknameOut.username+" a un Level de Charm Joker anormal !").then(msg => msg.delete({ timeout: 20000 } ) );
                    });
                    return message.channel.send("Hop hop hop ! <@"+auth.tym+">, je crois que <@"+NicknameOut.id+"> essaie de te gruger :triumph:, son Charm Joker est cheaté !").then(msg => msg.delete({ timeout: 30000 }));
                break;
            }



            //Y'a-t-il un event en cours aujourd'hui ?
            var ficheEvent = await Event.findOne({name: "DoowyPowaa"});
            // si pas de fiche existante, on créé la fiche
            if (!ficheEvent)
                {
                var fetchedCombien = 0;
                var fetchedTheDay = Date();
                }
            else{
                var fetchedCombien = ficheEvent.combien;
                var fetchedTheDay = ficheEvent.theDay;
                }

                if (message.createdAt.getDate()==fetchedTheDay.getDate()&&message.createdAt.getMonth()==fetchedTheDay.getMonth()&&message.createdAt.getFullYear()==fetchedTheDay.getFullYear()){
                console.log("Il y a un event aujourd'hui");
                var todayEvent = fetchedCombien;
                } else {var todayEvent = 0;}




            //////////////////////////////////////////////////////////////////////////
            //BLOCK pour étudier l'état de la dernière tentative (gestion du inARow)//
            //////////////////////////////////////////////////////////////////////////

            var whenWas = Datum(fetchedLastGuess);
            //check de la date de la dernière tentative
            if (message.createdAt.getDate()==whenWas.getDate()&&message.createdAt.getMonth()==whenWas.getMonth()&&message.createdAt.getFullYear()==whenWas.getFullYear()) {
            console.log("la dernière tentative était hier, on reset TodayGuess et on incrémente InARow.");
                await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:fetchedHowManyGuess, lastGuess:Date(), inARow:fetchedInARow+1, didIGetEvent : Date()});
                fetchedTodayGuess = fetchedHowManyGuess;
                howManyRandom = fetchedHowManyGuess + todayEvent;
                fetchedInARow++;



                    if(fetchedHowManyGuess!=MaxManyGuess){
                            //Si on atteinte les 7 jours à la suite !
                            if(fetchedInARow>=MaxInARow){
                                //Si notr enombre de guess est inférieur au max-1 de guess (inf strict 14)
                                if(fetchedHowManyGuess<=MaxManyGuess-1){
                                    await Participant.findOneAndUpdate({idDiscord: message.author.id}, {howManyGuess:fetchedHowManyGuess+1, todayGuess:fetchedHowManyGuess+1, inARow:0});
                                    fetchedHowManyGuess++;
                                    fetchedTodayGuess++;
                                    howManyRandom++;
                                    fetchedInARow = 0;

                                const attachment = new Discord.MessageAttachment('./Images/PlusOne.png');

                                const exampleEmbed = new Discord.MessageEmbed()
                                    .setColor(colorEmbed)
                                    .setTitle("Félicitations à __"+message.author.username+"__")
                                    .setAuthor("De la part de **Tymaël**")
                                    .setDescription(`
                                    Yeaaaah !! Tu as fait des \`\`\`\` pendant `+MaxInARow+` jours consécutifs !
                                    Tu remportes donc un bonus ***PERMANENT*** d'un \`\``+prefixGuess+`\`\` supplémentaire par jour.
                                    Fais-en bon usage !
                                    \`\`\`Ton Solde de Joker : `+fetchedJoker+`\`\`\`
                                    `)
                                    .addFields(
                                        { name : `Tentatives du Jour`, value : `restantes => `+(fetchedHowManyGuess-fetchedTodayGuess)+`/`+fetchedHowManyGuess, inline : true},
                                        { name : `Charm Joker <:Charm:`+auth.Pap.emoteCharm+`>`, value : CharmLevel1+" "+CharmLevel2+" "+CharmLevel3, inline : true},
                                        { name : `La Loupe :mag:`, value : LoupeLevel1+" "+LoupeLevel2+" "+LoupeLevel3, inline : true}
                                        )
                                    .addFields(
                                        { name : `Nous rappelons que le maximum de \`\``+prefixGuess+`\`\` cumulable est de `+MaxManyGuess, value : `Pour connaître l'état de ta fiche de participation, tape la commande => \`\``+prefixMonStatut+`\`\`.`, inline : true}
                              
                                    )
                                    .setThumbnail(message.author.avatarURL())
                                    .setImage(`attachment://PlusOne.png`)
                                    .setFooter("*Ce message s'auto-détruira dans 30 secondes ;) !*");


                                    message.channel.send({files:[attachment], embed: exampleEmbed}).then(msg => msg.delete({ timeout: 30000 }));

                                }
                                if(fetchedHowManyGuess==MaxManyGuess&&fetchedInARow<=7){
                                   
                                    message.channel.send("OH :scream: ! <@"+message.author.id+">, tu as atteint le maximum de ``"+prefixGuess+"`` cumulable grâce aux jours consécutifs !\rContinue de ``"+prefixGuess+"`` pour obtenir des Jokers, mais il n'y a plus de récompenses pour "+MaxInARow+" jours d'affilée. :pleading_face: ").then(msg => msg.delete({ timeout: 30000 }));     
                                }
                            }
                    }else if(fetchedHowManyGuess==MaxManyGuess&&fetchedInARow<=7){

                            setTimeout(function() { 
                                text = "OH :scream: ! <@"+message.author.id+">, tu as atteint le maximum de ``"+prefixGuess+"`` cumulable grâce aux jours consécutifs !\rContinue de ``"+prefixGuess+"`` pour obtenir des Jokers, mais il n'y a plus de récompenses pour "+MaxInARow+" jours d'affilée. :pleading_face: ";
                                message.channel.send(text).then(msg => msg.delete({ timeout: 30000 }))}, 500);    

                    }


            }else if (message.createdAt.getDate()==fetchedLastGuess.getDate()&&message.createdAt.getMonth()==fetchedLastGuess.getMonth()&&message.createdAt.getFullYear()==fetchedLastGuess.getFullYear()){
            console.log("la dernière tentative était aujourd'hui, et existante ou pas, on update LastGuess.");
                howManyRandom = fetchedHowManyGuess-fetchedTodayGuess;
                fetchedTodayGuess = fetchedHowManyGuess;
                console.log("todayfetched "+fetchedTodayGuess);
                await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:fetchedHowManyGuess,lastGuess:Date()});
            }else {
            console.log("la dernière tentative était trop vieille, on reset TodayGuess et InARow.");
                fetchedTodayGuess = fetchedHowManyGuess;
                howManyRandom = fetchedHowManyGuess + todayEvent;
                if(fetchedHowManyGuess!=MaxManyGuess){
                    await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:fetchedHowManyGuess, lastGuess:Date(), inARow:1, didIGetEvent : Date()});
                    fetchedInARow = 1;
                } else {
                    await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:fetchedHowManyGuess, lastGuess:Date(), didIGetEvent : Date()});
                }
            }

            var maxHowManyRandom = howManyRandom;

        if(howManyRandom==0){
            return message.reply(" désolé ! Mais vous avez **DÉJÀ FAIT** toutes vos tentatives du jour.").then(msg => msg.delete({ timeout: 5000 }));
        }

        // On a pas atteint le max de guess du jour :)
        while(howManyRandom>0){

            guessNumber = Math.floor(Math.random() * rangeJoueur);
            console.log(guessNumber);


            /////////////////////
            //BLOCK guess EXACT//
            /////////////////////
            if(fetchedValeur==guessNumber){
                fetchedJoker++;
                fetchedHowManyWin++;

                const attachment = new Discord.MessageAttachment('./Images/Joker.png');

                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor(colorEmbed)
                    .setTitle("Félicitations à __"+message.author.username+"__")
                    .setAuthor("De la part de **Tymaël**")
                    .setDescription(`
                    Tu as trouvé la bonne valeur :blush:.
                    Tu remportes donc 1 Joker supplémentaire dans ta fiche de participation.
                    Si tu souhaites l'utiliser, contacte <@`+auth.tym+`> pour connaître les possibilités de récompenses.
                    \`\`\`Ton Solde de Joker : `+fetchedJoker+`\`\`\`
                    `)
                    .addFields(
                        { name : `Tentatives du Jour`, value : `restantes => `+(fetchedHowManyGuess-fetchedTodayGuess)+`/`+fetchedHowManyGuess, inline : true},
                        { name : `Charm Joker <:Charm:`+auth.Pap.emoteCharm+`>`, value : CharmLevel1+" "+CharmLevel2+" "+CharmLevel3, inline : true},
                        { name : `La Loupe :mag:`, value : LoupeLevel1+" "+LoupeLevel2+" "+LoupeLevel3, inline : true}
                    )
                    .addFields(
                        { name : `Ta valeur a été regénérée, tu peux donc recommencer les \`\``+prefixGuess+`\`\` dans l'espoir d'obtenir un nouveau Joker.`, value : `Pour connaître l'état de ta fiche de participation, tape la commande => \`\``+prefixMonStatut+`\`\`.`, inline : true}
              
                    )
                    .setThumbnail(message.author.avatarURL())
                    .setImage(`attachment://Joker.png`)
                    .setFooter("*Ce message s'auto-épinglera dans 2 secondes ;) !*");

                message.channel.send({files:[attachment], embed: exampleEmbed}).then(async pourPin => {pourPin.pin();});
                
                setTimeout(async function() {
                    const fetched = await message.guild.channels.cache.get(auth.Pap.channelTirage).messages.fetch({ limit: 1 });
                    const notPinned = await fetched.filter(fetchedMsg => !fetchedMsg.pinned);
                    await message.guild.channels.cache.get(auth.Pap.channelTirage).bulkDelete(notPinned);
                }, 3500)

                await Participant.findOneAndUpdate({idDiscord: message.author.id}, {joker : fetchedJoker, howManyWin : fetchedHowManyWin, valeur: newGuess});
                
                howManyRandom = 0;

            /////////////////////////
            //BLOCK guess INCORRECT//
            /////////////////////////
            }else{




                ///////////////////////////////////////////////
                //BLOCK pour étudier le niveau du Charm Joker//
                ///////////////////////////////////////////////
                if(fetchedSpotted>=4||fetchedSpotted<0){
                    //on lui rends la guess qu'il a fait en cheatant
                    await fetchedTodayGuess--;
                    await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:fetchedTodayGuess});

                    const NicknameOut = await bot.users.fetch(message.author.id);

                    bot.users.fetch(auth.tym).then((user) => {
                    user.send("Attention ! "+NicknameOut.username+" a un Level de Bonus Loupe anormal !").then(msg => msg.delete({ timeout: 20000 } ) );
                    });

                    return message.channel.send("Hop hop hop ! <@"+auth.tym+">, je crois que <@"+NicknameOut.id+"> essaie de te gruger :triumph:, son Bonus Loupe est cheaté !").then(msg => msg.delete({ timeout: 30000 }));
                }else{
                    message.reply(" nop ! Ton random a fail => "+(maxHowManyRandom-howManyRandom+1)+"/"+maxHowManyRandom+".").then(msg => msg.delete({ timeout: 5000 }));
                }

            }
            howManyRandom--;
        ////////////////////////////////////////////
        //BLOCK Plus de tentatives dans la journée//
        ////////////////////////////////////////////
        }
        //else{
          //  return message.reply(" désolé ! Mais vous avez **DÉJÀ FAIT** toutes vos tentatives du jour.").then(msg => msg.delete({ timeout: 5000 }));
        //}
    return;
    //fin du prefix Random
    }


    ///////////////////////////////
    //BLOCK commande GUESS NUMBER//
    ///////////////////////////////
    if (petitMessage.startsWith(prefixGuess)){

        const argsNumber = message.content.split(' ').slice(1); // All arguments behind the command name with the prefix
        const guessNumber = argsNumber.join(' '); // Amount of messages which should be deleted

        if (!guessNumber) return message.reply(" vous n'avez pas saisi de valeur à chercher.").then(msg => msg.delete({ timeout: 5000 }));
        if (isNaN(guessNumber)) return message.reply(" le paramètre que vous avez saisi n'est pas un nombre.").then(msg => msg.delete({ timeout: 5000 }));

        var ficheCollect = await Participant.findOne({idDiscord: message.author.id});

        // si pas de fiche existante, on créé la fiche
        if (!ficheCollect) { 
            var ficheCollect = await trigger.create(message);
            }

            //récupérer toutes les infos importantes à traiter
            var fetchedValeur = ficheCollect.valeur;
            var fetchedHowManyGuess = ficheCollect.howManyGuess;
            var fetchedLastGuess = ficheCollect.lastGuess;
            var fetchedTodayGuess = ficheCollect.todayGuess;
            var fetchedInARow = ficheCollect.inARow;
            var fetchedJoker = ficheCollect.joker;
            var fetchedShinyCharm = ficheCollect.shinyCharm;
            var fetchedSpotted = ficheCollect.spotted;
            var fetchedHowManyWin = ficheCollect.howManyWin;
            var fetchedCreated = ficheCollect.created;


            var newGuess = 0;
            var rangeJoueur = 0;
            var tempPourCent = 0;


            var CharmLevel1 = ":black_heart:";
            var CharmLevel2 = ":black_heart:";
            var CharmLevel3 = ":black_heart:";
            var LoupeLevel1 = ":black_heart:";
            var LoupeLevel2 = ":black_heart:";
            var LoupeLevel3 = ":black_heart:";

            switch (fetchedShinyCharm){
                case 0 :
                break;
                case 1 :
                    CharmLevel1 = ":yellow_heart:";
                break;
                case 2 :
                    CharmLevel1 = ":yellow_heart:";
                    CharmLevel2 = ":orange_heart:";
                break;
                case 3 :
                    CharmLevel1 = ":yellow_heart:";
                    CharmLevel2 = ":orange_heart:";
                    CharmLevel3 = ":heart:";
                break;
                default : 
                    CharmLevel1 = ":angry:";
                    CharmLevel2 = ":rage:";
                    CharmLevel3 = ":face_with_symbols_over_mouth:";
                break;
            }

            switch (fetchedSpotted){
                case 0 :
                break;
                case 1 :
                    LoupeLevel1 = ":yellow_heart:";
                break;
                case 2 :
                    LoupeLevel1 = ":yellow_heart:";
                    LoupeLevel2 = ":orange_heart:";
                break;
                case 3 :
                    LoupeLevel1 = ":yellow_heart:";
                    LoupeLevel2 = ":orange_heart:";
                    LoupeLevel3 = ":heart:";
                break;
                default : 
                    LoupeLevel1 = ":angry:";
                    LoupeLevel2 = ":rage:";
                    LoupeLevel3 = ":face_with_symbols_over_mouth:";
                break;
            }


            ///////////////////////////////////////////////
            //BLOCK pour étudier le niveau du Charm Joker//
            ///////////////////////////////////////////////

            switch (fetchedShinyCharm){
            case 0 : 
                newGuess = Math.floor(Math.random() * auth.RangeMax);
                rangeJoueur = auth.RangeMax;
                if (guessNumber >= auth.RangeMax) return message.reply(" vous avez saisi une valeur trop grande.\rVotre valeur à trouver est comprise entre 0 et "+(auth.RangeMax-1)+".").then(msg => msg.delete({ timeout: 5000 }));
                if (guessNumber < 0) return message.reply(" vous avez saisi une valeur négative.\rVotre valeur à trouver est comprise entre 0 et "+(auth.RangeMax-1)+".").then(msg => msg.delete({ timeout: 5000 })); 
            break;
                case 1 : 
                    newGuess = Math.floor(Math.random() * (auth.RangeMax-auth.Stat.Level1Charm));
                    rangeJoueur = (auth.RangeMax-auth.Stat.Level1Charm);
                    if (guessNumber >= rangeJoueur) return message.reply(" vous avez saisi une valeur trop grande.\rVotre valeur à trouver est comprise entre 0 et "+(auth.RangeMax-auth.Stat.Level1Charm-1)+".").then(msg => msg.delete({ timeout: 5000 }));
                    if (guessNumber < 0) return message.reply(" vous avez saisi une valeur négative.\rVotre valeur à trouver est comprise entre 0 et "+(auth.RangeMax-auth.Stat.Level1Charm-1)+".").then(msg => msg.delete({ timeout: 5000 })); 
                break;
                case 2 : 
                    newGuess = Math.floor(Math.random() * (auth.RangeMax-auth.Stat.Level2Charm));
                    rangeJoueur = (auth.RangeMax-auth.Stat.Level2Charm);
                    if (guessNumber >= rangeJoueur) return message.reply(" vous avez saisi une valeur trop grande.\rVotre valeur à trouver est comprise entre 0 et "+(auth.RangeMax-auth.Stat.Level2Charm-1)+".").then(msg => msg.delete({ timeout: 5000 }));
                    if (guessNumber < 0) return message.reply(" vous avez saisi une valeur négative.\rVotre valeur à trouver est comprise entre 0 et "+(auth.RangeMax-auth.Stat.Level2Charm-1)+".").then(msg => msg.delete({ timeout: 5000 })); 
                break;
                case 3 : 
                    newGuess = Math.floor(Math.random() * (auth.RangeMax-auth.Stat.Level3Charm));
                    rangeJoueur = (auth.RangeMax-auth.Stat.Level3Charm);
                    if (guessNumber >= rangeJoueur) return message.reply(" vous avez saisi une valeur trop grande.\rVotre valeur à trouver est comprise entre 0 et "+(auth.RangeMax-auth.Stat.Level3Charm-1)+".").then(msg => msg.delete({ timeout: 5000 }));
                    if (guessNumber < 0) return message.reply(" vous avez saisi une valeur négative.\rVotre valeur à trouver est comprise entre 0 et "+(auth.RangeMax-auth.Stat.Level3Charm-1)+".").then(msg => msg.delete({ timeout: 5000 })); 
                break;
                default :
                    const NicknameOut = await bot.users.fetch(message.author.id);

                    bot.users.fetch(auth.tym).then((user) => {
                        user.send("Attention ! "+NicknameOut.username+" a un Level de Charm Joker anormal !").then(msg => msg.delete({ timeout: 20000 } ) );
                    });
                    message.channel.send("Hop hop hop ! <@"+auth.tym+">, je crois que <@"+NicknameOut.id+"> essaie de te gruger :triumph:, son Charm Joker est cheaté !").then(msg => msg.delete({ timeout: 30000 }));
                    return;
                break;
            }



            //Y'a-t-il un event en cours aujourd'hui ?
            var ficheEvent = await Event.findOne({name: "DoowyPowaa"});
            // si pas de fiche existante, on créé la fiche
            if (!ficheEvent)
                {
                var fetchedCombien = 0;
                var fetchedTheDay = Date();
                }
            else{
                var fetchedCombien = ficheEvent.combien;
                var fetchedTheDay = ficheEvent.theDay;
                }

                if (message.createdAt.getDate()==fetchedTheDay.getDate()&&message.createdAt.getMonth()==fetchedTheDay.getMonth()&&message.createdAt.getFullYear()==fetchedTheDay.getFullYear()){
                console.log("Il y a un event aujourd'hui");
                var todayEvent = fetchedCombien;
                } else {var todayEvent = 0;}




            //////////////////////////////////////////////////////////////////////////
            //BLOCK pour étudier l'état de la dernière tentative (gestion du inARow)//
            //////////////////////////////////////////////////////////////////////////

            var whenWas = Datum(fetchedLastGuess);
            //check de la date de la dernière tentative
            if (message.createdAt.getDate()==whenWas.getDate()&&message.createdAt.getMonth()==whenWas.getMonth()&&message.createdAt.getFullYear()==whenWas.getFullYear()){
            console.log("la dernière tentative était hier, on reset TodayGuess et on incrémente InARow.");

                await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:1-todayEvent, lastGuess:Date(), inARow:fetchedInARow+1, didIGetEvent : Date()});
                fetchedTodayGuess = 1 - todayEvent;
                fetchedInARow++;

                    if(fetchedHowManyGuess!=MaxManyGuess){
                        //Si on atteinte les 7 jours à la suite !
                        if(fetchedInARow>=MaxInARow){
                            //Si notr enombre de guess est inférieur au max-1 de guess (inf strict 14)
                            if(fetchedHowManyGuess<=MaxManyGuess-1){
                                await Participant.findOneAndUpdate({idDiscord: message.author.id}, {howManyGuess:fetchedHowManyGuess+1, inARow:0});
                                fetchedHowManyGuess++;
                                fetchedInARow = 0;

                            const attachment = new Discord.MessageAttachment('./Images/PlusOne.png');

                            const exampleEmbed = new Discord.MessageEmbed()
                                .setColor(colorEmbed)
                                .setTitle("Félicitations à __"+message.author.username+"__")
                                .setAuthor("De la part de **Tymaël**")
                                .setDescription(`
                                Yeaaaah !! Tu as fait des \`\``+prefixGuess+`\`\` pendant `+MaxInARow+` jours consécutifs !
                                Tu remportes donc un bonus ***PERMANENT*** d'un \`\``+prefixGuess+`\`\` supplémentaire par jour.
                                Fais-en bon usage !
                                \`\`\`Ton Solde de Joker : `+fetchedJoker+`\`\`\`
                                `)
                                .addFields(
                                    { name : `Tentatives du Jour`, value : `restantes => `+(fetchedHowManyGuess-fetchedTodayGuess)+`/`+fetchedHowManyGuess, inline : true},
                                    { name : `Charm Joker <:Charm:`+auth.Pap.emoteCharm+`>`, value : CharmLevel1+" "+CharmLevel2+" "+CharmLevel3, inline : true},
                                    { name : `La Loupe :mag:`, value : LoupeLevel1+" "+LoupeLevel2+" "+LoupeLevel3, inline : true}
                                    )
                                .addFields(
                                    { name : `Nous rappelons que le maximum de \`\``+prefixGuess+`\`\` cumulable est de `+MaxManyGuess, value : `Pour connaître l'état de ta fiche de participation, tape la commande => \`\``+prefixMonStatut+`\`\`.
                                    Pour connaître tees capacités d'achat, tape la commande => \`\``+prefixShop+`\`\`.`, inline : true}
                          
                                )
                                .setThumbnail(message.author.avatarURL())
                                .setImage(`attachment://PlusOne.png`)
                                .setFooter("*Ce message s'auto-détruira dans 30 secondes ;) !*");


                            message.channel.send({files:[attachment], embed: exampleEmbed}).then(msg => msg.delete({ timeout: 30000 }));

                            }
                        }
                    }else if(fetchedHowManyGuess==MaxManyGuess&&fetchedInARow<=7){

                            setTimeout(function() { 
                                text = "OH :scream: ! <@"+message.author.id+">, tu as atteint le maximum de ``"+prefixGuess+"`` cumulable grâce aux jours consécutifs !\rContinue de ``"+prefixGuess+"`` pour obtenir des Jokers, mais il n'y a plus de récompenses pour "+MaxInARow+" jours d'affilée. :pleading_face: ";
                                message.channel.send(text).then(msg => msg.delete({ timeout: 30000 }))}, 500);    

                    }

            }else if (message.createdAt.getDate()==fetchedLastGuess.getDate()&&message.createdAt.getMonth()==fetchedLastGuess.getMonth()&&message.createdAt.getFullYear()==fetchedLastGuess.getFullYear()){
            console.log("la dernière tentative était aujourd'hui, et existante ou pas, on update LastGuess.");
                await fetchedTodayGuess++;
                console.log("todayfetched "+fetchedTodayGuess);
                await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:fetchedTodayGuess,lastGuess:Date()});
            }else {
            console.log("la dernière tentative était trop vieille, on reset TodayGuess et InARow.");
                fetchedTodayGuess = 1 - todayEvent;
                if(fetchedHowManyGuess!=MaxManyGuess){
                    await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:1-todayEvent, lastGuess:Date(), inARow:1, didIGetEvent : Date()});
                    fetchedInARow = 1;
                }else {
                    await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:1-todayEvent, lastGuess:Date(), didIGetEvent : Date()});
                }
            }

        // On a pas atteint le max de guess du jour :)
        if(fetchedTodayGuess<=fetchedHowManyGuess){





            /////////////////////
            //BLOCK guess EXACT//
            /////////////////////
            if(fetchedValeur==guessNumber){
                fetchedJoker++;
                fetchedHowManyWin++;

                const attachment = new Discord.MessageAttachment('./Images/Joker.png');

                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor(colorEmbed)
                    .setTitle("Félicitations à __"+message.author.username+"__")
                    .setAuthor("De la part de **Tymaël**")
                    .setDescription(`
                    Tu as trouvé la bonne valeur :blush:.
                    Tu remportes donc 1 Joker supplémentaire dans ta fiche de participation.
                    Si tu souhaites l'utiliser, contacte <@`+auth.tym+`> pour connaître les possibilités de récompenses.
                    \`\`\`Ton Solde de Joker : `+fetchedJoker+`\`\`\`
                    `)
                    .addFields(
                        { name : `Tentatives du Jour`, value : `restantes => `+(fetchedHowManyGuess-fetchedTodayGuess)+`/`+fetchedHowManyGuess, inline : true},
                        { name : `Charm Joker <:Charm:`+auth.Pap.emoteCharm+`>`, value : CharmLevel1+" "+CharmLevel2+" "+CharmLevel3, inline : true},
                        { name : `La Loupe :mag:`, value : LoupeLevel1+" "+LoupeLevel2+" "+LoupeLevel3, inline : true}
                        )
                    .addFields(
                        { name : `Ta valeur a été regénérée, tu peux donc recommencer les \`\``+prefixGuess+`\`\` dans l'espoir d'obtenir un nouveau Joker.`, value : `Pour connaître l'état de ta fiche de participation, tape la commande => \`\``+prefixMonStatut+`\`\`.`, inline : true}
              
                    )
                    .setThumbnail(message.author.avatarURL())
                    .setImage(`attachment://Joker.png`)
                    .setFooter("*Ce message s'auto-épinglera dans 2 secondes ;) !*");

                message.channel.send({files:[attachment], embed: exampleEmbed}).then(async pourPin => {pourPin.pin();});
                
                setTimeout(async function() {
                    const fetched = await message.guild.channels.cache.get(auth.Pap.channelTirage).messages.fetch({ limit: 1 });
                    const notPinned = await fetched.filter(fetchedMsg => !fetchedMsg.pinned);
                    await message.guild.channels.cache.get(auth.Pap.channelTirage).bulkDelete(notPinned);
                }, 3500)
                
                await Participant.findOneAndUpdate({idDiscord: message.author.id}, {joker : fetchedJoker, howManyWin : fetchedHowManyWin, valeur: newGuess});

            /////////////////////////
            //BLOCK guess INCORRECT//
            /////////////////////////
            }else{

                ///////////////////////////////////////////////
                //BLOCK pour étudier le niveau du Charm Joker//
                ///////////////////////////////////////////////
                if(fetchedSpotted>=4||fetchedSpotted<0){
                    //on lui rends la guess qu'il a fait en cheatant
                    await fetchedTodayGuess--;
                    await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:fetchedTodayGuess});

                    const NicknameOut = await bot.users.fetch(message.author.id);

                    bot.users.fetch(auth.tym).then((user) => {
                    user.send("Attention ! "+NicknameOut.username+" a un Level de Bonus Loupe anormal !").then(msg => msg.delete({ timeout: 20000 } ) );
                    });

                    message.channel.send("Hop hop hop ! <@"+auth.tym+">, je crois que <@"+NicknameOut.id+"> essaie de te gruger :triumph:, son Bonus Loupe est cheaté !").then(msg => msg.delete({ timeout: 30000 }));
                    return;
                }else if(fetchedSpotted>=3&&(guessNumber<=fetchedValeur+(auth.Stat.Level3PourCent*rangeJoueur/100)&&guessNumber>=fetchedValeur-(auth.Stat.Level3PourCent*rangeJoueur/100) ) ){
                message.reply(" nop ! Mauvaise ``"+prefixGuess+"``, il te reste "+(fetchedHowManyGuess-fetchedTodayGuess)+" tentative(s) aujourd'hui !\rTon Bonus Loupe crie \"**TU BRÛLES !!! :fire: :hot_face: :fire:**\"").then(msg => msg.delete({ timeout: 10000 }));        
                    }else if(fetchedSpotted>=2&&(guessNumber<=fetchedValeur+(auth.Stat.Level2PourCent*rangeJoueur/100)&&guessNumber>=fetchedValeur-(auth.Stat.Level2PourCent*rangeJoueur/100) ) ){
                        message.reply(" nop ! Mauvaise ``"+prefixGuess+"``, il te reste "+(fetchedHowManyGuess-fetchedTodayGuess)+" tentative(s) aujourd'hui !\rTon Bonus Loupe susurre \"**Attention, c'est très très tiède. :white_sun_small_cloud: :blush: :tulip:**\"").then(msg => msg.delete({ timeout: 10000 }));        
                    }else if(fetchedSpotted>=1&&(guessNumber>=fetchedValeur+(auth.Stat.Level1PourCent*rangeJoueur/100)||guessNumber<=fetchedValeur-(auth.Stat.Level1PourCent*rangeJoueur/100) ) ){
                        message.reply(" nop ! Mauvaise ``"+prefixGuess+"``, il te reste "+(fetchedHowManyGuess-fetchedTodayGuess)+" tentative(s) aujourd'hui !\rTon Bonus Loupe claque des dents \"**Tu gèles ! :snowman2: :cold_face: :cloud_snow:**\"").then(msg => msg.delete({ timeout: 10000 }));
                    }else{
                        message.reply(" nop ! Mauvaise ``"+prefixGuess+"``, il te reste "+(fetchedHowManyGuess-fetchedTodayGuess)+" tentative(s) aujourd'hui !").then(msg => msg.delete({ timeout: 5000 }));
                }

            }

        ////////////////////////////////////////////
        //BLOCK Plus de tentatives dans la journée//
        ////////////////////////////////////////////
        }else{
            return message.reply(" désolé ! Mais vous avez **DÉJÀ FAIT** toutes vos tentatives du jour.").then(msg => msg.delete({ timeout: 5000 }));
        }


        ///////////////////////////////////////////////////
        //BLOCK pour offrir Joker après 30 jours de Loose//
        ///////////////////////////////////////////////////

        var whenWas = Datum30(fetchedCreated);
        //check de la date de la dernière tentative
        if (message.createdAt.getDate()>=whenWas.getDate()&&message.createdAt.getMonth()>=whenWas.getMonth()&&message.createdAt.getFullYear()>=whenWas.getFullYear()&&fetchedHowManyWin==0) {
            fetchedJoker = 1;
            fetchedHowManyWin = 1;
            
            const attachment = new Discord.MessageAttachment('./Images/Joker.png');

            const exampleEmbed = new Discord.MessageEmbed()
                .setColor(colorEmbed)
                .setTitle("Félicitations à __"+message.author.username+"__")
                .setAuthor("De la part de **Tymaël**")
                .setDescription(`
                Tu as été incapable de réussir un \`\``+prefixGuess+`\`\` pendant ton premier mois de jeu.
                <@`+auth.tym+`> t'offre donc 1 Joker gratuit dans ta fiche de participation.
                Si tu souhaites l'utiliser, contacte <@`+auth.tym+`> pour connaître les possibilités de récompenses.
                \`\`\`Ton Solde de Joker : `+fetchedJoker+`\`\`\`
                `)
                .addFields(
                    { name : `Tentatives du Jour`, value : `restantes => `+(fetchedHowManyGuess-fetchedTodayGuess)+`/`+fetchedHowManyGuess, inline : true},
                    { name : `Charm Joker <:Charm:`+auth.Pap.emoteCharm+`>`, value : CharmLevel1+" "+CharmLevel2+" "+CharmLevel3, inline : true},
                    { name : `La Loupe :mag:`, value : LoupeLevel1+" "+LoupeLevel2+" "+LoupeLevel3, inline : true}
                    )
                .addFields(
                    { name : `Ta valeur est toujours là, tu peux donc recommencer les \`\``+prefixGuess+`\`\` dans l'espoir d'obtenir un nouveau Joker.`, value : `Pour connaître l'état de ta fiche de participation, tape la commande => \`\``+prefixMonStatut+`\`\`.`, inline : true}
          
                )
                .setThumbnail(message.author.avatarURL())
                .setImage(`attachment://Joker.png`)
                .setFooter("*Ce message s'auto-épinglera dans 2 secondes ;) !*");

           
            await message.channel.send({files:[attachment], embed: exampleEmbed}).then(async pourPin => {pourPin.pin();});
                
            setTimeout(async function() {
                const fetched = await message.guild.channels.cache.get(auth.Pap.channelTirage).messages.fetch({ limit: 1 });
                const notPinned = await fetched.filter(fetchedMsg => !fetchedMsg.pinned);
                await message.guild.channels.cache.get(auth.Pap.channelTirage).bulkDelete(notPinned);
            }, 3500)

            await Participant.findOneAndUpdate({idDiscord: message.author.id}, {joker : 1, howManyWin : 1});
        }
    return;
    //fin du prefix Guess
    }



    ///////////////////////////
    //BLOCK commande MA FICHE//
    ///////////////////////////
    if (petitMessage.startsWith(prefixMonStatut)){


        var ficheCollect = await Participant.findOne({idDiscord: message.author.id});

        // si pas de fiche existante, on créé la fiche
        if (!ficheCollect) { 
            return message.reply(" désolé ! Mais vous n'avez pas encore de fiche de participation, veuillez tapez ``"+prefixGuess+"`` suivi d'un nombre entre 0 et "+(auth.RangeMax-1)+" pour commencer à jouer.\rBonne chance :four_leaf_clover: !").then(msg => msg.delete({ timeout: 15000 }));
        }

            //récupérer toutes les infos importantes à traiter
            var fetchedName = ficheCollect.participant;
            var fetchedValeur = ficheCollect.valeur;
            var fetchedHowManyGuess = ficheCollect.howManyGuess;
            var fetchedLastGuess = ficheCollect.lastGuess;
            var fetchedTodayGuess = ficheCollect.todayGuess;
            var fetchedInARow = ficheCollect.inARow;
            var fetchedJoker = ficheCollect.joker;
            var fetchedShinyCharm = ficheCollect.shinyCharm;
            var fetchedSpotted = ficheCollect.spotted;

            var monRange = auth.RangeMax;
            var CharmLevel1 = ":black_heart:";
            var CharmLevel2 = ":black_heart:";
            var CharmLevel3 = ":black_heart:";
            var LoupeLevel1 = ":black_heart:";
            var LoupeLevel2 = ":black_heart:";
            var LoupeLevel3 = ":black_heart:";


            console.log("ma fiche : "+fetchedName)

            if(fetchedInARow>=8&&fetchedHowManyGuess==15){
                var ValeurSuite = "Hors Sujet";
            }else{var ValeurSuite = fetchedInARow+`/`+MaxInARow;}


            switch (fetchedShinyCharm){
                case 0 :
                    monRange = auth.RangeMax;
                break;
                case 1 :
                    monRange = auth.RangeMax-auth.Stat.Level1Charm;
                    CharmLevel1 = ":yellow_heart:";
                break;
                case 2 :
                    monRange = auth.RangeMax-auth.Stat.Level2Charm;
                    CharmLevel1 = ":yellow_heart:";
                    CharmLevel2 = ":orange_heart:";
                break;
                case 3 :
                    monRange = auth.RangeMax-auth.Stat.Level3Charm;
                    CharmLevel1 = ":yellow_heart:";
                    CharmLevel2 = ":orange_heart:";
                    CharmLevel3 = ":heart:";
                break;
                default : 
                    monRange = "Intervalle cheaté !!";
                    CharmLevel1 = ":angry:";
                    CharmLevel2 = ":rage:";
                    CharmLevel3 = ":face_with_symbols_over_mouth:";
                break;
            }

            switch (fetchedSpotted){
                case 0 :
                break;
                case 1 :
                    LoupeLevel1 = ":yellow_heart:";
                break;
                case 2 :
                    LoupeLevel1 = ":yellow_heart:";
                    LoupeLevel2 = ":orange_heart:";
                break;
                case 3 :
                    LoupeLevel1 = ":yellow_heart:";
                    LoupeLevel2 = ":orange_heart:";
                    LoupeLevel3 = ":heart:";
                break;
                default : 
                    LoupeLevel1 = ":angry:";
                    LoupeLevel2 = ":rage:";
                    LoupeLevel3 = ":face_with_symbols_over_mouth:";
                break;
            }



            //Y'a-t-il un event en cours aujourd'hui ?
            var ficheEvent = await Event.findOne({name: "DoowyPowaa"});
            // si pas de fiche existante, on créé la fiche
            if (!ficheEvent)
                {
                var fetchedCombien = 0;
                var fetchedTheDay = Date();
                }
            else{
                var fetchedCombien = ficheEvent.combien;
                var fetchedTheDay = ficheEvent.theDay;
                }

                if (message.createdAt.getDate()==fetchedTheDay.getDate()&&message.createdAt.getMonth()==fetchedTheDay.getMonth()&&message.createdAt.getFullYear()==fetchedTheDay.getFullYear()){
                console.log("Il y a un event aujourd'hui");
                var todayEvent = fetchedCombien;
                } else {var todayEvent = 0;}



            // Quand était la dernière tentative du joueur
            var whenWas = Datum(fetchedLastGuess);
            //check de la date de la dernière tentative
            if (message.createdAt.getDate()==whenWas.getDate()&&message.createdAt.getMonth()==whenWas.getMonth()&&message.createdAt.getFullYear()==whenWas.getFullYear()) {
                console.log("la dernière tentative était hier, on reset TodayGuess.");
                fetchedTodayGuess = 0-todayEvent;
                howManyRandom = fetchedHowManyGuess;
                await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:fetchedTodayGuess, didIGetEvent:Date()});
            }else if (message.createdAt.getDate()==fetchedLastGuess.getDate()&&message.createdAt.getMonth()==fetchedLastGuess.getMonth()&&message.createdAt.getFullYear()==fetchedLastGuess.getFullYear()){
            console.log("la dernière tentative était aujourd'hui, et existante ou pas, on update LastGuess.");
            }else {
            console.log("la dernière tentative était trop vieille, on reset TodayGuess et InARow.");
                fetchedTodayGuess = 0-todayEvent;
                howManyRandom = fetchedHowManyGuess;
                if(fetchedHowManyGuess!=MaxManyGuess){
                    fetchedInARow = 0;
                    await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:fetchedTodayGuess, inARow:0, didIGetEvent:Date()});
                }else{
                    await Participant.findOneAndUpdate({idDiscord: message.author.id}, {todayGuess:fetchedTodayGuess, didIGetEvent:Date()});
                }

            }

            const exampleEmbed = new Discord.MessageEmbed()
                .setColor(colorEmbed)
                .setTitle("Fiche de participation de __"+message.author.username+"__")
                .setAuthor("Animée par **Tymaël** et programmée par **Doowy**")
                .setDescription(`

                Nombre de tentatives maximum par jour : `+fetchedHowManyGuess+`
                Nombre de tentatives restantes aujourd'hui : `+(fetchedHowManyGuess-fetchedTodayGuess)+`/`+fetchedHowManyGuess+`
                Nombre de jours de participations à la suite : `+ValeurSuite+`
                Taille de ton intervalle : [0 à `+(monRange-1)+`]
                \`\`\`Ton solde de Joker : `+fetchedJoker+`\`\`\`Level du Charm Joker <:Charm:`+auth.Pap.emoteCharm+`> : `+CharmLevel1+` `+CharmLevel2+` `+CharmLevel3+`
                Level du Bonus Loupe :mag: : `+LoupeLevel1+` `+LoupeLevel2+` `+LoupeLevel3+`
                Date de la dernière tentative : `+fetchedLastGuess.getDate()+`/`+(fetchedLastGuess.getMonth()+1)+`/`+fetchedLastGuess.getFullYear()+`
                `)
                    .setThumbnail(message.author.avatarURL())
                    .setFooter("*Ce message s'auto-détruira dans 30 secondes ;) !*");


                return message.channel.send(exampleEmbed).then(msg => msg.delete({ timeout: 30000 }));
    return;
    //fin du prefix ma fiche
    }



    ///////////
    // STAFF //
    /////////////////////////////
    //BLOCK commande FICHE @tag//
    /////////////////////////////
    if (message.channel.id==auth.Pap.channelTirage&&petitMessage.startsWith(prefixStatut)&&(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){

        const taggedUser = message.mentions.users.first();

        if (!taggedUser) return message.author.send("Vous n'avez pas saisi de pseudo à chercher.").then(msg => msg.delete({ timeout: 10000 }));
        if (isNaN(taggedUser)) return message.author.send("Le paramètre que vous avez saisi n'est pas un pseudo.").then(msg => msg.delete({ timeout: 10000 }));

        var ficheCollect = await Participant.findOne({idDiscord: taggedUser.id});
        const NicknameOut = await bot.users.fetch(taggedUser.id);

        // si pas de fiche existante, on créé la fiche
        if (!ficheCollect) { 
            return message.author.send("Désolé ! Mais il n'y a pas de fiche de participation pour "+NicknameOut.username+".").then(msg => msg.delete({ timeout: 10000 }));
        }

            //récupérer toutes les infos importantes à traiter
            var fetchedValeur = ficheCollect.valeur;
            var fetchedHowManyGuess = ficheCollect.howManyGuess;
            var fetchedLastGuess = ficheCollect.lastGuess;
            var fetchedTodayGuess = ficheCollect.todayGuess;
            var fetchedInARow = ficheCollect.inARow;
            var fetchedJoker = ficheCollect.joker;
            var fetchedShinyCharm = ficheCollect.shinyCharm;
            var fetchedSpotted = ficheCollect.spotted;
            var fetchedCreated = ficheCollect.created;
            var fetchedHowManyWin = ficheCollect.howManyWin;
            var monRange = auth.RangeMax;
            var CharmLevel1 = ":black_heart:";
            var CharmLevel2 = ":black_heart:";
            var CharmLevel3 = ":black_heart:";
            var LoupeLevel1 = ":black_heart:";
            var LoupeLevel2 = ":black_heart:";
            var LoupeLevel3 = ":black_heart:";

            switch (fetchedShinyCharm){
                case 0 :
                    monRange = auth.RangeMax;
                break;
                case 1 :
                    monRange = auth.RangeMax-auth.Stat.Level1Charm;
                    CharmLevel1 = ":yellow_heart:";
                break;
                case 2 :
                    monRange = auth.RangeMax-auth.Stat.Level2Charm;
                    CharmLevel1 = ":yellow_heart:";
                    CharmLevel2 = ":orange_heart:";
                break;
                case 3 :
                    monRange = auth.RangeMax-auth.Stat.Level3Charm;
                    CharmLevel1 = ":yellow_heart:";
                    CharmLevel2 = ":orange_heart:";
                    CharmLevel3 = ":heart:";
                break;
                default : 
                    monRange = "Intervalle cheaté !!";
                    CharmLevel1 = ":angry:";
                    CharmLevel2 = ":rage:";
                    CharmLevel3 = ":face_with_symbols_over_mouth:";
                break;
            }

            switch (fetchedSpotted){
                case 0 :
                break;
                case 1 :
                    LoupeLevel1 = ":yellow_heart:";
                break;
                case 2 :
                    LoupeLevel1 = ":yellow_heart:";
                    LoupeLevel2 = ":orange_heart:";
                break;
                case 3 :
                    LoupeLevel1 = ":yellow_heart:";
                    LoupeLevel2 = ":orange_heart:";
                    LoupeLevel3 = ":heart:";
                break;
                default : 
                    LoupeLevel1 = ":angry:";
                    LoupeLevel2 = ":rage:";
                    LoupeLevel3 = ":face_with_symbols_over_mouth:";
                break;
            }



            const exampleEmbed = new Discord.MessageEmbed()
                .setColor(colorEmbed)
                .setTitle("Fiche de participation de __"+NicknameOut.username+"__")
                .setAuthor("Animée par **Tymaël** et programmée par **Doowy**")
                .setDescription(`

                Nombre à trouver : ***__`+fetchedValeur+`__***
                Nombre de tentatives maximum par jour : `+fetchedHowManyGuess+`
                Nombre de tentatives restantes aujourd'hui : `+(fetchedHowManyGuess-fetchedTodayGuess)+`/`+fetchedHowManyGuess+`
                Nombre de jours de participations à la suite : `+fetchedInARow+`/`+MaxInARow+`
                Taille de ton intervalle : [0 à `+(monRange-1)+`]
                \`\`\`Son solde de Joker : `+fetchedJoker+`\`\`\`Level du Charm Joker <:Charm:`+auth.Pap.emoteCharm+`> : `+CharmLevel1+` `+CharmLevel2+` `+CharmLevel3+`
                Level du Bonus Loupe :mag: : `+LoupeLevel1+` `+LoupeLevel2+` `+LoupeLevel3+`
                Date de la dernière tentative : `+fetchedLastGuess.getDate()+`/`+(fetchedLastGuess.getMonth()+1)+`/`+fetchedLastGuess.getFullYear()+`
                Date de création de la fiche : `+fetchedCreated.getDate()+`/`+(fetchedCreated.getMonth()+1)+`/`+fetchedCreated.getFullYear()+`
                Nombre total de bon \`\``+prefixGuess+`\`\` : `+fetchedHowManyWin+`
                `)
                    .setThumbnail(NicknameOut.avatarURL())
                    .setFooter("*Ce message s'auto-détruira dans 30 secondes ;) !*");


                return message.author.send(exampleEmbed).then(msg => msg.delete({ timeout: 30000 }));
    return;
    //fin du prefix fiche
    }else if (message.channel.id==auth.Pap.channelTirage&&petitMessage.startsWith(prefixStatut)&&!(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){return message.reply(" nop nop tu n'as pas le droit d'utiliser cette commande").then(msg => msg.delete({ timeout: 10000 }));
    }else if (message.channel.id!=auth.Pap.channelTirage&&petitMessage.startsWith(prefixStatut)&&(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){return message.reply(" nop nop tu t'es trompé de salon pour utiliser cette commande").then(msg => msg.delete({ timeout: 10000 }));}



    ///////////
    // STAFF //
    ///////////////////////////////
    //BLOCK commande Service @tag//
    ///////////////////////////////
    if (message.channel.id==auth.Pap.channelTirage&&petitMessage.startsWith(prefixUse)&&(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){

        const taggedUser = message.mentions.users.first();

        if (!taggedUser) return message.author.send("Vous n'avez pas saisi de pseudo à chercher.").then(msg => msg.delete({ timeout: 10000 }));
        if (isNaN(taggedUser)) return message.author.send("Le paramètre que vous avez saisi n'est pas un pseudo.").then(msg => msg.delete({ timeout: 10000 }));

        var ficheCollect = await Participant.findOne({idDiscord: taggedUser.id});
        const NicknameOut = await bot.users.fetch(taggedUser.id);

        // si pas de fiche existante, on créé la fiche
        if (!ficheCollect) { 
            return message.author.send("Désolé ! Mais il n'y a pas de fiche de participation pour "+NicknameOut.username+".").then(msg => msg.delete({ timeout: 10000 }));
        }

            var fetchedJoker = ficheCollect.joker;
            fetchedJoker--;

            if(fetchedJoker<0){
                fetchedJoker++;
                message.author.send("Attention ! "+NicknameOut.username+" n'a pas de Joker !").then(msg => msg.delete({ timeout: 20000 }));
                message.channel.send("Hop hop hop ! <@"+message.author.id+">, je crois que <@"+NicknameOut.id+"> essaie de te gruger :triumph:, il·elle n'a pas de Joker !").then(msg => msg.delete({ timeout: 30000 }));
            }else{
                console.log("joker");
                await Participant.findOneAndUpdate({idDiscord: taggedUser.id}, {joker : fetchedJoker});
                var msg = await message.channel.send("Yeaaahhh ! Félicitations à <@"+NicknameOut.id+">, il vient de commander un service à <@!"+auth.tym+"> en échange d'un Joker !\r```Ton nouveau Solde de Joker : "+fetchedJoker+"``` ");
                    text = {files:["./Images/Joker.png"]};
                    await message.channel.send(text).then(msg => msg.delete({ timeout: 10000 }));

                await message.channel.send("https://tenor.com/view/celebrate-party-gif-8916587").then(msg => msg.delete({ timeout: 20000 }));

            }
    return;
    //fin du prefix joker
    }else if (message.channel.id==auth.Pap.channelTirage&&petitMessage.startsWith(prefixUse)&&!(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){return message.reply(" nop nop tu n'as pas le droit d'utiliser cette commande").then(msg => msg.delete({ timeout: 10000 }));
    }else if (message.channel.id!=auth.Pap.channelTirage&&petitMessage.startsWith(prefixUse)&&(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){return message.reply(" nop nop tu t'es trompé de salon pour utiliser cette commande").then(msg => msg.delete({ timeout: 10000 }));}




    ///////////
    // STAFF //
    /////////////////////////////////////////
    //BLOCK ALL +JOKERouGUESS +NbrPourGuess//
    /////////////////////////////////////////
    if(message.channel.id==auth.Pap.channelTirage&&petitMessage.startsWith(prefixAll)&&(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff)) ) {
        var fichesCollect = await Participant.find({});
        var numberFiche = fichesCollect.length;
        console.log(fichesCollect);
        console.log("combien de fiche : "+numberFiche);


            if(petitMessage.includes(prefixGuess)){

                const argsNumber = message.content.split(' ').slice(2); // All arguments behind the command name with the prefix
                var Quantity = argsNumber.join(' '); // Amount of Joker
                if (!Quantity) Quantity=1;
                if (isNaN(Quantity)) Quantity=1;

                ///////////////////////////////////
                // BLOCK de gestion d'event GUESS//
                ///////////////////////////////////
                    var ficheEvent = await Event.findOne({name: "DoowyPowaa"});
                    // si pas de fiche existante, on créé la fiche
                    if (!ficheEvent) {var ficheEvent = await trigger.createEvent(message, Quantity);}

                    var fetchedCombien = ficheEvent.combien;
                    var fetchedTheDay = ficheEvent.theDay;

                    //check de la date de la dernière tentative
                    if (message.createdAt.getDate()==fetchedTheDay.getDate()&&message.createdAt.getMonth()==fetchedTheDay.getMonth()&&message.createdAt.getFullYear()==fetchedTheDay.getFullYear()){
                        console.log("le dernier event était aujourd'hui, et existante ou pas, on update la quantité.");
                            
                            var fetchedCombien = parseInt(fetchedCombien)+parseInt(Quantity);
                    
                            var z;
                            for (z = 0; z < numberFiche; z++) {

                                console.log("nom n°"+(z+1)+" : "+fichesCollect[z].participant);

                                var ficheCollectZ = await Participant.findOne({idDiscord: fichesCollect[z].idDiscord});
                                var fetchedDidIGetEvent = ficheCollectZ.didIGetEvent;
                                var fetchedTodayGuess = ficheCollectZ.todayGuess;

                                if (fetchedDidIGetEvent.getDate()==fetchedTheDay.getDate()&&fetchedDidIGetEvent.getMonth()==fetchedTheDay.getMonth()&&fetchedDidIGetEvent.getFullYear()==fetchedTheDay.getFullYear()){
                                    console.log("le dernier event DU JOUEUR était aujourd'hui, on update la quantité.");
                                    var dailyAddEvent = parseInt(fetchedTodayGuess) - parseInt(Quantity);
                                    await Participant.findOneAndUpdate({idDiscord: fichesCollect[z].idDiscord}, {todayGuess : dailyAddEvent, didIGetEvent : Date()});
                                    console.log("update n°"+(z+1)+" : "+dailyAddEvent);

                                }

                            }

                        await Event.findOneAndUpdate({name: "DoowyPowaa"}, {combien : fetchedCombien});
                        }else {
                        console.log("le dernier event était trop vieux, on reset la date et la quantité.");
                        fetchedTheDay = Date();
                        await Event.findOneAndUpdate({name: "DoowyPowaa"}, {combien : Quantity, theDay : fetchedTheDay});
                        console.log(Quantity);
                    }
            }else if(petitMessage.includes(prefixJoker)){

                var i;
                for (i = 0; i < numberFiche; i++) {

                    console.log("nom n°"+(i+1)+" : "+fichesCollect[i].participant);

                    var ficheCollect = await Participant.findOne({idDiscord: fichesCollect[i].idDiscord});
                    var fetchedJoker = ficheCollect.joker;
                    await Participant.findOneAndUpdate({idDiscord: fichesCollect[i].idDiscord}, {joker:fetchedJoker+1});
                }
            }else{
                message.author.send("Vous n'avez pas saisie de paramètres à update sur les fiches des joueurs !").then(msg => msg.delete({ timeout: 20000 }));
                return;
            }

        

        if(petitMessage.includes(prefixJoker)){

            var title = "***SPECIAL EVENT : +1 JOKER POUR TOUS !!!***";
            var whatToDo = `Yep tu ne rêves pas :stuck_out_tongue_winking_eye: !
                    <@`+message.author.id+`> a offert à tous les joueurs ayant une fiche à cet instant 1 Joker gratuit !
                    Vous remportez donc tous 1 Joker supplémentaire dans votre fiche de participation.
                    Pour connaître votre solde, vous pouvez taper \`\``+prefixShop+`\`\` et ainsi voir ce que vous pouvez acheter avec.
                    Si vous souhaitez l'utiliser, contactez <@`+auth.tym+`> pour connaître les possibilités de récompenses.`;
        }else if(petitMessage.includes(prefixGuess)){


            var title = "***SPECIAL EVENT : +"+Quantity+" "+prefixGuess.toUpperCase()+" POUR TOUS !!!***";
            var what = "``"+prefixGuess+"``";
            if (Quantity>1){
                var whatToDo = `Yep tu ne rêves pas :stuck_out_tongue_winking_eye: !
                    <@`+message.author.id+`> a offert à tous les joueurs ayant une fiche à cet instant `+Quantity+` `+what+` gratuits !
                    Vous remportez donc tous `+Quantity+` `+what+` supplémentaires dans votre fiche de participation.
                    Ces `+what+` ne sont valables qu'aujourd'hui et seront détruits dès demain.\rPour connaître votre solde, vous pouvez taper \`\``+prefixMonStatut+`\`\` et ainsi voir combien de `+what+` il vous reste aujourd'hui !`;
            }else{
                var whatToDo = `Yep tu ne rêves pas :stuck_out_tongue_winking_eye: !
                    <@`+message.author.id+`> a offert à tous les joueurs ayant une fiche à cet instant 1 `+what+` gratuit !
                    Vous remportez donc tous 1 `+what+` supplémentaire dans votre fiche de participation.
                    Ce `+what+` n'est valable qu'aujourd'hui et sera détruit dès demain.\rPour connaître votre solde, vous pouvez taper \`\``+prefixMonStatut+`\`\` et ainsi voir combien de `+what+` il vous reste aujourd'hui !`;
            }
        }


                //const attachment = new Discord.MessageAttachment('./Images/PlusOne.png');
                const attachment = new Discord.MessageAttachment('./Images/Congrats.gif');

                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor(colorEmbed)
                    .setTitle(title)
                    .setAuthor("De la part de **"+message.author.username+"**")
                    .setDescription(whatToDo)
                    .setThumbnail(message.author.avatarURL())
                    .setImage(`attachment://Congrats.gif`)
                    //.setImage(`attachment://PlusOne.png`)
                    .setFooter("*Ce message s'auto-épinglera dans 2 secondes ;) !*");

                message.channel.send({files:[attachment], embed: exampleEmbed}).then(async pourPin => {pourPin.pin();});
                
                setTimeout(async function() {
                    const fetched = await message.guild.channels.cache.get(auth.Pap.channelTirage).messages.fetch({ limit: 1 });
                    const notPinned = await fetched.filter(fetchedMsg => !fetchedMsg.pinned);
                    await message.guild.channels.cache.get(auth.Pap.channelTirage).bulkDelete(notPinned);
                }, 4000)                
    return;
    //fin prefix all
    }else if (message.channel.id==auth.Pap.channelTirage&&petitMessage.startsWith(prefixAll)&&!(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){return message.reply(" nop nop tu n'as pas le droit d'utiliser cette commande").then(msg => msg.delete({ timeout: 10000 }));
    }else if (message.channel.id!=auth.Pap.channelTirage&&petitMessage.startsWith(prefixAll)&&(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){return message.reply(" nop nop tu t'es trompé de salon pour utiliser cette commande").then(msg => msg.delete({ timeout: 10000 }));}



    ///////////
    // STAFF //
    //////////////////////////////////////
    //BLOCK commande Sudo Give Take @tag//
    //////////////////////////////////////
    if (message.channel.id==auth.Pap.channelTirage&&petitMessage.startsWith(prefixSudo)&&(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){

        const taggedUser = message.mentions.users.first();

        if (!taggedUser) return message.author.send("Vous n'avez pas saisi de pseudo à chercher.").then(msg => msg.delete({ timeout: 10000 }));
        if (isNaN(taggedUser)) return message.author.send("Le paramètre que vous avez saisi n'est pas un pseudo.").then(msg => msg.delete({ timeout: 10000 }));

        var ficheCollect = await Participant.findOne({idDiscord: taggedUser.id});
        const NicknameOut = await bot.users.fetch(taggedUser.id);

        // si pas de fiche existante, on créé la fiche
        if (!ficheCollect) { 
            return message.author.send("Désolé ! Mais il n'y a pas de fiche de participation pour "+NicknameOut.username+".").then(msg => msg.delete({ timeout: 10000 }));
        }


            //récupérer toutes les infos importantes à traiter
            var fetchedValeur = ficheCollect.valeur;
            var fetchedHowManyGuess = ficheCollect.howManyGuess;
            var fetchedLastGuess = ficheCollect.lastGuess;
            var fetchedTodayGuess = ficheCollect.todayGuess;
            var fetchedInARow = ficheCollect.inARow;
            var fetchedJoker = ficheCollect.joker;
            var fetchedShinyCharm = ficheCollect.shinyCharm;
            var fetchedSpotted = ficheCollect.spotted;
            var fetchedCreated = ficheCollect.created;
            var fetchedHowManyWin = ficheCollect.howManyWin;

            var newGuess = 0;
            var rangeJoueur = 0;
            var tempPourCent = 0;


            var CharmLevel1 = ":black_heart:";
            var CharmLevel2 = ":black_heart:";
            var CharmLevel3 = ":black_heart:";
            var LoupeLevel1 = ":black_heart:";
            var LoupeLevel2 = ":black_heart:";
            var LoupeLevel3 = ":black_heart:";

            switch (fetchedShinyCharm){
                case 0 :
                break;
                case 1 :
                    CharmLevel1 = ":yellow_heart:";
                break;
                case 2 :
                    CharmLevel1 = ":yellow_heart:";
                    CharmLevel2 = ":orange_heart:";
                break;
                case 3 :
                    CharmLevel1 = ":yellow_heart:";
                    CharmLevel2 = ":orange_heart:";
                    CharmLevel3 = ":heart:";
                break;
                default : 
                    CharmLevel1 = ":angry:";
                    CharmLevel2 = ":rage:";
                    CharmLevel3 = ":face_with_symbols_over_mouth:";
                break;
            }

            switch (fetchedSpotted){
                case 0 :
                break;
                case 1 :
                    LoupeLevel1 = ":yellow_heart:";
                break;
                case 2 :
                    LoupeLevel1 = ":yellow_heart:";
                    LoupeLevel2 = ":orange_heart:";
                break;
                case 3 :
                    LoupeLevel1 = ":yellow_heart:";
                    LoupeLevel2 = ":orange_heart:";
                    LoupeLevel3 = ":heart:";
                break;
                default : 
                    LoupeLevel1 = ":angry:";
                    LoupeLevel2 = ":rage:";
                    LoupeLevel3 = ":face_with_symbols_over_mouth:";
                break;
            }

            if(petitMessage.includes(prefixGive))
            {
                fetchedJoker++;
                fetchedHowManyWin++;

                await Participant.findOneAndUpdate({idDiscord: taggedUser.id}, {joker : fetchedJoker, howManyWin : fetchedHowManyWin});

                const attachment = new Discord.MessageAttachment('./Images/Joker.png');

                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor(colorEmbed)
                    .setTitle("Félicitations à __"+NicknameOut.username+"__")
                    .setAuthor("De la part de **"+message.author.username+"**")
                    .setDescription(`
                    <@`+message.author.id+`> est d'humeur généreuse aujourd'hui :smile: .
                    Il·Elle t'offre donc 1 Joker gratuit dans ta fiche de participation.
                    Si tu souhaites l'utiliser, contacte <@`+auth.tym+`> pour connaître les possibilités de récompenses.
                    \`\`\`Ton Solde de Joker : `+fetchedJoker+`\`\`\`
                    `)
                    .addFields(
                        { name : `Tentatives du Jour`, value : `restantes => `+(fetchedHowManyGuess-fetchedTodayGuess)+`/`+fetchedHowManyGuess, inline : true},
                        { name : `Charm Joker <:Charm:`+auth.Pap.emoteCharm+`>`, value : CharmLevel1+" "+CharmLevel2+" "+CharmLevel3, inline : true},
                        { name : `La Loupe :mag:`, value : LoupeLevel1+" "+LoupeLevel2+" "+LoupeLevel3, inline : true}
                        )
                    .addFields(
                        { name : `Ta valeur est toujours là, tu peux donc recommencer les \`\``+prefixGuess+`\`\` dans l'espoir d'obtenir un nouveau Joker.`, value : `Pour connaître l'état de ta fiche de participation, tape la commande => \`\``+prefixMonStatut+`\`\`.`, inline : true}
              
                    )
                    .setThumbnail(NicknameOut.avatarURL())
                    .setImage(`attachment://Joker.png`)
                    .setFooter("*Ce message s'auto-épinglera dans 2 secondes ;) !*");

               
                await message.channel.send({files:[attachment], embed: exampleEmbed}).then(msg => msg.delete({ timeout: 60000 }));


            }else if(petitMessage.includes(prefixtake))
            {
                if (fetchedJoker<=0){
                    fetchedJoker = 0;
                    await Participant.findOneAndUpdate({idDiscord: taggedUser.id}, {joker : fetchedJoker});
                    return message.author.send("Message d'avertissement :\rVous ne pouvez pas retirer un Joker à <@"+NicknameOut.id+"> \rSon solde est déjà nul :smile:\rBonne journée !").then(msg => msg.delete({ timeout: 20000 }));
                }
                fetchedJoker--;
                fetchedHowManyWin--;

                await Participant.findOneAndUpdate({idDiscord: taggedUser.id}, {joker : fetchedJoker, howManyWin : fetchedHowManyWin});

                message.author.send("Message de confirmation :\rVous avez retiré un Joker à <@"+NicknameOut.id+"> \rL'action lui a été signalé par MP, il se pourrait qu'il vous contacte en privé pour discuter de la raison de cette action :smile:\rBonne journée !").then(msg => msg.delete({ timeout: 20000 }));
                NicknameOut.send("<@"+message.author.id+"> t'a retiré un Joker. Si tu souhaites connaître la raison de cette action, contacte la par MP :smile:\r```Ton nouveau solde de Joker : "+fetchedJoker+"```").then(msg => msg.delete({ timeout: 20000 }));


            }
    return;
    //fin du prefix SUDO JOKER
    }else if (message.channel.id==auth.Pap.channelTirage&&petitMessage.startsWith(prefixSudo)&&!(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){return message.reply(" nop nop tu n'as pas le droit d'utiliser cette commande").then(msg => msg.delete({ timeout: 10000 }));
    }else if (message.channel.id!=auth.Pap.channelTirage&&petitMessage.startsWith(prefixSudo)&&(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){return message.reply(" nop nop tu t'es trompé de salon pour utiliser cette commande").then(msg => msg.delete({ timeout: 10000 }));}




    ///////////
    // STAFF //
    /////////////////////////////
    //BLOCK commande CHARM @tag//
    /////////////////////////////
    if (message.channel.id==auth.Pap.channelTirage&&petitMessage.startsWith(prefixCC)&&(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){

        const taggedUser = message.mentions.users.first();

        if (!taggedUser) return message.author.send("Vous n'avez pas saisi de pseudo à chercher.").then(msg => msg.delete({ timeout: 10000 }));
        if (isNaN(taggedUser)) return message.author.send("Le paramètre que vous avez saisi n'est pas un pseudo.").then(msg => msg.delete({ timeout: 10000 }));

        var ficheCollect = await Participant.findOne({idDiscord: taggedUser.id});
        const NicknameOut = await bot.users.fetch(taggedUser.id);

        // si pas de fiche existante, on créé la fiche
        if (!ficheCollect) { 
            return message.author.send("Désolé ! Mais il n'y a pas de fiche de participation pour "+NicknameOut.username+".").then(msg => msg.delete({ timeout: 10000 }));
        }else {

            var fetchedJoker = ficheCollect.joker;
            var fetchedShinyCharm = ficheCollect.shinyCharm;
            var fetchedSpotted = ficheCollect.spotted;
            var fetchedTodayGuess = ficheCollect.todayGuess;
            var fetchedHowManyGuess = ficheCollect.howManyGuess;

            ///////////////////////////////////////////////
            //BLOCK pour étudier le niveau du Bonus Loupe//
            ///////////////////////////////////////////////

            var LoupeLevel1 = ":black_heart:";
            var LoupeLevel2 = ":black_heart:";
            var LoupeLevel3 = ":black_heart:";
            switch (fetchedSpotted){
                case 0 :
                break;
                case 1 :
                    LoupeLevel1 = ":yellow_heart:";
                break;
                case 2 :
                    LoupeLevel1 = ":yellow_heart:";
                    LoupeLevel2 = ":orange_heart:";
                break;
                case 3 :
                    LoupeLevel1 = ":yellow_heart:";
                    LoupeLevel2 = ":orange_heart:";
                    LoupeLevel3 = ":heart:";
                break;
                default : 
                    LoupeLevel1 = ":angry:";
                    LoupeLevel2 = ":rage:";
                    LoupeLevel3 = ":face_with_symbols_over_mouth:";
                break;
            }

            switch (fetchedShinyCharm){
                case 0 :
                    var priceCharm = 1;
                break;
                case 1 :
                    var priceCharm = 2;
                break;
                case 2 :
                    var priceCharm = 3;
                break;
                case 3 :
                    var priceCharm = false;
                break;
                default : 
                    var priceCharm = false;

                    bot.users.fetch(auth.doowy).then((user) => {
                        user.send("Attention ! "+NicknameOut.username+" a un Level de Charm Joker anormal !").then(msg => msg.delete({ timeout: 20000 } ) );
                    });
                    message.channel.send("Hop hop hop ! <@"+message.author.id+">, je crois que <@"+NicknameOut.id+"> essaie de te gruger :triumph:, son Charm Joker est cheaté !").then(msg => msg.delete({ timeout: 30000 })); 
                    return;     
                break;
            }


            if(fetchedShinyCharm<3&&fetchedShinyCharm>=0){
                if(fetchedJoker<priceCharm){
                    message.author.send("Attention ! "+NicknameOut.username+" n'a pas assez de Joker pour cet achat !").then(msg => msg.delete({ timeout: 20000 }));
                    message.channel.send("Hop hop hop ! <@"+message.author.id+">, je crois que <@"+NicknameOut.id+"> essaie de te gruger :triumph:, il·elle n'a pas assez de Joker pour cette achat !").then(msg => msg.delete({ timeout: 30000 }));
                }else{

                    fetchedShinyCharm++;
                    fetchedJoker = fetchedJoker-priceCharm;

                    var CharmLevel1 = ":black_heart:";
                    var CharmLevel2 = ":black_heart:";
                    var CharmLevel3 = ":black_heart:";
                    switch (fetchedShinyCharm){
                        case 0 :
                        newGuess = Math.floor(Math.random() * auth.RangeMax);
                        rangeJoueur = auth.RangeMax;
                        break;
                        case 1 :
                            newGuess = Math.floor(Math.random() * (auth.RangeMax-auth.Stat.Level1Charm));
                            rangeJoueur = (auth.RangeMax-auth.Stat.Level1Charm);
                            CharmLevel1 = ":yellow_heart:";
                        break;
                        case 2 :
                            newGuess = Math.floor(Math.random() * (auth.RangeMax-auth.Stat.Level2Charm));
                            rangeJoueur = (auth.RangeMax-auth.Stat.Level2Charm);
                            CharmLevel1 = ":yellow_heart:";
                            CharmLevel2 = ":orange_heart:";
                        break;
                        case 3 :
                            newGuess = Math.floor(Math.random() * (auth.RangeMax-auth.Stat.Level3Charm));
                            rangeJoueur = (auth.RangeMax-auth.Stat.Level3Charm);
                            CharmLevel1 = ":yellow_heart:";
                            CharmLevel2 = ":orange_heart:";
                            CharmLevel3 = ":heart:";
                        break;
                        default : 
                            CharmLevel1 = ":angry:";
                            CharmLevel2 = ":rage:";
                            CharmLevel3 = ":face_with_symbols_over_mouth:";
                        break;
                    }

                    await Participant.findOneAndUpdate({idDiscord: taggedUser.id}, {joker : fetchedJoker, shinyCharm : (fetchedShinyCharm), valeur: newGuess});

            
                    const attachment = new Discord.MessageAttachment("./Images/Charm.png");

                    const exampleEmbed = new Discord.MessageEmbed()
                    .setColor(colorEmbed)
                    .setTitle("Félicitations à __"+NicknameOut.username+"__")
                    .setAuthor("De la part de **"+message.author.username+"**")
                    .setDescription(`

                    Yeaaaah !! Tu viens de convertir un Joker en Level Up pour ton Charm Joker !
                    Ton Charm Joker est ***PERMANENT*** et a maximum 3 Levels (par joueur).

                    Dorénavant, tes \`\``+prefixGuess+`\`\` se feront entre 0 et `+(rangeJoueur-1)+`.
                    Ta valeur à trouver a aussi été régénérée pour correspondre à ce nouvel interval.
                    Fais-en bon usage !
                        \`\`\`Ton Solde de Joker : `+fetchedJoker+`\`\`\`
                        `)
                        .addFields(
                            { name : `Tentatives du Jour`, value : `restantes => `+(fetchedHowManyGuess-fetchedTodayGuess)+`/`+fetchedHowManyGuess, inline : true},
                            { name : `Charm Joker <:Charm:`+auth.Pap.emoteCharm+`>`, value : CharmLevel1+" "+CharmLevel2+" "+CharmLevel3, inline : true},
                            { name : `La Loupe :mag:`, value : LoupeLevel1+" "+LoupeLevel2+" "+LoupeLevel3, inline : true}
                            )
                    .addFields(
                        { name : "Le Charm Joker est un outils indispensable pour optimiser les ``"+prefixGuess+"``", value : "Pour connaître l'état de ta fiche de participation, tape la commande => ``"+prefixMonStatut+"``", inline : true}
              
                    )
                    .setThumbnail(NicknameOut.avatarURL())
                    .setImage(`attachment://Charm.png`)
                    .setFooter("*Ce message s'auto-détruira dans 30 secondes ;) !*");


                    message.channel.send({files:[attachment], embed: exampleEmbed}).then(msg => msg.delete({ timeout: 30000 }));

                }
            }else{
                message.author.send("Attention ! "+NicknameOut.username+" a déjà le Level max pour son Charm Joker !\rLes Jokers n'ont pas été utilisés, il peut les réclamer pour une autre récompense.").then(msg => msg.delete({ timeout: 20000 }));
                message.channel.send("Hop hop hop ! <@"+message.author.id+">, je crois que <@"+NicknameOut.id+"> a déjà le Level max pour son Charm Joker !").then(msg => msg.delete({ timeout: 30000 }));
            }
        }
    return;
    //fin du prefix charm
    }else if (message.channel.id==auth.Pap.channelTirage&&petitMessage.startsWith(prefixCC)&&!(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){return message.reply(" nop nop tu n'as pas le droit d'utiliser cette commande").then(msg => msg.delete({ timeout: 10000 }));
    }else if (message.channel.id!=auth.Pap.channelTirage&&petitMessage.startsWith(prefixCC)&&(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){return message.reply(" nop nop tu t'es trompé de salon pour utiliser cette commande").then(msg => msg.delete({ timeout: 10000 }));}



    ///////////
    // STAFF //
    /////////////////////////////
    //BLOCK commande LOUPE @tag//
    /////////////////////////////
    if (message.channel.id==auth.Pap.channelTirage&&petitMessage.startsWith(prefixLoupe)&&(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){

        const taggedUser = message.mentions.users.first();

        if (!taggedUser) return message.author.send("Vous n'avez pas saisi de pseudo à chercher.").then(msg => msg.delete({ timeout: 10000 }));
        if (isNaN(taggedUser)) return message.author.send("Le paramètre que vous avez saisi n'est pas un pseudo.").then(msg => msg.delete({ timeout: 10000 }));

        var ficheCollect = await Participant.findOne({idDiscord: taggedUser.id});
        const NicknameOut = await bot.users.fetch(taggedUser.id);

        // si pas de fiche existante, on créé la fiche
        if (!ficheCollect) { 
            return message.author.send("Désolé ! Mais il n'y a pas de fiche de participation pour "+NicknameOut.username+".").then(msg => msg.delete({ timeout: 10000 }));
        }else {

            var fetchedJoker = ficheCollect.joker;
            var fetchedShinyCharm = ficheCollect.shinyCharm;
            var fetchedSpotted = ficheCollect.spotted;
            var fetchedTodayGuess = ficheCollect.todayGuess;
            var fetchedHowManyGuess = ficheCollect.howManyGuess;

            ///////////////////////////////////////////////
            //BLOCK pour étudier le niveau du Bonus Loupe//
            ///////////////////////////////////////////////


            var CharmLevel1 = ":black_heart:";
            var CharmLevel2 = ":black_heart:";
            var CharmLevel3 = ":black_heart:";
            switch (fetchedShinyCharm){
                case 0 :
                break;
                case 1 :
                    CharmLevel1 = ":yellow_heart:";
                break;
                case 2 :
                    CharmLevel1 = ":yellow_heart:";
                    CharmLevel2 = ":orange_heart:";
                break;
                case 3 :
                    CharmLevel1 = ":yellow_heart:";
                    CharmLevel2 = ":orange_heart:";
                    CharmLevel3 = ":heart:";
                break;
                default : 
                    CharmLevel1 = ":angry:";
                    CharmLevel2 = ":rage:";
                    CharmLevel3 = ":face_with_symbols_over_mouth:";
                break;
            }

            switch (fetchedSpotted){
                case 0 :
                    var priceLoupe = 1;
                break;
                case 1 :
                    var priceLoupe = 2;
                break;
                case 2 :
                    var priceLoupe = 3;
                break;
                case 3 :
                    var priceLoupe = false;
                break;
                default : 
                    var priceLoupe = false;

                    bot.users.fetch(auth.doowy).then((user) => {
                        user.send("Attention ! "+NicknameOut.username+" a un Level de Bonus Loupe anormal !").then(msg => msg.delete({ timeout: 20000 } ) );
                    });
                    message.channel.send("Hop hop hop ! <@"+message.author.id+">, je crois que <@"+NicknameOut.id+"> essaie de te gruger :triumph:, son Bonus Loupe est cheaté !").then(msg => msg.delete({ timeout: 30000 })); 
                    return;     
                break;
            }


            if(fetchedSpotted<3&&fetchedSpotted>=0){
                if(fetchedJoker<priceLoupe){
                    message.author.send("Attention ! "+NicknameOut.username+" n'a pas assez de Joker pour cet achat !").then(msg => msg.delete({ timeout: 20000 }));
                    message.channel.send("Hop hop hop ! <@"+message.author.id+">, je crois que <@"+NicknameOut.id+"> essaie de te gruger :triumph:, il·elle n'a pas assez de Joker pour cette achat !").then(msg => msg.delete({ timeout: 30000 }));
                }else{

                    await Participant.findOneAndUpdate({idDiscord: taggedUser.id}, {joker : (fetchedJoker-priceLoupe), spotted : (fetchedSpotted+1)});
                    fetchedSpotted++;
                    fetchedJoker = fetchedJoker-priceLoupe;

                    var LoupeLevel1 = ":black_heart:";
                    var LoupeLevel2 = ":black_heart:";
                    var LoupeLevel3 = ":black_heart:";
                    switch (fetchedSpotted){
                        case 0 :
                        break;
                        case 1 :
                            LoupeLevel1 = ":yellow_heart:";
                        break;
                        case 2 :
                            LoupeLevel1 = ":yellow_heart:";
                            LoupeLevel2 = ":orange_heart:";
                        break;
                        case 3 :
                            LoupeLevel1 = ":yellow_heart:";
                            LoupeLevel2 = ":orange_heart:";
                            LoupeLevel3 = ":heart:";
                        break;
                        default : 
                            LoupeLevel1 = ":angry:";
                            LoupeLevel2 = ":rage:";
                            LoupeLevel3 = ":face_with_symbols_over_mouth:";
                        break;
                    }
            
                    const attachment = new Discord.MessageAttachment("./Images/Loupe.png");

                    const exampleEmbed = new Discord.MessageEmbed()
                    .setColor(colorEmbed)
                    .setTitle("Félicitations à __"+NicknameOut.username+"__")
                    .setAuthor("De la part de **"+message.author.username+"**")
                    .setDescription(`

                    Yeaaaah !! Tu viens de convertir un Joker en Level Up pour ton Bonus Loupe !
                    Ton Bonus Loupe est ***PERMANENT*** et a maximum 3 Levels (par joueur).

                    Dorénavant, tes \`\``+prefixGuess+`\`\` pourront recevoir un indice de la Loupe.
                    Pour connaître les détails de fonctionnement, tape \`\``+prefixMonTuto+`\`\`.
                    Fais-en bon usage !
                        \`\`\`Ton Solde de Joker : `+fetchedJoker+`\`\`\`
                        `)
                        .addFields(
                            { name : `Tentatives du Jour`, value : `restantes => `+(fetchedHowManyGuess-fetchedTodayGuess)+`/`+fetchedHowManyGuess, inline : true},
                            { name : `Charm Joker <:Charm:`+auth.Pap.emoteCharm+`>`, value : CharmLevel1+" "+CharmLevel2+" "+CharmLevel3, inline : true},
                            { name : `La Loupe :mag:`, value : LoupeLevel1+" "+LoupeLevel2+" "+LoupeLevel3, inline : true}
                            )
                    .addFields(
                        { name : "Le Bonus Loupe est un outils indispensable pour optimiser les ``"+prefixGuess+"``", value : "Pour connaître l'état de ta fiche de participation, tape la commande => ``"+prefixMonStatut+"``", inline : true}
              
                    )
                    .setThumbnail(NicknameOut.avatarURL())
                    .setImage(`attachment://Loupe.png`)
                    .setFooter("*Ce message s'auto-détruira dans 30 secondes ;) !*");


                    message.channel.send({files:[attachment], embed: exampleEmbed}).then(msg => msg.delete({ timeout: 30000 }));
                }
            }else{
                message.author.send("Attention ! "+NicknameOut.username+" a déjà le Level max pour son Bonus Loupe !\rLes Jokers n'ont pas été utilisés, il peut les réclamer pour une autre récompense.").then(msg => msg.delete({ timeout: 20000 }));
                message.channel.send("Hop hop hop ! <@"+message.author.id+">, je crois que <@"+NicknameOut.id+"> a déjà le Level max pour son Bonus Loupe !").then(msg => msg.delete({ timeout: 30000 }));
            }
        }
    return;
    //fin du prefix loupe
    }else if (message.channel.id==auth.Pap.channelTirage&&petitMessage.startsWith(prefixLoupe)&&!(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){return message.reply(" nop nop tu n'as pas le droit d'utiliser cette commande").then(msg => msg.delete({ timeout: 10000 }));
    }else if (message.channel.id!=auth.Pap.channelTirage&&petitMessage.startsWith(prefixLoupe)&&(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){return message.reply(" nop nop tu t'es trompé de salon pour utiliser cette commande").then(msg => msg.delete({ timeout: 10000 }));}




    ///////////
    // STAFF //
    ///////////////////////////////////////
    //BLOCK commande GESTION Guess SECRET//
    ///////////////////////////////////////
    if(message.channel.id==auth.Pap.channelAdmin&&petitMessage.startsWith(prefixAdmin)&&(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){

        if(petitMessage.includes(prefixCheck)){


                ////////////////////////////////////////////
                // BLOCK de récupération des GUESS SECRETS//
                ////////////////////////////////////////////
                var ficheEvent = await Event.findOne({name: "DoowyPowaa"});
                // si pas de fiche existante, on créé la fiche
                if (!ficheEvent) {var ficheEvent = await trigger.createEvent(message, 0);}

                var fetchedTriggerTag = ficheEvent.triggerTag;
                var fetchedTriggerCheck = ficheEvent.triggerCheck;

                for (x=0;x<5;x++){
                    if(fetchedTriggerCheck[x]==false){
                        actif[x]="Actif";
                    }else{actif[x]="Inactif";}

                
                }

            message.author.send("Le guess secret n°1 est : ``"+fetchedTriggerTag[0]+"`` ("+actif[0]+")\rLe guess secret n°2 est : ``"+fetchedTriggerTag[1]+"`` ("+actif[1]+")\rLe guess secret n°3 est : ``"+fetchedTriggerTag[2]+"`` ("+actif[2]+")\rLe guess secret n°4 est : ``"+fetchedTriggerTag[3]+"`` ("+actif[3]+")\rLe guess secret n°5 est : ``"+fetchedTriggerTag[4]+"`` ("+actif[4]+")").then(msg => msg.delete({ timeout: 20000 }));

        }else if(petitMessage.includes(prefixSet)){

                ////////////////////////////////////////////
                // BLOCK de récupération des GUESS SECRETS//
                ////////////////////////////////////////////
                var ficheEvent = await Event.findOne({name: "DoowyPowaa"});
                // si pas de fiche existante, on créé la fiche
                if (!ficheEvent) {var ficheEvent = await trigger.createEvent(message, 0);}

                var fetchedTriggerTag = ficheEvent.triggerTag;
                var fetchedTriggerCheck = ficheEvent.triggerCheck;


                argsNumber = petitMessage.split(' ')[2];
                console.log(argsNumber);
                if(argsNumber>5||argsNumber<1){
                    message.author.send("Vous n'avez pas saisie de valeur valide pour le ``set`` des guess secrets ! (valeur entre 1 et 5)").then(msg => msg.delete({ timeout: 20000 }));
                    return;
                }


                for (y=0;y<5;y++){
                    setting[y] = petitMessage.split('admin set '+(y+1)+' ')[1]; 
                    if (setting[y]){
                        fetchedTriggerTag[y]=setting[y].toLowerCase();
                        fetchedTriggerCheck[y]=false;

                        await Event.findOneAndUpdate({name: "DoowyPowaa"}, {triggerTag : fetchedTriggerTag, triggerCheck : fetchedTriggerCheck});

                        message.author.send("Le guess secret n°"+(y+1)+" a été réinitialisé avec : ``"+fetchedTriggerTag[y]+"`` et est désormais Actif !").then(msg => msg.delete({ timeout: 20000 }));

                        console.log(setting[y]);
                    }



                }

        }else{
            message.author.send("Vous n'avez pas saisie de commande pour ``check`` ou ``set`` les guess secrets !").then(msg => msg.delete({ timeout: 20000 }));
            return;
        }
    //fin du prefix GUESS SECRET
    }else if (message.channel.id==auth.Pap.channelAdmin&&petitMessage.startsWith(prefixAdmin)&&!(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){return message.reply(" nop nop tu n'as pas le droit d'utiliser cette commande").then(msg => msg.delete({ timeout: 10000 }));
    }else if (message.channel.id!=auth.Pap.channelAdmin&&petitMessage.startsWith(prefixAdmin)&&(message.author.id==auth.tym||message.member.roles.cache.has(auth.Pap.staff))){return message.reply(" nop nop tu t'es trompé de salon pour utiliser cette commande").then(msg => msg.delete({ timeout: 10000 }));}



//fin du bot.on
});


function Random100(){
    return Math.floor(Math.random() * 100)+1;
}


function Datum(todate){
    var day = todate;

    var nextdate = new Date(day);
    nextdate.setDate(day.getDate() + 1);

    return nextdate;
}

function Datum30(todate){
    var day = todate;

    var nextdate = new Date(day);
    nextdate.setDate(day.getDate() + 30);

    return nextdate;
}

function Datum365(todate){
    var day = todate;

    var nextdate = new Date(day);
    nextdate.setDate(day.getDate() + 365);

    return nextdate;
}




