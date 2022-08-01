module.exports = (client) => {
    console.log(`${client.getTime()} :: Logged in as ${client.user.tag}!`);
    client.user.setActivity(`/help to see my commands`, {type: "PLAYING"})
    setInterval(() => {
        client.user.setActivity(`Music For ${client.users.cache.size} Members`, {type: "PLAYING"})
    }, 500_00)
}