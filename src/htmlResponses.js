const fs = require('fs'); // pull in the file system module

const createTeamPage = fs.readFileSync(`${__dirname}/../client/createTeam.html`);
const editTeamPage = fs.readFileSync(`${__dirname}/../client/editTeam.html`);
const viewTeamPage = fs.readFileSync(`${__dirname}/../client/viewTeam.html`);
const viewTeamsListPage = fs.readFileSync(`${__dirname}/../client/viewTeamsList.html`);
const css = fs.readFileSync(`${__dirname}/../client/styles/main.css`);
const favicon16 = fs.readFileSync(`${__dirname}/../client/assets/favicon-16x16.png`);
const favicon32 = fs.readFileSync(`${__dirname}/../client/assets/favicon-32x32.png`);
// href="./assets/favicon-16x16.png"
// href="./assets/favicon-32x32.png"

const getPNG = (request, response, filepath) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(filepath);
  response.end();
};

const getFavicon16 = (request, response) => {
  getPNG(request, response, favicon16);
};

const getFavicon32 = (request, response) => {
  getPNG(request, response, favicon32);
};

const getPage = (request, response, filepath) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(filepath);
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
  getFavicon16,
  getFavicon32,
  getIndex,
  getEditTeam,
  getViewTeam,
  getViewTeamList,
  getCSS,
};
