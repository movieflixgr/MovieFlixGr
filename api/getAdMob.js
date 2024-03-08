const { google } = require('googleapis');

// Set up AdMob API client with API key
const apiKey = 'AIzaSyBPzSiimkdAN9usC7ZaIs3dpiupd3cd9wA';
const admob = google.admob({
    version: 'v1',
    auth: apiKey
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
