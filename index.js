/////////////////////////////////////////////////////
// VARIABLES
/////////////////////////////////////////////////////

const Discord = require("discord.js");
const client = new Discord.Client();
const configs = require("./configs.json");
const fivereborn = require("fivereborn-query");
client.config = configs;

/////////////////////////////////////////////////////
// START THE BOT
/////////////////////////////////////////////////////

client.login(configs.token).then(
  () => {
    console.log("Bot startet!");
    console.log("Receiving information, please wait...");
  },
  () => {
    client.destroy();
    console.log("Bot destroyed!");
  }
);

/////////////////////////////////////////////////////
// DİSCORD BOT
/////////////////////////////////////////////////////

client.on("message", msg => {
  var dm = client.channels.get("652604373527953419"); //mesajın geleceği kanal idsi//
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;
    const botdm = new Discord.RichEmbed()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("BLUE")
      .setThumbnail(`${msg.author.avatarURL}`)
      .addField(":boy: Gönderen ", msg.author.tag)
      .addField(":id:  Gönderen ID :", msg.author.id)
      .addField(":globe_with_meridians: Gönderilen Mesaj", msg.content);

    dm.send(botdm);
  }
  if (msg.channel.bot) return;
});
/////////////////////////////////////////////////////
// FUNCTIONS
/////////////////////////////////////////////////////

function activity() {
  setTimeout(() => {
    fivereborn.query(
      configs.serverInfo[0],
      configs.serverInfo[1],
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          client.user.setActivity(
            " Aktif Oyuncu: " + data.clients + "/" + data.maxclients,
            { type: configs.activityType }
          );
        }
      }
    );
    activity();
  }, 10000);
}
activity();
