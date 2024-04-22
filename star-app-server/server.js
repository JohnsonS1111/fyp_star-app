require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectToMongoDB = require("./dbConfig/dbConfig");

connectToMongoDB();

app.use(express.json());

// const subcribersRouter = require("./routes/subscribers")
// app.use("/subscribers", subcribersRouter);

const todoRouter = require("./routes/todos.js");
const signupRouter = require("./routes/signup.js");
const loginRouter = require("./routes/login.js");

app.use(cors());

app.use("/todos", todoRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);

app.listen(5000, () => console.log("Server Started"));
