const fs = require('fs'); // pull in the file system module

const createTeamPage = fs.readFileSync(`${__dirname}/../client/createTeam.html`);
const editTeamPage = fs.readFileSync(`${__dirname}/../client/editTeam.html`);
const viewTeamPage = fs.readFileSync(`${__dirname}/../client/viewTeam.html`);
const viewTeamsListPage = fs.readFileSync(`${__dirname}/../client/viewTeamsList.html`);
const css = fs.readFileSync(`${__dirname}/../client/styles/main.css`);

const getPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(createTeamPage);
  response.end();
};

const getIndex = (request, response) => {
  getPage(request, response, createTeamPage);
};
const getEditTeam = (request, response) => {
  getPage(request, response, editTeamPage);
};
const getViewTeam = (request, response) => {
  getPage(request, response, viewTeamPage);
};
const getViewTeamList = (request, response) => {
  getPage(request, response, viewTeamsListPage);
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

module.exports = {
  getIndex,
  getEditTeam,
  getViewTeam,
  getViewTeamList,
  getCSS,
};