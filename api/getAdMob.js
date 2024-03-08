const { google } = require('googleapis');

// Service account credentials
const serviceAccountCredentials = {
    client_email: 'admob-416@red-league-416615.iam.gserviceaccount.com',
    private_key: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDhool7/pRORjk2
w/sV99BhWDph3SpHvFtrDCAci4eZz2I1bZs2FvJxTQi0LuDsHFUkqLKhhaZf2rPM
elNlNgU0vJO1BzmsjvVvKPzxnI2RGt+mHh9JKv88RLQCVWXYEXodc5QLwrctxno/
DYerIAaTNMXQc/tAD5j7OAlSvexWHwjmJoNXmQqPuvWsMezxfmXkZd6SFt8JwPrX
Mro6j6tPbRBaUnMP/lmM6TrWv5xLX2eYyMFWLeyDl3zeAbWATZweTHmlGXasZl5Q
7kBVlbFNqIoosgZ23Ozwsq0emftVDnu+2e4ZBgulWioHl/Q5pL7+HAT5OwkCDbLf
8hWSZ+jJAgMBAAECggEAA57DfPFPONhIl7faQfZ5ae5r9WECiiccAmIt67dTZCTf
KwNIr7v7hNTbFGUCJ9emiBGK2CuYSUZthxTZXLDasYdrCUcF5l5e0rtCH7BG1zKq
rvQhxV9CvBlQGA99tFNHdcyCbhPgM4RRNszFRfocEOWSXO9XcyYs6q7x+1lfvtv1
5aqV1+W0Un6/demf19qL/hb07gZz1HPpdMEfin6246mUX8awncqHq0I9RjEmz8QY
SEUvFin1tlYPKXxHbrB1q/wVP4p+ptt8dA9YOXThkWy/Gb6RFlugPkiSFxF6HXpa
Gaa2A80FHWcnUcV8GzZNVrhq5eSXekDl7qEA6xm1QQKBgQD4bnkPu0C2gcxSt2+x
Z9SzazIbpmyJBtEuJZ349D+jowrPbk36V77DsY9nY7KGdXVkuKU3qNRTRp7nhOSs
0pIm0PmU3J+0BygmWhgMsdgd3OqG7Rb2zOOqAoZkQ0mCZ4bSvqdwKRV0wMWf9RrF
g7QNJJzPZSDNYPtNbZM3LVtp0QKBgQDogkW8C3lDknrhm8C1o55KubtdZsORzezH
TAnJxF0VVlPhZfnoOtR40IoF/AQytLRQ8BgCGyPS3dVIKOweO5My+Ob7wpLKOpK+
89e3CR3b6uIpF+XYS3Vm/Bh5Jmfr+Xexw74y05FqmgP9nPHUlPk0GJzh/tzpf6BK
DPwDAqjVeQKBgQDMSPON5xoAud1Ni3/yLwJuA1DyAbkwOIXcX5x2ckq+gbzK89Z1
bJ/2hdT5XLcZ8A53o4pgqZjnXaQfl1z/bCw4dRE2wvEkddojJ2StU7T2YYoNJ3sB
uVvgmjDu05HoBL+OHq7LAU2ec0JPFZtNHc76G8hCltMRb5VWhytObSLFcQKBgDAg
DskOYuounoqmD2xJUpFLAlIh3CcIxZK21WvS3iV1eeU0k1aTHrlnCLqWYFQSfSQn
ngCJl4+k5OmLttvHHv+07zJ7IqEDIK6vkB3NoEWNx4QT8zoi3EkVswcYgPgh6bl8
t5iTnAzBlkPfQVrr/uzej1Jjy1v1U7sgFuWUnleZAoGBAJJm4DQdBOzwKVAqwnd4
SUBGDX7eSo1/Se399n++X8aHfvecFBahqE/JobU6G8b9XYoIfhuE+3NpYHTspZA3
mFLBYvuQ/eUb3UT/e5NeCJk7dJj8R2i2xE1EmfhmWqaj11pdG69I0zSK8mLgnyQP
3bWjZ/iiPInr5L59qt1v+EVx
-----END PRIVATE KEY-----`,
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
        const response = await admob.accounts.reports.generate({
            parent: 'accounts/pub-4178615560355204',
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
