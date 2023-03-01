
const http = require('http'); // pull in the http server module
const url = require('url'); // pull in the url module
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const parseBody = (request, response, handler) => {
    // The request will come in in pieces. We will store those pieces in this
    // body array.
    const body = [];
  
    // The body reassembly process is event driven, much like when we are streaming
    // media like videos, etc. We will set up a few event handlers. This first one
    // is for if there is an error. If there is, write it to the console and send
    // back a 400-Bad Request error to the client.
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });
  
    // The second possible event is the "data" event. This gets fired when we
    // get a piece (or "chunk") of the body. Each time we do, we will put it in
    // the array. We will always recieve these chunks in the correct order.
    request.on('data', (chunk) => {
      body.push(chunk);
    });
  
    // The final event is when the request is finished sending and we have recieved
    // all of the information. When the request "ends", we can proceed. Turn the body
    // array into a single entity using Buffer.concat, then turn that into a string.
    // With that string, we can use the querystring library to turn it into an object
    // stored in bodyParams. We can do this because we know that the client sends
    // us data in X-WWW-FORM-URLENCODED format. If it was in JSON we could use JSON.parse.
    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = JSON.parse(bodyString);
  
      // Once we have the bodyParams object, we will call the handler function. We then
      // proceed much like we would with a GET request.
      handler(request, response, bodyParams);
    });
  };

const handlePost = (request, response, parsedUrl) => {
    if (parsedUrl.pathname === '/addTeam') {
      parseBody(request, response, jsonHandler.addTeam);
    }
  };
  
  // handle GET requests
  const handleGet = (request, response, parsedUrl) => {
    // route to correct method based on url
    if (parsedUrl.pathname === '/styles/main.css') {
      htmlHandler.getCSS(request, response);
    } else if (parsedUrl.pathname === '/getTeams') {
      jsonHandler.getTeams(request, response);
    } else if (parsedUrl.pathname === '/getTeam') {
      jsonHandler.getTeam(request, response);
    } else if (parsedUrl.pathname === '/data/pokemon-basic-data.json') {
      responseHandler.getBasicData(request, response);
    } else if (parsedUrl.pathname === '/') {
      htmlHandler.getIndex(request, response);
    } else {
      jsonHandler.notFound(request, response);
    }
  };

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
  
    // check if method was POST, otherwise assume GET
    if (request.method === 'POST') {
      handlePost(request, response, parsedUrl);
    } else {
      handleGet(request, response, parsedUrl);
    }
  };

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
  });