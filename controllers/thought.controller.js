const { Thought, User } = require("../models");

const thtCntrl = {
  crtTht: (req, res) => {
    Thought.create(req.body)
      .then((response) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: response._id } },
          { new: true }
        );
      })
      .then((response) => {
        if (!response) {
          res.status(404).json({
            message: `error`,
          });
        }
        res.status(201).json({ message: "Your thought had been generated" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getTht: (req, res) => {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((response) => res.json(response))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  getOneTht: (req, res) => {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((response) => {
        if (!response) {
          res.status(404).json({ message: `No thought found` });
        }
        res.json(response);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  updtTht: (req, res) => {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((response) => {
        if (!response) {
          res.status(404).json({ message: `No thought found` });
        }
        res.json(response);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  dltTht: (req, res) => {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((response) => {
        if (!response) {
          res.status(404).json({ message: `No thought found` });
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((response) => {
        if (!response) {
          res.status(404).json({ message: `error` });
        }
        res.json({ message: "Thought deleted" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  addReaction: (req, res) => {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((response) => {
        if (!response) {
          res.status(404).json({ message: `error` });
        }
        res.status(201).json(response);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  removeReaction: (req, res) => {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((response) => {
        if (!response) {
          res.status(404).json({ message: `No thought found with this id` });
        }
        res.json({ message: "Reaction removed!" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thtCntrl;
