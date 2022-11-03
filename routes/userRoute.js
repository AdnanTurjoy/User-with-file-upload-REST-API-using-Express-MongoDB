const express = require("express");
const {
  getUsers,
  getsingleUser,
  adduser,
  searchUser,
  deleteUser,
  updateUser,
} = require("../controller/userController");
const { upload } = require("../model/userModel");
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getsingleUser);
router.post("/", upload.single("image"), adduser);
router.get("/search/:key", searchUser);
router.delete("/:id", deleteUser);
router.put("/:id", upload.single("image"), updateUser);

module.exports = router;
