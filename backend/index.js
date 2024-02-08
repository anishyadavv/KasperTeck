const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

const URI = process.env.MONGOURI;
const PORT = process.env.PORT || 5000;

console.log(URI);
// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");

app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);

app.get('/',(req,res)=>{
    res.send("welcome anish");
})
// MongoDB Connection
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
