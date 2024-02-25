module.exports = async (event, context) => {
  try {
    return {
      statusCode: 200,
      body: 'Hello Cron!'
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};
