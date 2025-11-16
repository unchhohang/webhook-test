"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Create an Express app
const app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;
// Route for GET requests
app.get('/', (req, res) => {
    const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;
    if (mode === 'subscribe' && token === verifyToken) {
        console.log('WEBHOOK VERIFIED');
        res.status(200).send(challenge);
    }
    else {
        res.status(403).end();
    }
});
// Route for POST requests
app.post('/', (req, res) => {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    console.log(`\n\nWebhook received ${timestamp}\n`);
    console.log(JSON.stringify(req.body, null, 2));
    res.status(200).end();
});
// Start the server
app.listen(port, () => {
    console.log(`\nListening on port ${port}\n`);
});
