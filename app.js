require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const uplaod = require("./src/middleware/multer");
const cors = require("cors");
const app = express();
const {
  app: { port },
} = require("./src/config/index");

app.use(cors());

const restaurantRoutes = require("./src/routes/restaurantRoutes");
const restaurantTypesRoutes = require("./src/routes/restaurant.types.routes");
const productsRotues = require("./src/routes/pdocuts.routes");
const restaurantSettingsRoutes = require("./src/routes/restaurant.settings.routes");
const userRouts = require("./src/routes/users.routes");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/restaurant", restaurantRoutes);
app.use("/restaurantTypes", restaurantTypesRoutes);
app.use("/products", productsRotues);
app.use("/restaurantSettings", restaurantSettingsRoutes);
app.use("/users", userRouts);
app.use("/static", express.static("public"));

app.post("/uploads/restaurants", uplaod.single("file"), (req, res) => {
  console.log("123123123123123123123", req.file.path);
  res.json({ message: "File uploaded successfully!" });
});

app.listen(port, () => console.log(`App is up and working on port ${port}`));
