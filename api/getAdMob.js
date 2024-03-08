// api/today-match-rate.js
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Make a request to the AdMob API to get today's match rate
        const response = await axios.get('https://admob.googleapis.com/v1/accounts/YOUR_ACCOUNT_ID/reports:generate', {
            headers: {
                Authorization: `Bearer $AIzaSyBPzSiimkdAN9usC7ZaIs3dpiupd3cd9wA`
            },
            params: {
                // Customize your query parameters as needed
                // For example, you might specify the date range for today's data
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date().toISOString().split('T')[0]
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
