const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'modlog',
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
 
            let ss = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(args[0] === "on") {
            const channel = message.channel

            db.set(`${message.guild.id}.logmod`, channel.id)
            db.set(`uu_${message.guild.id}`,channel.id)
            message.channel.send(`Le salon ${channel} sera maintenant utilisé pour envoyer les Logs de modérations`)
        }

        else if(args[0] === "off") {
            db.set(`${message.guild.id}.logmod`,null)
            db.set(`uu_${message.guild.id}`,null)
            message.channel.send(`Logs de modérations désactivés`)
            
        } else 
             if(ss) {
            db.set(`${message.guild.id}.logmod`, ss.id)
            db.set(`uu_${message.guild.id}`,ss.id)
            message.channel.send(`Le salon ${ss} sera maintenant utilisé pour envoyer les Logs de modérations`)
        }

        } else {

        }
    }
}