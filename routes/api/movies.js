const express = require("express");
const router = express.Router();
const multer = require("multer");

//Movie model
const Movie = require("../../models/Movie");

//@route POST api/movies/add
//@desc Add Movie
//@access Public
router.post("/add", (req, res) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage }).single("file");

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    const { title, userId } = req.body;
    const url = `http:\\\\localhost:5000\\${req.file.filename}`;

    const newMovie = new Movie({
      title: title,
      userId: userId,
      url: url,
    });

    newMovie.save();

    return res.status(200).send(req.file);
  });
});

//@route GET api/movies/user
//@desc Get user movies
//@access Public
router.get("/user", (req, res) => {
  Movie.find({ userId: req.query.userId })
    .sort({ date: -1 })
    .then((movies) => {
      movies = movies.map((movie) => {
        return { title: movie.title, url: movie.url };
      });

      res.json(movies);
    });
});

module.exports = router;
