const fs = require('fs');

module.exports = {
  async execute(client) {
    // Load Events
    const eventFiles = fs.readdirSync(`${process.cwd()}/source/events/`).filter((file) => file.endsWith('.js'));
    for (const event of eventFiles) {
      const eventHandler = require(`${process.cwd()}/source/events/${event}`);
      if (eventHandler && typeof eventHandler.execute === 'function') {
        eventHandler.execute(client);
      }
    }

    // Log loaded Events using console.table
    console.log('Loaded Events:');
    console.table(eventFiles);

    // Load Modules
    const moduleFiles = fs.readdirSync(`${process.cwd()}/source/modules/`).filter((file) => file.endsWith('.js'));
    for (const module of moduleFiles) {
      const moduleHandler = require(`${process.cwd()}/source/modules/${module}`);
      if (moduleHandler && typeof moduleHandler.execute === 'function') {
        moduleHandler.execute(client);
      }
    }

    // Log loaded Modules using console.table
    console.log('Loaded Modules:');
    console.table(moduleFiles.map(file => ({ Values: file.replace('.js', '') })));
  },
};
