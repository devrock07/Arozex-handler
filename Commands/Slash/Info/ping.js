module.exports = {
  name: "ping",
  description: "Check bot's ping.",
  run: async (client, interaction) => {
    try {
      let days = Math.floor(client.uptime / 86400000);
      let hours = Math.floor(client.uptime / 3600000) % 24;
      let minutes = Math.floor(client.uptime / 60000) % 60;
      let seconds = Math.floor(client.uptime / 1000) % 60;
      let webLatency = new Date() - interaction.createdTimestamp;
      let apiLatency = client.ws.ping;
      let totalLatency = webLatency + apiLatency;
      let emLatency = {
        Green: '🟢',
        Yellow: '🟡',
        Red: '🔴'
      };

      let latencyColor =
        totalLatency < 200 ? 'Green' : totalLatency < 500 ? 'Yellow' : 'Red';

      const embed = {
        color: totalLatency < 200 ? 0x00FF00 : totalLatency < 500 ? 0xFFFF00 : 0xFF0000,
        title: "Returns Latency And API Ping",
        fields: [
          {
            name: `📡 Websocket Latency`,
            value: `${emLatency[latencyColor]} ${webLatency}ms`,
            inline: true
          },
          {
            name: `🛰 API Latency`,
            value: `${emLatency[latencyColor]} ${apiLatency}ms`,
            inline: true
          },
          {
            name: `⏲ Uptime`,
            value: `${days} Days : ${hours} Hrs : ${minutes} Mins : ${seconds} Secs`,
            inline: false
          }
        ]
      };

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  }
};
