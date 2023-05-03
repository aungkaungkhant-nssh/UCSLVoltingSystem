const express = require("express");
const { addCategory,fetchCategory ,deleteCategory,getCategory,updateCategory} = require("../../controllers/admin/categoryController");
const { isAdminAuth } = require("../../middleware/auth");
const router =express.Router();


router.post("/",isAdminAuth,addCategory);
router.get("/",isAdminAuth,fetchCategory);
router.delete("/:id",isAdminAuth,deleteCategory);
router.get("/:id",isAdminAuth,getCategory);
router.put("/:id",isAdminAuth,updateCategory);
module.exports = router