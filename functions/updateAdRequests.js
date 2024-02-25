// netlify/functions/updateAdRequests.js
const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async (event, context) => {
  try {
    const doc = new GoogleSpreadsheet('YOUR_GOOGLE_SHEETS_DOC_ID');

    // Authenticate with Google Sheets
    await doc.useServiceAccountAuth({
      client_email: 'YOUR_SERVICE_ACCOUNT_EMAIL',
      private_key: 'YOUR_SERVICE_ACCOUNT_PRIVATE_KEY',
    });
    await doc.loadInfo(); // loads document properties and worksheets

    const sheet = doc.sheetsByIndex[0]; // assuming the data is in the first sheet
    const today = new Date().toDateString();

    // Find the row for today's date
    const rows = await sheet.getRows();
    const todayRow = rows.find(row => row.Date === today);

    if (todayRow) {
      // Update the total ad requests
      todayRow['Total Ad Requests'] = parseInt(todayRow['Total Ad Requests']) + 1;
      await todayRow.save();
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Ad requests updated successfully' })
    };
  } catch (error) {
    console.error('Error updating ad requests:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error updating ad requests' })
    };
  }
};
