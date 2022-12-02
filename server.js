const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Calling to Routes
const tasksRouter = require("./routes/TaskRoute");
const usersRouter = require("./routes/UserRoute");

app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Backend Server is running on port ${port}`);
});
