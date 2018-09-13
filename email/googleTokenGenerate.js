// Warning! Creating a new token will invalidate old tokens for the same client secret.
// Source: https://developers.google.com/sheets/api/quickstart/nodejs
const readline = require('readline');
const {OAuth2Client} = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// Scopes determine the APIs that your token can be used for.
const SCOPES = [
  "https://mail.google.com/", //gmail
];

//Client Secret json is generated from Google Developer Console
const credentials = require('./client_secret.json');
const clientSecret = credentials.installed.client_secret;
const clientId = credentials.installed.client_id;
const redirectUrl = credentials.installed.redirect_uris[0];
// let auth = new googleAuth();
let oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

//Client Secret token is printed in console logs
let authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES
});
console.log('Authorize this app by visiting this url: ', authUrl);
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('Enter the code from that page here: ', function(code) {
  rl.close();
  oauth2Client.getToken(code, function(err, token) {
    if (err) {
      console.log('Error while trying to retrieve access token', err);
      return;
    }
    console.log("token: ", JSON.stringify(token, null, '  '));
  });
});