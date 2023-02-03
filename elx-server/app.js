const express = require("express");
const db = require("./config/connectDb");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5500", "https://elx-server.onrender.com"],
    default: "http://localhost:8000",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/v1/", require("./routes/studentRoutes"));
app.use("/api/v1/", require("./routes/adminRoutes"));

app.get("/", (req, res) => {
  res.send("Home route");
});

app.listen(PORT, () => {
  db.dbConnectinMethod();
  console.log(`Server started on port ${PORT}`);
});
