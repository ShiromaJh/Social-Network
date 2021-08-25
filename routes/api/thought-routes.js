const router = require("express").Router();

const {
  crtTht,

  getTht,

  getOneTht,

  updtTht,

  dltTht,

  addReaction,

  removeReaction,
} = require("../../controllers/thought.controller");

router.route("/").post(crtTht).get(getTht);

router
  .route("/:thoughtId")
  .get(getOneTht)
  .put(updtTht)
  .delete(dltTht);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
