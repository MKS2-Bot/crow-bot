const Discord= require('discord.js')
const db = require('quick.db')
function sleep(ms) {
return new Promise((resolve) => {
  setTimeout(resolve, ms)})}
  const ms = require('ms')

module.exports = {
name: 'public',
aliases: [],
run: async (client, message, args) => {
let prefix =  db.get(` ${process.env.owner}.prefix`)
if(prefix === null) prefix = process.env.prefix;
  let color = db.get(`${process.env.owner}.color`) 
   if(color === null  ) color = process.env.color
   var guild = message.guild
        if(!guild.me.hasPermission("ADMINISTRATOR")){
return;
        }
if(process.env.owner ===message.author.id   || db.get(`ownermd.${message.author.id}`) === true || db.get(`${message.guild.id}.${message.author.id}.wlmd`) === true ) {
if(args[0] === "on") {
  if(db.get(`public_${message.guild.id}`) === true) return message.channel.send(`Les commandes publiques sont déjà activées`)
      db.set(`public_${message.guild.id}`, true)
    message.channel.send(`Les commandes publiques sont maintenant activées`)
}  else if(args[0] === "off") {
    if(db.get(`public_${message.guild.id}`) === null) return message.channel.send(`Les commandes publiques sont déjà désactivées`)
    db.set(`public_${message.guild.id}`, null)
    message.channel.send(`Les commandes publiques sont maintenant désactivées`)
}



} else {

}

}
}