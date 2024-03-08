const { google } = require('googleapis');

// Service account credentials
const serviceAccountCredentials = {
    client_email: 'admob-416@red-league-416615.iam.gserviceaccount.com',
    private_key: '6f81a2fa7d6f33d9dcf61bbc3a755f8b23c0d62e'
};

// Authenticate using service account credentials
const auth = new google.auth.GoogleAuth({
    credentials: serviceAccountCredentials,
    scopes: ['https://www.googleapis.com/auth/admob.readonly']
});

module.exports = async (req, res) => {
    try {
        // Create a client using the authenticated credentials
        const client = await auth.getClient();

        // Create AdMob API client
        const admob = google.admob({
            version: 'v1',
            auth: client
        });

        // Make the API request to fetch the match rate data
        const response = await admob.accounts.mediationReport.generate({
            parent: 'accounts/pub-417861556035520',
            requestBody: {
                reportSpec: {
                    dateRange: {
                        startDate: { year: 2024, month: 3, day: 7 },
                        endDate: { year: 2024, month: 3, day: 7 }
                    },
                    dimensions: ['DATE'],
                    metrics: ['MATCH_RATE']
                }
            }
        });

        // Extract and return the match rate from the response
        const matchRate = response.data;

        res.status(200).json({ matchRate });
    } catch (error) {
        console.error('Error retrieving match rate from AdMob API:', error);
        res.status(500).json({ error: 'An error occurred while retrieving match rate from AdMob API' });
    }
};
