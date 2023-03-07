const teams = {};

// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(object));
    response.end();
};

// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end();
};

// return single team object as JSON
const getTeam = (request, response) => {
 notImplemented(request, response);
}

// return teams object as JSON
const getTeams = (request, response) => {
    respondJSON(request, response, 200, { teams });
};

// function to add a team from a POST body
const addTeam = (request, response, body) => {
    // default json message
    const responseJSON = { message: 'Team name and Pokemon are required.' };

    // Check to make sure we have both fields
    if (!body.name || !body.pokemon) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }

    let responseCode = 222; // default status code to updated

    // If the team doesn't exist yet
    if (!teams[body.name]) {
        // Set the status code to 201 (created) and create an empty team
        responseCode = 201;
        teams[body.name] = {};
    }

    // add or update fields for this team
    teams[body.name].name = body.name;
    teams[body.name].pokemon = body.pokemon;
    teams[body.name].size = body.size;

    // if response is created, then set our created message
    // and sent response with a message
    if (responseCode === 201) {
        responseJSON.message = `Team "${body.name}" Created Successfully`;
    }
    else{
        responseJSON.message = `Team "${body.name}" Updated Successfully`;
    }
    
    return respondJSON(request, response, responseCode, responseJSON);
    
};

const success = (request, response, params) => {
    // message to send
    const responseJSON = {
        status: 'Success',
        message: 'This is a successful response',
    };
    respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response) => {
    const responseJSON = {
        status: 'Not Found',
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };
    respondJSON(request, response, 404, responseJSON);
};

const notImplemented = (request, response) => {
    const responseJSON = {
      status: 'Not Implemented',
      message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
      id: 'notImplemented',
    };  
    respondJSON(request, response, 501, responseJSON);
  };

// public exports
module.exports = {
    getTeam,
    getTeams,
    addTeam,
    success,
    notFound,
    notImplemented
};