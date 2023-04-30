const express = require('express');
const router = express.Router();

// Define the endpoint for the configuration data
router.post('api/config', (req, res) => {
  // Do something with the configuration data, like save it to a database or file
  const { grafana_adminuser, admin_password } = req.body;

  // Assuming the Grafana URL is hardcoded, you can send it back to the client as a response
  const grafanaUrl = `https://example.com/grafana/login?user=${grafana_adminuser}&password=${admin_password}`;
  res.json({ grafanaUrl });
});

module.exports = router;
