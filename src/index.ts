import axios from './lib/axiosConfig';
import express from 'express';
import { Request } from 'express-jwt';
import isWhatsAppWebhook from './guards/whatAppAPI';

// Create an Express app
const app = express();


// Middleware to parse JSON bodies
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Route for GET requests
app.get('/', (req: Request, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Route for POST requests
app.post('/', (req: Request, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));

  const data = req.body

  try {
    if (!isWhatsAppWebhook(data)) {
      throw new Error('This is not valid whats app api resonse')
    }

    const typeOfMesg = data?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.type ?? 'text';

    if (typeOfMesg === "image" ||
      typeOfMesg === "audio" ||
      typeOfMesg === "video") {
      res.sendStatus(200)
      return;
    }
    axios.post('/mesgTest: ', data?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500);
  }

});

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});
