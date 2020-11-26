const express = require("express");
const router = express.Router();

//validation
const validateMovieInput = require("../../validation/movie");

//Movie model
const Movie = require("../../models/Movie");

//@route POST api/movies/add
//@desc Add Movie
//@access Public
router.post("/add", (req, res) => {
  const { errors, isValid } = validateMovieInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  } else if (!req.body.userId) {
    return res
      .status(400)
      .json({ auth: "You must be authenticated to add movie" });
  } else {
    const newMovie = new Movie({
      title: req.body.title,
      url: req.body.url,
      userId: req.body.userId,
    });

    newMovie
      .save()
      .then((movie) => res.json(movie))
      .catch((err) => console.log(err));
  }
});

module.exports = router;
