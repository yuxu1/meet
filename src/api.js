/* eslint-disable no-useless-concat */
import mockData from './mock-data';

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

//takes accessToken found and checks if it is a valid token
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

//function that removes the code from the URL once we're done with it (cleaner looking URL)
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

//function to fetch the list of all events
export const getEvents = async () => {
  //return mock data if using localhost (otherwise use real API)
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  }

  const token = await getAccessToken();
  //if token is found, make GET request to Google Calender API using Lambda functions-getCalendarEvents endpoint
  if (token) {
    removeQuery();
    const url =  'https://co1ntr87cj.execute-api.us-west-1.amazonaws.com/dev/api/get-events' + '/' + token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      return result.events;
    } else return null; 
  }
};

export const getAccessToken = async () => {
  //try to retrieve access token
  const accessToken = localStorage.getItem('access_token');
  //checks whether an access token was found
  const tokenCheck = accessToken && (await checkToken(accessToken));

  //if no token found, check for an authorization code
  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    //if no authorization code found, redirect user to Google Authorization screen to sign in and receive a code (using Lambda function-getAuthURL endpoint)
    if (!code) {
      const response = await fetch(
        'https://co1ntr87cj.execute-api.us-west-1.amazonaws.com/dev/api/get-auth-url'
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

//function to fetch new token after user authenticates with Google and retrieves a code
const getToken = async (code) => {
  //encodes the code
  const encodeCode = encodeURIComponent(code);
  //use encoded code in request (use Lambda function- getAccessToken endpoint)
  const response = await fetch(
    'https://co1ntr87cj.execute-api.us-west-1.amazonaws.com/dev/api/token' + '/' + encodeCode
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};