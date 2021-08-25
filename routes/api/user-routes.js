const router = require("express").Router();
const {
  createUser,

  getUsers,

  getSingleUser,

  updateUser,

  deleteUser,

  addFriend,

  removeFriend,
} = require("../../controllers/user.controller");

router.route("/").post(createUser).get(getUsers);

router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteUser);

module.exports = router;
