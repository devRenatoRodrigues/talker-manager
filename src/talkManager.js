const fs = require('fs').promises;
const { join } = require('path');

const readTalkManagerFile = async () => {
    const path = 'talker.json';
    try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
    } catch (error) {
    return null;
    }
};

const writeTalkManagerFile = async (talkers) => {
      const data = JSON.stringify(talkers, null, 2);
      await fs.writeFile('src/talker.json', data, 'utf-8');
  };

const getAllTalkers = async () => {
    const talkers = await readTalkManagerFile();
    return talkers;
};

const getTalkerById = async (id) => {
    const talkers = await readTalkManagerFile();
    return talkers.find((talker) => talker.id === id);
};

const postNewTalker = async (body) => {
    const getTalkers = await readTalkManagerFile();
const nextId = getTalkers.length + 1;
const talker = { id: nextId, ...body };
getTalkers.push(talker);
await writeTalkManagerFile(getTalkers);
return talker;
};

const editTalker = async (id, body) => {
    const talkers = await readTalkManagerFile();
   const findTalker = talkers.find((talker) => Number(talker.id) === Number(id));
   if (!findTalker) {
    throw new Error('Pessoa palestrante não encontrada');
   }
    const index = talkers.indexOf(findTalker);
    const updated = { id: Number(id), ...body };
    talkers.splice(index, 1, updated);
    await writeTalkManagerFile(talkers);
    return updated;
};

const deleteTalker = async (id) => {
    const talkers = await readTalkManagerFile();
   const findTalker = talkers.find((talker) => Number(talker.id) === Number(id));
    const index = talkers.indexOf(findTalker);
    talkers.splice(index, 1);
    await writeTalkManagerFile(talkers);
};

module.exports = {
    getAllTalkers,
    getTalkerById,
    postNewTalker,
    editTalker,
    deleteTalker,
};