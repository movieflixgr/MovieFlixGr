module.exports = async (req, res) => {
  try {
    // Perform any asynchronous operations here
    // For example, fetching data from a database or an external API
    // Simulating an asynchronous operation with setTimeout
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // Resolve the promise after 1000 milliseconds (1 second)
        resolve();
      }, 1000);
    });

    // Once the asynchronous operation is completed, send the response
    res.status(200).end('Hello Cron!');
  } catch (error) {
    // If an error occurs during the asynchronous operation, handle it here
    console.error('An error occurred:', error);
    res.status(500).end('Internal Server Error');
  }
};
