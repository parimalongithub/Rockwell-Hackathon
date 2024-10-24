const SummarygenAImodel = require("../Middlewares/SummarizerLLM.middleware");
const Query = require("../Model/Query.model");
const Summary = require("../Model/Summary.model");

const Summarizer = async (req, res) => {
  try {
    const { year, month, timeframe } = req.body;
    const monthtimeframe = timeframe % 12;
    let yeartimeframe = 0;
    if (timeframe > 12) {
      yeartimeframe = Math.floor(timeframe / 12);
    }
    const startdate = new Date(year - yeartimeframe, month - monthtimeframe, 1);
    const enddate = new Date(year, month, 1);
    const data = await Query.find({
      createdAt: { $gte: startdate, $lt: enddate },
    }).exec();
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "No queries found for this given time period" });
    }

    const concanatedquery = data.map((query) => query.query).join(" ");

    const summary = await SummarygenAImodel(concanatedquery);

    const newSummary = await Summary.create({
      Summary: summary.summary,
      startDate: startdate,
      endDate: enddate,
    });
    if (!newSummary) {
      return res.json({ message: "Summarizer ran into an error" }).status(401);
    }
    return res.json({ newSummary, message: "summary created" });
  } catch (error) {
    return res
      .json({ error: error, message: "Internal Server Error" })
      .status(500);
  }
};

module.exports = { Summarizer };
