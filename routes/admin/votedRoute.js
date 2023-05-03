const express= require("express");
const { addVoted,fetchVoted, deleteVoted,getVoted, updateVoted } = require("../../controllers/admin/VotedController");
const router= express.Router();
const { isAdminAuth } = require("../../middleware/auth");

router.post("/",isAdminAuth,addVoted);
router.get("/",isAdminAuth,fetchVoted);
router.delete('/:id',isAdminAuth,deleteVoted);
router.get("/:id",isAdminAuth,getVoted);
router.put("/:id",isAdminAuth,updateVoted)
module.exports = router;