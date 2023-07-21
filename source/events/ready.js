const { version } = require('discord.js');
const AsciiTable = require('ascii-table');
const table = new AsciiTable();
table.setBorder('║', '═', '🌟', '🌟'); // Using stars as border characters
table.setTitle(' Bot is online! op 🚀');

module.exports = {
  async execute(client) {
    client.on('ready', () => {
      const activities = [
        { name: `${client.guilds.cache.size} Servers`, type: 'LISTENING' },
        { name: `${client.channels.cache.size} Channels`, type: 'PLAYING' },
        { name: `${client.users.cache.size} Users`, type: 'WATCHING' },
        { name: `Handler From Arozex Development`, type: 'COMPETING' },
      ];

      const status = ['online', 'dnd', 'idle'];
      let i = 0;
      setInterval(() => {
        if (i >= activities.length) i = 0;
        client.user.setActivity(activities[i].name, { type: activities[i].type });
        i++;
      }, 5000);

      let s = 0;
      setInterval(() => {
        if (s >= status.length) s = 0;
        client.user.setStatus(status[s]);
        s++;
      }, 30000);

      setTimeout(() => {
        console.log(`Logged in as ${client.user.tag} 🌟`);
      }, 2000);

      // Rows
      table
        .addRow('Bot', client.user.tag)
        .addRow('Guilds', `${client.guilds.cache.size} Server(s)`)
        .addRow('Members', `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Members`)
        .addRow('Commands', `${client.slashCommands.size} (Slash)`)
        .addRow('Discord.js', version)
        .addRow('Node.js', process.version)
        .addRow('Memory (Used / Total)', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`);

      console.log(table.toString());
    });
  },
};
