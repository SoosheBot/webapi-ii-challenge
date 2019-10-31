const express = require("express");
const router = express.Router();
const Posts = require("../data/db");
router.use(express.json());


// GET all posts -- /api/posts 
router.get("/", (req, res) => {
  const query = req.query;

  Posts.find(query)
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
      if (posts) {
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
  Posts.findCommentById(id)
  .then(posts => {
    if (posts) {
      res.status(200).json(posts); 
    } 
      res.status(404).json({message: "The post with the specified ID does not exist."});
  })
  .catch(error => {
    console.log("An error, alas!", error);
    res
      .status(500)
      .json({ error: "The comments information could not be retrieved." });
  });
});



module.exports = router;
