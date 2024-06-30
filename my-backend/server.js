const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const memoryStore = new session.MemoryStore();

const keycloak = new Keycloak({ store: memoryStore });

app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));
app.use(keycloak.middleware());

const keycloakAdminUrl = 'http://localhost:8080';
const realm = 'myrealm';

// Fetch admin access token
async function getAdminToken() {
  const response = await fetch(`${keycloakAdminUrl}/realms/master/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `client_id=admin-cli&username=admin&password=admin&grant_type=password`
  });
  const data = await response.json();
  return data.access_token;
}

// Register API
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
 
  try {
    const adminToken = await getAdminToken();
    const response = await fetch(`${keycloakAdminUrl}/admin/realms/${realm}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        username,
        enabled: true,
        credentials: [{
          type: 'password',
          value: password,
          temporary: false
        }]
      })
    });
    if (response.ok) {
      res.status(201).json({ message: 'User registered successfully' });
    } else {
      const error = await response.json();
      res.status(response.status).json({ error });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login API
// Login API
// Login API
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const response = await fetch(`${keycloakAdminUrl}/realms/${realm}/protocol/openid-connect/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from('myclient' + ':' + '9wSbs4B85SASWp7ippSRANkTfICTvX9r').toString('base64')
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`
      });
  
      if (response.ok) {
        const data = await response.json();
        res.json(data);
      } else {
        const error = await response.json();
        res.status(response.status).json({ error });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
