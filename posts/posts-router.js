const express = require("express");
const router = express.Router();
const Posts = require("../data/db");
router.use(express.json());

// POST /api/posts -- creates a new post with title and comments into the array
router.post("/", (req, res) => {
  const { title, contents } = req.body;

  Posts.insert(req.body)
    .then(posts => {
      if (posts) {
        res.status(201).json(posts);
      } else {
        res.status(500).json({
          error: "There was an error while saving this post to the database."
        });
      }
    })
    .catch(error => {
      console.log("An error, alas!", error);
      res
        .status(400)
        .json({
          errorMessage:
            "Please provide the following-- 'title':'', 'contents':'' for this post."
        });
    });
});

// POST by ID /api/posts/:id/comments -- creates a new comment to the array by ID

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const { text, post_id } = req.body;
  Posts.findById(id, req.body)
    .then(id => {
      if (id === "") {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (req.body === "") {
        res
          .status(400)
          .json({ errorMessage: "Please provide text for the comment." });
      } else if (req.body) {
        res.status(201).json(req.body);
      }
    })
    .catch(error => {
      console.log("An error, alas!", error);
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

// GET /api/posts -- finds and returns the posts array
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

// get /api/posts/:id/comments -- finds and returns comments by ID
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
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
        .json({ error: "The comments information could not be retrieved." });
    });
});

module.exports = router;
