const Dev = require("../models/Dev");

module.exports = {
  async store(req, res) {
    console.log(req.params.devId);
    console.log(req.headers.user);

    const { user } = req.headers;
    const { devId } = req.params;

    const loggerDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: "Dev not Exist" });
    }

    if (targetDev.likes.includes(loggerDev._id)) {
      console.log("Deu MATCH");
    }

    loggerDev.likes.push(targetDev._id);

    await loggerDev.save();

    return res.json(loggerDev);
  }
};
