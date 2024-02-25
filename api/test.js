// Define the handler function
const handler = async (event, context) => {
  // Return successful response
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};

// Export the handler function
module.exports = handler;
