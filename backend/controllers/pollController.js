const Poll = require("../models/Poll");
const Vote = require("../models/Vote");

// Create Poll
exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || !options || options.length < 2) {
      return res.status(400).json({ msg: "Invalid input" });
    }

    const poll = new Poll({
      question,
      options: options.map((o) => ({
        text: o,
        votes: 0, // important
      })),
    });

    await poll.save();

    res.status(201).json({
      id: poll._id,
    });

} catch (err) {
  console.log("FULL ERROR:", err); // 👈 ADD THIS
  res.status(500).json({
    msg: "Server error",
    error: err.message,
  });
}
}




// Get Poll
exports.getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) return res.status(404).json({ msg: "Not found" });

    res.json(poll);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Vote
exports.votePoll = async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const pollId = req.params.id;

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Check IP already voted
    const existing = await Vote.findOne({ pollId, ip });

    if (existing) {
      return res.status(403).json({ msg: "Already voted" });
    }

    const poll = await Poll.findById(pollId);

    if (!poll) return res.status(404).json({ msg: "Not found" });

    poll.options[optionIndex].votes += 1;

    await poll.save();

    await Vote.create({ pollId, ip });

    res.json(poll);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
