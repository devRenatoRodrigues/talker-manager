const connection = require('../db/connection');

const getAll = async () => {
    const [result] = await connection.execute(
        'SELECT * FROM TalkerDB.talkers;',
      );
      console.log(result[0]);
      const formatResult = result.map((talker) => ({
        name: talker.name,
        age: talker.age,
        id: talker.id,
        talk: {
            watchedAt: talker.talk_watched_at,
            rate: talker.talk_rate,
        },
      }));
      return formatResult;
};

module.exports = {
    getAll,
};