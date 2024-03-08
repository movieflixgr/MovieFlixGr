const { google } = require('googleapis');
const express = require('express');
const app = express();

// Set up OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URI'
);

// Generate consent page URL
const consentUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/admob.readonly'
});

// Redirect user to consent page
app.get('/auth', (req, res) => {
  res.redirect(consentUrl);
});

// Handle redirect after user grants consent
app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { tokens } = await oauth2Client.getToken(code);
    const accessToken = tokens.access_token;

    // Use access token to make API requests
    // Call function to get today's match rate or perform other API requests

    res.send(`Access token: ${accessToken}`);
  } catch (error) {
    res.status(500).send('Error getting access token');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
