const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Webhook endpoint to handle user messages
app.post('/webhook', (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;

    // Handling multiple responses for a specific intent
    if (intentName === 'YourIntentName') {
        const responses = [
            'Response 1: Of course, what would you like to order today?',
            'Response 2: Yes, what would you like to have?',
            'Response 3: Yes, continue to place your order',
            // Add as many responses as you need
        ];

        // Select a random response from the array
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        // Send the selected response back to Dialogflow
        res.json({
            fulfillmentText: randomResponse
        });

    } else {
        // Default response if the intent does not match
        res.json({
            fulfillmentText: 'Sorry, I did not understand that.'
        });
    }
});

// Endpoint to handle direct user messages (if needed)
app.post('/message', (req, res) => {
    const userMessage = req.body.message;

    // Process user message and determine response
    let responseText = 'Default message response';

    if (userMessage.includes('hello')) {
        responseText = 'Hi there! How can I help you today?';
    } else if (userMessage.includes('bye')) {
        responseText = 'Goodbye! Have a great day!';
    }

    // Send the response back to the user
    res.json({
        response: responseText
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
