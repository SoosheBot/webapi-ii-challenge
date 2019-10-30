const express = require('express');
const router = express.Router();
const Posts = require('../data/db');
router.use(express.json());

// POST /api/posts -- saves and returns new post to the array
router.post('/', (req,res) => {
  const { title, contents } = req.body;

  Posts.insert(req.body)
  .then(posts => {
    if (posts) {
      res.status(201).json(posts)
    } else {
      res
          .status(500)
          .json({
            error: "There was an error while saving this post to the database."
          });
    }
  })
  .catch(error => {
      console.log("An error, alas!", error);
      res
        .status(400)
        .json({ errorMessage: "Please provide the following-- 'title':'', 'contents':'' for this post." });
    });
});

// GET /api/posts -- finds and returns the posts array
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

  // get /api/posts/:id -- finds and returns posts by ID
  router.get(() => {

  });

  module.exports = router;