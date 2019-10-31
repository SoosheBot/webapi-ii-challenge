const express = require("express");
const router = express.Router();
const Posts = require("../data/db");
router.use(express.json());


// GET all posts -- /api/posts 
router.get("/", (req, res) => {
  const body = req.body;

  Posts.find(body)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts"
      });
    });
});

// GET id -- /api/posts/:id 
router.get("/:id", (req,res) => {
  const {id} = req.params;
  Posts.findById(id)
    .then(posts => {
      if (posts.length) {
        res.status(200).json(posts);   
      } else {
        res.status(404).json({message: "The post with the specified ID does not exist."});
      }
    })
    .catch(error => {
      console.log("An error, alas!", error);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

// GET comment -- /api/posts/:id/comments
router.get("/:id/comments", (req,res) => {
  const { id } = req.params;
  Posts.findPostComments(id)
  .then(posts => {
    if (posts.length <= 0) {
      res.status(404).json({message: "The post with the specified ID does not exist."});   
    } else {
      res.status(201).json(posts);
    }
  })
  .catch(error => {
    console.log("An error, alas!", error);
    res
      .status(500)
      .json({ error: "The comments information could not be retrieved." });
  });
});

// POST to array -- /api/posts
router.post("/", (req, res) => {
  const {title, contents } = req.body;

  Posts.insert(req.body)
    .then(posts => {
      if (req.body === '') {
        res.status(400).json({errorMessage:'Please provide title and contents to make this work.'})
      } else {
        res.status(201).json(posts);
      } 
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "There was an error saving this post, try again."
      });
    });
});

//POST create comment for specific post by ID -- /api/posts/:id/comments
router.post("/:id/comments", (req, res) => {
  const {id} = req.params;
  const {text} = req.body;
  
  const newComment = {
    ...req.body,
    post_id:id
  }

  Posts.insertComment(newComment)
  .then(posts => {
    res.status(200).json(posts);  
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "There was an error saving this post, try again."
    });
  });
});
  


  

module.exports = router;
