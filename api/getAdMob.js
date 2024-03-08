const { google } = require('googleapis');

// Service account credentials
const serviceAccountCredentials = {
    client_email: 'admob-416@red-league-416615.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCw/I7zdJ6YscPP\n2o5cBZ5+eR3t3GQoGOdqXgce4Zvfx6G61bWmYj9oXeH+PM5kQtqYwT6l/2+ZOvQt\nUFMKpEK8WJkr8qT/2OLbdhALBf4BzrvrQlJn4raLFd1PxxcZIBGKsCxDRgazCnjx\nvGk+1cmvPgpm72mPwO8BStYO68sFHcGcZpB7vNs1uv+QIUukQrUhAFc96Ngh8AUD\n0+QvTEcAvw6IUqydSUcVyfiimPU8vcmVhEDImZJwT1BianrnAH/wsKxG6QZfCmbb\nl+6lqPtNnZ8OZ4rNUT3WiiUv1q9p2reinn3rp7rPm0/U1dqTQWq6vC/b98buJn7x\nx4QYVE/VAgMBAAECggEADI5mb+Q6qjeWXkUxq1qks3FRS8JCgsu9g0DXfXvhDJ/D\nnBc0U3EN8ZATi+9xbxCFJKg1Ex7LopHZp+tWcN9VcrpQZ5tH1HTlJ0+5dKbArg0m\nLNsgMImXjMeI03Oa8mfhhrbX9Q/fQs1/5hqJVvFg5SNgJoxer1mvOya9iAJ3fU3Q\nTYfup7rv6pU7P/SkpwyjLm2hnM2JInyHUuNaRDJ6TS1gZzMTicJ1VrxMWnUwcvc2\nqgugKGJaJt0Ynfpqme+hSW02GQoJtXJyZsvwDErMFJ2c0ELdvqEHkj3olhJVufoE\nJ6m02XV71yloldm2ixtxWjedYF9wwTGYWNe0kzBX8QKBgQDpVZPdqbfF0P2xc4QJ\nOF623IzSN5tZbndvzmveetmlQaUq8NyKutHiKRI7yMz5FPYheYKHNc/NqLwukwV+\n69s6bXUeNet7teHx0xmGNhAqQ/YHbHBjLlRuf50CixQZSq2zccr3pG1PfDl3rSuJ\nj8M2Ufw4Y5YsIhZX7SZzkw9ymQKBgQDCLcIIX8sgC+R9QpV2airz1Hhc1a1GUZfs\nGO5G3YJE0yIPm5CFOKmabpiRq31BOB+plO3rdPkJEbn6TPvX7NE8+aqGwdWqLuq+\nW/kd9H30VfTtczzHBONOZwE92BuL5BxonBcVAuiHbPijpCqVdnVXo3kLbhheR3XK\nVBrccKBInQKBgGlY1uLMXol0eyXkBqf3CGQ9HWNH8d6lzkzvgKo5Awzmn4DMsHX+\nNQaMDoxpc4m92gZxCuqq9ABhf1zzyhZsvFUb2DXkmEYJb1K0QaDjxdafSnQ9lFxj\nLYGaIjRkwJVOrzAGX2IBncy2RGfxCmgYPUXILDz1UXbpiPb3vlWN/vp5AoGATz7R\nYw2FHkz8MMqNqMfnQ59Ah9KEZqBB+g6qn60izufDjM8WCeh3/xiHl1t/QLCg61pm\nRqN0Ruk/FxF37kUtl07k8x4EDvIaxxlN75WqGZ9C1+0hrq8l/Qc4kH6zr0Gm/mJF\nYUPQlgQ47L/AyUKQ3PVQHwQNWdycC7iLRc+I+lkCgYB77AHJ5Aueqczjf0KHWzRT\nWWLGwCLLC4TGY/8katNwnB7xzhqkOydAWjmYklNokpSNTPZFaFbjpHlswW6T9gNP\nvDGF2e+l8gcAvoGgnN71M7z3ObuuJU7Q92dSjBJhpDgM75p1tKV/6HRqQal9xZ8K\nYtKNT9ihX9NDznyLD5t2oA==\n-----END PRIVATE KEY-----'
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
