// Import the required libraries
const OpenAI = require('openai');
const express = require('express');

// Create an instance of the Express application
const app = express();
const port = 3000;

// Create an instance of the OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define a route for the root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Image Generator API!');
});

// Define a route for the '/generate-image' endpoint
app.get('/generate-image', async (req, res) => {
  try {
    // Make a request to the OpenAI API to generate an image
    const completion = await openai.images.generate({
      model: "dall-e-2",
      prompt: req.query.prompt,
      n: 1,
      size: "256x256"
    });

    // Send the generated image URL as a JSON response
    res.json({
      image: completion.data[0].url
    });
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});