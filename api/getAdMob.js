const { google } = require('googleapis');

// Service account credentials
const serviceAccountCredentials = {
    client_email: 'admob-416@red-league-416615.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDhool7/pRORjk2\nw/sV99BhWDph3SpHvFtrDCAci4eZz2I1bZs2FvJxTQi0LuDsHFUkqLKhhaZf2rPM\nelNlNgU0vJO1BzmsjvVvKPzxnI2RGt+mHh9JKv88RLQCVWXYEXodc5QLwrctxno/\nDYerIAaTNMXQc/tAD5j7OAlSvexWHwjmJoNXmQqPuvWsMezxfmXkZd6SFt8JwPrX\nMro6j6tPbRBaUnMP/lmM6TrWv5xLX2eYyMFWLeyDl3zeAbWATZweTHmlGXasZl5Q\n7kBVlbFNqIoosgZ23Ozwsq0emftVDnu+2e4ZBgulWioHl/Q5pL7+HAT5OwkCDbLf\n8hWSZ+jJAgMBAAECggEAA57DfPFPONhIl7faQfZ5ae5r9WECiiccAmIt67dTZCTf\nKwNIr7v7hNTbFGUCJ9emiBGK2CuYSUZthxTZXLDasYdrCUcF5l5e0rtCH7BG1zKq\nrvQhxV9CvBlQGA99tFNHdcyCbhPgM4RRNszFRfocEOWSXO9XcyYs6q7x+1lfvtv1\n5aqV1+W0Un6/demf19qL/hb07gZz1HPpdMEfin6246mUX8awncqHq0I9RjEmz8QY\nSEUvFin1tlYPKXxHbrB1q/wVP4p+ptt8dA9YOXThkWy/Gb6RFlugPkiSFxF6HXpa\nGaa2A80FHWcnUcV8GzZNVrhq5eSXekDl7qEA6xm1QQKBgQD4bnkPu0C2gcxSt2+x\nZ9SzazIbpmyJBtEuJZ349D+jowrPbk36V77DsY9nY7KGdXVkuKU3qNRTRp7nhOSs\n0pIm0PmU3J+0BygmWhgMsdgd3OqG7Rb2zOOqAoZkQ0mCZ4bSvqdwKRV0wMWf9RrF\ng7QNJJzPZSDNYPtNbZM3LVtp0QKBgQDogkW8C3lDknrhm8C1o55KubtdZsORzezH\nTAnJxF0VVlPhZfnoOtR40IoF/AQytLRQ8BgCGyPS3dVIKOweO5My+Ob7wpLKOpK+\n89e3CR3b6uIpF+XYS3Vm/Bh5Jmfr+Xexw74y05FqmgP9nPHUlPk0GJzh/tzpf6BK\nDPwDAqjVeQKBgQDMSPON5xoAud1Ni3/yLwJuA1DyAbkwOIXcX5x2ckq+gbzK89Z1\nbJ/2hdT5XLcZ8A53o4pgqZjnXaQfl1z/bCw4dRE2wvEkddojJ2StU7T2YYoNJ3sB\nuVvgmjDu05HoBL+OHq7LAU2ec0JPFZtNHc76G8hCltMRb5VWhytObSLFcQKBgDAg\nDskOYuounoqmD2xJUpFLAlIh3CcIxZK21WvS3iV1eeU0k1aTHrlnCLqWYFQSfSQn\nngCJl4+k5OmLttvHHv+07zJ7IqEDIK6vkB3NoEWNx4QT8zoi3EkVswcYgPgh6bl8\nt5iTnAzBlkPfQVrr/uzej1Jjy1v1U7sgFuWUnleZAoGBAJJm4DQdBOzwKVAqwnd4\nSUBGDX7eSo1/Se399n++X8aHfvecFBahqE/JobU6G8b9XYoIfhuE+3NpYHTspZA3\nmFLBYvuQ/eUb3UT/e5NeCJk7dJj8R2i2xE1EmfhmWqaj11pdG69I0zSK8mLgnyQP\n3bWjZ/iiPInr5L59qt1v+EVx\n-----END PRIVATE KEY-----\n'
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
        const admob = google.ads.admob({
            version: 'v1',
            auth: client
        });

        // Make the API request to fetch the report data
        const response = await admob.accounts.networkReport.generate({
            parent: 'accounts/pub-417861556035520', // Replace with your actual AdMob account ID
            requestBody: {
                reportSpec: {
                    dateRange: {
                        startDate: { year: 2024, month: 3, day: 7 },
                        endDate: { year: 2024, month: 3, day: 7 }
                    },
                    dimensions: ['DATE'],
                    metrics: ['IMPRESSIONS', 'CLICKS', 'ESTIMATED_EARNINGS']
                }
            }
        });

        // Extract and return the report data from the response
        const reportData = response.data;

        res.status(200).json({ reportData });
    } catch (error) {
        console.error('Error retrieving report from AdMob API:', error);
        res.status(500).json({ error: 'An error occurred while retrieving report from AdMob API' });
    }
};
