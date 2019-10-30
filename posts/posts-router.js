const express = require('express');
const router = express.Router();
const Posts = require('../data/db');
router.use(express.json());


router.get('/', (req, res) => {
    const query = req.query;
  
    Posts.find(query)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the posts',
        });
      });
  });

  router.get(() => {

  });

  module.exports = router;