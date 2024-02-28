const { google } = require('googleapis');

// Google Sheets API credentials
const credentials = {
  // Your service account credentials here
  "type": "service_account",
  "project_id": "greekstream-64593",
  "private_key_id": "3b38c0a44bfe91a64174a04746a54045ca065a18",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDLSwtgmT8irOYX\nw4FTJcVLY/J9rMaL60O01vt3HM/lBgIFDN+YL7T/dbeDRsFCN6TxzRKYN0z3afyt\nFzoDVTI7S0thitn/0+2Ta3nbmaCaC8whIk4ur+pl2Pha0D2XD4epYdUdQldkQKKN\ncljdyxuo4LjRw2bc5IYiddfYU6mSq70gLVJmW/QoMk4g6l3jUfQFa8FqPLmQ5jyK\nX/EWxoAtrnWyZyan2S+vmiweZE8ktDeYKcQ4I+U6x4ZqPt+2XASdwMlz+rsSjurO\ncYt4EntdmgnJP3Spmi35byhF0/Tz/kU5jrBt2gR8A0NtvhNSgILoI3g4tatX7jyN\nJARkGi/FAgMBAAECggEANlhD3NlqqsrcoaqmVkNpGAvKZbU7yGimi1/TDlb57mfq\nP05fMXBDau0dly7hd+GnKuqe12klHpjLLrxgSkbKrFYm+xbiywRs5LVc+Ir7h2Ky\n+YKRsuJc/0f+sEwtwsWohuu7zFwRP6AVtElGn1ft93nHfm/FfjRq9ShagJ5w3N+p\nGZpY8uhEtzkNK3YScLPWt9jaGraYmC6FjqXx4OL3rA+fRyMA+uiE0roVTQmUob8h\n5FPFH4iIi9TwjuiFfj1pLaenUSwOr3RLdyGEktiKvPP7BWIcpiZKLIFb0//X3EZW\ndc4j7PhfBMZeeeHmS5SmTfrjbLzbqF/+copKsuplGwKBgQDtN8xU9zERBYuI0Zvb\nJZkrvUwubWM6TpLCEISS8k8arc9UxEQ2tnG0fzPxLiXeR1qd4FYKNJWNtkLo9GKO\nUhVLuhKU8zYbSMsZLzQjU2goaXlz7izcjOhVLxgLaq9JlRKlAUYsv/R7VDCp4TYY\nLjRIjq2m5o98UKlXMiHyq8kXiwKBgQDbY56jcrNVwvddy9CAyU4mfASSRU8bX2re\nhD0o/ENPZAQqdCJlGSoOGPDQEdi6xNHFGGH4fdnuGWj/3JzyJR2069Jt6s+wEOmV\n4XpFdKTdeIxHQD0m6gcKABG2zk3Ie+plHk0XiheY/j66IXRCVygZyLkBoJVzVIPI\nUgSdlfY/7wKBgBilWHRnblCfa9zeMjw1jtFtjHGyacHQEg1Zm/yMck2KS2U6MwAg\nOnYPVT00lzid3ztR6H6M8hDUI+WCJo801gOVJIMXNcLl8DwAnIEjFEpGkxjJYR3V\nAfp/txbQkb+qXlKIbFsP4n3BxICR5oXinwn+0OnrQHMhCkcF7WMCGBV7AoGABiEf\nYoOm3QOIc7dpCOAW7d5TJl8HWcVtr+/T4ZxCqSorL6B1AYwVb7VkrPuCqZ0sGyyW\nOCIT/6H4HAXm4KEG1nIsO+Puj4W5cPWOu/gJTyK6EJeL3dV2AuKDnC7hX3OO1epl\nzv2NsTmRORQMMnpK5YWFHbWF12YKFIOuG1UAP0MCgYBFvGf2P2ydC3o/8KRrCMeK\nGQyncEJMZdZ1m1mNjGAlE3qlJqa2C5bn8+NSm/NyPurEXp+dhJmnsdoqWbRcqoB/\na9Awwqryxak5sehnofRtdBdCTtYcJaRltuyWer5UTcutCv+RaiSUs+7W+2UgLR74\nHqUTRkdriR7/WSOr6OnMBA==\n-----END PRIVATE KEY-----\n",
  "client_email": "movieflixuser@greekstream-64593.iam.gserviceaccount.com",
  "client_id": "108018624048135953589",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/movieflixuser%40greekstream-64593.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Initialize Google Sheets API
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

const sheets = google.sheets({ version: 'v4', auth });

module.exports = async (req, res) => {

  try {

    // Get today's date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month
    const day = String(currentDate.getDate()).padStart(2, '0');

    const now = `${year}-${month}-${day}`;

    const hours = String((currentDate.getHours() + 2) % 24).padStart(2, '0');

    const hour = `${hours}:00`;

    // Range for fetching data from the "Current" sheet
    const currentSheetRange = `Current!A1:G26`;
    // Range for fetching data from the "Max" sheet
    const maxSheetRange = `Max!A1:G26`;

    // Fetch data from the "Current" sheet
    const currentResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: '12hGUObElwnEKCy616HvBtWfysf_j6o74QemUnZwihPI', // Specify your spreadsheet ID
      range: currentSheetRange,
    });

    const currentValues = currentResponse.data.values;

    // Fetch data from the "Max" sheet
    const maxResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: '12hGUObElwnEKCy616HvBtWfysf_j6o74QemUnZwihPI', // Specify your spreadsheet ID
      range: maxSheetRange,
    });

    const rows = maxResponse.data.values;

    let indexMax = -1;

    if (rows) {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i][0] === hour) {
          // Found the row with the specific value in the specified column
          indexMax = i;// Return the row number (adding 1 because row indices are 0-based)
        }
      }
    }

    const maxValues = maxResponse.data.values;

    // Initialize an object to store max total ad requests for each ad type
    const maxCurrentAdRequestsDaily = {
      Banner: 0,
      Interstitial: 0,
      Rewarded: 0,
      InterstitialRewarded: 0,
      AppOpen: 0,
    };

    maxCurrentAdRequestsDaily.Banner = parseInt(maxTotalAdRequestsResponse.data.values[25][1]) || 0;
    maxCurrentAdRequestsDaily.Interstitial = parseInt(maxTotalAdRequestsResponse.data.values[25][1]) || 0;
    maxCurrentAdRequestsDaily.Rewarded = parseInt(maxTotalAdRequestsResponse.data.values[25][1]) || 0;
    maxCurrentAdRequestsDaily.InterstitialRewarded = parseInt(maxTotalAdRequestsResponse.data.values[25][1]) || 0;
    maxCurrentAdRequestsDaily.AppOpen = parseInt(maxTotalAdRequestsResponse.data.values[25][1]) || 0;

    // Initialize an object to store max total ad requests for each ad type
    const maxTotalAdRequestsHourly = parseInt(maxTotalAdRequestsResponse.data.values[indexMax][6]) || 0;

    const maxTotalAdRequestsDaily = parseInt(maxTotalAdRequestsResponse.data.values[25][6]) || 0;

    // Initialize an object to store current total ad requests for each ad type
    const currentTotalAdRequests = {
      Banner: 0,
      Interstitial: 0,
      Rewarded: 0,
      InterstitialRewarded: 0,
      AppOpen: 0,
    };

    // Iterate over the rows to sum up the values for each ad type in the "Current" sheet
    if (currentValues) {
      for (let i = 1; i < currentValues.length; i++) {
        const row = currentValues[i];
        currentTotalAdRequests.Banner += parseInt(row[2]) || 0;
        currentTotalAdRequests.Interstitial += parseInt(row[3]) || 0;
        currentTotalAdRequests.Rewarded += parseInt(row[4]) || 0;
        currentTotalAdRequests.InterstitialRewarded += parseInt(row[5]) || 0;
        currentTotalAdRequests.AppOpen += parseInt(row[6]) || 0;
      }
    }

    // Combine max total ad requests and current total ad requests into a single response object
    const response = {
      maxTotalAdRequests,
      currentTotalAdRequests,
      maxTotalAdRequestsDaily
    };

    // Send the response
    res.status(200).json(response, maxTotalAdRequestsDaily, maxTotalAdRequestsHourly);

  } catch (error) {

    // Handle errors

    console.error('Error:', error);

    res.status(500).json({ error: 'Internal Server Error' });

  }

};
