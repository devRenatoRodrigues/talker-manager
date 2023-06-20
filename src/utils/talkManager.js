const { readTalkManagerFile, writeTalkManagerFile } = require('./readAndWriteFiles');

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

const getSearch = async (term, rate, date) => {
    const talkers = await readTalkManagerFile();
let searchResult = talkers;

if (term) {
    searchResult = talkers
.filter((talker) => talker.name.toLowerCase().includes(term.toLowerCase()));
}
    if (rate) {
        const rateNumber = Number(rate, 10);
        searchResult = searchResult.filter(({ talk }) => talk.rate === rateNumber);
    }

    if (date) {
        searchResult = searchResult.filter(({ talk }) => talk.watchedAt === date);
      }
    return searchResult;
};

const updateRate = async (id, rate) => {
    const talkers = await readTalkManagerFile();
    const findTalker = talkers.find((talker) => Number(talker.id) === Number(id));
    findTalker.talk.rate = rate;
    await writeTalkManagerFile(talkers);
    return findTalker;
};

module.exports = {
    getAllTalkers,
    getTalkerById,
    postNewTalker,
    editTalker,
    deleteTalker,
    getSearch,
    updateRate,
};