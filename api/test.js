// Define the handler function
const handler = async (event, context) => {
  try {
    // Your logic here...
    
    // Return successful response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
    };
  } catch (error) {
    console.error('Error:', error);
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

// Export the handler function
module.exports = handler;
