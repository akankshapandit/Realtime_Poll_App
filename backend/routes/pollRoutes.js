const express = require("express");
const router = express.Router();

const {
  createPoll,
  getPoll,
  votePoll,
} = require("../controllers/pollController");

router.post("/create", createPoll);
router.get("/:id", getPoll);
router.post("/vote/:id", votePoll);

module.exports = router;
