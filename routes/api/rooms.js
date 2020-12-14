const express = require("express");
const router = express.Router();

const validateRoomInput = require("../../validation/room");

const Room = require("../../models/Room");

//@route GET api/rooms/get
//@desc Get room info
//@access Public
router.get("/get", (req, res) => {
  Room.findOne({ id: req.query.id })
    .then((room) => {
      return res.status(200).json({ room: room });
    })
    .catch((err) => {
      return res.status(404).json({ room: "Room not found" });
    });
});

//@route POST api/rooms/add
//@desc Add new room
//@access Public
router.post("/add", (req, res) => {
  const { errors, isValid } = validateRoomInput(req.body);
  const regex = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );

  if (!req.body.id.match(regex)) {
    return res.status(404).json({ room: "Invalid room ID" });
  }

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Room.findOne({ id: req.body.id }).then((room) => {
    if (room) {
      return res.status(200).end();
    } else {
      const newRoom = new Room({
        id: req.body.id,
        title: req.body.title,
        url: req.body.url,
      });

      newRoom
        .save()
        .then((room) => res.json(room))
        .catch((err) => console.log(err));
    }
  });
});

//@route POST api/rooms/edit
//@desc Assign a movie to an existing room
//@access Public
router.put("/edit", (req, res) => {
  const { errors, isValid } = validateRoomInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Room.findOneAndUpdate(
    { id: req.body.id },
    {
      id: req.body.id,
      title: req.body.title,
      url: req.body.url,
    },
    { new: true }
  )
    .then((room) => {
      if (!room) {
        return res.status(400).json({ room: "Room not found" });
      } else {
        return res.json(room);
      }
    })
    .catch((err) => console.log(err));
});

//@route POST api/rooms/delete
//@desc Delete room
//@access Public
router.post("/delete", (req, res) => {
  Room.findOneAndDelete({ id: req.body.id })
    .then(() => {
      return res.status(200).end();
    })
    .catch((err) => {
      return res.status(404).json({ error: err });
    });
});

module.exports = router;
