const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
    name: "pause",
    description: "Pauses the current Track",
    run: async (client, interaction, args, prefix) => {
        if(!interaction.member.voice.channelId) return interaction.reply({ ephemeral: true, content: "π **Please join a Voice-Channel first!**"});
        // get an old connection
        const oldConnection = getVoiceConnection(interaction.guild.id);
        if(!oldConnection) return interaction.reply({ ephemeral: true, content: "π **I'm not connected somewhere!**"}).catch(() => null);
        if(oldConnection && oldConnection.joinConfig.channelId != interaction.member.voice.channelId) return interaction.reply({ ephemeral: true, content: "π **We are not in the same Voice-Channel**!"}).catch(() => null);
        
        const queue = client.queues.get(interaction.guild.id); // get the queue
        if(!queue) { 
            return interaction.reply({ ephemeral: true, content: `π **Nothing playing right now**`}).catch(() => null);
        }
        // if already paused
        if(queue.paused) return interaction.reply({ ephemeral: true, content: `π **Track already paused**`}).catch(() => null);
        
        queue.paused = true;
        
        // skip the track
        oldConnection.state.subscription.player.pause();
        
        return interaction.reply({ ephemeral: true, content: `βΈοΈ **Successfully paused the Track**`}).catch(() => null);
    },
};