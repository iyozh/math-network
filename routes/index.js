const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/math-network-frontend/build/index.html'));
});

router.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

module.exports = router;
