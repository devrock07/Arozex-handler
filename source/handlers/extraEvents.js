// Function to create a heart-shaped console header
function createConsoleHeader(messages) {
  const maxLength = messages.reduce((max, message) => Math.max(max, message.length), 0);
  const horizontalLine = '━'.repeat(maxLength + 8);
  const heartSymbol = '♥';

  const header = [horizontalLine];

  for (const message of messages) {
    const paddingLength = maxLength - message.length;
    const padding = ' '.repeat(paddingLength / 2);
    const extraPadding = ' '.repeat(paddingLength % 2 === 0 ? 0 : 1);

    header.push(`┃ ${heartSymbol} ${padding}${message}${padding}${extraPadding} ${heartSymbol} ┃`);
  }

  header.push(horizontalLine);

  return header.join('\n');
}

module.exports = {
  async execute(client) {
    const devrock = 'Arozex Handler';
    const zenithsenpai = 'Support: https://discord.gg/QCYyGaWK5W';
    const op = 'Coded By Devrock';
    const headerBox = createConsoleHeader([devrock, zenithsenpai, op]);

    console.clear();
    console.log(headerBox);

    // Define client.logger
    client.logger = (data) => {
      const currentdate = new Date();
      const logstring = ` ${`${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`} │`;

      if (typeof data === 'string') {
        console.log(logstring, data.split('\n').map((d) => d).join(`\n${logstring} `));
      } else if (typeof data === 'object') {
        console.log(logstring, JSON.stringify(data, null, 3));
      } else if (typeof data === 'boolean') {
        console.log(logstring, String(data));
      } else {
        console.log(logstring, data);
      }
    };

    // Load Events and Modules
  },
};
