require("dotenv").config();

const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    service: "finance-backend",
    apiBase: "/api",
    flow: ["POST /api/login", "POST /api/users", "GET /api/users", "POST /api/records", "GET /api/records", "GET /api/dashboard"],
  });
});

app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));