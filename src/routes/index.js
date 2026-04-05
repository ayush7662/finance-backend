
const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");

const user = require("../controllers/userController");
const record = require("../controllers/recordController");
const dashboard = require("../controllers/dashboardController");


router.post("/user", auth, authorize(["ADMIN"]), user.createUser);
router.get("/users", auth, authorize(["ADMIN"]), user.getUsers);


router.post("/records", auth, authorize(["ADMIN"]), record.createRecord);
router.get("/records", auth, authorize(["ANALYST", "ADMIN"]), record.getRecords);


router.get("/dashboard", auth, authorize(["ANALYST", "ADMIN"]), dashboard.getSummary);

module.exports = router;