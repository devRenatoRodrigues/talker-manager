const fs = require('fs').promises;

const readTalkManagerFile = async () => {
    try {
    const contentFile = await fs.readFile('./src/talker.json', 'utf-8');
    return JSON.parse(contentFile);
    } catch (error) {
    return null;
    }
};

const writeTalkManagerFile = async (talkers) => {
    try { 
    const data = JSON.stringify(talkers, null, 2);
      await fs.writeFile('src/talker.json', data, 'utf-8');
    } catch (error) {
        return null;
    }
  };

  module.exports = { readTalkManagerFile, writeTalkManagerFile };