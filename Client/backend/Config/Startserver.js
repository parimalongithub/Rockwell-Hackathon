const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./DB");
const Queryrouter = require("../Routes/Query.routes");
const Summaryrouter = require("../Routes/Summarizer.routes");
const Authrouter = require("../Routes/Auth.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

//configurations
dotenv.config();
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["localhost:3000", "localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../rockwell/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../rockwell/dist/index.html"));
});

//connect to server and database
const PORT = process.env.PORT || 5000;
const startserver = async () => {
  await connectDB();

  try {
    app.listen(PORT, () => {
      console.log(`server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

//routes
app.use("/api", Queryrouter);
app.use("/summary", Summaryrouter);
app.use("/auth", Authrouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = startserver;
