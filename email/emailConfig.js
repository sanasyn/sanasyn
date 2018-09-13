const googleSecret = require('./client_secret.json');
const googleToken = require('./client_token.json');

module.exports = {
  transportConfig: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'team.1@sanasyn.com',
      clientId: googleSecret.installed.client_id,
      clientSecret: googleSecret.installed.client_secret,
      accessToken: googleToken.access_token,
      refreshToken: googleToken.refresh_token
    }
  }
}