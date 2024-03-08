// api/today-match-rate.js
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

        // Make a request to the AdMob API to get yesterday's match rate
        const admob = google.admob({
            version: 'v1',
            auth: client
        });

        // Calculate yesterday's date
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // Make the API request to fetch the match rate data for yesterday
        const response = await admob.accounts.networkReport.generate({
            parent: 'accounts/pub-4178615560355204',
            requestBody: {
                reportSpec: {
                    dateRange: {
                        startDate: {
                            day: yesterday.getDate(),
                            month: yesterday.getMonth() + 1,
                            year: yesterday.getFullYear()
                        },
                        endDate: {
                            day: yesterday.getDate(),
                            month: yesterday.getMonth() + 1,
                            year: yesterday.getFullYear()
                        }
                    }
                }
            }
        });

        // Extract and return the match rate from the response
        const matchRate = response.data.matchRate;

        res.status(200).json({ matchRate });
    } catch (error) {
        console.error('Error retrieving match rate from AdMob API:', error);
        res.status(500).json({ error: 'An error occurred while retrieving match rate from AdMob API' });
    }
};
