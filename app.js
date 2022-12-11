const express = require("express");
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user-routes");
const bseRoutes = require("./routes/bse-routes");
const nseRoutes = require("./routes/nse-routes");
const stockRoutes = require("./routes/stock-routes");
const notificationRoutes = require("./routes/notification-routes");

// Middlewares
const app = new express();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  console.log("This is middleware");
  next();
});

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Stock API",
      description: "Stock market information",
      contact: {
        name: "KS Developers",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["./routes/*.js"],
};

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const swaggerDoc = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/bse", bseRoutes);
app.use("/api/nse", nseRoutes);
app.use("/api/stock-items", stockRoutes);
app.use("/api/push-notification", notificationRoutes);

// Start Server
module.exports = app;
