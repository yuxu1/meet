'use strict';

const { google } = require('googleapis');
const calendar = google.calendar('v3');

//set access levels - "read-only access" defined in Google console
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events.public.readonly',
];
//refer to values in config.json file
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ['https://yuxu1.github.io/meet/'];

//creates and stores an instance of the google.auth.OAuth2 method accepting 3 parameters
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

//generate an authentication URL from Google API
module.exports.getAuthURL = async () => {
  //use instance stored in oAuth2Client
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  //decode authorization code extracted from the URL query
  const code = decodeURIComponent (`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    //Exchange authorization code for access token with a “callback” after the exchange
    oAuth2Client.getToken(code, (error, response) => {
      if(error) {
        return reject(error);
      }
      return resolve(response);
    });
  }).then ((results) => {
    //response with OAuth token
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(results),
    };
  }).catch((error) => {
    //handle error
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  });
};

module.exports.getCalendarEvents = async (event) => {
  //extract access token from path parameters & set it as credentials in oAuth2Client
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    //get list of events from Google calendar (set by CALENDAR_ID) using oAuth2Client for authentication
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  }).then((results) => {
    //return the events when promise is resolved
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({events: results.data.items}),
    };
  }).catch((error) => {
    //handle errors
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  });
};