const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const socketio = require("socket.io");

const users = require("./routes/api/users");
const movies = require("./routes/api/movies");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POEST"],
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

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

//Routes
app.use("/api/users", users);
app.use("/api/movies", movies);

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("click", (message) => {
    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
