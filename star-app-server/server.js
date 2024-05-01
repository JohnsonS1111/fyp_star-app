require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectToMongoDB = require("./dbConfig/dbConfig");
const fs = require("fs")
const multer = require("multer")

connectToMongoDB();

app.use(express.json());

// const subcribersRouter = require("./routes/subscribers")
// app.use("/subscribers", subcribersRouter);

const middleware = require("./middleware/middleware")
const todoRouter = require("./routes/todos.js");
const signupRouter = require("./routes/signup.js");
const loginRouter = require("./routes/login.js");
const logoutRouter = require("./routes/logout.js");
const timetableRouter = require("./routes/timetable.js")

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
app.use("/todos", todoRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/timetable", timetableRouter);

app.listen(5000, () => console.log("Server Started"));
