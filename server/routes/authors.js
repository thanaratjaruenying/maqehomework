import express from 'express';
import authors from '../database/authors';
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json(authors);
  res.end();
});

module.exports = router;
