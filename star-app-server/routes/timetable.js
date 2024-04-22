require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectToMongoDB = require("./dbConfig/dbConfig");
const fs = require("fs")
const multer = require("multer")