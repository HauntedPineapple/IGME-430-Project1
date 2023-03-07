const fs = require('fs'); // pull in the file system module

const basicDataJSON = fs.readFileSync(`${__dirname}/../client/data/pokemon-basic-data.json`);

const getBasicData = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(basicDataJSON);
  response.end();
};

const getTestTeamData = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(fs.readFileSync(`${__dirname}/../client/data/testTeamData.json`));
  response.end();
};

module.exports = {
  getBasicData,
  getTestTeamData,
};
