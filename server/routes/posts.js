import express from 'express';
import posts from '../database/posts';
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json(posts);
  res.end();
});

module.exports = router;
