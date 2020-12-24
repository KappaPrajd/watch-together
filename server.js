const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const socketio = require("socket.io");

const {
  userJoin,
  userLeave,
  getRoomUsers,
  getRoomUrl,
  changeRoomUrl,
} = require("./utils/users");

const users = require("./routes/api/users");
const movies = require("./routes/api/movies");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const db = require("./config/keys").mongoURI;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("uploads"));

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);

//passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

//Routes
app.use("/api/users", users);
app.use("/api/movies", movies);

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });

    socket.on("movieChange", (data) => {
      const movie = changeRoomUrl(user.room, data.url, data.title);

      io.to(user.room).emit("changeURL", movie);
    });

    socket.on("fetchURL", () => {
      const movie = getRoomUrl(user.room);

      socket.emit("fetchedURL", movie);
    });

    socket.on("playPause", (bool) => {
      socket.broadcast.to(user.room).emit("changePlayPause", bool);
    });
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
