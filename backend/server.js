require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require('./routes/productRoutes');


const app = express();
app.use(cors());
app.use(express.json());

//route
app.get("/api", (req, res) => {
  res.send("API is running...");
});
app.use('/api/products', productRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
  console.log("Mongo URI:", process.env.MONGO_URI);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
