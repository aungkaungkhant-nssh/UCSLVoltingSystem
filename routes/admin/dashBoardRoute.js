const express= require("express");
const router = express.Router();
const { isAdminAuth } = require("../../middleware/auth");
const {getDashboard} = require("../../controllers/admin/dashboardController")
router.get('/:id',isAdminAuth,getDashboard);

module.exports = router;