const { google } = require('googleapis');

// Load OAuth2 client ID and client secret
const CLIENT_ID = '788811153358-nfjsvo557nki42nmm8kbeenqfpu6c82e.apps.googleusercontent.com';
const CLIENT_SECRET = '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';

// Set up OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET
);

// Set up AdMob API client
const admob = google.admob({
    version: 'v1',
    auth: oauth2Client
});

async function getAdMobMatchRate() {
    try {
        // Get today's date in 'YYYY-MM-DD' format
        const today = new Date().toISOString().split('T')[0];
        
        // Make API request to get mediation report for today
        const response = await admob.accounts.mediationReport.generate({
            parent: 'accounts/pub-4178615560355204',
            requestBody: {
                reportSpec: {
                    dateRange: {
                        startDate: today,
                        endDate: today
                    }
                }
            }
        });

        // Extract match rate from response
        const matchRate = response.data.matchRate;

        console.log(`Today's match rate: ${matchRate}`);
        return matchRate;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Call the function to get today's match rate
getAdMobMatchRate();
