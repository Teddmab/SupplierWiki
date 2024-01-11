const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5001;

// Mock database
const supplierData = [
    { username: 'admin', password: 'admin', supplier: 'Test Account Alea', product: ['Product 2 -Alea', 'Product 3 - Alea', 'Product. 1 Test Account Alea', 'Final Product - Alea'], accountID: '001JW000007G26hYAC' },
    { username: 'user1', password: 'Password1', supplier: '7Mojos', product: ['7Mojos'], accountID: '001JW000007G26hYAC' },
    { username: 'user2', password: 'Password2', supplier: 'AirDice', product: ['Air Dice'], accountID: '001JW000007G26hYAC' },
    { username: 'user3', password: 'Password3', supplier: 'Apparat Gaming', product: ['Apparat Gaming'], accountID: '001JW000007G26hYAC' },
    { username: 'user4', password: 'Password4', supplier: 'Asia Gaming', product: ['Asia Gaming'], accountID: '001JW000007G26hYAC' },
    { username: 'user5', password: 'Password5', supplier: 'AvatarUX', product: ['AvatarUX'], accountID: '001JW000007G26hYAC' },
    { username: 'user6', password: 'Password6', supplier: 'Barbara Bang Studios', product: ['Barbara Bang'], accountID: '001JW00000A74SaYAJ' },
    { username: 'user7', password: 'Password7', supplier: 'Oryx Gaming', product: ['Oryx Gaming - Indigo - CandleBets', 'Atomic Slot Lab', 'Blue Guru', 'Gamomat', 'Golden Hero'], accountID: '001JW000007G26hYAC' }
];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/login', async (req, res) => { // Make sure this is an async function   
    const { username, password } = req.body;
    const user = supplierData.find(u => u.username === username && u.password === password);
    
    if (user) {
        try {
            // Authenticate with Salesforce to get the access token
            console.log('SF_AUTH_URL:', process.env.SF_AUTH_URL)
            const tokenResponse = await fetch(process.env.SF_AUTH_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'grant_type': 'password',
                    'client_id': process.env.SF_CLIENT_ID,
                    'client_secret': process.env.SF_CLIENT_SECRET,
                    'username': process.env.SF_USERNAME,
                    'password': process.env.SF_PASSWORD
                })
            });

            const tokenData = await tokenResponse.json();

            // Check if tokenData contains an access token
            if (!tokenData.access_token) {
                return res.status(401).json({ message: 'Authentication with Salesforce failed.' });
            }

            // Use the access token to make a query to the Salesforce API
            console.log('SF_INSTANCE_URL:', process.env.SF_INSTANCE_URL)

            const queryString = encodeURI(`SELECT Name, Min_Max_bet__c, Language__c, PACGOR_license__c, new_license__c, Client_Area_URL__c, Marketing_Material__c, URL_for_game_certificate__c, Top_5_market__c, Direct_communication_with_Hub88__c, top_5_games__c, Supported_Currencies__c, Max_Exposure__c, Blue_Dollar_Supported__c, External_ID__c, Supplier_Products__r.Name  FROM Supplier_Wiki__c WHERE Account__c = '${user.accountID}'`);
            const sfResponse = await fetch(`${process.env.SF_INSTANCE_URL}/services/data/v52.0/query/?q=${queryString}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${tokenData.access_token}`,
                    'Content-Type': 'application/json',
                }
            });


            const sfData = await sfResponse.json();

            // Prepare the response data with the Supplier_Wiki__c data if it exists
            const supplierWikiData = sfData.records && sfData.records.length > 0 ? sfData.records : null;

            // Return supplier and product along with the token
            res.json({ 
                message: 'Login successful', 
                token: 'dummy-token', 
                supplierData: [{ 
                    supplier: user.supplier, 
                    product: user.product, 
                    accountID: user.accountID, 
                    supplierWikiData: supplierWikiData // Include the found data or null
                }]
            });
        } catch (error) { // Make sure to catch the error in the catch block
            console.error('Salesforce authentication error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        // If authentication fails, return an error message.
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
