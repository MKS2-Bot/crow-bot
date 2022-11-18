const Discord = require("discord.js")
const {MessageEmbed} = require("discord.js")

const db = require("quick.db")
const ms = require("ms"), 
cooldown = {}

module.exports = {
    name: 'mute',
    aliases: ["m"],
    run: async (client, message, args) => {
let prefix =  db.get(` ${process.env.owner}.prefix`)
if(prefix === null) prefix = process.env.prefix;
  let color = db.get(`${process.env.owner}.color`) 
   if(color === null  ) color = process.env.color
        function mutetime(user, time, authorcooldown, muterole) {
            user.roles.add(muterole.id).then(r => {
                authorcooldown.limit++
                setTimeout(() => {
                    user.roles.remove(muterole.id)
                    db.set(`mute_${message.guild.id}_${user.id}`, null)
                }, time);
                setTimeout(() => {
                    authorcooldown.limit = authorcooldown.limit - 1
                    }, 120000);
                })
        };
        
        function mute(user, authorcooldown, muterole) {
            db.set(`mute_${message.guild.id}_${user.id}`, true)
            user.roles.add(muterole.id).then(r => {
                authorcooldown.limit++
                setTimeout(() => {
                    authorcooldown.limit = authorcooldown.limit - 1
                    }, 120000);
                })
        };
 
        var guild = message.guild
        if(!guild.me.hasPermission("ADMINISTRATOR")){
return;
        }
        if(process.env.owner ===message.author.id   || db.get(`ownermd.${message.author.id}`) === true || db.get(`${message.guild.id}.${message.author.id}.wlmd`) === true ) {
            if(args[0]) {
            let chx = db.get(`${message.guild.id}.logmod`);
            const logsmod = message.guild.channels.cache.get(chx)
        
                let Muted = await db.fetch(`mRole_${message.guild.id}`);
                let muterole = await message.guild.roles.cache.get(Muted) || message.guild.roles.cache.find(role => role.name === `muet`) || message.guild.roles.cache.find(role => role.name === `Muted`) || message.guild.roles.cache.find(role => role.name === `Mute`)
            
               
                var user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
                if(!user) return  message.channel.send(`Aucun membre trouvée pour: \`${args[0]}\``)
                if(db.get(`mute_${message.guild.id}_${user.id}`) === true)  return message.channel.send(`<@${user.id}> est déjà mute`);
            
                if (user.id === message.author.id) {
                    return message.channel.send(`Vous n'avez pas la permission de **mute** <@${user.id}>`);
                  }
                  if(user.roles.highest.position > client.user.id) return message.channel.send(`Je n'ai pas les permissions nécessaires pour **mute** <@${user.id}>`);
                  if( db.get(`ownermd.${message.author.id}`) === true) return message.channel.send(`Vous n'avez pas la permission de **mute** <@${user.id}>`);
                  if(process.env.owner === user.id) return message.channel.send(`Vous n'avez pas la permission de **mute** <@${user.id}>`);
                if(!cooldown[cooldown]) cooldown[message.author.id] = { limit: 0 }
                var authorcooldown = cooldown[message.author.id]
            
                if(authorcooldown.limit >= 5) return message.channel.send(`Vous avez atteint votre limite de **mute**, veuillez retenter plus tard!`);
                if(!muterole) {
                    message.channel.send("Création d'un rôle muet...")
                    muterole = await message.guild.roles.create({
                        data: {
                             name: 'muet',
                            permissions: 0
                        }
                    }, "Muterole")
                    message.guild.channels.cache.forEach(channel => channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        CONNECT: false,
                        ADD_REACTIONS: false
                    }, "Muterole"))
                    db.set(`mRole_${message.guild.id}`, `${muterole.id}`)
              
                
                }
       
            
                if(args[1]) {
                var time = ms(args[1])
                if(time) {
                    var reason = args.slice(2).join(" ")
                    if(reason) { 
                    message.channel.send(`${user} a été **mute ${args[1]}** pour \`${reason}\``);
                    user.send(`Vous avez été **mute ${args[1]}** de ${message.guild.name} pour \`${reason}\``)
                    mutetime(user, time, authorcooldown, muterole)
                    if(logsmod) logsmod.send(
                        new Discord.MessageEmbed()
                  .setColor(color)
               .setDescription(`${message.author} a **mute ${args[1]}** ${user} pour \`${reason}\``)  
               
                        
                    )             } else {
                        message.channel.send(`${user} a été **mute ${args[1]}**`);
                        user.send(`Vous avez été **mute ${args[1]}** de ${message.guild.name}`)
                        mutetime(user, time, authorcooldown, muterole)
                    if(logsmod) logsmod.send(
                        new Discord.MessageEmbed()
                  .setColor(color)
               .setDescription(`${message.author} a **mute ${args[1]}** ${user}`)  
               
                        
                    )             }
                    
                    // -- 
                    } else {
                    
                    var reason = args.slice(1).join(" ")
                    if(reason) { 
                        message.channel.send(`${user} a été **mute** pour \`${reason}\``);
                        user.send(`Vous avez été **mute** de ${message.guild.name} pour \`${reason}\``)
                        mute(user, authorcooldown, muterole)
                    if(logsmod) logsmod.send(
                        new Discord.MessageEmbed()
                  .setColor(color)
               .setDescription(`${message.author} a **mute** ${user} pour \`${reason}\``)  
               
                        
                    )            } else {
                        message.channel.send(`${user} a été **mute**`)
                        user.send(`Vous avez été **mute** de ${message.guild.name}`)
                    
                        mute(user, authorcooldown, muterole)
                    if(logsmod) logsmod.send(
                        new Discord.MessageEmbed()
                  .setColor(color)
               .setDescription(`${message.author} a **mute** ${user}`)  
               
                        
                    )            }
                    }
                    } else {
                        message.channel.send(`${user} a été **mute**`);
                        user.send(`Vous avez été **mute** de ${message.guild.name}`)
                        mute(user, authorcooldown, muterole)
                    if(logsmod) logsmod.send(
                        new Discord.MessageEmbed()
                  .setColor(color)
               .setDescription(`${message.author} a **mute** ${user}`)  
               
                        
                    )}
                    } else{}
                
} else {

}

    }
}